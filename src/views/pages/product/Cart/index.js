import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Presenter from '../../../../product/presenter.js';
import Request from '../../../../product/utils/request.js';
import ClearAllSession from '../../../component/ClearAllSession.js';
import { InfoModal } from '../../../component/Modal';
import DataTable from './DataTable';
import Payment from './Payment';
import EmptyRow from './row/EmptyRow';

import {
  showCheckoutScreen,
  hideCheckoutScreen
} from '../../../../redux/actions/cart';
import {
  getCartProducts,
  removeCartItem,
  clearAllCartItems
} from '../../../../redux/actionCreators';

class CartScreen extends React.Component {
  state = {
    score: [],
    isLoadingCheckout: false,
    daily: 0,
    lifeTime: 0,
    symbol: null,
    width: 0,
    checkoutScreen: false,
    paymentsScreen: false,
    detail_order: [],
    isActiveModalCC: false,
    listCC: [],
    selectedCC: null,
    loadingOnpayCC: false,
    showModal: false,
    success: false,
    showAuthModal: false
  };

  toggleModal = infoMsg => {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  };

  toggleAuthModal = () =>
    this.setState({ showAuthModal: !this.state.showAuthModal });

  getActiveCartType = () => {
    const {
      SessionReducer,
      EnsembleReducer,
      PublisherReducer,
      InstitutionReducer
    } = this.props;
    if (EnsembleReducer.is_auth) return 'ensemble';
    if (PublisherReducer.is_auth) return 'publisher';
    if (InstitutionReducer.is_auth) return 'institution';
    if (SessionReducer.is_auth) return 'user';
  };

  removeItem = key => {
    const cart = this.getActiveCart();
    const type = this.getActiveCartType();
    this.props.removeCartItem(key, cart, type);
  };

  // should be moved to redux
  onCheckout = () => {
    const {
      SessionReducer,
      InstitutionReducer,
      ActiveLanguageReducer,
      products
    } = this.props;
    const { words } = ActiveLanguageReducer;

    // Check session user, if not login redirect to login page
    if (!SessionReducer.is_auth) {
      this.toggleAuthModal();
    } else {
      // checkout action creator here

      this.showPaymentMethod();

      // ****** To enable checkout should be moved to redux ******
      // Presenter.Checkout(Request.Checkout(tmpBook, this, this.onCheckoutSuccess, this.onCheckoutFailed))
    }
  };

  getToken = () => {
    const {
      token,
      tokenEnsemble,
      tokenInstitution,
      tokenPublisher
    } = this.props.TokenReducer;

    if (tokenPublisher) return tokenPublisher;
    if (tokenEnsemble) return tokenEnsemble;
    if (tokenInstitution) return tokenInstitution;
    if (token) return token;

    return '';
  };

  getActiveCart = () => {
    const {
      SessionReducer,
      EnsembleReducer,
      PublisherReducer,
      cart
    } = this.props;
    let products = [],
      type = '';

    if (PublisherReducer.is_auth) {
      products = cart.publisherCart;
      type = 'publisher';
    } else if (EnsembleReducer.is_auth) {
      products = cart.ensembleCart;
      type = 'ensemble';
    } else if (SessionReducer.is_auth) {
      products = cart.userCart;
      type = 'user';
    }

    return products;
  };

  ReadCartDetails = () => {
    const products = this.getActiveCart();

    this.props.getCartProducts(products, this.getToken());
  };

  onCheckoutSuccess = (params, response) => {
    const {
      ActiveLanguageReducer,
      clearAllCartItems,
      InstitutionReducer,
      EnsembleReducer,
      PublisherReducer
    } = this.props;
    const { words } = ActiveLanguageReducer;

    console.log({ response });

    this.setState({
      loadingOnpayCC: false
    });
    hideCheckoutScreen();
    this.toggleModal(words.cart_msg_checkout_success);
    if (InstitutionReducer.is_auth) {
      clearAllCartItems('institution');
      this.setState({ success: true, redirectUrl: '/assignment' });
    } else if (EnsembleReducer.is_auth) {
      clearAllCartItems('ensemble');
      this.setState({ success: true, redirectUrl: '/assignment' });
    } else if (PublisherReducer.is_auth) {
      clearAllCartItems('publisher');
      this.setState({ success: true, redirectUrl: '/assignment' });
    } else {
      clearAllCartItems('user');
      this.setState({ success: true, redirectUrl: '/book' });
    }
  };

  onCheckoutFailed = response => {
    this.setState({
      loadingOnpayCC: false,
      isLoadingCheckout: false
    });
    const { words } = this.props.ActiveLanguageReducer;
    this.toggleModal(words.cart_msg_checkout_failed);
  };

  componentDidMount() {
    this.renderData();
  }

  renderData = () => {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);

    this.ReadCartDetails();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  showPaymentMethod = () => {
    this.setState({
      paymentsScreen: true
    });
    this.props.hideCheckoutScreen();
  };

  showCheckoutScreen = () => {
    this.setState({
      paymentsScreen: false
    });
    this.props.showCheckoutScreen();
  };

  componentWillUnmount() {
    this.props.showCheckoutScreen();
  }

  // todo onBuy is not a function
  render() {
    const {
      isLoadingCheckout,
      width,
      paymentsScreen,
      infoMsg,
      showModal
    } = this.state;
    const { history, cart, ActiveLanguageReducer } = this.props;
    const { products, daily, lifeTime, symbol, showCheckoutScreen } = cart;
    const { words } = ActiveLanguageReducer;
    const productsExists = products && products.length > 0;

    return this.state.success && !this.state.showModal ? (
      <Redirect to={this.state.redirectUrl} />
    ) : (
      <div className="animated fadeIn">
        <InfoModal
          headline="Checkout"
          info={infoMsg}
          toggleModal={this.toggleModal}
          isActive={showModal}
        />
        <InfoModal
          small
          headline={words['popup_order_login_big']}
          info={words['popup_order_login_small']}
          toggleModal={this.toggleAuthModal}
          isActive={this.state.showAuthModal}
        />
        <section
          className={classnames('cart-page hide', {
            show: showCheckoutScreen === true
          })}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 cart-big-title">
                <h3>
                  {productsExists ? words.cart_title : words.cart_empty_title}
                </h3>
              </div>
            </div>
            {productsExists ? (
              <DataTable
                words={words}
                lifeTime={lifeTime}
                symbol={symbol}
                daily={daily}
                history={history}
                onCheckout={this.onCheckout}
                isLoadingCheckout={isLoadingCheckout}
                rawData={products}
                onBuy={this.onBuy}
                removeItem={this.removeItem}
                width={width}
              />
            ) : (
              <EmptyRow words={words} history={history} />
            )}
          </div>
        </section>
        {paymentsScreen && (
          <Payment
            showCheckoutScreen={this.showCheckoutScreen}
            detailOrder={this.getActiveCart}
            onCheckoutSuccess={this.onCheckoutSuccess}
            onCheckoutFailed={this.onCheckoutFailed}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    InstitutionReducer: state.InstitutionReducer,
    EnsembleReducer: state.EnsembleReducer,
    PublisherReducer: state.PublisherReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    cart: state.cart
  };
};

const mapDispatchToProps = {
  getCartProducts,
  removeCartItem,
  showCheckoutScreen,
  hideCheckoutScreen,
  clearAllCartItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);

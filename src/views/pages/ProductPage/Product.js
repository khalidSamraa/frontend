import React from 'react';
import moment from 'moment';

import toUTC from '../../../utils/toUTC.js';
import Preview from '../product/preview';
import ProductInfo from './components/Info';

import { InfoModal } from '../../component/Modal';

import SimilarProducts from './components/SimilarProducts';
import Image from './components/Image';

class Product extends React.Component {
  state = {
    activeTab: 1,
    isLoading: true,
    sid: this.props.match.params.sid,
    rowData: {},
    rowDataSimilar: [],
    count: 0,
    priceType: 'dr',
    queue: false,
    showConfirmationModal: false
  };

  toggleConfirmationModal = infoMsg => {
    const { showConfirmationModal } = this.state;
    if (typeof infoMsg !== 'object')
      this.setState({ showConfirmationModal: !showConfirmationModal, infoMsg });
    else this.setState({ showConfirmationModal: !showConfirmationModal });
  };

  setStateAsync = state => {
    return new Promise(resolve => {
      setTimeout(() => this.setState(state), 100);
    });
  };

  ReadDetailAsync = async () => {
    try {
      await this.setStateAsync({ queue: true });
    } catch (err) {}
  };

  // This function for queue image load
  imgLoadQueue = src => {
    if (this.state.queue) {
      return src;
    }
  };

  convertToUTC = date => {
    let tmpDate = date;
    return toUTC(tmpDate._d);
  };

  changePrice = e => {
    this.setState({
      priceType: e.target.value
    });
  };

  onAddSuccess = () => {
    const { words } = this.props.ActiveLanguageReducer;
    this.toggleConfirmationModal(words.popup_order_cart_small);
  };

  onAddFailed = () => {
    const { words } = this.props.ActiveLanguageReducer;
    this.toggleConfirmationModal(words.product_msg_already_in_cart);
  };

  onBuy = () => {
    const {
      state: { priceType },
      props: {
        addToCart,
        product,
        SessionReducer,
        EnsembleReducer,
        PublisherReducer,
        cart
      }
    } = this;
    // console.log({ product });
    let type = '',
      activeCart = [],
      isLifeTime = false,
      priceChecked = false;

    if (PublisherReducer.is_auth) {
      activeCart = cart.publisherCart;
      type = 'publisher';
    } else if (EnsembleReducer.is_auth) {
      activeCart = cart.ensembleCart;
      type = 'ensemble';
    } else if (SessionReducer.is_auth) {
      activeCart = cart.userCart;
      type = 'user';
    }

    if (priceType === 'dr') isLifeTime = false;
    else if (priceType === 'otp') isLifeTime = true;

    addToCart(
      type,
      {
        sid: product.sid,
        start: this.convertToUTC(moment().subtract(2, 'minute')),
        isLifeTime
      },
      activeCart,
      {
        onSuccess: this.onAddSuccess,
        onFailed: this.onAddFailed
      }
    );

    // const { priceType } = this.state;
    // const { product } = this.props;
    // const {
    //   ActiveLanguageReducer,
    //   EnsembleReducer,
    //   InstitutionReducer
    // } = this.props;
    // const { words } = ActiveLanguageReducer;
    // let tmp_is_lifetime = false;
    // if (
    //   product &&
    //   product.prices &&
    //   Object.keys(product.prices.dr).length > 0 &&
    //   Object.keys(product.prices.otp).length > 0
    // ) {
    //   if (priceType == 'dr') {
    //     tmp_is_lifetime = false;
    //   } else if (priceType == 'otp' || priceType == '3') {
    //     tmp_is_lifetime = true;
    //   } else if (this.state.priceType == '3') {
    //     tmp_is_lifetime = true;
    //   }
    // } else if (Object.keys(product.prices.dr).length > 0) {
    //   // Daily
    //   tmp_is_lifetime = false;
    // } else if (Object.keys(product.prices.otp).length > 0) {
    //   // One time
    //   tmp_is_lifetime = true;
    // }
    // let old_payload;
    // // should be moved to BE instead of FE in order to enable Group rights!!
    // // let order_permission = null;
    // // if (EnsembleReducer.is_auth) {
    // //   order_permission = EnsembleReducer.order_permission;
    // // } else if (InstitutionReducer.is_auth) {
    // //   order_permission = InstitutionReducer.order_permission;
    // // } else {
    // //   order_permission = true;
    // // }
    // // if (CheckPermission.canOrder(order_permission)) {
    // //   return;
    // // }
    // if (InstitutionReducer.is_auth) {
    //   // should we use localStorage ??
    //   old_payload = JSON.parse(localStorage.getItem('items_package')) || [];
    //   old_payload.unshift(product.sid);
    //   let uniqueArray = old_payload.filter(function(item, pos) {
    //     return old_payload.indexOf(item) == pos;
    //   });
    //   if (old_payload.length > uniqueArray.length) {
    //     this.toggleConfirmationModal(words.product_msg_already_in_cart);
    //   } else {
    //     this.toggleConfirmationModal(words.popup_order_cart_small);
    //   }
    //   this.props.updateCartCount(uniqueArray.length, true);
    //   localStorage.setItem('items_package', JSON.stringify(uniqueArray));
    // } else {
    //   let payload = {
    //     sid: product.sid,
    //     start: this.convertToUTC(moment().subtract(2, 'minute')),
    //     is_lifetime: tmp_is_lifetime
    //   };
    //   old_payload = JSON.parse(localStorage.getItem('items')) || [];
    //   old_payload.unshift(payload);
    //   this.toggleConfirmationModal(words.popup_order_cart_small);
    //   this.props.updateCartCount(old_payload.length, true);
    //   localStorage.setItem('items', JSON.stringify(old_payload));
    // }
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  load = (sid, id_curr) => {
    this.props.changeActiveProduct(sid);
  };

  onReadDetail = (sid, id_curr) => {
    this.props.getProduct({ q: sid, cur: id_curr }, this.getToken());
  };

  getToken = () => {
    const {
      TokenReducer,
      InstitutionReducer,
      PublisherReducer,
      EnsembleReducer
    } = this.props;

    let activeToken = TokenReducer.token;

    if (EnsembleReducer.is_auth) activeToken = TokenReducer.tokenEnsemble;
    else if (InstitutionReducer.is_auth)
      activeToken = TokenReducer.tokenInstitution;
    else if (PublisherReducer.is_auth)
      activeToken = TokenReducer.tokenPublisher;

    return activeToken;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ActiveCurrencyReducer.changed) {
      this.onReadDetail(this.state.sid, nextProps.ActiveCurrencyReducer.code);
    }
  }

  componentDidMount() {
    this.onReadDetail(this.state.sid, this.props.ActiveCurrencyReducer.code);
    window.scrollTo(0, 0);

    //// should be refactored when migrating the cart to redux
    let oldItems;

    // change price type to mode package if institution auth true
    if (this.props.InstitutionReducer.is_auth) {
      this.setState({
        priceType: 3 // 3 = mode package
      });

      // Should we read from localStorage? why not from redux ????

      // Read data cart from localstorage
      oldItems = JSON.parse(localStorage.getItem('items_package')) || [];
    } else {
      // Read data cart from localstorage
      oldItems = JSON.parse(localStorage.getItem('items')) || [];
    }
    this.props.updateCartCount(oldItems.length);
  }

  renderMultipleImage = rowData => {
    let tmpImg = [];
    if (typeof rowData !== 'undefined' && rowData.length > 0) {
      for (let i = 0; i < rowData.length; i++) {
        tmpImg.push(
          <img
            className="b-img"
            key={i}
            src={rowData.images[i]}
            alt="book preview"
          />
        );
      }
    }
    return tmpImg;
  };

  disabledCart = () => {
    const { is_auth } = this.props.PublisherReducer;
    const { product } = this.props;

    if (is_auth) {
      return true;
    }
    if (product && product.prices) return false;
    return true;
  };

  checkPrice = () => {
    const { product } = this.props;
    if (product && product.prices) {
      const { dr, otp } = product.prices;
      if (Object.keys(dr).length || Object.keys(otp).length) return true;
    }
    return false;
  };

  render() {
    const { infoMsg, showConfirmationModal, priceType } = this.state;
    const {
      ActiveLanguageReducer: { words },
      previewMode,
      togglePreviewMode,
      InstitutionReducer,
      isLoading,
      product,
      similarProducts
    } = this.props;

    console.log({ priceType });

    const havePrice = this.checkPrice();

    const cartIsDisabled = this.disabledCart();

    return (
      <React.Fragment>
        <InfoModal
          small
          headline={words.popup_order_cart_big}
          info={infoMsg}
          toggleModal={this.toggleConfirmationModal}
          isActive={showConfirmationModal}
        />
        <div className="animated fadeIn">
          {typeof product !== 'undefined' && (
            <Preview
              togglePreviewMode={togglePreviewMode}
              previewMode={previewMode}
              data={product.preview}
              nop={product.nop - 1}
              words={words}
              token={this.getToken()}
            />
          )}
          {product && Object.keys(product).length > 0 && (
            <section className="product-content animated fadeIn">
              <div className="container">
                <div className="row">
                  <Image
                    icon={product.icon}
                    isLoading={isLoading}
                    togglePreviewMode={togglePreviewMode}
                  />
                  <ProductInfo
                    institutionAuth={InstitutionReducer.is_auth}
                    data={product}
                    words={words}
                    cartIsDisabled={cartIsDisabled}
                    changePrice={this.changePrice}
                    onBuy={this.onBuy}
                    havePrice={havePrice}
                  />
                </div>
                <SimilarProducts
                  words={words}
                  rows={similarProducts}
                  history={this.props.history}
                  loadProduct={this.load}
                  imgLoadQueue={this.imgLoadQueue}
                />
              </div>
            </section>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Product;

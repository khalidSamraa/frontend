import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RemoveUserSession } from '../../redux/account/session/presenter.js';
import {
  RemoveInstitutionSession,
  StopInstitutionSession
} from '../../redux/account/institution/presenter.js';
import {
  RemovePublisherSession,
  StopPublisherSession
} from '../../redux/account/publisher/presenter.js';
import {
  RemoveEnsembleSession,
  StopEnsembleSession
} from '../../redux/account/ensemble/presenter.js';
import {
  RemoveToken,
  RemoveTokenInstitution
} from '../../redux/account/token/presenter.js';
import Request from '../../utils/Request.js';

import { InfoModal } from '../component/Modal';

const CART = 'items';
const CART_ACTION = 'items_package';

class ClearAllSession extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.onCheck = this.onCheck.bind(this);
    this.onCheckSuccess = this.onCheckSuccess.bind(this);
    this.onCheckoutFailed = this.onCheckoutFailed.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(infoMsg) {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  removeLS() {
    localStorage.removeItem(CART);
    localStorage.removeItem(CART_ACTION);
  }

  onCheck() {
    let payload = {
      token: this.props.TokenReducer.token
    };

    Request(
      'post',
      'check-token',
      {},
      payload,
      [],
      this.onCheckSuccess,
      this.onCheckoutFailed
    );
  }

  onCheckSuccess(response) {
    if (response !== undefined) {
      if (response.hasOwnProperty('data')) {
        if (!response.data.is_valid) {
          this.toggleModal('Your token has expired, please login again.');
          this.props.RunRedux(RemoveUserSession());
          this.props.RunRedux(RemoveInstitutionSession());
          this.props.RunRedux(RemoveEnsembleSession());
          this.props.RunRedux(RemovePublisherSession());
          this.props.RunRedux(RemoveToken());
          this.removeLS();
          this.props.history.push('/');
        }
      }
    }
  }

  onCheckoutFailed(error) {
    let response = error.response;
    if (response !== undefined) {
      if (response.hasOwnProperty('data')) {
        if (!response.data.is_valid) {
          this.toggleModal('Your token has expired, please login again.');
          this.props.RunRedux(RemoveUserSession());
          this.props.RunRedux(RemoveInstitutionSession());
          this.props.RunRedux(RemoveEnsembleSession());
          this.props.RunRedux(RemovePublisherSession());
          this.props.RunRedux(RemoveToken());
          this.removeLS();
          this.props.history.push('/');
        }
      }
    }
  }

  componentDidMount() {
    const { TokenReducer } = this.props;
    if (TokenReducer.token !== null) {
      this.onCheck();
    }
  }

  render() {
    const { showModal, infoMsg } = this.state;

    return showModal ? (
      <InfoModal
        headline="Session Expiration"
        info={infoMsg}
        toggleModal={this.toggleModal}
      />
    ) : null;
  }
}
const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    InstitutionReducer: state.InstitutionReducer,
    PublisherReducer: state.PublisherReducer,
    EnsembleReducer: state.EnsembleReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    RunRedux: data => {
      dispatch(data);
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClearAllSession)
);

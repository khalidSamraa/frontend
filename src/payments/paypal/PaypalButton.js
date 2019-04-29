import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

import { InfoModal } from '../../views/component/Modal';

export default class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commit: true,
      showModal: false
    };

    this.onAuthorize = this.onAuthorize.bind(this);
    this.payment = this.payment.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(infoMsg) {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  onAuthorize(data, actions) {
    var EXECUTE_URL = '/demo/checkout/api/paypal/payment/execute/';

    // Set up the data you need to pass to your server
    var data = {
      payment_identifier: data.paymentID,
      payer_id: data.payerID
    };

    // Make a call to your server to execute the payment
    return paypal.request.post(EXECUTE_URL, data).then(function(res) {
      this.toggleModal('Payment Complete!');
    });
  }

  payment() {
    var CREATE_URL = '/demo/checkout/api/paypal/payment/create/';

    // Make a call to your server to set up the payment
    return paypal.request.post(CREATE_URL).then(function(res) {
      return res.paymentID;
    });
  }

  render() {
    const { commit, showModal, infoMsg } = this.state;

    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    return (
      <React.Fragment>
        <InfoModal
          headline="Paypal Checkout"
          info={infoMsg}
          toggleModal={this.toggleModal}
          isActive={showModal}
        />
        <PayPalButton
          payment={this.payment}
          onAuthorize={this.onAuthorize}
          commit={commit}
        />
      </React.Fragment>
    );
  }
}

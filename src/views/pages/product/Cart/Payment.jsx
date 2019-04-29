import React, { Fragment, memo } from 'react';
import PaymentOptions from './../../payments/PaymentOptions';
import PaypalCheckout from './../component/PaypalCheckout.js';
import CreditCardPayment from './../../payments/PaymentOptions/CreditCardPayment';

const toSnakeCase = products =>
  products.map(product => ({
    ...product,
    is_lifetime: product.isLifeTime,
    isLifeTime: undefined
  }));

const Payment = memo(function Payment(props) {
  const {
    showCheckoutScreen,
    detailOrder,
    onCheckoutSuccess,
    onCheckoutFailed
  } = props;

  const creditCardPaymentCallbacks = {
    onSuccess: onCheckoutSuccess,
    onFailure: onCheckoutFailed
  };
  const payPalPaymentCallbacks = {
    onSuccess: onCheckoutSuccess
  };
  const accountCreditPaymentCallbacks = {
    onSuccess: onCheckoutSuccess,
    onFailure: onCheckoutFailed
  };

  return (
    <Fragment>
      <section className={'cart-page show'}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 cart-big-title">
              <h3>
                <a
                  tabIndex="0"
                  onClick={e => showCheckoutScreen()}
                  role="button"
                  className="back-shopping-button"
                >
                  <i className="material-icons">arrow_back</i>
                </a>
                &nbsp; Please select payment method
              </h3>
            </div>
          </div>

          <div className="row bb-with-padding">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
              <PaymentOptions
                detailOrder={toSnakeCase(detailOrder())}
                creditCardPaymentButton={
                  <CreditCardPayment
                    detailOrder={detailOrder}
                    {...creditCardPaymentCallbacks}
                  />
                }
                payPalButton={
                  <PaypalCheckout
                    label={'paypal'}
                    data={detailOrder}
                    success={payPalPaymentCallbacks.onSuccess}
                  />
                }
                accountCreditPaymentCallbacks={accountCreditPaymentCallbacks}
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
});

export default Payment;

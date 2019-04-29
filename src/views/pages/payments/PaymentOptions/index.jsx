import React, { memo } from 'react';
import AccountCreditPayment from './AccountCreditPayment';

const PaymentOptions = memo(function PaymentOptions(props) {
  const {
    detailOrder,
    creditCardPaymentButton,
    payPalButton,
    accountCreditPaymentCallbacks
  } = props;

  return (
    <ul className="list-payments-method">
      {creditCardPaymentButton}
      {payPalButton}
      {accountCreditPaymentCallbacks && (
        <AccountCreditPayment
          detailOrder={detailOrder}
          {...accountCreditPaymentCallbacks}
        />
      )}
    </ul>
  );
});

export default PaymentOptions;

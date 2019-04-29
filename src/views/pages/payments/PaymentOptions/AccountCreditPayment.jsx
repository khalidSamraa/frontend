import React, { memo } from 'react';
import auth from './../../../../redux/account/authToken.js';
import SimpleRequest from './../../../../utils/Request.js';

const onACPay = (detailOrder, onSuccess, onFailure) => {
  const payload = {
    scores: JSON.stringify(detailOrder),
    payment_method: 2
  };

  executePayment(payload, onSuccess, onFailure);
};

const executePayment = (payload, onSuccess, onFailure) => {
  SimpleRequest(
    'post',
    'item-purchase',
    { Authorization: 'Token ' + auth.getActiveToken() },
    payload,
    [],
    onSuccess,
    onFailure
  );
};

const AccountCreditPayment = memo(function AccountCreditPayment(props) {
  const { detailOrder, onSuccess, onFailure } = props;

  return (
    <li
      className="btn-payment-list"
      onClick={e => onACPay(detailOrder, onSuccess, onFailure)}
    >
      Account Credit
    </li>
  );
});

export default AccountCreditPayment;

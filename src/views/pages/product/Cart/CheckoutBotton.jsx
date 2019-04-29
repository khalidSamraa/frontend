import React from 'react';
import classnames from 'classnames';

const CheckoutButton = props => {
  const { words, isLoadingCheckout, onCheckout } = props;

  let label = isLoadingCheckout
    ? words.cart_process + '. . .'
    : words.cart_checkout;

  return (
    <a
      onClick={() => !isLoadingCheckout && onCheckout()}
      tabIndex="0"
      role="button"
      className={classnames('checkout-button', {
        'checkout-disable': isLoadingCheckout
      })}
    >
      {label}
    </a>
  );
};

export default CheckoutButton;

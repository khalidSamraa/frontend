import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import CartRows from './row/CartRows';
import CheckoutButton from './CheckoutBotton.jsx';

const DataTable = props => {
  const {
    words,
    lifeTime,
    symbol,
    daily,
    history,
    onCheckout,
    isLoadingCheckout,
    rawData,
    onBuy,
    removeItem,
    width
  } = props;

  return (
    <Fragment>
      <div className="row cart-item-title">
        <div className="left-side col-md-7 col-sm-5 col-xs-12">
          <p>{words.cart_item}</p>
        </div>
        <div className="right-side col-md-2 col-sm-3 col-xs-12">
          <p>{words.cart_unlimited_use}</p>
        </div>
        <div className="right-side col-md-3 col-sm-3 col-xs-12">
          <p>{words.cart_daily_rate}</p>
        </div>
      </div>
      <CartRows
        words={words}
        history={history}
        rows={rawData}
        onBuy={onBuy}
        removeItem={removeItem}
        width={width}
      />
      <div className="row cart-item-subtotal">
        <div className="cart-label-total col-md-offset-5 col-md-2 col-sm-5 col-xs-12">
          <p>{words.cart_total}:</p>
        </div>
        <div className="label-onetime right-side col-md-2 col-sm-3 col-xs-12">
          <p className="price">
            {width <= 768 && <span>{words.cart_unlimited_use}</span>}
            <NumberFormat
              value={lifeTime}
              displayType={'text'}
              thousandSeparator={true}
              fixedDecimalScale={true}
              decimalScale={2}
              suffix={' ' + symbol}
            />
          </p>
        </div>
        <div className="right-side col-md-3 col-sm-3 col-xs-12 pl-38">
          <p className="price">
            {width <= 768 && <span>{words.cart_daily_rate}</span>}
            <NumberFormat
              value={daily}
              displayType={'text'}
              thousandSeparator={true}
              fixedDecimalScale={true}
              decimalScale={2}
              suffix={' ' + symbol}
            />
          </p>
        </div>
      </div>

      <div className="row cart-go-checkout">
        <div
          className="col-md-6 col-sm-6 col-xs-12"
          onClick={() => history.push('/catalog')}
        >
          <a tabIndex="0" role="button" className="back-shopping-button">
            <i className="material-icons">arrow_back</i>
            {words.cart_continue_shopping}
          </a>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 ">
          <CheckoutButton
            onCheckout={onCheckout}
            words={words}
            isLoadingCheckout={isLoadingCheckout}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DataTable;

import React, { Component } from 'react';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';

class Price extends Component {
  componentDidMount() {
    const { data, changePrice } = this.props;
    if (data.prices && data.prices.otp.price) {
      changePrice({ target: { value: 'otp' } });
    }
  }

  render() {
    const { institution, data, words, changePrice } = this.props;
    let tmpPrice = [];

    try {
      if (institution) {
        tmpPrice.push(<div className="single-price" />);

        return tmpPrice;
      } else {
        if (
          Object.keys(data.prices.dr).length > 0 &&
          Object.keys(data.prices.otp).length > 0
        ) {
          tmpPrice.push(
            <div key="box">
              <div key={'dr'} className="multi-price">
                <label className="control control--radio price-label">
                  <NumberFormat
                    value={
                      data.prices.dr.reduced_price
                        ? data.prices.dr.reduced_price
                        : data.prices.dr.price
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    decimalScale={2}
                    className="space-right-4"
                  />
                  <span className="postfix">
                    {data.prices.dr.currency}&nbsp;/&nbsp;
                    {words.product_daily_rate}
                  </span>
                  <input
                    type="radio"
                    onClick={changePrice}
                    name="radio"
                    defaultChecked
                    value={'dr'}
                  />
                  <div className="control__indicator" />
                </label>
                {data.prices.dr && data.prices.dr.so && (
                  <div className={classnames('info-discount')}>
                    <strong>{data.prices.dr.so}</strong>%{' '}
                    {words.product_discount}
                  </div>
                )}
              </div>
              <div key={'otp'} className="multi-price">
                <label className="control control--radio price-label">
                  <NumberFormat
                    value={
                      data.prices.otp.reduced_price
                        ? data.prices.otp.reduced_price
                        : data.prices.otp.price
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    decimalScale={2}
                    className="space-right-4"
                  />
                  <span className="postfix">
                    {data.prices.otp.currency}&nbsp;/&nbsp;
                    {words.product_unlimited_use}
                  </span>
                  <input
                    type="radio"
                    onClick={changePrice}
                    name="radio"
                    value={'otp'}
                  />
                  <div className="control__indicator" />
                </label>
                {data.prices.dr && data.prices.dr.so && (
                  <div className={classnames('info-discount')}>
                    <strong>{data.prices.dr.so}</strong>%{' '}
                    {words.product_discount}
                  </div>
                )}
              </div>
            </div>
          );
        } else if (Object.keys(data.prices.dr).length > 0) {
          tmpPrice.push(
            <div className="single-price">
              <label className="align-center price-label">
                <NumberFormat
                  value={
                    data.prices.dr.reduced_price
                      ? data.prices.dr.reduced_price
                      : data.prices.dr.price
                  }
                  displayType={'text'}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  className="space-right-8"
                />
                <span className="single-postfix">
                  {data.prices.dr.currency}&nbsp;/&nbsp;
                  {words.product_daily_rate}
                </span>
              </label>
              {data.prices.dr && data.prices.dr.so && (
                <div className={classnames('info-discount')}>
                  <strong>{data.prices.dr.so}</strong>% {words.product_discount}
                </div>
              )}
            </div>
          );
        } else if (Object.keys(data.prices.otp).length > 0) {
          tmpPrice.push(
            <div className="single-price">
              <label className="align-center price-label">
                <NumberFormat
                  value={
                    data.prices.otp.reduced_price
                      ? data.prices.otp.reduced_price
                      : data.prices.otp.price
                  }
                  displayType={'text'}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  className="space-right-8"
                />
                <span className="single-postfix">
                  {data.prices.otp.currency}&nbsp;/&nbsp;
                  {words.product_unlimited_use}
                </span>
              </label>
              {data.prices.dr && data.prices.dr.so && (
                <div className={classnames('info-discount')}>
                  <strong>{data.prices.dr.so}</strong>% {words.product_discount}
                </div>
              )}
            </div>
          );
        } else {
          tmpPrice = (
            <div className="single-price">{words.product_price_not_found}</div>
          );
        }
        return tmpPrice;
      }
    } catch (error) {
      return null;
    }
  }
}

export default Price;

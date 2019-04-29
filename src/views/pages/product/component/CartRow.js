import React from 'react';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';

export default class CartRow extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPriceColumn() {
    const { rowData, words, width } = this.props;

    if (width <= 768) {
      // Price column mobile

      if (rowData.price.is_lifetime) {
        return (
          <div
            key={1}
            className="cart-row-price-mobile right-side col-md-2 col-sm-3 col-xs-12"
          >
            <p className="price">
              <span>{words.cart_unlimited_use}</span>
              <NumberFormat
                value={rowData.price.price}
                displayType={'text'}
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                suffix={' ' + rowData.price.symbol}
              />
            </p>
          </div>
        );
      } else {
        return (
          <div
            key={2}
            className="cart-row-price-mobile right-side col-md-2 col-sm-3 col-xs-12"
          >
            <p className="price">
              <span>{words.product_daily_rate}</span>
              <NumberFormat
                value={rowData.price.price}
                displayType={'text'}
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                suffix={' ' + rowData.price.symbol}
              />
            </p>
          </div>
        );
      }
    } else {
      // Price column desktop
      let price_desktop = [
        <div key={1} className="right-side col-md-2 col-sm-3 col-xs-6">
          <p className="price">
            {rowData.price.is_lifetime && (
              <NumberFormat
                value={rowData.price.price}
                displayType={'text'}
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                suffix={' ' + rowData.price.symbol}
              />
            )}
          </p>
        </div>,
        <div key={2} className="right-side col-md-2 col-sm-3 col-xs-6 pl-38">
          <p className="price">
            {!rowData.price.is_lifetime && (
              <NumberFormat
                value={rowData.price.price}
                displayType={'text'}
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                suffix={' ' + rowData.price.symbol}
              />
            )}
          </p>
        </div>
      ];

      return price_desktop;
    }
  }

  goto(sid) {
    this.props.history.push('/product/' + sid);
  }

  render() {
    const { rowData, index, words, width } = this.props;

    let info_rent = '';

    if (rowData.price.is_lifetime) {
      info_rent = words.cart_unlimited_use;
    } else {
      info_rent = words.cart_daily_rate;
    }

    return (
      <div>
        <div className="row cart-item">
          <div
            className={classnames('col-md-5 col-sm-5 col-xs-12', {
              'cart-row-item-mobile': width <= 1023
            })}
          >
            <p>
              <span>
                <a
                  tabIndex="0"
                  role="button"
                  onClick={() => this.goto(rowData.sid)}
                >
                  {rowData.title}
                </a>
                , {rowData.composer}
              </span>

              <span>
                {rowData.edition}, {rowData.instrument}
              </span>
              {/*<NumberFormat 
                value             ={rowData.price.price}
                displayType       ={"text"}
                thousandSeparator ={true}
                fixedDecimalScale ={true}
                decimalScale      ={2}
                suffix            ={" " + rowData.price.symbol + " / " + info_rent}
              />*/}
            </p>
          </div>
          <div
            className={classnames('center-side col-md-2 col-sm-5 col-xs-12', {
              'cart-row-item-mobile': width <= 1023
            })}
          >
            <img
              className="pic"
              src={rowData.icon}
              style={{ border: '1px solid #aeaeae' }}
              alt="book"
            />
          </div>

          {this.renderPriceColumn()}

          <div
            className={classnames(
              'col-md-1 col-sm-1 col-xs-1 icon-delete-center',
              { 'cart-icon-delete-mobile': width <= 1023 }
            )}
          >
            <button
              onClick={() => this.props.removeItem(rowData.sid)}
              className="btn-delete-item"
            >
              {/*<i className="material-icons icon-delete-lg">&#xE92B;</i>*/}
              <span
                style={{ backgroundImage: 'url(media/images/icon/delete.svg)' }}
                className="delete-icon"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import ProductInfoFragment from './ProductInfoFragment';
import Price from './Price';

class Info extends Component {
  render() {
    const {
      words,
      cartIsDisabled,
      data,
      institutionAuth,
      changePrice,
      onBuy,
      havePrice
    } = this.props;

    console.log({ havePrice, data });

    const bookInfo = getDataArr(words);

    return (
      <div className="col-md-8 col-xs-12">
        <div className="top-row">
          <div className="title-box">
            <div className="with-icon">
              {data && data.title && <h1>{data.title}</h1>}
            </div>
          </div>
          <ul className="autor-or-compositor">
            <ProductInfoFragment rowData={data} {...bookInfo[0]} />
          </ul>
          <ul className="other-info">
            {bookInfo.slice(1, bookInfo.length - 3).map(fragment => (
              <ProductInfoFragment
                key={fragment.name}
                rowData={data}
                {...fragment}
              />
            ))}
            <li>
              <label>{words.product_instrument}: </label>
              <span>{data.instrument}</span>
            </li>
            <li>
              <label>{words.product_duration}: </label>
              <span>{moment.utc(data.duration * 1000).format('HH:mm:ss')}</span>
            </li>
            <ProductInfoFragment
              rowData={data}
              {...bookInfo[bookInfo.length - 3]}
            />
            <ProductInfoFragment
              rowData={data}
              {...bookInfo[bookInfo.length - 2]}
            />
          </ul>
          <div className="orchestration">
            <ProductInfoFragment
              rowData={data}
              {...bookInfo[bookInfo.length - 1]}
            />
          </div>
          <div className="product-main-info-bottom">
            <div className="price-box bg-white">
              {data && data.prices && (
                <h3 className="price">
                  <Price
                    institution={institutionAuth}
                    data={data}
                    words={words}
                    changePrice={changePrice}
                  />
                </h3>
              )}
            </div>
            <div
              className={classnames('add-cart-box', {
                'cursor-not-allowed': !havePrice
              })}
            >
              <a
                tabIndex="0"
                role="button"
                onClick={onBuy}
                disabled={!havePrice}
                className={classnames('add-to-cart', {
                  'link-not-active': !havePrice
                })}
              >
                <span className="cart-icon" /> {words.general_add}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;

const getDataArr = words => [
  {
    name: words.product_composer,
    params: 'composer',
    subParams: ['name']
  },
  {
    name: words.product_category,
    params: 'category'
  },
  {
    name: words.product_librettist,
    params: 'librettist'
  },
  {
    name: words.product_edition,
    params: 'edition'
  },
  {
    name: words.product_arrangement,
    params: 'arrangement'
  },
  {
    name: words.product_textversion,
    params: 'textversion'
  },
  {
    name: words.product_translation,
    params: 'translation'
  },
  {
    name: words.product_page,
    params: 'nop'
  },
  {
    name: words.product_publisher,
    params: 'publisher'
  },
  {
    name: words.product_orchestration,
    params: 'orchestration'
  }
];

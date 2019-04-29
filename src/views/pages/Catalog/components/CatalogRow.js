import React from 'react';
import moment from 'moment';

class CatalogRow extends React.Component {
  goToProduct = () => {
    const {
      gotoProduct,
      rowData: { sid, ssid }
    } = this.props;
    gotoProduct(sid, ssid);
  };

  getSubParams(params, subParams, separator = '') {
    if (subParams.length === 0) {
      return params;
    }
    let res = '';
    for (let i = 0; i < subParams.length; i++) {
      res += params[subParams[i]];
      if (i < subParams.length - 1) {
        res += separator;
      }
    }
    return res;
  }

  renderBookInfo(propertyName, params, subParams = [], separator = '') {
    const { rowData } = this.props;
    if (rowData.hasOwnProperty(params)) {
      if (rowData[params]) {
        return (
          <li>
            <span>{propertyName}: </span>
            {this.getSubParams(rowData[params], subParams, separator)}
          </li>
        );
      }
    }
    return null;
  }

  renderDurationInfo(propertyName) {
    const { rowData } = this.props;
    if (rowData.hasOwnProperty('duration')) {
      if (rowData['duration']) {
        return (
          <li>
            <span>{propertyName}: </span>
            {moment.utc(rowData['duration'] * 1000).format('HH:mm:ss')}
          </li>
        );
      }
    }
    return null;
  }

  renderPrices(prices) {
    if (prices.length === 0) {
      return null;
    } else {
      return prices[0].price + ' ' + prices[0].symbol;
    }
  }

  render() {
    const { rowData } = this.props;
    const { words } = this.props;

    return (
      <div className="col-lg-2 col-sm-4 col-xs-6">
        <div className="lite-product">
          <div className="top-row" onClick={this.goToProduct}>
            <img
              src={`${window.location.origin}/media/images/product.jpg`}
              width="170"
              height="150"
            />
          </div>
          <div className="middle-row" onClick={this.goToProduct}>
            <a tabIndex="0" role="button" className="link-to-product">
              <h2 className="product-title">{rowData.title}</h2>
            </a>
            <ul>
              {this.renderBookInfo(words.catalog_composer, 'composer', [
                'name'
              ])}
              {this.renderBookInfo(words.catalog_category, 'category')}
              {this.renderBookInfo(words.catalog_librettist, 'librettist')}
              {this.renderBookInfo(words.catalog_edition, 'edition')}
              {this.renderBookInfo(words.catalog_arrangment, 'arrangement')}
              {this.renderBookInfo(words.catalog_instrument, 'instrument')}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogRow;

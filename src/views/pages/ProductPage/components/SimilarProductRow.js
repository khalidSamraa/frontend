import React from 'react';
import { connect } from 'react-redux';

class SimilarProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.gotoProduct = this.gotoProduct.bind(this);
  }

  gotoProduct() {
    const { rowData, loadProduct, history, ActiveCurrencyReducer } = this.props;
    history.push({
      pathname: rowData.sid,
      state: { SSID: rowData.ssid }
    });
    loadProduct(rowData.sid, ActiveCurrencyReducer.code);
  }

  render() {
    const { words, rowData } = this.props;

    return (
      <div className="lite-product" role="button" onClick={this.gotoProduct}>
        <div className="top-row">
          <img src="../media/images/product.jpg" width="170" height="150" />
        </div>
        <div className="middle-row">
          <a tabIndex="0" role="button" className="link-to-product">
            <h2 className="product-title">{rowData.title}</h2>
          </a>
          <ul>
            <li>
              {words.similarproduct_composer}:{' '}
              <span>{rowData.composer ? rowData.composer.name : '-'}</span>
            </li>
            {rowData.category && (
              <li>
                {words.catalog_category}:{' '}
                <span>{rowData.category ? rowData.category : '-'}</span>
              </li>
            )}
            <li>
              {words.similarproduct_edition}:{' '}
              <span>{rowData.edition ? rowData.edition : '-'}</span>
            </li>
            <li>
              {words.similarproduct_instrument}:{' '}
              <span>{rowData.instrument ? rowData.instrument : '-'}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ActiveCurrencyReducer: state.ActiveCurrencyReducer
});

export default connect(mapStateToProps)(SimilarProductRow);

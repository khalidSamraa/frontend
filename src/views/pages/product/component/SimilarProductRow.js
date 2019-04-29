import React from 'react';

export default class SimilarProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.gotoProduct = this.gotoProduct.bind(this)
  }

  gotoProduct() {
    const {rowData, loadProduct, history, ActiveCurrencyReducer} = this.props
    history.push({
      pathname: rowData.sid,
      state: { SSID: rowData.ssid }
    })
    loadProduct(rowData.sid, ActiveCurrencyReducer.code)
  }

  render() {
    const {words, rowData, imgLoadQueue} = this.props
    
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
              <li>{words.similarproduct_composer}: <span>{rowData.hasOwnProperty("composer") ? rowData.composer.name : "-"}</span></li>
              {rowData.category && <li>{words.catalog_category}: <span>{rowData.hasOwnProperty("category") ? rowData.category : "-"}</span></li>}
              <li>{words.similarproduct_edition}: <span>{rowData.hasOwnProperty("edition") ? rowData.edition : "-"}</span></li>
              <li>{words.similarproduct_instrument}: <span>{rowData.hasOwnProperty("instrument") ? rowData.instrument : "-"}</span></li>
            </ul>
        </div>
      </div>
    );
  }
}

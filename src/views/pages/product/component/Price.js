import React from "react"
import classnames from "classnames"
import NumberFormat from "react-number-format"
import Symbols from "../../../../config/symbols.js"

export default class Price extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSpecialOffer(data_price, type) {
    const {words} = this.props

    if(data_price.hasOwnProperty("so")) {
      if(data_price.so !== null) {
        return (
          <div className={classnames("info-discount")}>
            <strong>{data_price.so}</strong>% {words.product_discount}
          </div>
        )
      }
    }
  }

  renderPrice() {
    const {institution, data, words, changePrice} = this.props
    let tmpPrice = []

    try {

      //Logged as institution
      if(institution) {
        tmpPrice.push(
          <div className="single-price" />
        )

        return tmpPrice

      } else {

      // Logged as user
        if(Object.keys(data.prices.dr).length > 0 && Object.keys(data.prices.otp).length > 0){
          // jika one_time_price dan daily rate tidak null
          tmpPrice.push(
            <div key="box">
              <div key={"dr"} className="multi-price">
                <label className="control control--radio price-label">
                  <NumberFormat
                    value             ={data.prices.dr.reduced_price ? data.prices.dr.reduced_price : data.prices.dr.price}
                    displayType       ={"text"}
                    thousandSeparator ={true}
                    fixedDecimalScale ={true}
                    decimalScale      ={2}
                    className         ="space-right-4"
                  />
                <span className="postfix">{data.prices.dr.currency}&nbsp;/&nbsp;{words.product_daily_rate}</span>
                  <input type="radio" onClick={changePrice} name="radio" defaultChecked value={"dr"}/>
                  <div className="control__indicator"></div>
                </label>
                {this.renderSpecialOffer(data.prices.dr, "double")}
              </div>
              <div key={"otp"} className="multi-price">
                <label className="control control--radio price-label">
                  <NumberFormat
                    value             ={data.prices.otp.reduced_price ? data.prices.otp.reduced_price : data.prices.otp.price}
                    displayType       ={"text"}
                    thousandSeparator ={true}
                    fixedDecimalScale ={true}
                    decimalScale      ={2}
                    className         ="space-right-4"
                  />
                <span className="postfix">{data.prices.otp.currency}&nbsp;/&nbsp;{words.product_unlimited_use}</span>
                  <input type="radio" onClick={changePrice} name="radio" value={"otp"}/>
                  <div className="control__indicator"></div>
                </label>
                {this.renderSpecialOffer(data.prices.otp, "double")}
              </div>
            </div>
          )

        } else if(Object.keys(data.prices.dr).length > 0) {
          // jika hanya ada daily price
          tmpPrice.push(
            <div className="single-price">
              <label className="align-center price-label">
                <NumberFormat
                  value             ={data.prices.dr.reduced_price? data.prices.dr.reduced_price : data.prices.dr.price}
                  displayType       ={"text"}
                  thousandSeparator ={true}
                  fixedDecimalScale ={true}
                  decimalScale      ={2}
                  className         ="space-right-8"
                />
              <span className="single-postfix">{data.prices.dr.currency}&nbsp;/&nbsp;{words.product_daily_rate}</span>
              </label>
              {this.renderSpecialOffer(data.prices.dr, "single")}
            </div>
          )

        } else if(Object.keys(data.prices.otp).length > 0) {
          // jika hanya ada harga one_time_price
          tmpPrice.push(
            <div className="single-price">
              <label className="align-center price-label">
                <NumberFormat
                  value             ={data.prices.otp.reduced_price ? data.prices.otp.reduced_price : data.prices.otp.price}
                  displayType       ={"text"}
                  thousandSeparator ={true}
                  fixedDecimalScale ={true}
                  decimalScale      ={2}
                  className         ="space-right-8"
                />
              <span className="single-postfix">{data.prices.otp.currency}&nbsp;/&nbsp;{words.product_unlimited_use}</span>
              </label>
              {this.renderSpecialOffer(data.prices.otp, "single")}
            </div>
          )

        } else {
          // jika semua harga null
          tmpPrice = <div className="single-price">{words.product_price_not_found}</div>
        }
        return tmpPrice
      }

    }catch(error) {

    }
  }

  render() {
    return (this.renderPrice())
  }
}

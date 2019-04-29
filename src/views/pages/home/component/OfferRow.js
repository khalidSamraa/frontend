import React from "react"
import _ from "lodash"

export default class OfferRow extends React.Component {
  constructor(props) {
    super(props)

    this.goto = this.goto.bind(this)
  }

renderPrice() {
    
    this.props.history
    const {row_data, mode} = this.props
    if(!_.isEmpty(row_data)) {
      if(_.has(row_data, "prices")) {
        if(!_.isEmpty(row_data.prices)) {
          if(mode === "offered") {
                return  row_data.discount.toFixed(1) + " %"
          } else {
            var drPrice = 0;
            var otpPrice = 0;
            var drcurrency="";
            var otpcurrency=""

            if(_.has(row_data.prices, "dr")){
              if(_.has(row_data.prices.dr, "so")){
                drPrice = row_data.prices.dr.reduced_price;
                drcurrency =row_data.prices.dr.currency;
              }
              else{
                 drPrice = row_data.prices.dr.price;
                 drcurrency =row_data.prices.dr.currency;
              }
            }
            if(_.has(row_data.prices, "otp")){
               if(_.has(row_data.prices.otp, "so")){
                otpPrice = row_data.prices.otp.reduced_price;
                otpcurrency =row_data.prices.otp.currency;
               }
              else{
                  otpPrice = row_data.prices.otp.price;
                  otpcurrency =row_data.prices.otp.currency;
              }
            }
            if(otpPrice && drPrice)
              {
                 if(otpPrice > drPrice)
                  {
                return drPrice.toFixed(2) +" "+ drcurrency
                  }
               if(otpPrice < drPrice )
                  {
                return otpPrice.toFixed(2) +" "+ otpcurrency
                 }
              }else if(otpPrice) {
                return otpPrice.toFixed(2) +" "+ otpcurrency 
              }
             else if(drPrice) {
              return drPrice.toFixed(2) +" "+ drcurrency 
            }
          }
        }
      }
    }
  }


  renderTitle() {
    const {row_data} = this.props

    if(!_.isEmpty(row_data)) {
      if(_.has(row_data, "title")) {
            if(row_data.title !== null) {
              return row_data.title
            }   
      }
    }
  }

  renderComposer() {
    const {row_data} = this.props
    
    if(!_.isEmpty(row_data)) {
          if(_.has(row_data, "composer")) {
            if(_.has(row_data.composer, "name")) {
              return row_data.composer.name
            }
          }
    }
  }

  renderInstrument() {
    const {row_data} = this.props

    if(!_.isEmpty(row_data)) {
      if(_.has(row_data, "instrument")) {
        if(!_.isEmpty(row_data.instrument)) {
            return row_data.instrument
        }
      }
    }
  }

  goto(sid) {
    this.props.history.push("/product/" + sid)
  }

  render() {
    const {row_data} = this.props
    
    if(row_data.play === null) return null

    return (
      <div className="row offer-list" onClick={()=>this.goto(row_data.sid)}>
        <div className="col-md-5 col-sm-6 col-xs-6">
          <div className="info-home-item">
            <p>{this.renderTitle()}</p>
            <small>{this.renderComposer()}</small>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-6">
          <div className="info-home-item">
            <small style={{"marginBottom" : "8px"}}>{row_data.edition}</small>
            <small>{this.renderInstrument()}</small>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-6 " align="right">
          <div className="info-home-item">
            <small>
              {this.renderPrice()}
            </small>
          </div>
        </div>
      </div>
    )
  }
}

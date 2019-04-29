import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DailyCalculation from '../../utils/DailyCalculation.js'

const propTypes = {
  startDate: PropTypes.string.isRequired,
  price: PropTypes.object.isRequired,

  className: PropTypes.string,
  designType: PropTypes.number,
}

const defaultProps = {
  className: '',
  designType: 1,
}

class UsageFee extends Component {

  getPriceText() {
    const { price, words } = this.props
    if (!price.is_lifetime) {
      return ", " + price.price + price.currency.symbol + " / " + words.library_day
    } 
    return null
  }

  getPaymentTypeText() {
    const { price, words } = this.props
    if (price.is_lifetime) {
      return words.library_unlimited_use
    } else{
      return words.library_daily_rate
    }
  }

  getTotalPayment() {
    const { price, words } = this.props
    if (!price.is_lifetime) {
      // let total = new DailyCalculation(startDate, price.price)
      // return parseFloat(Math.ceil(total.getPrice() * 100) / 100).toFixed(2) + price.currency.symbol
      return parseFloat(price.price).toFixed(2) + " " + price.currency.symbol + " / " + words.library_day
    }
    return parseFloat(price.price).toFixed(2) + " " + price.currency.symbol
  }

  getPaymentCost() {
    const { price, startDate} = this.props
    
    let momentStartDate = moment(startDate)
    let momentNowDate   = moment().add(1, "days")
    let diffDay         = momentNowDate.diff(momentStartDate, "days")
    let cost            = diffDay * price.price

    if(!price.is_lifetime) {
      return parseFloat(cost).toFixed(2) + " " + price.currency.symbol
    }
    return parseFloat(0).toFixed(2) + " " + price.currency.symbol
  }

  renderSimple(){
    const { className, startDate, words } = this.props
    let momentStartDate = moment(new Date(startDate))
    return (
      <div className={className}>
        <div>
          <span className="book-title">
            {this.getPaymentCost()}
          </span>
        </div>
        <div className="book-composer"> 
          {words.library_ordered}: {momentStartDate.format("MMMM Do YYYY")}
        </div>
        <div className="book-category">
          {words.library_contract}: {this.getTotalPayment()}
        </div>
      </div>
    )
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderSimple()
    }
    return (null)
  }
}

UsageFee.propTypes = propTypes
UsageFee.defaultProps = defaultProps
export default UsageFee
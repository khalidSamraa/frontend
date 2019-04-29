import React from "react"
import ReactDOM from "react-dom"
import paypal from "paypal-checkout"
import server from "../../../../config/server.js"
import url from "../../../../config/urls.js"
// import Request from "../../../../utils/Request.js"
import PaypalSetting from '../../../../config/paypal_setting.js'
import auth from "../../../../redux/account/authToken.js"
// import createRef from 'createref'

export default class PaypalButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commit : true,
      env : PaypalSetting.env,
    }

    this.payment = this.payment.bind(this)
    this.onAuthorize = this.onAuthorize.bind(this)
    this.setRes = this.setRes.bind(this)
    this.success = this.success.bind(this)

    this.style = {
      label: this.props.label,
      tagline: false,
      size:  "responsive", // small | medium | large | responsive
      shape: "rect", // pill | rect
      color: "black", // gold | blue | silver | black
    }
  }

  setRes(res) {
    return res.paypal_payment_id
  }

  payment() {
    let param_data = {
      scores: JSON.stringify(this.props.data)
    }

    let CREATE_URL = server.API + url["get-payer-id"]
    return paypal.request({
      method: "post",
      url: CREATE_URL,
      data: param_data,
      headers: {
        "Authorization": "Token " + auth.getActiveToken()
      }
    }).then(this.setRes)
  }

  success() {
    setTimeout(() => {
      this.props.success()
    }, 1000)
  }

  onAuthorize(data, actions) {
    let data_param = {
      "scores" : JSON.stringify(this.props.data),
      "paypal_payment_id": data.paymentID,
      "payment_method": 0
    }

    let EXECUTE_URL = server.API + url["item-purchase"]
    return paypal.request({
      method: "post",
      url: EXECUTE_URL,
      data: data_param,
      headers: {
        "Authorization": "Token " + auth.getActiveToken()
      }
    })
    .then(this.success)
  }

  render() {
    const {commit, env} = this.state
    const PayPalButton = paypal.Button.driver("react", { React, ReactDOM })

    return (
      <PayPalButton
        env         ={env}
        commit      ={commit}
        style       ={this.style}
        payment     ={this.payment}
        onAuthorize ={this.onAuthorize}
      />
    )
  }
}

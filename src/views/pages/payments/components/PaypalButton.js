import React from "react"
import ReactDOM from "react-dom"
import paypal from "paypal-checkout"
import server from "../../../../config/server.js"
import url from "../../../../config/urls.js"
import PaypalSetting from '../../../../config/paypal_setting.js'

export default class PaypalButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commit : true,
      env : PaypalSetting.env,
    }

    this.payment = this.payment.bind(this)
    this.onAuthorize = this.onAuthorize.bind(this)
    this.tid = ""
    this.setRes = this.setRes.bind(this)

    this.style = {
      label: this.props.label,
      tagline: false,
      size:  "responsive", // small | medium | large | responsive
      shape: "rect", // pill | rect
      color: "black", // gold | blue | silver | black
    }
  }

  setRes(res) {
    this.tid = res.tid
    return res.payment_identifier
  }

  payment() {
    console.log(this.props.doid);
    let CREATE_URL = server.API + url["paypal-create"]
    return paypal.request({
      method: "post",
      url: CREATE_URL,
      data: {"doid" : this.props.doid},
      headers: {
        "Authorization": "Token " + this.props.TokenReducer.token
      }
    }).then(this.setRes)
  }

  onAuthorize(data, actions) {
    let EXECUTE_URL = server.API + url["paypal-execute"] + this.tid + "/"

    // Set up the data you need to pass to your server
    let data_param = {
      payment_identifier: data.paymentID,
      payer_id: data.payerID
    }

    return paypal.request({
      method: "put",
      url: EXECUTE_URL,
      data: data_param,
      headers: {
        "Authorization": "Token " + this.props.TokenReducer.token
      }
    })
      .then(function (res) {
        window.alert("Payment Complete!")
      })
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

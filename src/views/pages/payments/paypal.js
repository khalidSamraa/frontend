import React from "react"
import PaypalButton from "../../../payments/paypal/PaypalButton.js"

export default class PaypalScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <PaypalButton></PaypalButton>
    )
  }
}

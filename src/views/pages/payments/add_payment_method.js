import React from "react"
import { connect } from "react-redux"

import Request from "../../../utils/Request.js"
import checkSession from "../../../utils/check_session.js"
import ContentTitle from "../../component/ContentTitle.js"

/* Validate */
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import { required } from "../../../utils/validate.js"

/* Component */
import { ButtonLoading, ButtonValidation } from "../../component/Button/Button.js"

import Setting from "../../../config/setting.js"

class AddPaymentMethodScreen extends React.Component {
  constructor(props) {
    super(props)

    // check session login
    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)

    this.state = {
      isLoadingCreate: false,
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    }

    this.is_proses = true
    this.disabledButton = true

    // Register
    this.onRegister = this.onRegister.bind(this)
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this)
    this.onRegisterFailed = this.onRegisterFailed.bind(this)
    this.maxChar = this.maxChar.bind(this)
  }

  maxChar(e) {
    let length = e.target.value.length
    let value = e.target.value

    if (length <= 4) {
      this.setState({ expYear: value })
    }
  }

  removeApiError() {
    this.form.hideError(this.cardNumber)
    this.form.hideError(this.expMonth)
    this.form.hideError(this.expYear)
    this.form.hideError(this.cvc)
  }

  onRegister() {
    let payload = {
      type: 2,
      number: this.state.cardNumber,
      exp_month: this.state.expMonth,
      exp_year: this.state.expYear,
      cvc: this.state.cvc
    }

    Request(
      "post",
      "add-payment-method",
      { "Authorization": "Token " + this.props.TokenReducer.token },
      payload,
      [],
      this.onRegisterSuccess,
      this.onRegisterFailed
    )
    this.setState({ isLoadingCreate: true })
  }

  clear() {
    this.setState({
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
      isLoadingCreate: false,
    })
  }

  onRegisterSuccess(params, response) {
    this.clear()

    this.is_proses = true
    this.removeApiError()
    this.props.history.push("/payment-method")
  }

  onRegisterFailed(error) {
    this.is_proses = true

    this.setState({
      isLoadingCreate: false,
    })
  }

  /* Check Session */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.SessionReducer.is_auth) {
      nextProps.history.push("/login")
    }
  }

  renderYearList() {
    let date = new Date()
    let year = date.getFullYear()

    let year_list = []
    for (let i = year; i <= year + 5; i++) {
      year_list.push(
        <option value={i}>{i}</option>
      )
    }
    return year_list
  }

  render() {
    if (!this.loggedIn) return (null)
    const { words } = this.props.ActiveLanguageReducer

    let isLoadingCreate = this.state.isLoadingCreate
    let buttonAdd = null

    if (isLoadingCreate) {
      buttonAdd = <ButtonLoading value={"Add Payment Method"} />
    } else {
      buttonAdd = <ButtonValidation onClick={this.onRegister} value="Add Payment Method" />
    }

    return (
      <div>
        <section className="login-area">
          <ContentTitle title={"Payment Method"} />
          <div className="container-fluid">
            <Form ref={c => { this.form = c }}>
              <div className="row content-center form-group pt0-pb2">
                <div className="col-md-4 col-sm-6 col-xs-10 form-validation-error-horizontal-medium">
                  <Input
                    autoComplete="off"
                    type="number"
                    className="form-control-large"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={this.state.cardNumber}
                    onChange={(e) => this.setState({ cardNumber: e.target.value })}
                    validations={[required]}
                    ref={c => { this.cardNumber = c }}
                  />
                </div>
              </div>
              <div className="row content-center form-group pt3-pb2">
                <div className="col-md-2 col-sm-6 col-xs-10 form-validation-error-horizontal-medium">
                  <div className="select large-select">
                    <select
                      onChange={(e) => this.setState({ expMonth: e.target.value })}
                      validations={[required]}
                      ref={c => { this.expMonth = c }}
                    >
                      <option selected disabled>Expiration month</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>

                    </select>
                    <div className="select__arrow"></div>
                  </div>

                </div>
                <div className="col-md-2 col-sm-6 col-xs-10 form-validation-error-horizontal-medium">
                  <div className="select large-select">
                    <select
                      onChange={(e) => this.setState({ expYear: e.target.value })}
                      validations={[required]}
                      ref={c => { this.expYear = c }}
                    >
                      <option selected disabled>Expiration year</option>
                      {this.renderYearList()}
                    </select>
                    <div className="select__arrow"></div>
                  </div>
                </div>
              </div>
              <div className="row content-center form-group pt3-pb2">
                <div className="col-md-4 col-sm-6 col-xs-10 form-validation-error-horizontal-medium">
                  <Input
                    autoComplete="off"
                    type="number"
                    className="form-control-large"
                    name="cvc"
                    placeholder="cvc"
                    value={this.state.cvc}
                    onChange={(e) => this.setState({ cvc: e.target.value })}
                    validations={[required]}
                    max="30"
                    ref={c => { this.cvc = c }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 sign-in">
                  <div className="submit-input no-border">
                    {buttonAdd}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentMethodScreen)

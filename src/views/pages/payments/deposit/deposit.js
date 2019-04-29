import React from "react"
import { connect } from "react-redux"

import Request from "../../../../utils/Request.js"
import checkSession from "../../../../utils/check_session.js"
import PaypalButton from "../components/PaypalButton.js"
import DEBUG from "../../../../config/debug.js"

class DepositScreen extends React.Component {
  constructor(props) {
    super(props)

    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)

    this.state = {
      deposite_option: [],
      doid: null
    }

    this.onRead = this.onRead.bind(this)
    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed = this.onReadFailed.bind(this)

    this.onChange = this.onChange.bind(this)
  }

  onRead() {

    Request(
      "get",
      "deposit-option",
      { Authorization: "Token " + this.props.TokenReducer.token },
      {},
      [],
      this.onReadSuccess,
      this.onReadFailed
    )

  }

  onReadSuccess(response) {
    this.setState({
      deposite_option: response.data.results,
      doid: response.data.results[0].doid
    })
  }

  onReadFailed(error) {
  }

  onChange(e) {
    this.setState({
      doid: e.target.value
    })
  }

  generateOption(option) {
    let element = option.map((val, index) => {
      return (
        <option key={index} value={val.doid}>{val.name}</option>
      )
    })
    return element
  }

  componentDidMount() {
    this.onRead()
  }


  render() {
    const { deposite_option, doid } = this.state
    const { words } = this.props.ActiveLanguageReducer

    // Check if login session null or not login
    if (!this.loggedIn) return (null)

    return (
      <div className="animated fadeIn">
        <div className="container">
          <div className="row center-xs">
            <div className="col-md-6 col-sm-6 col-xs-10">
              <div className="box">
                <h3>{words.deposit}</h3>
                <div className="text-input">
                  <div className="select">
                    <select className="big" onChange={this.onChange}>
                      {this.generateOption(deposite_option)}
                    </select>
                  </div>
                </div>
                <div className="submit-input">
                  <PaypalButton {...this.props}
                    doid={doid}
                    label={'checkout'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DepositScreen)

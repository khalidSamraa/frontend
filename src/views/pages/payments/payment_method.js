import React from 'react'
import {connect} from "react-redux"
import Animated from "../../component/animated.js"
import {InstitutionList} from "../../component/animation.js"
import Options from '../../component/Option/Options.js'
import Request from "../../../utils/Request.js"
import PaymentMethodRow from "./components/paymentMethodRow.js"

class PaymentMethodScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading   : true,
      isError     : false,
      isSwitching : false,
      rawData  : null,
      limit       : 0,
      count       : 0,
      currentPage : 0,
      nextLink    : null,
      prevLink    : null,
    }

    this.onRead = this.onRead.bind(this)
    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed = this.onReadFailed.bind(this)
    this.generateRow = this.generateRow.bind(this)

    this.changePrimary = this.changePrimary.bind(this)
    this.changePrimarySuccess = this.changePrimarySuccess.bind(this)
    this.changePrimaryFailed = this.changePrimaryFailed.bind(this)

    this.removeCard = this.removeCard.bind(this)
    this.removeCardSuccess = this.removeCardSuccess.bind(this)
    this.removeCardFailed = this.removeCardFailed.bind(this)

    this.addPayment = this.addPayment.bind(this)
  }

  addPayment() {
    this.props.history.push("/add-payment-method")
  }

  changePrimary(e) {
    let payload = {
      pid: e.target.value
    }

    Request(
      "put",
      "set-primary-payment",
      {"Authorization" : "Token " + this.props.TokenReducer.token},
      payload,
      [],
      this.changePrimarySuccess,
      this.changePrimaryFailed
    )
  }

  changePrimarySuccess(response) {
    this.onRead()
  }

  changePrimaryFailed(error) {

  }

  removeCard(pid) {
    Request(
      "delete",
      "delete-payment-method",
      {"Authorization" : "Token " + this.props.TokenReducer.token},
      {},
      [pid],
      this.removeCardSuccess,
      this.removeCardFailed
    )
  }

  removeCardSuccess() {
    this.onRead()
  }

  removeCardFailed() {

  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <PaymentMethodRow
          rowData     ={val}
          key         ={val.pid}
          changePrimary={this.changePrimary}
          removeCard = {this.removeCard}
        />
      )
    })
    return element
  }

  onRead() {
    Request(
      "get",
      "read-payment-method",
      {"Authorization" : "Token " + this.props.TokenReducer.token},
      {},
      [],
      this.onReadSuccess,
      this.onReadFailed
    )
  }

  onReadSuccess(response) {
    this.setState({
      rawData: response.data.results,
      count  : response.data.count,
    })
  }

  onReadFailed(error) {
  }

  componentDidMount() {
    this.onRead()

    this.setState({
      isLoading: false,

    })
  }

  renderRow() {
    if(this.state.rawData === null) return null
    return (
      this.generateRow(this.state.rawData)
    )
  }

  render () {
    const { words } = this.props.ActiveLanguageReducer
    const {
      isLoading,
      rawData,
      count,
      limit,
      currentPage,
      nextLink,
      prevLink
    } = this.state

    return(
      <div className="animated fadeIn user-content institution-content">
        <div className="container-fluid">
          <div className="row center-xs bb">
            <div className="col-md-3"></div>
            <div className="col-md-6 col-xs-10">
              <div className="box musinote-center">
                <h3 className="no-margin">Payments Method</h3>
              </div>
            </div>
            <div className="col-md-3 center-content">
              <div>
                <Options items={[{text: "Add New", onClick: this.addPayment, className: ""}]} iconClassName={"md-icon"} />
              </div>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-4 col-xs-10">
              <div className="box">
                <Animated total={5} loading={isLoading} count={count} text={"No payment method found"} animation={<InstitutionList />}>
                  {this.renderRow()}
                </Animated>
              </div>
            </div>
          </div>
          <div className="row page-numeration-box">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="page-numeration"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    SessionReducer     : state.SessionReducer,
    TokenReducer       : state.TokenReducer,
    ActiveLanguageReducer : state.ActiveLanguageReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen)

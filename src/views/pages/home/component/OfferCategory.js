import React from "react"
import Request from "../../../../utils/Request.js"
import OfferRow from "./OfferRow.js"

export default class OfferCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      raw_data : "",
    }

    this.onRead = this.onRead.bind(this)
    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed = this.onReadFailed.bind(this)
  }

  onRead(id_curr) {
    let url = "read-offer"
    Request(
      "get",
      url,
      {},
      {cur: id_curr},
      [],
      this.onReadSuccess,
      this.onReadFailed
    )
  }

  onReadSuccess(response) {
    this.setState({
      raw_data : response.data,
    })
    this.props.RunRedux(this.props.UpdatedCurrency(false))
  }

  onReadFailed() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ActiveCurrencyReducer.changed){
      this.onRead(nextProps.ActiveCurrencyReducer.code)
    }
  }

  componentDidMount() {
    this.onRead(this.props.ActiveCurrencyReducer.code)
  }

  renderRow() {
    const {words} = this.props
    {/* Get loved category */}
    

    if(this.state.raw_data.length === 0) {
      return null
    } else {
      var element = this.state.raw_data.loved.map((val, index) => {
      return (
        <OfferRow
          row_data = {val}
          key      = {index}
          mode     = {this.props.mode}
          history  = {this.props.history}
        />
      )
    })

    {/* Get new category */}
    var newElement = this.state.raw_data.new.map((val, index) => {
      return (
        <OfferRow
          row_data = {val}
          key      = {index}
          mode     = {this.props.mode}
          history  = {this.props.history}
        />
      )
    })

    {/* Get offered category */}
    var offerred = this.state.raw_data.offered.map((val, index) => {
      return (
        <OfferRow
          row_data = {val}
          key      = {index}
          mode     = "offered"
          history  = {this.props.history}
        />
      )
    })
    const isElementData = element.length == 0 ? true : false;
    const isNewData = newElement.length == 0 ? true : false;
    const isOfferData = offerred.length == 0 ? true : false;

    {/* Bind all category here and return */}
      return (
        <div className={this.state.raw_data.length !== 0 ? "spc-border" : ""}>
        <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12" >

              <div className="info-home-title text-center">
                <h3>{words.home_offer_title_1}</h3>
              </div>
              {/* Check for element have data, if yes show data else show not found */}
                <div className={isElementData ? 'info-home-body hide' : 'info-home-body show'}>
                      {element}
               </div>
               <div className={isElementData ? 'info-home-body show' : 'info-home-body hide'}>
                    <div className="text-center">{words.home_offer_not_found}</div>
               </div>
            </div>
        <div className="col-md-4 col-sm-12 col-xs-12 freshly-added-border" >
                <div className="info-home-title text-center">
                <h3>{words.home_offer_title_2}</h3>
              </div>
              {/* Check for new element have data, if yes show data else show not found */}
                <div className={isNewData ? 'info-home-body hide' : 'info-home-body show'}>
                      {newElement}
               </div>
               <div className={isNewData ? 'info-home-body show' : 'info-home-body hide'}>
                    <div className="text-center">{words.home_offer_not_found}</div>
               </div>
            </div>
        <div className="col-md-4 col-sm-12 col-xs-12 " >
               <div className="info-home-title text-center">
                <h3>{words.home_offer_title_3}</h3>
              </div>
              {/* Check for offer element have data, if yes show data else show not found */}
                <div className={isOfferData ? 'info-home-body hide' : 'info-home-body show'}>
                      {offerred}
               </div>
               <div className={isOfferData ? 'info-home-body show' : 'info-home-body hide'}>
                    <div className="text-center">{words.home_offer_not_found}</div>
               </div>
            </div>
        </div>
      </div>
      )
    }
  }

  render() {
    return (
      this.renderRow()
    )
  }
}

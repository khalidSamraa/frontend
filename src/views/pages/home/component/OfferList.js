import React from "react"
import Request from "../../../../utils/Request.js"
import OfferRow from "./OfferRow.js"

export default class OfferList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      raw_data : "",
    }

    this.onRead = this.onRead.bind(this)
    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed = this.onReadFailed.bind(this)
  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <OfferRow
          row_data = {val}
          key      = {index}
          mode     = {this.props.mode}
          history  = {this.props.history}
        />
      )
    })
    return element
  }

  onRead() {
    const {mode} = this.props

    let url
    if(mode === "offer_1") {
      url = "read-offer_1"
    } else if(mode === "offer_2") {
      url = "read-offer_2"
    } else if(mode === "offer_3") {
      url = "read-offer_3"
    }

    Request(
      "get",
      url,
      {},
      {},
      [],
      this.onReadSuccess,
      this.onReadFailed
    )
  }

  onReadSuccess(response) {
    this.setState({
      raw_data : response.data,
    })
  }

  onReadFailed() {

  }

  componentDidMount() {
    this.onRead()
  }

  renderRow() {
    const {words} = this.props

    if(this.state.raw_data.length === 0) {
      return <div className="text-center">{words.home_offer_not_found}</div>
    } else {
      return this.generateRow(this.state.raw_data)
    }
  }

  render() {
    return (
      this.renderRow()
    )
  }
}

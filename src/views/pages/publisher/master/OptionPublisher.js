import React from "react"
import {connect} from "react-redux"
import Presenter from "../../../../publisher/presenter.js"
import Request from "../../../../publisher/utils/request.js"

export class OptionPublisher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      master: []
    }

    this.onRead        = this.onRead.bind(this)
    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed  = this.onReadFailed.bind(this)
  }

  onRead() {
    Presenter.ReadAsMaster(
      Request.ReadAsMaster(this, this.onReadSuccess, this.onReadFailed)
    )
  }

  onReadSuccess(params, response) {
    this.setState({
      master : response.data.results
    })
  }

  onReadFailed(response) {

  }

  componentDidMount() {
    this.onRead()
  }

  generateOption() {
    const {master} = this.state
    let tmp = []

    for(let i = 0; i < master.length; i++) {
      tmp.push(<option key={i} value={master[i].pid}>{master[i].name}</option>)
    }
    return tmp
  }

  render() {
    return (this.generateOption())
  }
}

const mapStateToProps = (state) => {
  return {
    TokenReducer          : state.TokenReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OptionPublisher)
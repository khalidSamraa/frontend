import React from "react"
import { connect } from "react-redux"

import {
  // RemoveInstitutionSession, 
  StopInstitutionSession
} from "../../../redux/account/institution/presenter.js"

import {
  RemoveTokenInstitution,
} from "../../../redux/account/token/presenter.js"

import Presenter from "../../../institution/presenter.js"
import Request from "../../../institution/utils/request.js"

class RemoveInstitution extends React.Component {
  constructor(props) {
    super(props)

    this.onRemoveInstitutionSuccess = this.onRemoveInstitutionSuccess.bind(this)
    this.onRemoveInstitutionFailed = this.onRemoveInstitutionFailed.bind(this)
  }

  stopAsInstitution() {
    this.props.RunRedux(StopInstitutionSession())
    this.props.RunRedux(RemoveTokenInstitution())
  }

  onRemove() {
    Presenter.RemoveInstitution(
      Request.RemoveInstitution(this, this.onRemoveInstitutionSuccess, this.onRemoveInstitutionFailed)
    )
  }

  onRemoveInstitutionSuccess(params, response) {
    this.stopAsInstitution()
    this.props.history.push("/manage-institution")
  }

  onRemoveInstitutionFailed(response) {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div>
          <div><h3 className="text-rm-institution">Are you sure remove this institution?</h3></div>
          <div className="rm-institution-btn-box">
            <button onClick={() => this.onRemove()} className="btn-flat red-i">Yes, remove institution</button>
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
    InstitutionReducer: state.InstitutionReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RemoveInstitution)
import React from "react"
import { connect } from "react-redux"

import Presenter from "../../../ensemble/presenter.js"
import Request from "../../../ensemble/utils/request.js"

import checkSession from "../../../utils/check_session.js"
import ContentTitle from "../../component/ContentTitle.js"

/* Session */
//import {CreateInstitutionSession} from "../../../redux/account/institution/presenter.js"
//import {WriteTokenInstitution} from "../../../redux/account/token/presenter.js"

/* Validate */
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import { required } from "../../../utils/validate.js"

/* Component */
import { ButtonLoading, ButtonValidation } from "../../component/Button/Button.js"

import Setting from "../../../config/setting.js"

class CreateInstitution extends React.Component {
  constructor(props) {
    super(props)

    // check session login
    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)

    this.state = {
      isLoadingCreate: false,
      institutionName: "",
    }

    this.is_proses = true
    this.disabledButton = true

    // Register
    this.onRegister = this.onRegister.bind(this)
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this)
    this.onRegisterFailed = this.onRegisterFailed.bind(this)
    this.checkFlag = this.checkFlag.bind(this)
  }

  removeApiError() {
    this.form.hideError(this.addMember)
  }

  onRegister() {
    Presenter.Register(Request.Register(this, this.onRegisterSuccess, this.onRegisterFailed))
    this.setState({ isLoadingCreate: true })
  }

  onRegisterSuccess(params, response) {
    this.setState({
      institutionName: "",
      isLoadingCreate: false,
    })

    this.is_proses = true
    this.removeApiError()
    this.props.history.push("/manage-ensemble")
  }

  onRegisterFailed(response) {
    this.is_proses = true

    this.setState({
      isLoadingCreate: false,
    })
  }

  /* Event */
  handleKeyPress(e) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (this.state.institutionName.trim() !== "") {
        if (this.is_proses) {
          this.is_proses = false
          this.onRegister()
        }
      }
    }
  }

  checkFlag(e) {
    if (e.target.checked) {
      this.disabledButton = false
    } else {
      this.disabledButton = true
    }

    this.forceUpdate()
  }

  /* Check Session */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.SessionReducer.is_auth) {
      nextProps.history.push("/login")
    }
  }

  render() {
    if (!this.loggedIn) return (null)
    const { words } = this.props.ActiveLanguageReducer

    let isLoadingCreate = this.state.isLoadingCreate
    let buttonCreate = null

    if (isLoadingCreate) {
      buttonCreate = <ButtonLoading value={words.createensemble_button_create} />
    } else {
      buttonCreate = <ButtonValidation onClick={this.onRegister} value={words.createensemble_button_create} disabled={this.disabledButton} />
    }

    return (
      <div>
        <section className="login-area">
          <ContentTitle title={words.createensemble_title} />
          <div className="container-fluid">
            <Form ref={c => { this.form = c }}>

              <div className="row content-center form-group">
                <div className="col-md-4 col-sm-6 col-xs-10 form-validation-error-horizontal-medium">
                  <Input
                    type="text"
                    className="form-control-large"
                    name="EnsembleName"
                    placeholder={words.createensemble_field_ensemble}
                    value={this.state.institutionName}
                    onChange={(e) => this.setState({ institutionName: e.target.value })}
                    validations={[required]}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                    maxLength={Setting.MAX_LENGTH}
                    ref={c => { this.addMember = c }}
                  />
                </div>
              </div>
              <div className="row center-xs form-group pt4-pb1">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <label className="control control--checkbox inline text-by-creating-ensemble">{words.createensemble_tos}
                    <input type="checkbox" onClick={this.checkFlag} />
                    <div className="control__indicator"></div>
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 sign-in">
                  <div className="submit-input no-border">
                    {buttonCreate}
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
    InstitutionReducer: state.InstitutionReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateInstitution)
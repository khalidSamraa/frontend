import React from "react"
import Presenter from "../../../../user/presenter.js"
import Request from "../../../../user/utils/request.js"

/* Session */
import { UpdateUserSession } from "../../../../redux/account/session/presenter.js"

/* Validate */
import { required } from "../../../../utils/validate.js"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import validator from "validator"


/* Component */
import { ButtonLoading, ButtonValidation } from "../../../component/Button/Button.js"

export default class RemoveMembership extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      password: "",
    }

    this.onRemove = this.onRemove.bind(this)
    this.onRemoveUserSuccess = this.onRemoveUserSuccess.bind(this)
    this.onRemoveUserFailed = this.onRemoveUserFailed.bind(this)
    this.removeValidationError = this.removeValidationError.bind(this)

    this.disabledButton = false
  }

  onRemove() {
    const { password } = this.state

    if (validator.isEmpty(password)) {

    } else {

      // this.setState({isLoading: true})
      // Presenter.RemoveUser(Request.RemoveUser(this, this.onRemoveUserSuccess, this.onRemoveUserFailed))
    }
  }

  onRemoveUserSuccess(params, response) {
    this.props.RunRedux(UpdateUserSession(response.data))
    this.disabledButton = true
    this.setState({
      isLoading: false,
      password: "",
    })
    this.removeValidationError()
  }

  onRemoveUserFailed(response) {
    this.setState({ isLoading: false })
    // window.location = "/login"
    alert(response.data.detail)
  }

  removeValidationError() {
    this.form.hideError(this.password)
  }

  render() {
    const { words } = this.props.ActiveLanguageReducer
    let isLoading = this.state.isLoading
    let buttonRemove

    if (isLoading) {
      buttonRemove = <ButtonLoading value={words.userprofile_delete_membership + "..."} />
    } else {
      buttonRemove = <ButtonValidation onClick={this.onRemove} value={words.userprofile_delete_membership} disabled={this.disabledButton} />
    }

    return (
      <div className="cancel-membership">
        <h2>{words.userprofile_delete_membership}</h2>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <Form ref={c => { this.form = c }}>
              <div className="input-section">
                <div className="row center-xs">
                  <div className="col-xs-11 col-sm-10 col-md-9">
                    <p>{words.userprofile_delete_membership_tos}</p>
                  </div>
                </div>
                <div className="row content-center form-group">
                  <div className="start-middle-content"><label>{words.userprofile_label_your_password}:</label></div>
                  <div className="form-validation-error-horizontal">
                    <Input
                      type="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={(e) => { this.setState({ password: e.target.value }); this.disabledButton = false }}
                      maxLength={16}
                      ref={c => { this.password = c }}
                      validations={[required]}
                    />
                  </div>
                </div>
              </div>

              <div className="submit-input">
                {buttonRemove}
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

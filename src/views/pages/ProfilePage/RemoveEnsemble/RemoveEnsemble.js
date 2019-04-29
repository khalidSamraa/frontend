import React from "react"
import Presenter from "../../../../ensemble/presenter.js"
import Request from "../../../../ensemble/utils/request.js"

import {
  StopEnsembleSession
} from "../../../../redux/account/ensemble/presenter.js"

import {
  RemoveTokenEnsemble,
} from "../../../../redux/account/token/presenter.js"

/* Validate */
import { required } from "../../../../utils/validate.js"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import validator from "validator"


/* Component */
import { ButtonLoading, ButtonValidation } from "../../../component/Button/Button.js"

export class RemoveEnsemble extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      password: "",
    }

    this.onRemove = this.onRemove.bind(this)
    this.onRemoveEnsembleSuccess = this.onRemoveEnsembleSuccess.bind(this)
    this.onRemoveEnsembleFailed = this.onRemoveEnsembleFailed.bind(this)
    this.disabledButton = false
  }

  stopAsActing() {
    this.props.RunRedux(StopEnsembleSession())
    this.props.RunRedux(RemoveTokenEnsemble())
  }

  onRemove() {
    const { words } = this.props.ActiveLanguageReducer
    const { password } = this.state

    if (validator.isEmpty(password)) {

    } else {
      this.disabledButton = true
      this.setState({ isLoading: true })

      let accepted = window.confirm(words.profileensemble_msg_delete_ensemble)
      if (accepted) {
        Presenter.RemoveEnsemble(Request.RemoveEnsemble(this, this.onRemoveEnsembleSuccess, this.onRemoveEnsembleFailed))
      } else {
        this.disabledButton = false
        this.setState({ isLoading: false })
      }

    }
  }

  onRemoveEnsembleSuccess(params, response) {
    this.stopAsActing()
    this.disabledButton = true
    this.setState({
      isLoading: false,
      password: "",
    })

    this.props.history.push("/manage-ensemble")
  }

  onRemoveEnsembleFailed(response) {
    this.setState({ isLoading: false })
    let data = response.data

    try {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
        }
      }
    }
    catch (error) {
      console.error(error) /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
    }
  }

  render() {
    const { words } = this.props.ActiveLanguageReducer

    let isLoading = this.state.isLoading
    let buttonRemove

    if (isLoading) {
      buttonRemove = <ButtonLoading value={words.profileensemble_button_delete + "..."} />
    } else {
      buttonRemove = <ButtonValidation onClick={() => this.onRemove()} value={words.profileensemble_button_delete} disabled={this.disabledButton} />
    }

    return (
      <div className="">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <Form ref={c => { this.form = c }}>
              <div className="input-section">
                <div className="row center-xs">
                  <div className="col-xs-8">
                    <div className="box">
                      <p>{words.profileensemble_delete_ensemble_tos}</p>
                    </div>
                  </div>
                </div>

                <div className="row content-center form-group">
                  <div className="col-xs-3 start-middle-content"><label>{words.profileensemble_label_password}:</label></div>
                  <div className="col-xs-5 form-validation-error-horizontal">
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

export default RemoveEnsemble;
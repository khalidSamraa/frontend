import React from 'react';
import Presenter from '../../../../user/presenter.js';
import Request from '../../../../user/utils/request.js';
import NormalRequest from "../../../../utils/Request";

/* Session */
import { UpdateUserSession } from '../../../../redux/account/session/presenter.js';

/* Validate */
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required } from '../../../../utils/validate.js';
import validator from 'validator';

/* Component */
import {
  ButtonLoading,
  ButtonValidation
} from '../../../component/Button/Button.js';
import { InfoModal } from '../../../component/Modal';

import Setting from '../../../../config/setting.js';
import Auth from '../../../../redux/account/authToken';

export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.token = Auth.getActiveToken();
    this.state = {
      isLoadingUpdate: false,
      email: props.SessionReducer.user.email,
      newName: '',
      password: '',
      showModal: false
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onUpdateUserSuccess = this.onUpdateUserSuccess.bind(this);
    this.onUpdateUserFailed = this.onUpdateUserFailed.bind(this);
    this.removeValidationError = this.removeValidationError.bind(this);

    this.onCheckPassword = this.onCheckPassword.bind(this);
    this.onCheckPasswordSuccess = this.onCheckPasswordSuccess.bind(this);
    this.onCheckPasswordFailed = this.onCheckPasswordFailed.bind(this);

    this.disabledButton = false;
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(infoMsg) {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  onCheckPassword() {
    Presenter.CheckPassword(
      Request.CheckPassword(
        this,
        this.onCheckPasswordSuccess,
        this.onCheckPasswordFailed
      )
    );
  }

  onCheckPasswordSuccess(params, response) {
    this.setState({ isLoadingUpdate: false });
    const headers = {
      Authorization: "Token " + this.token,
    }
    const {email, newName} = this.state;
    NormalRequest(
      "patch",
      "account-update",
      headers,
      {email, name: newName },
      [],
      this.onUpdateUserSuccess,
      this.onUpdateUserFailed,
    )
  }

  onCheckPasswordFailed(error) {
    this.setState({ isLoadingUpdate: false });
    if (error && error.response && error.response.data) {
      this.toggleModal(error.response.data.details);
    }
  }

  onUpdate() {
    const { newName, password } = this.state;

    if (!validator.isEmpty(newName) && !validator.isEmpty(password)) {
      this.onCheckPassword();
      this.setState({ isLoadingUpdate: true });
    }
  }

  onUpdateUserSuccess(params, response) {
    this.props.getAccountDetails()
    this.disabledButton = true;
    this.setState({
      isLoadingUpdate: false,
      newName: '',
      password: ''
    });
    this.removeValidationError();
  }

  onUpdateUserFailed(response) {
    console.log('error: ', response);
    this.setState({ isLoadingUpdate: false });
    let data = response.data;

    try {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          alert('Error on ' + key + ' : ' + data[key]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeValidationError() {
    this.form.hideError(this.newName);
    this.form.hideError(this.password);
  }

  render() {
    const { words } = this.props.ActiveLanguageReducer;
    const { showModal, infoMsg } = this.state;

    let isLoadingUpdate = this.state.isLoadingUpdate;
    let buttonUpdate;

    if (isLoadingUpdate) {
      buttonUpdate = (
        <ButtonLoading value={words.userprofile_button_update + '...'} />
      );
    } else {
      buttonUpdate = (
        <ButtonValidation
          onClick={this.onUpdate}
          value={words.userprofile_button_update}
          disabled={this.disabledButton}
        />
      );
    }
    const {accountDetails} = this.props;

    return (
      <React.Fragment>
        <InfoModal
          small
          headline={words['profile_menu_chg-name']}
          isActive={showModal}
          info={infoMsg}
          toggleModal={this.toggleModal}
        />
        <div className="user-details">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <h2>{words.userprofile_change_profile}</h2>
              <Form
                ref={c => {
                  this.form = c;
                }}
              >
                <div className="input-section">
                  <div className="row content-center form-group">
                    <div className="start-middle-content">
                      <label>Email:</label>
                    </div>
                    <div className="form-validation-error-horizontal">
                      <label>{accountDetails.email}</label>
                    </div>
                  </div>

                  <div className="row content-center form-group">
                    <div className="start-middle-content">
                      <label>{words.userprofile_label_name}:</label>
                    </div>
                    <div className="form-validation-error-horizontal">
                      <label>{accountDetails.name}</label>
                    </div>
                  </div>

                  <div className="row content-center form-group">
                    <div className="start-middle-content">
                      <label>{words.userprofile_label_new_name}:</label>
                    </div>
                    <div className="form-validation-error-horizontal">
                      <Input
                        type="text"
                        className="form-control"
                        maxLength={Setting.MAX_LENGTH}
                        value={this.state.newName}
                        onChange={e => {
                          this.setState({ newName: e.target.value });
                          this.disabledButton = false;
                        }}
                        ref={c => {
                          this.newName = c;
                        }}
                        validations={[required]}
                      />
                    </div>
                  </div>

                  <div className="row content-center form-group">
                    <div className="start-middle-content">
                      <label>{words.userprofile_label_your_password}:</label>
                    </div>
                    <div className="form-validation-error-horizontal">
                      <Input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={e => {
                          this.setState({ password: e.target.value });
                          this.disabledButton = false;
                        }}
                        maxLength={16}
                        ref={c => {
                          this.password = c;
                        }}
                        validations={[required]}
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-input">{buttonUpdate}</div>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

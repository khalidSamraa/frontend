import React from 'react';

import Presenter from '../../../../user/presenter.js';
import Request from '../../../../user/utils/request.js';

/* Validate */
import { required } from '../../../../utils/validate.js';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import validator from 'validator';

/* Component */
import {
  ButtonLoading,
  ButtonValidation
} from '../../../component/Button/Button.js';
import { InfoModal } from '../../../component/Modal';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingUpdate: false,
      password: '',
      new_password: '',
      repeat_password: '',
      showModal: false
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onUpdateSuccess = this.onUpdateSuccess.bind(this);
    this.onUpdateFailed = this.onUpdateFailed.bind(this);
    this.removeValidationError = this.removeValidationError.bind(this);

    this.disabledButton = false;
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(infoMsg) {
    this.setState({ showModal: !this.state.showModal, infoMsg });
  }

  onUpdate() {
    const { new_password, repeat_password } = this.state;
    const { words } = this.props.ActiveLanguageReducer;

    if (new_password !== repeat_password) {
      this.toggleModal(words['popup_pwd_not-same_small']);
    } else {
      this.setState({ isLoadingUpdate: true });
      Presenter.UpdatePassword(
        Request.UpdatePassword(this, this.onUpdateSuccess, this.onUpdateFailed)
      );
    }
  }

  onUpdateSuccess(params, response) {
    const { words } = this.props.ActiveLanguageReducer;

    this.disabledButton = true;
    this.setState({
      isLoadingUpdate: false,
      password: '',
      new_password: '',
      repeat_password: ''
    });
    this.toggleModal(words['popup_pwd_success_small']);
    this.removeValidationError();
  }

  onUpdateFailed(response) {
    const { words } = this.props.ActiveLanguageReducer;
    const { data } = response;

    if (data && data.detail) {
      this.toggleModal(words['popup_pwd_wrong_small']);
    }
    this.setState({ isLoadingUpdate: false });
  }

  removeValidationError() {
    this.form.hideError(this.password);
    this.form.hideError(this.new_password);
    this.form.hideError(this.repeat_password);
  }

  render() {
    let { isLoadingUpdate, showModal, infoMsg } = this.state;
    const { words } = this.props.ActiveLanguageReducer;
    let buttonUpdate;

    if (isLoadingUpdate) {
      buttonUpdate = (
        <ButtonLoading value={words.profileensemble_button_update} />
      );
    } else {
      buttonUpdate = (
        <ButtonValidation
          onClick={this.onUpdate}
          value={words.profileensemble_button_update}
          disabled={this.disabledButton}
        />
      );
    }

    return (
      <React.Fragment>
        <InfoModal
          small
          isActive={showModal}
          headline={words['popup_pwd_chg_big']}
          info={infoMsg}
          toggleModal={this.toggleModal}
        />
        <div>
          <div className="">
            <h2>{words.userprofile_change_password}</h2>
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <Form
                  ref={c => {
                    this.form = c;
                  }}
                >
                  <div className="input-section">
                    <div className="row content-center form-group">
                      <div className="start-middle-content">
                        <label>{words.userprofile_old_password}:</label>
                      </div>
                      <div className="form-validation-error-horizontal">
                        <Input
                          type="password"
                          className="form-control"
                          maxLength={16}
                          value={this.state.password}
                          onChange={e => {
                            this.setState({ password: e.target.value });
                            this.disabledButton = false;
                          }}
                          // onFocus={this.removeValidationError}
                          ref={c => {
                            this.password = c;
                          }}
                          validations={[required]}
                        />
                      </div>
                    </div>

                    <div className="row content-center form-group">
                      <div className="start-middle-content">
                        <label>{words.userprofile_new_password}:</label>
                      </div>
                      <div className="form-validation-error-horizontal">
                        <Input
                          type="password"
                          className="form-control"
                          maxLength={16}
                          value={this.state.new_password}
                          onChange={e => {
                            this.setState({ new_password: e.target.value });
                            this.disabledButton = false;
                          }}
                          // onFocus={this.removeValidationError}
                          ref={c => {
                            this.new_password = c;
                          }}
                          validations={[required]}
                        />
                      </div>
                    </div>

                    <div className="row content-center form-group">
                      <div className="start-middle-content">
                        <label>{words.userprofile_new_password}:</label>
                      </div>
                      <div className="form-validation-error-horizontal">
                        <Input
                          type="password"
                          className="form-control"
                          maxLength={16}
                          value={this.state.repeat_password}
                          onChange={e => {
                            this.setState({ repeat_password: e.target.value });
                            this.disabledButton = false;
                          }}
                          // onFocus={this.removeValidationError}
                          ref={c => {
                            this.repeat_password = c;
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
        </div>
      </React.Fragment>
    );
  }
}

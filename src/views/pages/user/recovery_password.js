import React from 'react';
import Presenter from '../../../user/presenter.js';
import Request from '../../../user/utils/request.js';

/* Validate */
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required } from '../../../utils/validate.js';

/* Validate Button */
import { button } from 'react-validation';
const Button = ({ hasErrors, ...props }) => {
  return (
    <input type="button" {...props} disabled={hasErrors}/>
  );
};

const MyValidationButton = button(Button)

export default class RecoveryPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingReset : false,
      newPassword    : '',
      uid            : this.props.match.params.uid,
      uidValid       : false
    }

    /* Check Uid */
    this.onCheckUidSuccess     = this.onCheckUidSuccess.bind(this);
    this.onCheckUidFailed      = this.onCheckUidFailed.bind(this);

    /* Recovery */
    this.onRecoveryPasswordSuccess = this.onRecoveryPasswordSuccess.bind(this);
    this.onRecoveryPasswordFailed  = this.onRecoveryPasswordFailed.bind(this);
  }

  /* Check token */
  onCheckUid() {
    Presenter.CheckUid(Request.CheckUid(this, this.onCheckUidSuccess, this.onCheckUidFailed))
  }

  onCheckUidSuccess(params, response) {
    this.setState({uidValid: true})
  }

  onCheckUidFailed(response) {
    this.setState({uidValid: false})
  }

  /* Recovery Password */
  onRecoveryPassword() {
    Presenter.RecoveryPassword(Request.RecoveryPassword(this, this.onRecoveryPasswordSuccess, this.onRecoveryPasswordFailed))
    this.setState({isLoadingReset: true})
  }

  onRecoveryPasswordSuccess(params, response) {
    alert('Reset password success');
    this.props.history.push('/login');
  }

  onRecoveryPasswordFailed(response) {
    this.setState({isLoadingReset: false})
  }

  renderButtonReset() {
    if(this.state.isLoadingReset) {
      return (
        <input
          type="button"
          className="black"
          value="Reset password . . ."
          disabled
        />
      )
    } else {
      return(
        <MyValidationButton
          type="button"
          className="black"
          onClick={()=>this.onRecoveryPassword()}
          value="Reset password"
        />
      )
    }
  }

  renderForm() {
    if(this.state.uidValid) {
      return(
        <Form>
          <p>Input new password</p>
          <div className="text-input">
            <Input
              type="password"
              name='password'
              placeholder="New password"
              onChange={(e)=>this.setState({newPassword: e.target.value})}
              validations={[required]}
            />
          </div>
          <div className="submit-input">
            {this.renderButtonReset()}
          </div>
        </Form>
      )
    } else {
      return(
        <p className="red">Token invalid</p>
      )
    }
  }

  componentDidMount() {
    this.onCheckUid();
  }

  render() {
    return (
      <div>
        <section className="login-area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 sign-in">
                <h3>Reset Password</h3>
                  {this.renderForm()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

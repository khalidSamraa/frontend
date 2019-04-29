import React from 'react';
import {connect} from "react-redux";
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

class RegisterInvitationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      uid : props.match.params.uid,
      name: '',
      password: '',
    }

    this.onSignupInvitationSuccess = this.onSignupInvitationSuccess.bind(this) 
    this.onSignupInvitationFailed = this.onSignupInvitationFailed.bind(this) 
  }

  onSignupInvitation() {
    Presenter.SignupInvitation(Request.SignupInvitation(this, this.onSignupInvitationSuccess, this.onSignupInvitationFailed))
    this.setState({isLoading: true})
  }

  onSignupInvitationSuccess(params, response) {
    this.setState({isLoading: false})
    if(this.props.SessionReducer.is_auth){
      alert('Sucsess setup account, please logout and login with new account')
    } else {
      alert('Sucsess setup account, please login')
    }
    this.props.history.push('/login');
  }

  onSignupInvitationFailed(response) {
    this.setState({isLoading: false})
    alert('Your account have registered')
  }

  renderButton() {
    if(this.state.isLoading) {
      return (
        <input 
          type="button" 
          className="black"
          value="Submiting . . ."
          disabled 
        />
      )
    } else {
      return(
        <MyValidationButton 
          type="button" 
          className="black"
          onClick={()=>this.onSignupInvitation()} 
          value="Submit"
        />
      )
    }
  }

  render() {
    return (
      <div>
        <section className="login-area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 sign-in">
                <h3>Setup account</h3>
                <Form>
                  <div className="text-input">
                    <Input 
                      type="text" 
                      name='name' 
                      placeholder="Type name"  
                      onChange={(e)=>this.setState({name: e.target.value})}
                      validations={[required]} 
                    />
                  </div>
                  <div className="text-input">
                    <Input 
                      type="password" 
                      name='password' 
                      placeholder="New password"  
                      onChange={(e)=>this.setState({password: e.target.value})}
                      validations={[required]} 
                    />
                  </div>
                  <div className="submit-input">
                    {this.renderButton()}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SessionReducer     : state.SessionReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterInvitationScreen)
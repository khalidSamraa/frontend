import React from 'react';

export default class ForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email    : '',
    }

  }

  handleKeyPress(e) {
    if(e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      if(e.target.value.trim() !== '') {
        this.props.onRequestEmail;
      }
    }
  }

  render() {
    const {email} = this.state
    return (
      <div className="text-box">
        <p>Please enter your email address below. You will receive a link to reset your password.</p>
        <form>
          <div className="text-input">
            <input 
              type="email" 
              name="emailRecovery"
              placeholder="Email Address"
              defaultValue={email}
              onChange={(e)=>this.setState({email: e.target.value})}

              onKeyPress={ (e) => {this.handleKeyPress(e)}}
            />
          </div>
          <div className="submit-input">
            
          </div>
        </form>
      </div>
    );
  }
}

import React from 'react';
import {connect} from "react-redux"
import Presenter from '../../../user/presenter.js';
import Request from '../../../user/utils/request.js';

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenValid     : false,      
      token          : props.match.params.token,
    }

    /* Check token */
    this.onCheckTokenSuccess = this.onCheckTokenSuccess.bind(this);
    this.onCheckTokenFailed  = this.onCheckTokenFailed.bind(this);
  }

  /* Check token */
  onCheckToken() {
    Presenter.CheckToken(Request.CheckToken(this, this.onCheckTokenSuccess, this.onCheckTokenFailed))
  }

  onCheckTokenSuccess(params, response) {
    this.setState({tokenValid: true})
  }

  onCheckTokenFailed(response) {
    this.setState({tokenValid: false})
  }

  componentDidMount() {
    this.onCheckToken();
  }

  renderLabel() {
    const {words} = this.props.ActiveLanguageReducer

    if(this.state.tokenValid) {
      return (
        <div className="icon verification">
          <i className="material-icons dp40 color-green space-right-8">verified_user</i>
          <span className="color-green fxl">{words.verification_msg_verified}</span> 
        </div>
      )
    } else {
      return(
        <div className="icon verification">
          <i className="material-icons dp40 color-red space-right-8">close</i>
          <span className="color-red fxl">{words.verification_msg_token_invalid}</span>
        </div>
      )
    }
  }

  render() {
    return (
      <section className="login-area">
        <div className="container-fluid">
          <div className="row fl-center">
            <div className="col-md-12 col-sm-12 col-xs-12 sign-in">
              {this.renderLabel()}
              <div className="submit-input no-border">
                <input type="button" value='goto Login' onClick={()=>this.props.history.push('/login')}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {  
  return {
    ActiveLanguageReducer : state.ActiveLanguageReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification)
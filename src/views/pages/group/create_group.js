import React from 'react';
import {connect} from "react-redux";
import Presenter from '../../../group/presenter.js';
import Request from '../../../group/utils/request.js';

/* Validate */
import { required } from '../../../utils/validate.js';
import {form, control, button } from 'react-validation';

const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}> hideError={true}{children}</form>
);

const Input = ({ error, isChanged, isUsed, ...props }) => (
  <div>
    <input {...props} className={isChanged && isUsed && error ? 'is-invalid-input': ''}/>
    {isChanged && isUsed && error}
  </div>
);

const Button = ({ hasErrors, ...props }) => {
  return (
    <input type="button" className="black" {...props} disabled={hasErrors}/>
  );
};

const FormValidation = form(Form);
const InputValidation = control(Input);
const ButtonValidation = button(Button)

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingCreate : false,
      groupName       : ''
    }

    // Register
    this.onRegister        = this.onRegister.bind(this);
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this);
    this.onRegisterFailed  = this.onRegisterFailed.bind(this);
  }

  onRegister() {
    this.setState({isLoadingCreate: true})
    Presenter.Register(Request.Register(this, this.onRegisterSuccess, this.onRegisterFailed))
  }

  onRegisterSuccess(params, response) {
    alert('Create group success');
    this.setState({
      groupName: '',
      isLoadingCreate: false,
    })
  }

  onRegisterFailed(response) {
    alert(response.data.detail)
    this.setState({
      isLoadingCreate: false,
    })
  }

  /* Check Session */
  componentWillReceiveProps(nextProps) {
    if(!nextProps.SessionReducer.is_auth) {
      nextProps.history.push('/login')
    }
  }

  render() {
    let isLoadingCreate = this.state.isLoadingCreate;
    let buttonCreate = null;

    if(isLoadingCreate) {
      buttonCreate = <ButtonValidation value="Create . . ." disabled/>
    } else {
      buttonCreate = <ButtonValidation onClick={this.onRegister} value="Create" />
    }

    return (
      <div>
        <section className="login-area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 sign-in">
                <h3>Create Group</h3>
                  <FormValidation>
                    <p>Input group name</p>
                    <div className="text-input">
                    <InputValidation
                      // className="is-invalid-input"
                      type="text"
                      name='groupName'
                      placeholder="Group name"
                      value={this.state.groupName}
                      maxLength={16}
                      onChange={(e)=>this.setState({groupName: e.target.value})}
                      validations={[required]}
                    />
                    </div>
                    <div className="submit-input">
                      {buttonCreate}
                    </div>
                  </FormValidation>
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
    SessionReducer : state.SessionReducer,
    TokenReducer   : state.TokenReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)

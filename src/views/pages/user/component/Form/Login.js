import React from "react"
import Presenter from "../../../../../user/presenter.js"
import Request from "../../../../../user/utils/request.js"
/* Session */
import {CreateUserSession} from "../../../../../redux/account/session/presenter.js"
import {WriteToken} from "../../../../../redux/account/token/presenter.js"

import validator from "validator"

const emailValidation = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="form-error is-visible"><code>{value}</code> is not a valid email.</span>
  }  
}

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      email    : "",
      password : "",
      submitted: "",
    }

    // Login
    this.onLogin   = this.onLogin.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onFailed  = this.onFailed.bind(this)

    this.handleChange  = this.handleChange.bind(this)
  }

  onLogin() {
    Presenter.Login(Request.Login(this, this.onSuccess, this.onFailed))
    this.setState({isLoadingLogin: true})
  }

  onSuccess(params, response) {    
    this.props.history.push("/profile")
    this.props.RunRedux(CreateUserSession(response.data.user))
    this.props.RunRedux(WriteToken(response.data.token))
  }

  onFailed(response) {
    // error detail
    if(response.data.hasOwnProperty("detail")) {
      alert(response.data.detail)
    } else if (response.data.hasOwnProperty("non_field_errors")) {
      alert(response.data.non_field_errors[0])
    } else {
      alert("Something wrong")
    }

    this.setState({isLoadingLogin: false})
  }

  handleChange(e) {
      const { name, value } = e.target
      this.setState({ [name]: value })
  }

  handleKeyPress(e) {
    if(e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if(this.state.password.trim() !== "") {
        this.onLogin()
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    
    let email    = this.refs.email.value
    let password = this.refs.password.value


    this.refs.email.className = "is-invalid-input"
    this.refs.password.className = "is-invalid-input"

    if(!validator.isEmail(email)) {
      alert("email not valid")
    }

    this.setState({
      email: email,
      password: password,
      submitted: true,
    })

    this.refs.email.value = ""
    this.refs.password.value = ""

  } 

  render() {
    const {email, password, submitted} = this.state
    const props = this.props

    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <p>If you have an account</p>
          <div className="text-input">
            <input 
              type="email" 
              name="email"
              ref="email"
              placeholder="Your e-mail"  
              defaultValue={email}
              onChange={this.handleChange}
              onKeyPress={ (e) => {this.handleKeyPress(e)}}

            />
            {submitted && email && <i className="material-icons error-icon">error</i> }
            <span className="form-error is-visible"><code>s</code> is not a valid email.</span>
          </div>
          <div className="text-input">
            <input
              type="email" 
              name="password" 
              ref="password"
              maxLength={16}
              placeholder="Your password"
              onChange={this.handleChange}
              onKeyPress={ (e) => {this.handleKeyPress(e)} }
            />
            {submitted && !password && <i className="material-icons error-icon">error</i> }
          </div>
          <div className="submit-input">
            <input type="submit" className="black" value="submit"/>
          </div>
          {props.children}
        </form>
      </div>
    )
  }
}


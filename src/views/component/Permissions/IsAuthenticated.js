import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import auth from "../../../redux/account/auth.js"

const propTypes = {
  history: PropTypes.object.isRequired,
}

const defaultProps = {}

export class IsAuthenticated extends Component {
  constructor(props) {
    super(props)
    this.authenticated = auth.GetCredential().is_auth
    if (!this.authenticated) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

IsAuthenticated.propTypes = propTypes
IsAuthenticated.defaultProps = defaultProps
export default IsAuthenticated

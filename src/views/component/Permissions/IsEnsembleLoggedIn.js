import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import auth from "../../../redux/account/authEsemble.js"

const propTypes = {
  history: PropTypes.object.isRequired,
}

const defaultProps = {}

export class IsEnsembleLoggedIn extends Component {
  constructor(props) {
    super(props)
    this.authenticated = auth.GetCredential().is_auth
    if (!this.authenticated) {
      this.props.history.push('/ensembles')
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

IsEnsembleLoggedIn.propTypes = propTypes
IsEnsembleLoggedIn.defaultProps = defaultProps
export default IsEnsembleLoggedIn

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../User.js';
import Avatar from '../Avatar.js';
// import Options from '../Option/Options.js';

const propTypes = {
  index: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  userName: PropTypes.string,
  email: PropTypes.string,
  isAdmin: PropTypes.bool,

  options: PropTypes.element,
  addButton: PropTypes.element,
}

const defaultProps = {
  userName: "",
  email: "",
  isAdmin: false,

  options: null,
  addButton: null,
}


class MemberRow extends Component {
  render() {
    const {
      // index,
      uid,
      userName,
      email,
      isAdmin,
      options,
      addButton,
    } = this.props

    return (
      <div className="overlay-page-body-row">
        {addButton}
        <div className="avatar-row">
          <Avatar name={userName} defaultName={<i className="material-icons avatar-visible">person</i>} />
        </div>
        <User
          uid={uid}
          userName={userName}
          email={email}
          isAdmin={isAdmin}
          options={options}
          designType={2}
        />
      </div>
    );
  }
}

MemberRow.propTypes = propTypes
MemberRow.defaultProps = defaultProps
export default MemberRow
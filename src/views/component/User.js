import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  uid: PropTypes.string.isRequired,
  userName: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  
  isAdmin: PropTypes.bool,
  options: PropTypes.element,

  designType: PropTypes.number,
}

const defaultProps = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",

  isAdmin: false,
  options: null,

  designType: 1,
}

class User extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderTypeOne() {
    const { userName, words } = this.props
    return (
      <div className="">
        <div className="user-name full-width book-title">{userName}</div>
      </div>
    )
  }

  renderTypeTwo() {
    const { userName, email, options, isAdmin } = this.props
    let meta = userName === "" ? (
      <div className="body-list-inside-meta"><span className="meta-not-register">user not registered</span></div>
    ) : isAdmin ? (
      <div className="body-list-inside-meta"><span className="meta-admin">admin</span></div>
    ) : (
      null
    )

    return (
      <div className="body-list-inside">
        <div className="body-list-inside-main">
          <div className="body-list-inside-title">
            {userName ? userName : "-"}
          </div>
          <div className="body-list-inside-meta">
            {meta}
          </div>
        </div>
        <div className="body-list-inside-secondary">
          <span>{email}</span>
          {options}
        </div>
      </div>
    )
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderTypeOne()
    } else if (designType === 2) {
      return this.renderTypeTwo()
    }
    return (null)
  }
}

User.propTypes = propTypes
User.defaultProps = defaultProps
export default User
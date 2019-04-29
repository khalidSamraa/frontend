import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = () => {
  return (
    <div className="user-box padding-36-0 header__user-box">
      <Link to="/login">
        <img src="/media/images/icon/user.png" />
        <img
          src="/media/images/icon/user-hover.png"
          className="user-icon-hover"
        />
      </Link>
    </div>
  );
};

export default withRouter(Login);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const getMenuList = words => [
  {
    content: words.header_upload,
    to: '/score-uploads'
  },
  {
    content: words.header_library,
    to: '/book'
  },
  {
    content: words.header_profile,
    to: '/profile'
  },
  {
    content: words.general_invitation,
    to: '/invitation'
  }
];

const UserMenuList = props => {
  const { onLogout, words } = props;

  return (
    <span>
      {getMenuList(words).map((item, i) => (
        <p key={i}>
          <Link className="link" to={item.to}>
            {item.content}
          </Link>
        </p>
      ))}
      <p onClick={() => onLogout()}>
        <Link className="link red-i" to="/home">
          {words.header_logout}
        </Link>
      </p>
    </span>
  );
};

export default withRouter(UserMenuList);

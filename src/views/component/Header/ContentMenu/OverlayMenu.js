import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';

const ContextMenu = props => {
  const { words, auth, onLogout } = props;
  const [isOpened, setIsOpened] = useState(false);
  const toogle = () => setIsOpened(!isOpened);

  return (
    <section
      className={classnames('menu-overlay show-on-all', {
        show: isOpened
      })}
    >
      <button className="open-modal" onClick={toogle}>
        <span className="btn-close-overlay">{words.header_close}</span>
      </button>
      <div className="menu-box">
        <p onClick={toogle}>
          <Link className="link" to="/profile">
            {words.header_profile}
          </Link>
        </p>

        <p onClick={toogle}>
          {auth.isLoginAsInstitution || auth.isLoginAsEnsemble ? (
            <Link className="link" to="/assignment">
              {words.header_library}
            </Link>
          ) : (
            <Link className="link" to="/book">
              {words.header_library}
            </Link>
          )}
        </p>

        <p onClick={toogle}>
          <Link className="link" to="/manage-ensemble">
            {words.header_ensemble + 's'}
          </Link>
        </p>

        <p onClick={toogle}>
          <Link className="link" to="/manage-institution">
            {words.header_institution + 's'}
          </Link>
        </p>

        <p onClick={toogle}>
          <Link className="link" to="/manage-publisher">
            {words.header_publisher + 's'}
          </Link>
        </p>
        <p onClick={onLogout}>
          <a tabIndex="0" role="button" style={{ color: 'red' }}>
            {words.header_logout}
          </a>
        </p>
      </div>
    </section>
  );
};

export default withRouter(ContextMenu);

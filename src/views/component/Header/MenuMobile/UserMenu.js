import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const UserMenu = props => {
  const { sessionAuth, institutionAuth, publisherAuth, ensembleAuth } = props;

  let text = 'people_outline';
  if (!institutionAuth && !ensembleAuth && !publisherAuth)
    text = 'person_outline';

  return (
    <Fragment>
      {sessionAuth ? (
        <div className="user-box header__user-box">
          <a tabIndex="0" role="button" className="icon-default">
            <p className="icon-header icon-username">
              <i className="material-icons dp32 icon-header">{text}</i>
            </p>
          </a>
        </div>
      ) : (
        <Link to="/login" className="icon-default">
          <i className="material-icons dp32 icon-header">person_outline</i>
        </Link>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    sessionAuth: state.SessionReducer.is_auth,
    institutionAuth: state.InstitutionReducer.is_auth,
    publisherAuth: state.PublisherReducer.is_auth,
    ensembleAuth: state.EnsembleReducer.is_auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(UserMenu)
);

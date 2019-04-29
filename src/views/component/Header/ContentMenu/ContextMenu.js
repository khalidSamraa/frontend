import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  RemoveEnsembleSession,
  StopEnsembleSession
} from '../../../../redux/account/ensemble/presenter';
import {
  RemoveInstitutionSession,
  StopInstitutionSession
} from '../../../../redux/account/institution/presenter';
import {
  RemovePublisherSession,
  StopPublisherSession
} from '../../../../redux/account/publisher/presenter';

const stopAsActing = props => {
  // Stop from institution
  props.StopInstitutionSession();
  props.RemoveInstitutionSession();

  // Stop from publsiher
  props.StopPublisherSession();
  props.RemovePublisherSession();

  // Stop from ensemble
  props.StopEnsembleSession();
  props.RemoveEnsembleSession();
};

const getUserModesMenu = words => {
  const items = [
    {
      id: 1,
      isUser: true,
      link: '/home',
      onClick: stopAsActing,
      content: words.header_user
    },
    {
      id: 2,
      link: '/manage-ensemble',
      content: words.header_ensemble
    },
    {
      id: 3,
      link: '/manage-institution',
      content: words.header_institutions
    },
    {
      id: 4,
      link: '/manage-publisher',
      content: words.header_publisher
    }
  ];

  return items.sort((a, b) => a.content.localeCompare(b.content));
};

class ContextMenu extends React.Component {
  onItemClicked = item => () => {
    item.onClick && item.onClick(this.props);
    this.props.onClick();
  };

  render() {
    const { words, auth } = this.props;

    const isNotUserMenuEnabled =
      auth.isLoginAsEnsemble ||
      auth.isLoginAsInstitution ||
      auth.isLoginAsPublisher;

    return (
      <section
        className={classnames('context-menu-dekstop', {
          'context-show': true
        })}
      >
        <div className="context-menu-inner">
          {getUserModesMenu(words).map(item => {
            const isShown = item.isUser ? isNotUserMenuEnabled : true;

            return (
              isShown && (
                <p key={item.id} onClick={this.onItemClicked(item)}>
                  <Link className="link" to={item.link}>
                    {item.content}
                  </Link>
                </p>
              )
            );
          })}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      StopInstitutionSession,
      RemoveInstitutionSession,
      StopPublisherSession,
      RemovePublisherSession,
      StopEnsembleSession,
      RemoveEnsembleSession
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(ContextMenu);

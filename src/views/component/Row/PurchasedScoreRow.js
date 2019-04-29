import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import auth from '../../../redux/account/authToken.js';
import Request from '../../../utils/Request.js';

const propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  active: PropTypes.bool,
  loading: PropTypes.bool,

  onClick: PropTypes.func
};

const defaultProps = {
  active: false,
  loading: false,

  onClick() {}
};

class PurchasedScoreRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.token = auth.getActiveToken();

    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);

    this.onDelete = this.onDelete.bind(this);
    this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
    this.onDeleteFailed = this.onDeleteFailed.bind(this);
  }

  expand(e) {
    this.setState({ expanded: true });
  }

  collapse(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({ expanded: false });
    } else {
      this.timer = setTimeout(() => {
        this.setState({ expanded: false });
      }, 200);
    }
  }

  onDelete(pid) {
    Request(
      'delete',
      'purchase-score-delete',
      { Authorization: 'Token ' + this.token },
      {},
      [pid],
      this.onDeleteSuccess,
      this.onDeleteFailed
    );
  }

  onDeleteSuccess(response) {
    this.props.load('', '');
    this.setState({
      unregisteredGroups: response.data.groups,
      unregisteredMembers: response.data.users
    });
  }

  onDeleteFailed(error) {}

  render() {
    const { data, active, onClick, words } = this.props;
    return (
      <li
        role="button"
        className={classnames('align-left member transition-all', {
          'member-active': active
        })}
        onClick={e => {
          onClick(this.props.index, this.props.data);
        }}
      >
        <div className="member-name">
          <div role="button">
            {data.book.play.title}&nbsp;-&nbsp;{data.book.instrument}
          </div>
        </div>
        <div
          onBlur={this.collapse}
          tabIndex="0"
          className={classnames('dropdown member-menu', {
            'dropdown-active': this.state.expanded
          })}
        >
          <button onClick={this.expand} className="dropbtn ">
            <i className="material-icons">more_horiz</i>
          </button>
          <div className="dropdown-content">
            <span className="caret-black" />
            <a
              tabIndex="0"
              role="button"
              className="red-i"
              onClick={() => this.onDelete(data.pid)}
            >
              {words.library_delete_score}
            </a>
          </div>
        </div>
      </li>
    );
  }
}

PurchasedScoreRow.propTypes = propTypes;
PurchasedScoreRow.defaultProps = defaultProps;
export default PurchasedScoreRow;

import React from 'react';
import classnames from 'classnames';

import Presenter from '../../../institution/presenter.js';
import Request from '../../../institution/utils/request.js';

import PresenterGroup from '../../../group/presenter.js';
import RequestGroup from '../../../group/utils/request.js';

import checkSession from '../../../utils/check_session.js';

import AddMemberGroupRow from './AddMemberGroupRow.js';
import Pagination from '../../component/pagination.js';

import Animated from '../../component/animated.js';
import UserSearch from '../../component/userSearch.js';
import { UserList } from '../../component/animation.js';


export default class AddMemberGroupList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth);

    this.state = {
      isLoading: true,
      isError: false,
      rowElement: null,
      limit: 0,
      count: 0,
      currentPage: 0,
      nextLink: null,
      prevLink: null,

      // group id
      gid: this.props.gid,
    }

    this.onReadMemberSuccess = this.onReadMemberSuccess.bind(this);
    this.onReadMemberFailed = this.onReadMemberFailed.bind(this);

    this.onChange = this.onChange.bind(this);
    this.goTo = this.goTo.bind(this);

    this.onAddMember = this.onAddMember.bind(this);
    this.onAddMemberSuccess = this.onAddMemberSuccess.bind(this);
    this.onAddMemberFailed = this.onAddMemberFailed.bind(this);
  }

  // Read
  onReadMember(search, page) {
    Presenter.ReadMember(
      Request.ReadMember(search, page, this, this.onReadMemberSuccess, this.onReadMemberFailed)
    )
  }

  onReadMemberSuccess(params, response) {
    this.setState({
      isLoading: false,
      isError: false,
      limit: response.data.results.length,
      count: response.data.count,
      nextLink: response.data.next,
      prevLink: response.data.previous,
      currentPage: response.data.current,
      rowElement: this.generateRow(response.data.results),
      search: ''
    })

  }

  onReadMemberFailed(error) {
  }

  // add to group
  onAddMember(uid) {
    PresenterGroup.AddMember(
      RequestGroup.AddMember(uid, this, this.onAddMemberSuccess, this.onAddMemberFailed)
    )
  }

  onAddMemberSuccess(params, response) {
  }

  onAddMemberFailed(response) {
  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <AddMemberGroupRow
          rowData={val}
          key={val.uid}
          history={this.props.history}
          addMember={this.onAddMember}
        />
      )
    })
    return element;
  }

  onChange(search) {
    this.setState({
      isLoading: true,
      search: search
    })
    this.onReadMember(search)
  }

  goTo(page) {
    this.setState({
      isLoading: true
    })

    window.scrollTo(0, 0);
    this.onReadMember(this.state.search, page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gid !== null) {
      this.setState({
        gid: nextProps.gid
      })
    }
  }

  componentDidMount() {
    this.onReadMember();
  }

  render() {
    if (!this.loggedIn) return (null);

    const {
      isLoading,
      rowElement,
      count,
      limit,
      currentPage,
      nextLink,
      prevLink
    } = this.state

    return (
      <div className={classnames("animated fadeIn row center-xs hide", { 'show': this.props.display })}>
        <div className="col-xs-12">
          <div className="box">
            <UserSearch
              onChange={this.onChange}
              placeholder="Type member name..."
            />
            <ul className="member-list">
              <Animated total={5} loading={isLoading} count={count} text={'No member found'} animation={<UserList />}>
                {rowElement}
              </Animated>
            </ul>
            <div className="row page-numeration-box">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <Pagination
                  total={count}
                  limit={limit}
                  to={this.goTo}
                  currentPage={currentPage}
                  nextLink={nextLink}
                  prevLink={prevLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

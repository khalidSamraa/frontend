import React from 'react';
import classnames from 'classnames';

import Presenter from '../../../../ensemble/presenter.js';
import Request from '../../../../ensemble/utils/request.js';

import PresenterGroup from '../../../../group/presenter.js';
import RequestGroup from '../../../../group/utils/request.js';

import checkSession from '../../../../utils/check_session.js';

import AddMemberGroupRow from './AddMemberGroupRow.js';

import UserSearch from '../../../component/userSearch.js';
import Animated from '../../../component/animated.js';
import { UserList } from '../../../component/animation.js';

export default class AddMemberGroupList extends React.Component {
  constructor(props) {
    super(props);

    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth);

    this.state = {
      isLoading: true,
      isLoadingLoadMore: false,
      isError: false,
      rowElement: null,
      rawData: [],
      count: 0,
      toggleSearch: false,
      expanded: false,
      groupID: this.props.groupID,
      groupName: this.props.groupName,
      mode: this.props.mode
    }

    // Pagination
    this.limit = 0;
    this.currentPage = 0;
    this.nextLink = null;
    this.prevLink = null;
    this.processing = true;

    // Read Member to Add
    this.onReadMember = this.onReadMember.bind(this);
    this.onReadMemberSuccess = this.onReadMemberSuccess.bind(this);
    this.onReadMemberFailed = this.onReadMemberFailed.bind(this);

    // Read Administrator
    this.onReadAdministratorSuccess = this.onReadAdministratorSuccess.bind(this)
    this.onReadAdministratorFailed = this.onReadAdministratorFailed.bind(this)

    // Read member from group
    this.onReadMemberGroup = this.onReadMemberGroup.bind(this);
    this.onReadMemberGroupSuccess = this.onReadMemberGroupSuccess.bind(this);
    this.onReadMemberGroupFailed = this.onReadMemberGroupFailed.bind(this);

    // Add member to group
    this.onAddMemberToGroup = this.onAddMemberToGroup.bind(this);
    this.onAddMemberToGroupSuccess = this.onAddMemberToGroupSuccess.bind(this);
    this.onAddMemberToGroupFailed = this.onAddMemberToGroupFailed.bind(this);

    // Add member to administator
    this.onAddAdministratorSuccess = this.onAddAdministratorSuccess.bind(this)
    this.onAddAdministratorFailed = this.onAddAdministratorFailed.bind(this)

    // Remove member from group
    this.onRemoveMember = this.onRemoveMember.bind(this);
    this.onRemoveMemberSuccess = this.onRemoveMemberSuccess.bind(this);
    this.onRemoveMemberFailed = this.onRemoveMemberFailed.bind(this);

    this.onRemoveAdministratorSuccess = this.onRemoveAdministratorSuccess.bind(this);
    this.onRemoveAdministratorFailed = this.onRemoveAdministratorFailed.bind(this);

    this.onChange = this.onChange.bind(this);

    this.toggleSearch = this.toggleSearch.bind(this);
    this.reloadMember = this.reloadMember.bind(this);

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)

    this.close = this.close.bind(this)

  }

  toggleSearch() {
    this.setState({ toggleSearch: !this.state.toggleSearch })
  }

  reloadMember() {
    this.onReadMember();
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
      }, 200)
    }
  }

  // Add member to group
  onAddMemberToGroup(uid) {
    const { groupID } = this.props;

    if (groupID === 'administrator') {

      // add member to group administartor
      Presenter.MakeAdministrator(
        Request.MakeAdministrator(uid, this, this.onAddAdministratorSuccess, this.onAddAdministratorFailed)
      )

    } else {

      // add member to other group
      Presenter.AddMemberToGroup(
        Request.AddMemberToGroup(uid, this, this.onAddMemberToGroupSuccess, this.onAddMemberToGroupFailed)
      )
    }

  }

  onAddAdministratorSuccess(params, response) {
    this.props.setCounterFor('administrator_increment')
  }

  onAddAdministratorFailed(error) {
  }

  onAddMemberToGroupSuccess(params, response) {
    const { words } = this.props
    this.onReadMember('', 1, this.state.groupID);

    // increment counter member of other group
    this.props.onRecounterOtherGroup('increment');

    // rebuild component
    this.props.setIsUpdate(true)
  }

  onAddMemberToGroupFailed(error) {
  }

  // Read member from group all to added on group
  onReadMember(search, page, gid) {
    Presenter.ReadMemberGroup(
      Request.ReadMemberGroup(search, page, gid, this, this.onReadMemberSuccess, this.onReadMemberFailed)
    )
  }

  onReadMemberSuccess(params, response) {
    response.data.results = this.sortData(response.data.results);

    if (response.data.current === 1) {
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: response.data.count,
        rowElement: this.generateRow(response.data.results),
        rawData: response.data.results,
        search: ''
      })
    } else {
      let { rawData } = this.state
      rawData = rawData.concat(response.data.results)
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: response.data.count,
        rowElement: [...this.state.rowElement, ...this.generateRow(response.data.results)],
        rawData: rawData,
        search: ''
      })
    }

    // Pagination
    this.limit = response.data.results.length;
    this.currentPage = response.data.current;
    this.nextLink = response.data.next;
    this.prevLink = response.data.previous;
    this.processing = false;
  }

  onReadMemberFailed(error) {
  }

  generateRow(row) {
    const { words } = this.props
    var element = row.map((val, index) => {
      return (
        <AddMemberGroupRow
          rowData={val}
          key={val.uid + index}
          history={this.props.history}
          addMemberToGroup={this.onAddMemberToGroup}
          groupID={this.props.groupID}
          mode={this.props.mode}
          removeMember={this.onRemoveMember}
          index={index}
          words={words}
          onReadMemberGroup={() => this.onReadMemberGroup(this.state.search, this.currentPage, this.state.groupID)}

        />
      )
    })
    return element;
  }

  // Read Members from group And Administrator
  onReadMemberGroup(search, page, gid) {
    if (gid === 'administrator') {

      Presenter.ReadAdministrator(
        Request.ReadAdministrator(search, page, this, this.onReadAdministratorSuccess, this.onReadAdministratorFailed)
      )

    } else {

      PresenterGroup.ReadMember(
        RequestGroup.ReadMember(search, page, gid, this, this.onReadMemberGroupSuccess, this.onReadMemberGroupFailed)
      )

    }
  }

  // Read member from group Administrator
  onReadAdministratorSuccess(params, response) {

    response.data.results = this.sortData(response.data.results);

    if (response.data.current === 1) {
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: response.data.count,
        rowElement: this.generateRow(response.data.results),
        rawData: response.data.results,
        search: ''
      })
    } else {
      let { rawData } = this.state
      rawData = rawData.concat(response.data.results)
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: response.data.count,
        rowElement: [...this.state.rowElement, ...this.generateRow(response.data.results)],
        rawData: rawData,
        search: ''
      })
    }

    // Pagination
    this.limit = response.data.results.length;
    this.currentPage = response.data.current;
    this.nextLink = response.data.next;
    this.prevLink = response.data.previous;
    this.processing = false;
  }

  onReadAdministratorFailed() {

  }

  // Read member from group other
  onReadMemberGroupSuccess(params, response) {
    let count = response.data.count;

    response.data.results = this.sortData(response.data.results);

    if (response.data.current === 1) {
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: count,
        rowElement: this.generateRow(response.data.results),
        rawData: response.data.results,
        search: ''
      })
    } else {
      let { rawData } = this.state
      rawData = rawData.concat(response.data.results)
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: count,
        rowElement: [...this.state.rowElement, ...this.generateRow(response.data.results)],
        rawData: rawData,
        search: ''
      })
    }

    // Pagination
    this.limit = response.data.results.length;
    this.currentPage = response.data.current;
    this.nextLink = response.data.next;
    this.prevLink = response.data.previous;
    this.processing = false;
  }

  onReadMemberGroupFailed(error) {
    this.setState({
      isLoading: false,
      isError: true,
    })
  }

  // Remove member and administator from group
  onRemoveMember(uid) {
    const { groupID } = this.state;

    if (groupID === 'administrator') {
      this.props.setCounterFor('administrator')

      Presenter.RemoveAdministrator(
        Request.RemoveAdministrator(uid, this, this.onRemoveAdministratorSuccess, this.onRemoveAdministratorFailed)
      )
    } else {

      PresenterGroup.RemoveMember(
        RequestGroup.RemoveMember(uid, this, this.onRemoveMemberSuccess, this.onRemoveMemberFailed)
      )
    }
  }

  // remove member
  onRemoveMemberSuccess(params, response) {
    this.onReadMemberGroup(this.state.search, this.currentPage, this.state.groupID)
    this.props.onRecounterOtherGroup('decrement');
    this.props.setIsUpdate(true)
  }

  onRemoveMemberFailed(error) {
  }

  // remove administator
  onRemoveAdministratorSuccess(params, response) {
    this.onReadMemberGroup(this.state.search, this.currentPage, this.state.groupID)
    // Decrement counter
    this.props.setCounterFor('administrator_decrement')
  }

  // remove administator
  onRemoveAdministratorFailed(error) {
  }

  loadingLoadMore() {
    const { words } = this.props
    if (this.state.isLoadingLoadMore) {
      return (
        <div className="text-center loading-text">
          <span>{words.loading}...</span>
        </div>
      )
    } else {
      return (null);
    }
  }

  handleScroll = (event) => {
    let offset = event.currentTarget.scrollTop;
    let height = event.currentTarget.offsetHeight + (window.innerHeight - 500);

    if (this.processing)
      return false;

    if (offset >= height) {
      this.processing = true;
      if (this.nextLink !== null) {
        let nextPage = this.currentPage + 1;
        this.setState({
          isLoadingLoadMore: true
        })

        if (this.props.groupID === 'administrator') {

          if (this.props.mode === 'add') {
            // read member to add
            this.onReadMember('', nextPage, 'administrator');
          }

          if (this.props.mode === 'show') {
            // read member from group
            this.onReadMemberGroup('', nextPage, this.props.groupID);
          }

        } else {

          if (this.props.mode === 'add') {
            // read member to add
            this.onReadMember('', nextPage, this.props.groupID);
          }

          if (this.props.mode === 'show') {
            // read member from group
            this.onReadMemberGroup('', nextPage, this.props.groupID);
          }

        }
      }
      return;
    }
  }

  onChange(search) {
    this.setState({
      isLoading: true,
      search: search
    })

    if (this.props.groupID === 'administrator') {
      this.onReadMemberGroup(search, 1, 'administrator');
    } else {
      this.onReadMemberGroup(search, 1, this.props.groupID);
    }

  }

  sortData(data) {
    if (data.length > 0) {
      data.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      });
    }

    return data;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groupID !== null && nextProps.groupID !== undefined) {

      if (nextProps.mode === 'add') {

        this.onReadMember('', 1, nextProps.groupID);

        this.setState({
          // isLoading: true,
          groupID: nextProps.groupID,
          groupName: nextProps.groupName
        })

      }

      if (nextProps.mode === 'show') {
        this.onReadMemberGroup('', 1, nextProps.groupID);

        this.setState({
          // isLoading: true,
          groupID: nextProps.groupID,
          groupName: nextProps.groupName
        })
      }
    }
  }

  close() {
    this.props.close();
  }

  componentDidMount() {
    clearTimeout(this.timer)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  renderMenu() {
    const { words } = this.props
    return (
      <div className="dropdown-content">
        <span className="caret-black" style={{ 'right': '20px' }}></span>
        <a tabIndex="0" role="button" onClick={() => this.props.setMode("add")}>{words.ensemble_add_member}</a>
      </div>
    )
  }

  render() {
    if (!this.loggedIn) return (null);

    const {
      isLoading,
      isError,
      rowElement,
      count,
      groupName
    } = this.state

    const { show, mode, words } = this.props;

    return (
      <div className={classnames("hide", { 'show': show })}>
        <div className="gi-header">
          <div className="gi-title">{words.ensemble_members_title}</div>
          <div onBlur={this.collapse} tabIndex="0" className={classnames('dropdown member-menu', { 'dropdown-active': this.state.expanded })}>
            {/*<button onClick={this.expand} className="dropbtn menu-header-horiz"><i className="material-icons">more_horiz</i></button>
            {this.renderMenu()}*/}
          </div>
        </div>
        {mode === 'add' ?
          <div className="add-member-to-group">
            {/*<span>{words.ensemble_add_member_to_group} <a className="gname">{groupName}</a></span> */}
            <span>{words.ensemble_add_member_to_group}</span>
            <i className="material-icons" onClick={this.close}>close</i>
          </div>
          : null}
        <div className="row center-xs">
          <div className="col-xs-12">
            <div className="box">
              <UserSearch
                className="search-member"
                onChange={this.onChange}
                placeholder={words.ensemble_field_member_name}
                toggle={this.state.toggleSearch}
                rtl={true}
                words={words}
              />
              <ul className={classnames('member-list scrolled-item w99')} onScroll={this.handleScroll}>
                <Animated total={5} loading={isLoading} error={isError} count={count} text={words.ensemble_member_empty} animation={<UserList />}>
                  {this.generateRow(this.state.rawData)}
                </Animated>
                {this.loadingLoadMore()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

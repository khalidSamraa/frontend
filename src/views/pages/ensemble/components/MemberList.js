import React from 'react';
import classnames from 'classnames';

import Presenter from '../../../../ensemble/presenter.js';
import Request from '../../../../ensemble/utils/request.js';

import checkSession from '../../../../utils/check_session.js';

import MemberRow from './MemberRow.js';
import AddMember from './AddMember.js';

import UserSearch from '../../../component/userSearch.js';
import Animated from '../../../component/animated.js';
import { UserList } from '../../../component/animation.js';

export default class MemberList extends React.Component {
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
      toggleAddMember: false,
      expanded: false,
    }

    // Pagination
    this.limit = 0;
    this.currentPage = 0;
    this.nextLink = null;
    this.prevLink = null;
    this.processing = true;

    this.onReadMemberSuccess = this.onReadMemberSuccess.bind(this);
    this.onReadMemberFailed = this.onReadMemberFailed.bind(this);

    this.onChange = this.onChange.bind(this);

    this.onRemoveMember = this.onRemoveMember.bind(this);
    this.onRemoveMemberSuccess = this.onRemoveMemberSuccess.bind(this);
    this.onRemoveMemberFailed = this.onRemoveMemberFailed.bind(this);

    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleAddMember = this.toggleAddMember.bind(this);
    this.reloadMember = this.reloadMember.bind(this);

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)

  }

  toggleSearch = () => {
    this.setState({ toggleSearch: !this.state.toggleSearch })
  }

  toggleAddMember = () => {
    this.setState({ toggleAddMember: !this.state.toggleAddMember })
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

  // Read
  onReadMember(search, page) {
    Presenter.ReadMember(
      Request.ReadMember(search, page, this, this.onReadMemberSuccess, this.onReadMemberFailed)
    )
  }

  onReadMemberSuccess(params, response) {
    if (response.data.results.length > 0) {
      response.data.results.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      });
    }
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

    this.props.updateMemberCount(response.data.count)

    this.sortData();
  }

  onReadMemberFailed(error) {
  }

  // Remove
  onRemoveMember(email) {
    Presenter.RemoveMember(
      Request.RemoveMember(email, this, this.onRemoveMemberSuccess, this.onRemoveMemberFailed)
    )
  }

  onRemoveMemberSuccess(params, response) {
    this.onReadMember();
  }

  onRemoveMemberFailed(error) {
  }

  generateRow(row) {
    const { words, groupID } = this.props
    var element = row.map((val, index) => {
      return (
        <MemberRow
          groupID={groupID}
          rowData={val}
          key={val.uid + index}
          history={this.props.history}
          removeMember={this.onRemoveMember}
          words={words}
          onReadMember={() => this.onReadMember()}
        />
      )
    })
    return element;
  }

  sortData() {
    if (this.state.rawData.length > 0) {
      this.state.rawData.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      });
      this.forceUpdate();
    }
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

        this.onReadMember('', nextPage);
      }
      return;
    }
  }

  onChange(search) {
    this.setState({
      isLoading: true,
      search: search
    })
    this.onReadMember(search)
  }

  componentDidMount() {
    clearTimeout(this.timer)
    this.onReadMember();
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  renderMenu() {
    const { words } = this.props
    return (
      <div className="dropdown-content">
        <span className="caret-black" style={{ 'right': '20px' }}></span>
        {/*<a tabIndex="0" role="button" onClick={()=>this.props.toggle()}>{words.ensemble_add_member}</a>*/}
        <a tabIndex="0" role="button" onClick={() => this.toggleAddMember()}>{words.ensemble_add_member}</a>
      </div>
    )
  }

  render() {
    if (!this.loggedIn) return (null);

    const {
      isLoading,
      rowElement,
      count,
    } = this.state

    const { showAddMemberGroup, words } = this.props;

    return (
      <div className={classnames("hide", { 'show': !showAddMemberGroup })}>
        <div className="gi-header">
          <div className="gi-title">{words.ensemble_members_title}</div>
          {/*<i className=" material-icons mr-8-i dp26 menu-header-horiz" onClick={()=>this.toggleSearch()} role="button">search</i>*/}
          <div onBlur={this.collapse} tabIndex="0" className={classnames('dropdown member-menu', { 'dropdown-active': this.state.expanded })}>
            {/*<button onClick={this.expand} className="dropbtn menu-header-horiz"><i className="material-icons">more_horiz</i></button>
            {this.renderMenu()}*/}
          </div>
        </div>
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
              <AddMember
                {...this.props}
                show={this.props.open}
                toggle={this.props.toggle}
                reloadMember={this.reloadMember}
                Presenter={Presenter}
                Request={Request}
                words={words}
              />
              <ul className={classnames('member-list scrolled-item w99', { 'hide': this.props.show })} onScroll={this.handleScroll}>
                <Animated total={5} loading={isLoading} count={count} text={'No member found'} animation={<UserList />}>
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

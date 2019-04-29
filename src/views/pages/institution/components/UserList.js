import React from "react";
import classnames from "classnames";

import Presenter from "../../../../institution/presenter.js";
import Request from "../../../../institution/utils/request.js";

import UserRow from "./UserRow.js"
import UserSearch from "../../../component/userSearch.js";

import Animated from "../../../component/animated.js";
import { UserList as UserListAnimated } from "../../../component/animation.js";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      isLoadingLoadMore: false,
      rowElement: null,
      groupID: this.props.groupID,
      count: 0,
    }

    // Pagination
    this.limit = 0;
    this.currentPage = 0;
    this.nextLink = null;
    this.prevLink = null;
    this.processing = true;

    // change search
    this.onChange = this.onChange.bind(this);

    // Read
    this.onReadMemberSuccess = this.onReadMemberSuccess.bind(this);
    this.onReadMemberFailed = this.onReadMemberFailed.bind(this);

    this.onAddMemberToGroup = this.onAddMemberToGroup.bind(this);
    this.onAddMemberToGroupSuccess = this.onAddMemberToGroupSuccess.bind(this);
    this.onAddMemberToGroupFailed = this.onAddMemberToGroupFailed.bind(this);
  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <UserRow
          rowData={val}
          key={val.uid + val.email}
          history={this.props.history}
          removeMember={this.onRemoveMember}
          makeAdministrator={this.onMakeAdministrator}
          addMemberToGroup={this.onAddMemberToGroup}
        />
      )
    })
    return element;
  }

  sortData() {
    console.log("----12131");
    if (this.state.rowElement.length > 0) {
      this.state.rowElement.sort(function (a, b) {
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

  onChange(search) {
    this.setState({
      isLoading: true,
      search: search
    })
    this.onReadMember(search)
  }

  onAddMemberToGroup(uid) {
    Presenter.AddMemberToGroup(
      Request.AddMemberToGroup(uid, this, this.onAddMemberToGroupSuccess, this.onAddMemberToGroupFailed)
    )
  }

  onAddMemberToGroupSuccess(params, response) {
    this.onReadMember();
  }

  onAddMemberToGroupFailed(error) {
  }

  // Read 
  onReadMember(search, page) {
    Presenter.ReadMemberGroup(
      Request.ReadMemberGroup(search, page, this, this.onReadMemberSuccess, this.onReadMemberFailed)
    )
  }

  onReadMemberSuccess(params, response) {
    if (response.data.current === 1) {
      this.setState({
        isLoading: false,
        isLoadingLoadMore: false,
        isError: false,
        rowElement: this.generateRow(response.data.results),
        count: response.data.count,
        search: "",
      })

    } else {
      this.setState({
        isLoading: false,
        isLoadingLoadMore: false,
        isError: false,
        rowElement: [...this.state.rowElement, ...this.generateRow(response.data.results)],
        count: response.data.count,
        search: ""
      })
    }

    // Pagination
    this.limit = response.data.results.length;
    this.currentPage = response.data.current;
    this.nextLink = response.data.next;
    this.prevLink = response.data.previous;
    this.processing = false;
  }

  loadingLoadMore() {
    if (this.state.isLoadingLoadMore) {
      return (
        <div className="text-center loading-text">
          <span>Loading...</span>
        </div>
      )
    } else {
      return (null);
    }
  }

  onReadMemberFailed(error) {
  }

  handleScroll = (event) => {
    let offset = event.currentTarget.scrollTop;
    let height = event.currentTarget.offsetHeight + (window.innerHeight - 300);

    if (this.processing)
      return false;

    if (offset >= height) {
      this.processing = true;

      if (this.nextLink !== null) {
        let nextPage = this.currentPage + 1;
        this.setState({
          isLoadingLoadMore: true
        })
        this.onReadMember("", nextPage);
      }
      return;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.groupID !== null || nextProps.groupID !== undefined) {
      if (this.state.groupID !== nextProps.groupID) {
        this.state.groupID = nextProps.groupID
        this.onReadMember();
        return true;
      }
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.onReadMember();
  }

  render() {

    const { count } = this.state;

    const {
      isLoading,
      rowElement,
    } = this.state


    const { show, toggle } = this.props;

    return (
      <section className={classnames("overlay-page ov-border-right overlay-ease", { "ov-show": show })}>
        <div className="overlay-page-header">
          <div className="drawer-title">
            <div className="pane-header">
              <i className="material-icons btn-back-overlay w-54" role="button" onClick={() => toggle(null)}>arrow_back</i>
              <span className="drawer-title-body">Add member</span>
            </div>
          </div>
        </div>
        <div className="overlay-page-search">
          <UserSearch
            model="overlay"
            onChange={this.onChange}
            placeholder="Type member name..."
          />
        </div>
        <div className="overlay-page-body-list" onScroll={this.handleScroll}>
          <Animated total={4} loading={isLoading} count={count} text={"No member found"} small={true} animation={<UserListAnimated />}>
            {rowElement}
          </Animated>
          {this.loadingLoadMore()}
        </div>
      </section>
    );
  }
}

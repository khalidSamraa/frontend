import React from "react"
import classnames from "classnames"

import Presenter from "../../../../group/presenter.js"
import Request from "../../../../group/utils/request.js"
import checkSession from "../../../../utils/check_session.js"

import GroupRow from "./GroupRow.js"
import AddGroup from "./AddGroup.js"
import AdministratorGroup from "./AdministratorGroup.js"
import AllGroup from "./AllGroup.js"

import Animated from "../../../component/animated.js"
import UserSearch from "../../../component/userSearch.js"
import { UserList } from "../../../component/animation.js"

export default class GroupList extends React.Component {
  constructor(props) {
    super(props)

    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)

    this.state = {
      isLoading: true,
      isLoadingLoadMore: false,
      isError: false,
      rowElement: [],
      rawData: [],
      count: 0,
      memberCount: 0,
      toggleSearch: false,
      toggleAddGroup: false,
      expanded: false,

      key: null,
      name_group: "",
      active: "all",
      name: "new group",
      is_loading: false,
      in_update: false,
    }

    // Pagination
    this.limit = 0
    this.currentPage = 0
    this.nextLink = null
    this.prevLink = null
    this.processing = true
    this.is_proses = true

    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed = this.onReadFailed.bind(this)

    this.onChange = this.onChange.bind(this)

    this.onRemoveGroup = this.onRemoveGroup.bind(this)
    this.onRemoveGroupSuccess = this.onRemoveGroupSuccess.bind(this)
    this.onRemoveGroupFailed = this.onRemoveGroupFailed.bind(this)

    this.toggleSearch = this.toggleSearch.bind(this)
    this.toggleAddGroup = this.toggleAddGroup.bind(this)
    this.reloadGroup = this.reloadGroup.bind(this)

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)
    this.generateRow = this.generateRow.bind(this)

    this.onAddMemberGroup = this.onAddMemberGroup.bind(this)

    this.onRegister = this.onRegister.bind(this)
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this)
    this.onRegisterFailed = this.onRegisterFailed.bind(this)

    this.sortData = this.sortData.bind(this)

  }

  toggleSearch = () => {
    this.setState({ toggleSearch: !this.state.toggleSearch })
  }

  toggleAddGroup = () => {

    this.setState({ toggleAddGroup: !this.state.toggleAddGroup, in_update: true })
    this.onRegister()


  }

  reloadGroup() {
    this.onRead()
  }

  expand(e) {
    this.setState({ expanded: true })
  }

  collapse(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({ expanded: false })
    } else {
      this.timer = setTimeout(() => {
        this.setState({ expanded: false })
      }, 200)
    }
  }

  // Read List Group
  onRead(search, page) {
    Presenter.Read(
      Request.Read(search, page, this, this.onReadSuccess, this.onReadFailed)
    )
  }

  onReadSuccess(params, response) {
    if (response.data.current === 1) {
      this.setState({
        isLoading: false,
        isError: false,
        isLoadingLoadMore: false,
        count: response.data.count,
        rowElement: this.generateRow(response.data.results),
        rawData: response.data.results,
        search: ""
      })
    } else {
      let { rawData } = this.state
      rawData = rawData.concat(response.data.results)
      this.setState({
        isLoading: false,
        isLoadingLoadMore: false,
        isError: false,
        count: response.data.count,
        rowElement: [...this.state.rowElement, ...this.generateRow(response.data.results)],
        rawData: rawData,
        search: "",
      })
    }

    // Pagination
    this.limit = response.data.results.length
    this.currentPage = response.data.current
    this.nextLink = response.data.next
    this.prevLink = response.data.previous
    this.processing = false

    this.sortData();
  }

  onReadFailed(error) {
  }

  // Remove Group
  onRemoveGroup(gid) {
    Presenter.RemoveGroup(
      Request.RemoveGroup(gid, this, this.onRemoveGroupSuccess, this.onRemoveGroupFailed)
    )
  }

  onRemoveGroupSuccess(params, response) {
    this.onRead()
  }

  onRemoveGroupFailed(error) {
  }

  onRegister() {
    // const {Presenter, Request} = this.props

    this.handleDuplicate = false

    this.setState({
      is_loading: true
    })

    Presenter.Register(
      Request.Register(this, this.onRegisterSuccess, this.onRegisterFailed)
    )
  }

  onRegisterSuccess(params, response) {
    this.setState({
      name: "new group",
      is_loading: false,
      active: response.data.gid
    })
    this.is_proses = true
    this.reloadGroup()
    this.scrollToBottom()

    // comment this, for add new group it will acutofocus
    // this.props.toggle()

    // after create group success, automatic will show member of new group
    this.onAddMemberGroup(response.data.gid)
    this.props.setGroupName(response.data.name)
    this.props.setMode("show")
  }

  onRegisterFailed(error) {

    this.setState({
      is_loading: false
    })
    this.is_proses = true
  }

  onAddMemberGroup(gid, defaultGroup = false) {
    let allElement = this.state.rowElement
    let selectedElement = null

    for (let index in allElement) {
      let item = allElement[index]
      if (item.key === this.state.active) {
        allElement[index] = this.renewElement(item, gid)
      }

      if (item.key === gid) {
        allElement[index] = this.renewElement(item, gid)
        selectedElement = allElement[index]
      }
    }

    this.setState({ active: gid, rowElement: allElement })

    if (defaultGroup) {
      this.props.openAddMemberGroup(gid, selectedElement)
    }
  }

  renewElement(data, gid) {
    const { words } = this.props
    if (data.key === "all") {
      return <AllGroup {...this.props}
        show={this.props.show}
        toggle={this.props.toggle}
        count={this.props.memberCount}
        onAddMemberGroup={this.onAddMemberGroup}
        key={"all"}
        active={gid}
        words={words}
      />
    } else if (data.key === "administrator") {
      return <AdministratorGroup {...this.props}
        onAddMemberGroup={this.onAddMemberGroup}
        active={gid}
        key={"administrator"}
        words={words}
      />
    } else {
      return <GroupRow {...this.props}
        rowData={data.props.rowData}
        key={data.props.rowData.gid}
        history={this.props.history}
        removeGroup={this.onRemoveGroup}
        setGroupName={this.props.setGroupName}
        setMode={this.props.setMode}
        countMember={data.props.rowData.members.length}
        onAddMemberGroup={this.onAddMemberGroup}
        counterFor={this.props.counterFor}
        active={gid}
        InstitutionReducer={this.props.InstitutionReducer}
        openGroupRight={this.props.onOpenPermission}
        words={words}
        in_update={this.state.in_update}
        sortData={this.sortData}
      />
    }
  }

  generateRow(row) {
    const { words } = this.props

    var element = row.map((val, index) => {
      return (
        <GroupRow {...this.props}
          rowData={val}
          key={val.gid}
          history={this.props.history}
          removeGroup={this.onRemoveGroup}
          setGroupName={this.props.setGroupName}
          setMode={this.props.setMode}
          countMember={val.members.length}
          onAddMemberGroup={this.onAddMemberGroup}
          counterFor={this.props.counterFor}
          active={this.state.active}
          memberCounterGroup={this.props.memberCounterGroup}
          InstitutionReducer={this.props.InstitutionReducer}
          openGroupRight={this.props.onOpenPermission}
          words={words}
          in_update={this.state.in_update}
          sortData={this.sortData}
        />
      )
    })
    return element
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

  onChange(search) {
    this.setState({
      isLoading: true,
      search: search
    })
    this.onRead(search)
  }

  loadingLoadMore() {
    if (this.state.isLoadingLoadMore) {
      const { words } = this.words
      return (
        <div className="text-center loading-text">
          <span>{words.loading}...</span>
        </div>
      )
    } else {
      return (null)
    }
  }

  handleScroll = (event) => {
    let offset = event.currentTarget.scrollTop
    let height = event.currentTarget.offsetHeight + (window.innerHeight - 300)

    if (this.processing)
      return false

    if (offset >= height) {
      this.processing = true
      if (this.nextLink !== null) {
        let nextPage = this.currentPage + 1
        this.setState({
          isLoadingLoadMore: true
        })

        this.onRead("", nextPage)
      }
      return
    }
  }

  scrollToBottom = () => {
    this.groupEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.toggleAddMemberGroup) {
      this.onAddMemberGroup("all", false)
    }

    if (this.state.active !== "all" || this.state.active !== "administrator") {
      if (nextProps.isUpdate) {
        this.onAddMemberGroup(this.state.active, false)
        this.props.setIsUpdate(false)
      }
    }

    if (this.state.memberCount === 0) {
      this.setState({
        memberCount: nextProps.memberCount
      })
    }
  }

  componentDidMount() {
    clearTimeout(this.timer)
    this.onRead()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  renderMenu() {
    const { words } = this.props
    return (
      <div className="dropdown-content" style={{ "right": "20px" }}>
        <span className="caret-black" ></span>
        <a tabIndex="0" id="add_group" role="button" onClick={() => this.toggleAddGroup()}>{words.institution_add_group}</a>
      </div>
    )
  }

  render() {
    if (!this.loggedIn) return (null)
    const { words } = this.props
    const {
      isLoading,
      rowElement,
      count,
    } = this.state

    return (
      <div className="animated fadeIn">
        <div className="gi-header">
          <div className="gi-title cursor">{words.institution_groups}</div>
          {/* <div onBlur={this.collapse} tabIndex="0" className={classnames("dropdown member-menu", { "dropdown-active": this.state.expanded })}>
            <button onClick={this.expand} className="dropbtn menu-header-horiz"><i className="material-icons">more_horiz</i></button>
            {this.renderMenu()}
          </div> */}
          <a className='btn black small' tabIndex="0" id="add_group" role="button" onClick={() => this.toggleAddGroup()}>{words.institution_add_group}</a>
        </div>
        <div className="row center-xs">
          <div className="col-xs-12">
            <div className="box">
              <UserSearch
                onChange={this.onChange}
                placeholder={words.institution_field_group_name}
                toggle={this.state.toggleSearch}
                words={words}
              />

              <ul className="member-list scrolled-item" onScroll={this.handleScroll}>
                <AllGroup {...this.props}
                  show={this.props.show}
                  toggle={this.props.open}
                  count={this.props.memberCount}
                  onAddMemberGroup={this.onAddMemberGroup}
                  key={"all"}
                  active={this.state.active}
                  words={words}
                />
                <AdministratorGroup {...this.props}
                  onAddMemberGroup={this.onAddMemberGroup}
                  active={this.state.active}
                  key={"administrator"}
                  words={words}
                />
                {Object.keys(this.state.rawData).length > 0 &&
                  <Animated total={5} loading={isLoading} count={count} text={null} animation={<UserList />}>
                    {this.generateRow(this.state.rawData)}
                  </Animated>
                }
                <li ref={(el) => { this.groupEnd = el; }}></li>
              </ul>
              {this.loadingLoadMore()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

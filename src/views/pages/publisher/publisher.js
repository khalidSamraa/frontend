import React, { Component } from "react"
import classnames from "classnames"

import checkSession from "../../../utils/check_session.js"
import { RemovePublisherSession, UpdatePublisherSession } from "../../../redux/account/publisher/presenter.js"

// component
import GroupList from "./components/GroupList.js"
import GroupRow from "./components/GroupRow.js"
import MemberList from "./components/MemberList.js"
import AddMemberGroupList from "./components/AddMemberGroupList.js"
import Request from "../../../utils/Request.js"

import PermissionList from "./components/PermissionList.js"


class PublisherScreen extends Component {
  constructor(props) {
    super(props)

    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)
    this.loggedInPublisher = checkSession.isLoggedIn(props.history, props.PublisherReducer.is_auth)
    this.selectedGroupComponent = null

    this.state = {
      memberCount: 0,
      toggleAddMember: false,
      addMemberGroup: false,
      groupID: null,
      groupName: "",
      mode: "add",
      counterFor: null,
      isUpdate: false,
      publisherName: props.PublisherReducer && props.PublisherReducer.publisher && props.PublisherReducer.publisher.name,
      publisherNewName: props.PublisherReducer && props.PublisherReducer.publisher && props.PublisherReducer.publisher.name,
      isUpdatePublisher: false,
      disabledUpdate: false,

      showPermission: false,
      selectedGroup: null,
      open: false
    }
  }

  toggleUpdatePublisher = () => {
    this.setState({
      isUpdatePublisher: !this.state.isUpdatePublisher,
      publisherNewName: this.state.publisherName,
    })
  }

  onRemovePublisher = () => {
    const { words } = this.props.ActiveLanguageReducer
    let confirm = window.confirm(words.publisher_delete_confirmation)
    if (confirm == true) {
      Request(
        "delete",
        "publisher-remove",
        { Authorization: "Token " + this.props.TokenReducer.tokenPublisher },
        {},
        [],
        this.onRemovePublisherSuccess,
        this.onRemovePublisherFailed
      )
    }
  }

  onRemovePublisherSuccess = (response) => {
    this.props.RunRedux(RemovePublisherSession())
    this.props.history.push("/manage-publisher")
  }

  onRemovePublisherFailed = (error) => {
    const { words } = this.props.ActiveLanguageReducer
  }

  handleChangePublisher = (e) => {
    if (e.target.value.trim() !== "") {
      this.setState({
        publisherNewName: e.target.value,
        disabledUpdate: false,
      })
    } else {
      this.setState({
        disabledUpdate: true
      })
    }
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (this.state.publisherNewName.trim() !== "") {
        this.preparingUpdate(this.state.publisherNewName)
      }
    }
  }

  onUpdatePublisher = () => {
    const { publisherName, publisherNewName } = this.state
    if (publisherName === publisherNewName) {
      this.toggleUpdatePublisher()
    } else {
      this.preparingUpdate(this.state.publisherNewName)
    }
  }

  preparingUpdate = (name = "") => {
    this.setState({ disabledUpdate: true })
    let data = {
      headers: {
        Authorization: "Token " + this.props.TokenReducer.tokenPublisher
      },
      payloads: {
        name: name,
      }
    }
    Request(
      "patch",
      "publisher-update",
      data.headers,
      data.payloads,
      [],
      this.onUpdatePublisherSuccess,
      this.onUpdatePublisherFailed
    )
  }

  onUpdatePublisherSuccess = (response) => {
    this.props.RunRedux(UpdatePublisherSession(response.data))
    this.setState({ publisherName: response.data.name })
    this.toggleUpdatePublisher()
  }

  onUpdatePublisherFailed = () => {
  }

  setIsUpdate = (bool) => {
    this.setState({
      isUpdate: bool
    })
  }

  /***
  * Set mode for change component
  *
  * {mode : add}  = for add member to group
  * {mode : show} = for show member of group
  *
  */
  setMode = (mode) => {
    this.setState({ mode: mode })
  }

  setCounterFor = (c) => {
    this.setState({
      counterFor: c
    })
  }

  setGroupName = (name) => {
    this.setState({ groupName: name })
  }

  toggleAddMember = () => {
    this.setState({ toggleAddMember: !this.state.toggleAddMember })
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  openAddMemberGroup = (gid, component) => {
    this.selectedGroupComponent = component

    this.setState({
      addMemberGroup: true,
      groupID: gid
    })
  }

  closeAddMemberGroup = () => {
    this.setState({
      addMemberGroup: false,
      // groupID        : null
    })
  }

  updateMemberCount = (count) => {
    this.setState({ memberCount: count })
  }

  onRecounterOtherGroup = (method) => {
    if (this.selectedGroupComponent) {
      let objKey = this.selectedGroupComponent.key
      if (objKey !== "all" && objKey !== "administrator") {
        let data = this.selectedGroupComponent.props.rowData

        if (method === "decrement") {
          data.members.pop()
        } else {
          data.members.push(1)
        }

        this.selectedGroupComponent = (<GroupRow rowData={data} />)
      }
    }
  }

  closePermission = () => {
    this.setState({
      showPermission: false,
      selectedGroup: null,
    })
  }

  openPermission = (group, open) => {
    let { showPermission } = this.state
    if (!showPermission && open !== undefined) {
      return
    }

    this.setState({
      showPermission: true,
      selectedGroup: group,
    })
  }

  render() {
    // Check if login session null or not login
    if (!this.loggedIn) return (null)

    // Check if session isntitution or not swith to insitution
    if (!this.loggedInPublisher) return (null)

    const { words } = this.props.ActiveLanguageReducer
    const { isUpdatePublisher, disabledUpdate } = this.state

    return (
      <div className='group-page'>
        <section className="user-content institution-content">
          <div className="container">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-2 musinote-center institution-name-header">

              </div>
              <div className="col-md-8 col-sm-8 col-xs-8 musinote-center institution-name-header">
                <h3 className="no-margin full-width">
                  {!isUpdatePublisher ? <small>{words.header_manage}</small> :
                    <small>
                      <input
                        type="text"
                        defaultValue={this.state.publisherNewName}
                        onChange={this.handleChangePublisher}
                        onKeyPress={this.handleKeyPress}
                        maxLength={16}
                      />
                      <button className="btn-arb-big" onClick={this.onUpdatePublisher} disabled={disabledUpdate}>update</button>
                      <button className="btn-arb-big red-i" onClick={this.toggleUpdatePublisher}>cancel</button>
                    </small>
                  }
                </h3>
              </div>
              {/* <div className="col-md-2 col-sm-2 col-xs-2 center-content">
                <div>
                  <Options items={[{text: words.publisher_delete, onClick: this.onRemovePublisher, className: "red-i"}]} iconClassName={"md-icon"} />
                </div>
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12" style={{padding: '0 30px'}}>
                <GroupList {...this.props}
                  show={this.state.toggleAddMember}
                  open={this.toggleOpen}
                  toggle={this.toggleAddMember}
                  memberCount={this.state.memberCount}
                  openAddMemberGroup={this.openAddMemberGroup}
                  toggleAddMemberGroup={this.state.addMemberGroup}
                  groupID={this.state.groupID}
                  setGroupName={this.setGroupName}
                  groupActive={this.state.groupActive}
                  setMode={this.setMode}
                  closeAddMemberGroup={this.closeAddMemberGroup}
                  counterFor={this.state.counterFor}
                  setCounterFor={this.setCounterFor}
                  isUpdate={this.state.isUpdate}
                  setIsUpdate={this.setIsUpdate}
                  onOpenPermission={this.openPermission}
                  words={this.props.ActiveLanguageReducer.words}
                />
              </div>
              <div className={classnames("col-md-6 col-xs-12", { "hide": this.state.showPermission })} style={{padding: '0 30px'}}>
                <MemberList {...this.props}
                  open={this.state.open}
                  show={this.state.toggleAddMember}
                  toggle={this.toggleOpen}
                  updateMemberCount={this.updateMemberCount}
                  groupID={this.state.groupID}

                  showAddMemberGroup={this.state.addMemberGroup}
                  words={this.props.ActiveLanguageReducer.words}
                />
                <AddMemberGroupList {...this.props}
                  show={this.state.addMemberGroup}
                  open={this.openAddMemberGroup}
                  close={this.closeAddMemberGroup}
                  groupID={this.state.groupID}
                  groupName={this.state.groupName}
                  mode={this.state.mode}
                  setMode={this.setMode}
                  updateMemberCount={this.updateMemberCount}
                  counterFor={this.state.counterFor}
                  setCounterFor={this.setCounterFor}
                  onRecounterOtherGroup={this.onRecounterOtherGroup}
                  setIsUpdate={this.setIsUpdate}
                  words={this.props.ActiveLanguageReducer.words}
                />
              </div>
              <PermissionList
                show={this.state.showPermission}
                group={this.state.selectedGroup}
                onClose={this.closePermission}
                words={this.props.ActiveLanguageReducer.words}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default PublisherScreen;
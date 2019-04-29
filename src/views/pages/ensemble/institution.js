import React, { Component } from "react"
import { connect } from "react-redux"
import classnames from "classnames"

import checkSession from "../../../utils/check_session.js"
import { RemoveEnsembleSession, UpdateEnsembleSession } from "../../../redux/account/ensemble/presenter.js"

// component
import GroupList from "./components/GroupList.js"
import GroupRow from "./components/GroupRow.js"
import MemberList from "./components/MemberList.js"
import AddMemberGroupList from "./components/AddMemberGroupList.js"
import UserList from "./components/UserList.js"
import Options from "../../component/Option/Options.js"
import Request from "../../../utils/Request.js"

import PermissionList from "./components/PermissionList.js"

class Institution extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.PermissionsReducer);
    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)
    this.loggedInInstitution = checkSession.isLoggedIn(props.history, props.EnsembleReducer.is_auth)
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
      ensembleName: this.props.EnsembleReducer && this.props.EnsembleReducer.ensemble && this.props.EnsembleReducer.ensemble.name,
      ensembleNewName: this.props.EnsembleReducer && this.props.EnsembleReducer.ensemble && this.props.EnsembleReducer.ensemble.name,
      isUpdateInstitution: false,
      disabledUpdate: false,
      open: false,

      showPermission: false,
      selectedGroup: null,
    }

    this.updateMemberCount = this.updateMemberCount.bind(this)
    this.toggleAddMember = this.toggleAddMember.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)

    this.openAddMemberGroup = this.openAddMemberGroup.bind(this)
    this.closeAddMemberGroup = this.closeAddMemberGroup.bind(this)
    this.onRecounterOtherGroup = this.onRecounterOtherGroup.bind(this)

    this.setGroupName = this.setGroupName.bind(this)
    this.setMode = this.setMode.bind(this)

    // updating recounter for administrator or other group
    this.setCounterFor = this.setCounterFor.bind(this)
    this.setIsUpdate = this.setIsUpdate.bind(this)
    // this.selectedGroupComponent = this.selectedGroupComponent.bind(this)

    this.onRemoveInstitution = this.onRemoveInstitution.bind(this)
    this.onRemoveInstitutionSuccess = this.onRemoveInstitutionSuccess.bind(this)
    this.onRemoveInstitutionFailed = this.onRemoveInstitutionFailed.bind(this)

    this.onUpdateInstitution = this.onUpdateInstitution.bind(this)
    this.onUpdateInstitutionSuccess = this.onUpdateInstitutionSuccess.bind(this)
    this.onUpdateInstitutionFailed = this.onUpdateInstitutionFailed.bind(this)
    this.toggleUpdateInstitution = this.toggleUpdateInstitution.bind(this)
    this.handleChangeInstitution = this.handleChangeInstitution.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.openPermission = this.openPermission.bind(this)
    this.closePermission = this.closePermission.bind(this)
  }

  toggleUpdateInstitution() {
    this.setState({
      isUpdateInstitution: !this.state.isUpdateInstitution,
      ensembleNewName: this.state.ensembleName,
    })
  }

  onRemoveInstitution() {
    const { words } = this.props.ActiveLanguageReducer
    let confirm = window.confirm(words.ensemble_delete_confirmation)
    if (confirm == true) {
      Request(
        "delete",
        "ensemble-remove",
        { Authorization: "Token " + this.props.TokenReducer.tokenEnsemble },
        {},
        [],
        this.onRemoveInstitutionSuccess,
        this.onRemoveInstitutionFailed
      )
    }
  }

  onRemoveInstitutionSuccess(response) {
    this.props.RunRedux(RemoveEnsembleSession())
    this.props.history.push("/manage-ensemble")
  }

  onRemoveInstitutionFailed(error) {
  }

  handleChangeInstitution(e) {
    if (e.target.value.trim() !== "") {
      this.setState({
        ensembleNewName: e.target.value,
        disabledUpdate: false,
      })
    } else {
      this.setState({
        disabledUpdate: true
      })
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (this.state.ensembleNewName.trim() !== "") {
        this.preparingUpdate(this.state.ensembleNewName)
      }
    }
  }

  onUpdateInstitution() {
    const { ensembleName, ensembleNewName } = this.state
    if (ensembleName === ensembleNewName) {
      this.toggleUpdateInstitution()
    } else {
      this.preparingUpdate(this.state.ensembleNewName)
    }
  }

  preparingUpdate(name = "") {
    this.setState({ disabledUpdate: true })
    let data = {
      headers: {
        Authorization: "Token " + this.props.TokenReducer.tokenEnsemble
      },
      payloads: {
        name: name,
      }
    }
    Request(
      "patch",
      "ensemble-update",
      data.headers,
      data.payloads,
      [],
      this.onUpdateInstitutionSuccess,
      this.onUpdateInstitutionFailed
    )
  }

  onUpdateInstitutionSuccess(response) {
    this.props.RunRedux(UpdateEnsembleSession(response.data))
    this.setState({ ensembleName: response.data.name })
    this.toggleUpdateInstitution()
  }

  onUpdateInstitutionFailed(error) {
  }

  setIsUpdate(bool) {
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
  setMode(mode) {
    this.setState({ mode: mode })
  }

  setCounterFor(c) {
    this.setState({
      counterFor: c
    })
  }

  setGroupName(name) {
    this.setState({ groupName: name })
  }

  toggleAddMember() {
    this.setState({ toggleAddMember: !this.state.toggleAddMember })
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  openAddMemberGroup(gid, component) {
    this.selectedGroupComponent = component

    this.setState({
      addMemberGroup: true,
      groupID: gid
    })
  }

  closeAddMemberGroup() {
    this.setState({
      addMemberGroup: false,
      // groupID        : null
    })
  }

  updateMemberCount(count) {
    this.setState({ memberCount: count })
  }

  onRecounterOtherGroup(method) {
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

  closePermission() {
    this.setState({
      showPermission: false,
      selectedGroup: null,
    })
  }

  openPermission(group, open) {
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
    if (!this.loggedInInstitution) return (null)

    const props = this.props
    const { words } = this.props.ActiveLanguageReducer
    const { ensembleName, isUpdateInstitution, disabledUpdate } = this.state
    return (
      <div className='group-page'>
        <section className="user-content institution-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 musinote-center institution-name-header">
                <h3 className="no-margin full-width">
                  {!isUpdateInstitution ? <small>{words.header_manage}</small> :
                    <small>
                      <input
                        type="text"
                        defaultValue={this.state.ensembleNewName}
                        onChange={this.handleChangeInstitution}
                        onKeyPress={this.handleKeyPress}
                        maxLength={16}
                      />
                      <button className="btn-arb-big" onClick={this.onUpdateInstitution} disabled={disabledUpdate}>update</button>
                      <button className="btn-arb-big red-i" onClick={this.toggleUpdateInstitution}>cancel</button>
                    </small>
                  }
                </h3>
              </div>
              {/* <div className="col-md-2 col-sm-2 col-xs-2 center-content">
                <div>
                  <Options items={[{text: words.ensemble_delete, onClick: this.onRemoveInstitution, className: "red-i"}]} iconClassName={"md-icon"} />
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
                  words={words}
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
                  words={words}
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
                  words={words}
                />
              </div>
              <PermissionList
                show={this.state.showPermission}
                group={this.state.selectedGroup}
                onClose={this.closePermission}
                words={words}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    EnsembleReducer: state.EnsembleReducer,
    PermissionsReducer: state.PermissionsReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Institution)

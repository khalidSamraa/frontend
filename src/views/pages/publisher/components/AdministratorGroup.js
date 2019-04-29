import React from "react"
import classnames from "classnames"

import Presenter from "../../../../publisher/presenter.js"
import Request from "../../../../publisher/utils/request.js"

export default class AdministratorGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      rowElement: "",
      count: 0,
    }

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)
    this.addMember = this.addMember.bind(this)
    this.showGroupMember = this.showGroupMember.bind(this)

    this.counterIncrement = this.counterIncrement.bind(this)
    this.counterDecrement = this.counterDecrement.bind(this)

    this.onReadAdministratorSuccess = this.onReadAdministratorSuccess.bind(this)
    this.onReadAdministratorFailed = this.onReadAdministratorFailed.bind(this)
  }

  counterIncrement() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  counterDecrement() {
    this.setState(prevState => ({
      count: prevState.count - 1
    }))
  }

  expand(e) {
    e.stopPropagation()

    this.setState({expanded: true})
  }

  collapse(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({expanded: false})
    } else {
      this.timer = setTimeout(() => {
        this.setState({expanded: false})
      }, 200)
    }
  }

  onReadAdministrator(search, page) {
    Presenter.ReadAdministrator(
      Request.ReadAdministrator(search, page, this, this.onReadAdministratorSuccess, this.onReadAdministratorFailed)
    )
  }

  onReadAdministratorSuccess(params, response) {
    this.setState({
      count: response.data.count,
      // rowElement : this.generateRow(response.data.results),
    })
  }

  onReadAdministratorFailed(error) {

  }

  addMember(e) {
    e.stopPropagation()

    this.props.onAddMemberGroup("administrator", true)
    this.props.setGroupName("Administrators")

    // Set mode to add member
    this.props.setMode("add")
  }

  showGroupMember() {
    this.props.onAddMemberGroup("administrator", true)
    this.props.setGroupName("Administrators")

    // Set mode to show group member
    this.props.setMode("show")
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.counterFor === "administrator_increment") {
      this.counterIncrement()
      this.props.setCounterFor(null)
    }

    if(nextProps.counterFor === "administrator_decrement") {
      this.counterDecrement()
      this.props.setCounterFor(null)
    }
  }

  componentDidMount() {
    this.onReadAdministrator()
  }

  render() {
    const {expanded, count} = this.state
    const {active, words} = this.props

    return (
      <li onClick={this.showGroupMember} role="button" className={classnames("member transition-all", {"member-active" : active === "administrator" })}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="member-avatar uppercase">A</div>
          <div className="member-name">{words.publisher_administrators}</div>
          <div className="member-email-info">
            <a className="member-email link-member">({count})</a>
          </div>
        </div>
        {/* <div onBlur={ this.collapse } className={classnames("dropdown member-menu", {"dropdown-active":expanded})}>
          <button onClick={this.expand} className="dropbtn "><i className="material-icons">more_horiz</i></button>
          <div className="dropdown-content">
            <span className="caret-black"></span>
            <a tabIndex="0" role="button" onClick={this.addMember}>{words.group_add_member}</a>
          </div>
        </div> */}
        <a className='btn black small' tabIndex="0" role="button" onClick={this.addMember}>{words.group_add_member}</a>
      </li>
    )
  }
}

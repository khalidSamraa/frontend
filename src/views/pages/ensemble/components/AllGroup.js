import React from "react"
import classnames from "classnames"

export default class AllGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded   : false,
    }

    this.expand          = this.expand.bind(this)
    this.collapse        = this.collapse.bind(this)
    this.addMember       = this.addMember.bind(this)
    this.showGroupMember = this.showGroupMember.bind(this)
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

  addMember(e) {
    e.stopPropagation()
    this.props.closeAddMemberGroup()
    this.props.toggle()
  }

  showGroupMember() {
    this.props.closeAddMemberGroup()
  }

  render() {
    const {expanded} = this.state
    const {count, active, words} = this.props
    return (
      <li onClick={this.showGroupMember} role="button" className={classnames("member transition-all", {"member-active" : active === "all" })}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="member-avatar uppercase">A</div>
          <div className="member-name" role="button">{words.ensemble_all}</div>
          <div className="member-email-info">
            <small className="member-email">({count})</small>
          </div>
        </div>
        {/* <div onBlur={ this.collapse } className={classnames("dropdown member-menu", {"dropdown-active":expanded})}>
          <button onClick={this.expand} className="dropbtn "><i className="material-icons">more_horiz</i></button>
          <div className="dropdown-content">
            <span className="caret-black"></span>
          </div>
        </div> */}
        <a className='btn black small' tabIndex="0" role="button" onClick={this.addMember}>{words.group_add_member}</a>
      </li>
    )
  }
}

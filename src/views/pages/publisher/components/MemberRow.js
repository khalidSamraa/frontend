import React from "react"
import classnames from "classnames"
import getFirstCaracter from "../../../../utils/get_first_caracter.js"


export default class MemberRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded   : false,
    }

    this.expand     = this.expand.bind(this)
    this.collapse   = this.collapse.bind(this)

  }

  expand(e) {
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

  componentWillMount() {
    clearTimeout(this.timer)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  renderMenu(rowData) {
    const { words } = this.props
    return (
      <div className="dropdown-content" style={{"minWidth": "200px"}}>
        <span className="caret-black"></span>
        <a tabIndex="0" role="button" className="red-i" onClick={()=>this.props.removeMember(rowData.email)}>{words.publisher_delete_member}</a>
      </div>
    )
  }

  render() {
    const {rowData, PublisherReducer, words} = this.props
    let meta, name, avatar

    if(rowData.name === "") {
      avatar = <i className="material-icons avatar-visible">person</i>
      name = <span>-</span>
      meta = <span className="meta-not-register">{words.publisher_member_not_registered}</span>
    } else {
      avatar = <span className="uppercase">{getFirstCaracter(rowData.name)}</span>
      name = <span>{rowData.name}</span>
      if(rowData.is_admin) {
        meta = <span className="meta-admin">{words.publisher_admin}</span>
      }
    }


    return ( 
      <div className="m-l">
        <li className="member transition-all m-p-15"> 
          <div className="overlay-page-body-row">
            <div className="avatar-row">
              <div className="avatar">
                {avatar}
              </div>
            </div>
            <div className="body-list-inside">
              <div className="body-list-inside-main">
                <div className="body-list-inside-title">
                  {name}
                </div>
                <div className="body-list-inside-meta">
                  {meta}
                </div>
              </div>
              <div className="body-list-inside-secondary">
                <span>{rowData.email}</span>
                <ul>
                  {rowData.interests && rowData.interests.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
                {PublisherReducer.is_admin &&
                  <div onBlur={this.collapse} tabIndex="0" className={classnames("dropdown member-menu", {"dropdown-active":this.state.expanded})}>
                    <button onClick={this.expand} className="dropbtn "><i className="material-icons">more_horiz</i></button>
                    {this.renderMenu(rowData)}
                  </div>
                }
              </div>
            </div>
          </div>  
        </li>
      </div>
    )
  }
}

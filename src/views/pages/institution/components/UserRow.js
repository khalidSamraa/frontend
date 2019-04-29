import React from "react"
import getFirstCaracter from "../../../../utils/get_first_caracter.js"

export default class UserRow extends React.Component {

  render() {
    const {rowData} = this.props

    let meta, name, avatar, is_member, buttonAdd

    if(rowData.name === "") {
      avatar    = <i className="material-icons avatar-visible">music_note</i>
      name      = <span>-</span>
      meta      = <span className="meta-not-register">user not registered</span>
    } else {
      avatar    = <span className="uppercase">{getFirstCaracter(rowData.name)}</span>
      name      = <span>{rowData.name}</span>
      meta      = <span className="meta-admin">admin</span>
    }

    if(rowData.is_member) {
      is_member = <span>Already on the group</span>
      buttonAdd = null
    } else {
      is_member = <span></span>
      buttonAdd = <button className="btn-add-member" onClick={()=>this.props.addMemberToGroup(rowData.uid)}>Add</button>
    }

    return (
      <div>
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
                {is_member}
              </div>
            </div>
            <div className="body-list-inside-secondary">
              <span>{rowData.email}</span>
              <ul>
                {rowData.interests && rowData.interests.map((item) => {
                    return <li>{item}</li>;
                })}
              </ul>
              {buttonAdd}
            </div>
          </div>
        </div>  
      </div>

    )
  }
}

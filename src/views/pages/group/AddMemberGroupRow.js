import React from 'react';
import classnames from 'classnames'

export default class AddMemberGroupRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded   : false,
    }

    this.expand   = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)
   
  }

  expand(e) {
    this.setState({expanded: true});
  }

  collapse(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({expanded: false});
     } else {
      this.timer = setTimeout(() => {
        this.setState({expanded: false});
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
    return (
      <div className="dropdown-content">
        <span className="caret-black"></span>
        {/*<a tabIndex="0" role="button">Make a admin</a>*/}
        <a tabIndex="0" role="button" onClick={()=>this.props.addMember(rowData.uid)}>Add to group</a>
      </div>
    )
  }

  renderButton(rowData) {
    const {expanded} = this.state;
    return (
      <div onBlur={this.collapse} tabIndex="0" className={classnames('dropdown member-menu', {'dropdown-active':expanded})}>
        <button onClick={this.expand} className="dropbtn "><i className="material-icons">more_horiz</i></button>
          {this.renderMenu(rowData)}
      </div>
    )
  }

  render() {
    const {rowData} = this.props;
    
    return (
      <li className="member transition-all" >
        <div className="group-member">
          <div className="member-name">{rowData.name}</div>
          <div className="member-email-info">
            <small className="member-email">{rowData.email}</small>
            { rowData.name === '' &&
              <small className="member-email-not-register">user not registered</small>
            }
        </div>
        </div>
        {this.renderButton(rowData)}
      </li>
    );
  }
}

import React from "react"
import classnames from "classnames"
import getFirstCaracter from "../../../../../utils/get_first_caracter.js"

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInterests, loadInterests } from "./../../../../../redux/actions/InterestsAction.js";
import Auth from '../../../../../redux/account/authToken';
import DropDownDynamic from '../../../../component/DropDownDynamic'

import './styles.css';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class AddMemberGroupRow extends React.Component {
  constructor(props) {
    super(props)

    let interestsMap = props.interests.reduce(function(acc, cur, i) {
      acc[cur.name.toLowerCase()] = cur.id;
      return acc;
    }, {});

    this.state = {
      expanded: false,
      gid: props.rowData.gid
    }

    if (props.rowData.interests) {
      this.state.interests = props.rowData.interests.map((item) => {
        return { value: interestsMap[item.toLowerCase()], label: capitalizeFirstLetter(item), checked: true}
      })
    }

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)
    this.addToGroup = this.addToGroup.bind(this)
  }

  componentDidMount () {
    this.props.loadInterests(Auth)
  }


  handleInterestsChange = (userId, groupId) => (data) => {
    this.setState({
      interests: data
    });
    this.props.updateInterests(userId, groupId, data.map((item) => {
      return { id: item.value, name: item.label }
    }));
    setTimeout(() => {
        this.props.onReadMemberGroup()
      }, 1000)
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

  addToGroup() {
    const {groupID, rowData} = this.props
    if(groupID === "administrator") {
      // add member to group administartor
      this.props.addMemberToGroup(rowData.uid)
    } else {
      // add member to other group
      this.props.addMemberToGroup(rowData.uid)
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
      <DropDownDynamic
        triger={<button className="dropbtn "><i className="material-icons">more_horiz</i></button>}
        innerDropDown={
          {
            options: this.props.interests.map((item) => {
              return { value: item.id, label: item.name }
            }),
            multi: true,
            label: 'Interests ..',
            data: this.state.interests,
            onChange: this.handleInterestsChange(this.props.rowData.uid, this.props.groupID)
          }
        }
      >
        <div className="dropdown-content">
          <span className="caret-black"></span>
          <a tabIndex="0" role="button" className="red-i" onClick={()=>this.props.removeMember(rowData.uid)}>{words.institution_add_member}</a>
        </div>
      </DropDownDynamic>
    )
  }

  render() {
    const {rowData, mode, groupID, InstitutionReducer, words} = this.props
    let meta, name, avatar
    console.log('this.props.groupID: ', this.props.groupID);
    
    if(rowData.name === "") {
      avatar = <i className="material-icons avatar-visible">person</i>
      name = <span>-</span>
      meta = <span className="meta-not-register">{words.institution_member_not_registered}</span>
    } else {
      avatar = <span className="uppercase">{getFirstCaracter(rowData.name)}</span>
      name = <span>{rowData.name}</span>
      if(rowData.is_admin || groupID === "administrator") {
        meta = <span className="meta-admin">{words.institution_admin}</span>
      }
    }

    return (
      <div className="m-l">
        <li className="member transition-all m-p-15">
          <div className="overlay-page-body-row">
            {mode === "add" &&
              <button className="btn-add-large" onClick={this.addToGroup}><i className="material-icons">add</i></button>
            }
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
              <div className={classnames("body-list-inside-secondary", "interests")}>
                <span>{rowData.email}</span>
                <ul>
                  {rowData && rowData.interests && rowData.interests.map((item) => {
                    return <li key={item}>{item}</li>
                  })}
                </ul>
                {mode === "show" && InstitutionReducer.is_admin &&
                  <div onBlur={this.collapse} tabIndex="0" className={classnames("dropdown member-menu", {"dropdown-active":this.state.expanded})}>
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

const mapStateToProps = state => {
  return {
    interests: state.InterestsReducer.interests
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    updateInterests,
    loadInterests
  }, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(AddMemberGroupRow);
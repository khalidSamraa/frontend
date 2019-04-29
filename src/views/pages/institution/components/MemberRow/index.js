import classnames from "classnames";
import React from "react";
import getFirstCaracter from "./../../../../../utils/get_first_caracter.js";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateInterests, loadInterests } from "./../../../../../redux/actions/InterestsAction.js";
import InterestsMultiselect from './../../../group/InterestsMultiselect';
import './styles.css';
import DropDownDynamic from '../../../../component/DropDownDynamic'
import auth from "../../../../../redux/account/authToken";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class MemberRow extends React.Component {
  constructor(props) {
    super(props)

    let interestsMap = props.interests.reduce(function(acc, cur, i) {
      acc[cur.name.toLowerCase()] = cur.id;
      return acc;
    }, {});

    this.state = {
      expanded: false
    }

    if (props.rowData.interests) {
      this.state.interests = props.rowData.interests.map((item) => {
        return { value: interestsMap[item.toLowerCase()], label: capitalizeFirstLetter(item), checked: true}
      })
    }

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)

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

  componentDidMount () {
    this.props.loadInterests(auth);
  }

  componentWillMount() {
    clearTimeout(this.timer)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleInterestsChange = (userId, groupId) => (data) => {
    this.setState({
      interests: data
    });
    this.props.updateInterests(userId, groupId, data.map((item) => {
      return { id: item.value, name: item.label }
    }));
    setTimeout(() => {
      this.props.onReadMember()
  }, 1000)
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
        <div className="dropdown-content" style={{ "minWidth": "200px" }}>
          <span className="caret-black"></span>
          <a tabIndex="0" role="button" className="red-i" onClick={() => this.props.removeMember(rowData.email)}>{words.institution_delete_member}</a>
        </div>
      </DropDownDynamic>
    )
  }

  render() {
    const { rowData, InstitutionReducer, words } = this.props

    let meta, name, avatar
    
    if (rowData.name === "") {
      avatar = <i className="material-icons avatar-visible">person</i>
      name = <span>-</span>
      meta = <span className="meta-not-register">{words.institution_member_not_registered}</span>
    } else {
      avatar = <span className="uppercase">{getFirstCaracter(rowData.name)}</span>
      name = <span>{rowData.name}</span>
      if (rowData.is_admin) {
        meta = <span className="meta-admin">{words.institution_admin}</span>
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
              <div className={classnames("body-list-inside-secondary", "interests")}>
                <span className="user-email" >{rowData.email}</span>
                <ul>
                  {rowData.interests.map((item) => {
                    return <li key={item}>{item}</li>
                  })}
                </ul>
                {InstitutionReducer.is_admin &&
                  this.renderMenu(rowData)
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
)(MemberRow);
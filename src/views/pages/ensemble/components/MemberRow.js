import React from "react"
import classnames from "classnames"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getFirstCaracter from "../../../../utils/get_first_caracter.js"
import DropDownDynamic from '../../../component/DropDownDynamic'
import { updateInterests, loadInterests } from "../../../../redux/actions/InterestsAction";
import auth from "../../../../redux/account/authToken";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class MemberRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      interests: []
    }
    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)
  }

  expand() {
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

  componentWillReceiveProps (props) {
    let interestsMap = props.interests.reduce(function(acc, cur, i) {
      acc[cur.name.toLowerCase()] = cur.id;
      return acc;
    }, {});

    if (props.rowData.interests) {
      this.setState({
        interests: props.rowData.interests.map((item) => {
          return { value: interestsMap[item.toLowerCase()], label: capitalizeFirstLetter(item), checked: true}
        })
      })
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
          <a tabIndex="0" role="button" className="red-i" onClick={()=>this.props.removeMember(rowData.email)}>{words.ensemble_delete_member}</a>
        </div>
      </DropDownDynamic>
    )
  }

  render() {
    const {rowData, words} = this.props
    let meta, name, avatar
    if(rowData.name === "") {
      avatar = <i className="material-icons avatar-visible">person</i>
      name = <span>-</span>
      meta = <span className="meta-not-register">{words.ensemble_member_not_registered}</span>
    } else {
      avatar = <span className="uppercase">{getFirstCaracter(rowData.name)}</span>
      name = <span>{rowData.name}</span>
      if(rowData.is_admin) {
        meta = <span className="meta-admin">{words.ensemble_admin}</span>
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
                  {rowData.interests.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
                <div onBlur={this.collapse} tabIndex="0" className={classnames("dropdown member-menu", {"dropdown-active":this.state.expanded})}>
                  {this.renderMenu(rowData)}
                </div>
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
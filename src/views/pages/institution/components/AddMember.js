import React, { Component } from "react"
import classnames from "classnames"
import validator from "validator"
import Auth from '../../../../redux/account/authToken';
import DropDown from '../../../component/DropDown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadInterests } from '../../../../redux/actions/InterestsAction';

class AddMember extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      is_loading: false,
      authority_auid: []
    }

    this.onAddMemberSuccess = this.onAddMemberSuccess.bind(this)
    this.onAddMemberFailed = this.onAddMemberFailed.bind(this)
    this.handleInterests = this.handleInterests.bind(this);
  }

  componentDidMount() {
    this.props.interests.length == 0 &&
      this.props.loadInterests(Auth)
  }

  onAddMember() {
    const { Presenter, Request } = this.props

    this.setState({ is_loading: true })
    Presenter.AddMember(
      Request.AddMember(this, this.onAddMemberSuccess, this.onAddMemberFailed)
    )
  }

  onAddMemberSuccess(params, response) {
    this.setState({
      is_loading: false,
      email: "",
      authority_auid: []
    })
    this.props.reloadMember()
  }

  onAddMemberFailed(error) {
    this.setState({ is_loading: false })
  }

  handleKeyPress(e) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (validator.isEmail(e.target.value)) {
        this.onAddMember()
      }

    }
  }

  handleInterests(data) {
    this.setState({
      authority_auid: data.map((item) => {
        return item.value
      }),
      data
    })
  }

  renderButton() {
    const { words } = this.props
    if (validator.isEmail(this.state.email)) {
      if (this.state.is_loading) {
        return (<button className="btn-arb" disabled>{words.institution_add_member + "..."}</button>)
      } else {
        return (<button className="btn-arb" onClick={() => this.onAddMember()}>{words.institution_add_member}</button>)
      }
    } else {
      return (<button className="btn-arb" onClick={() => this.onAddMember()} disabled>{words.institution_add_member}</button>)
    }
  }

  render() {
    const { words, interests } = this.props
    const { data } = this.state;
    
    return (
      <div className={classnames("add-panel-overlay", { "show": this.props.show })}>
        <div className="add-panel">
          <i className="material-icons add-panel-close" onClick={() => {
            this.props.toggle()
            this.setState({
              data: [],
              authority_auid: []
            })
          }}>close</i>
          <div className="add-panel-title">
            <p className="add-panel-text-header">{words.institution_invite_member}</p>
          </div>
          <div className="add-panel-body">
            <input
              type="email"
              placeholder={words.institution_field_email}
              value={this.state.email}
              onKeyPress={(e) => { this.handleKeyPress(e) }}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            {this.renderButton()}
            <DropDown
              options={interests.map((item) => {
                return { value: item.id, label: item.name }
              })}
              onChange={this.handleInterests}
              label='Interests ..'
              multi
              data={data}
            />
          </div>
        </div>
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
    loadInterests
  }, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(AddMember);
import React, { Component } from "react"
import classnames from "classnames"
import validator from "validator"
import Request from "../../../../utils/Request";
import Auth from '../../../../redux/account/authToken';
import DropDown from '../../../component/DropDown';

export default class AddMember extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      is_loading: false,
      interests: [],
      authority_auid: []
    }

    this.onAddMemberSuccess = this.onAddMemberSuccess.bind(this)
    this.onAddMemberFailed = this.onAddMemberFailed.bind(this)
    this.getInterests = this.getInterests.bind(this);
    this.getInterestsSuccess = this.getInterestsSuccess.bind(this);
    this.getInterestsFailed = this.getInterestsFailed.bind(this);
    this.handleInterests = this.handleInterests.bind(this);
  }

  componentDidMount() {
    this.getInterests()
  }

  onAddMember() {
    const { Presenter, Request } = this.props

    this.setState({ is_loading: true })
    Presenter.AddMember(
      Request.AddMember(this, this.onAddMemberSuccess, this.onAddMemberFailed)
    )
  }

  onAddMemberSuccess(params, response) {
    const { words } = this.props
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

  renderButton() {
    const { words } = this.props
    if (validator.isEmail(this.state.email)) {
      if (this.state.is_loading) {
        return (<button className="btn-arb" disabled>{words.ensemble_add_member + "..."}</button>)
      } else {
        return (<button className="btn-arb" onClick={() => this.onAddMember()}>{words.ensemble_add_member}</button>)
      }
    } else {
      return (<button className="btn-arb" onClick={() => this.onAddMember()} disabled>{words.ensemble_add_member}</button>)
    }
  }

  getInterests () {
    let data = {
        headers: {
            Authorization: "Token " + Auth.getActiveToken(),
        }
    }
    Request(
        "get",
        "interests",
        data.headers,
        {},
        [],
        this.getInterestsSuccess,
        this.getInterestsFailed,
    )
  }

  getInterestsSuccess(response) {
      this.setState({
        interests: response && response.data && response.data.interests || []
      })
  }

  getInterestsFailed(error) {
      console.log('error: ', error);
  }

  handleInterests (data) {
    this.setState({
      authority_auid: data.map((item) => {
        return item.value
      }),
      data
    })
  }

  render() {
    const { words } = this.props
    const { interests, data } = this.state;
    
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
            <p className="add-panel-text-header">{words.ensemble_invite_member}</p>
          </div>
          <div className="add-panel-body">
            <input
              type="email"
              placeholder={words["type e-mail"]}
              value={this.state.email}
              onKeyPress={(e) => { this.handleKeyPress(e) }}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            {this.renderButton()}
            <DropDown
              options={interests.map((item) => {
                return {value: item.id, label: item.name}
              })}
              label='Interests ..'
              onChange={this.handleInterests}
              multi
              data={data}
            />
          </div>
        </div>
      </div>
    )
  }
}

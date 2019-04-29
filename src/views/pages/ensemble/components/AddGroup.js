import React from "react"
import classnames from "classnames"

export default class AddGroup extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      is_loading: false,
    }
    this.is_proses = true

    this.onRegister = this.onRegister.bind(this)
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this)
    this.onRegisterFailed = this.onRegisterFailed.bind(this)
  }

  onRegister() {
    const { Presenter, Request } = this.props

    this.handleDuplicate = false

    this.setState({
      is_loading: true
    })

    Presenter.Register(
      Request.Register(this, this.onRegisterSuccess, this.onRegisterFailed)
    )
  }

  onRegisterSuccess(params, response) {
    this.setState({
      name: "",
      is_loading: false,
    })
    this.is_proses = true
    this.props.reloadGroup()
  }

  onRegisterFailed(error) {
    this.setState({
      is_loading: false
    })

    this.is_proses = true
  }

  handleKeyPress(e) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (this.state.name !== "") {
        if (this.is_proses) {
          this.onRegister()
          this.is_proses = false
        }
      }
    }
  }

  renderButton() {
    const { words } = this.props
    if (this.state.name.trim() !== "") {
      if (this.state.is_loading) {
        return (<button className="btn-arb" disabled>{words.ensemble_add_group + "..."}</button>)
      } else {
        return (<button className="btn-arb" onClick={() => this.onRegister()}>{words.ensemble_add_group}</button>)
      }
    } else {
      return (<button className="btn-arb" onClick={() => this.onRegister()} disabled>{words.ensemble_add_group}</button>)
    }
  }

  render() {
    const { words } = this.props
    return (
      <div className={classnames("add-panel-overlay", { "show": this.props.show })}>
        <div className="add-panel">
          <i className="material-icons add-panel-close" onClick={() => this.props.toggle()}>close</i>
          <div className="add-panel-title">
            <p className="add-panel-text-header">{words.ensemble_add_group}</p>
          </div>
          <div className="add-panel-body">
            <input
              type="text"
              placeholder={words.ensemble_field_group_name}
              value={this.state.name}
              onKeyPress={(e) => { this.handleKeyPress(e) }}
              onChange={(e) => this.setState({ name: e.target.value })}
              maxLength={16}
            />
            {this.renderButton()}
          </div>
        </div>
      </div>
    )
  }
}

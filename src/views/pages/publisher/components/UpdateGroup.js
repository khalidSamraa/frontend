import React from "react";

import Presenter from "../../../../group/presenter.js";
import Request from "../../../../group/utils/request.js";

export default class UpdateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      new_name: props.name,
      disabled: false,
    }

    this.updateHandle = this.updateHandle.bind(this)
    this.onUpdateFailed = this.onUpdateFailed.bind(this)
    this.onUpdateSuccess = this.onUpdateSuccess.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  updateHandle(e) {
    e.stopPropagation();
    this.onUpdate(this.props.id);
  }

  onUpdate(id) {
    const { name, new_name } = this.state;
    if (name === new_name) {
      this.props.closeUpdate()
    } else {
      Presenter.Update(Request.Update(id, this, this.onUpdateSuccess, this.onUpdateFailed))
    }

  }

  onUpdateSuccess(params, response) {
    this.props.changeName(this.state.new_name, true)

    // after change name close
    this.props.closeUpdate()
  }

  onUpdateFailed(error) {
    if (error.response.data.name.length > 0) {
    } else {
    }
  }

  handleChange(e) {
    if (e.target.value.trim() !== "") {
      this.props.changeName(e.target.value, false)
      this.setState({
        new_name: e.target.value,
        disabled: false
      })
    } else {
      this.setState({ disabled: true })
    }

  }

  handleKeyPress(e) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      if (this.state.new_name.trim() !== "") {
        this.onUpdate(this.props.id)
      }
    }
  }

  renderButton = () => {
    const { words } = this.props
    if (this.state.disabled) {
      return (
        <div>
          <button className="btn-arb" style={{ "padding": "4px" }} disabled>{words.publisher_update_group}</button>
          <button className="btn-arb red-i" style={{ "padding": "4px" }} onClick={(e) => this.props.cancel(e)}>{words.publisher_cancel_update_group}</button>
        </div>
      )

    } else {
      return (
        <div>
          <button className="btn-arb" id="update" style={{ "padding": "4px" }} onClick={this.updateHandle}>{words.publisher_update_group}</button>
          <button className="btn-arb red-i" style={{ "padding": "4px" }} onClick={(e) => this.props.cancel(e)}>{words.publisher_cancel_update_group}</button>
        </div>
      )
    }
  }

  componentDidMount() {
    const { id } = this.props;

    if (document.getElementById('grouptxt').value == 'new group') {
      document.getElementById('grouptxt').select();
    }

    var addGroupBtn = document.getElementById('add_group');
    addGroupBtn.addEventListener('click', function (e) {
      if (document.getElementById('update')) {
        document.getElementById('update').click();
      }
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div className="member-name">
        <input
          type="text"
          defaultValue={name}
          onKeyPress={(e) => { this.handleKeyPress(e) }}
          onChange={(e) => this.handleChange(e)}
          maxLength={16}
          onClick={(e) => e.stopPropagation()}
          id="grouptxt"
        />
        {this.renderButton()}
      </div>
    );
  }
}

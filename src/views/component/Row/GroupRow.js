import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Group from '../Group.js';
import Avatar from '../Avatar.js';
import Options from '../Option/Options.js'

const propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  // options: PropTypes.element.isRequired,
  extra: PropTypes.object,

  active: PropTypes.bool,
  updating: PropTypes.bool,

  onActivate: PropTypes.func,
  onInvite: PropTypes.func,
  onAddMember: PropTypes.func,
  onRename: PropTypes.func,
  onRemove: PropTypes.func,
}

const defaultProps = {
  extra: {},

  active: false,
  updating: false,

  onActivate() {},
  onInvite() {},
  onAddMember() {},
  onRename() {},
  onRemove() {},
}

const invitation = "invitation"
const addMember = "add-member"
const renameGroup = "rename-group"
const removeGroup = "remove-group"

class GroupRow extends Component {
  constructor(props) {
    super(props)

    this.onOptionClick = this.onOptionClick.bind(this)
    this.onActivate = this.onActivate.bind(this)
    this.toggleUpdate = this.toggleUpdate.bind(this)
    this.onUpdate = this.onUpdate.bind(this)

    this.state = {
      updateMode: false,
    }
  }

  onActivate(e) {
    const { updateMode } = this.state
    if (updateMode) {
      return
    }
    const { onActivate, data, extra, index } = this.props
    onActivate({
      data: data,
      index: index,
      extra: extra,
    })
  }

  onUpdate(updateData) {
    const { onRename, data, index } = this.props
    if (updateData.input.trim() !== updateData.default.trim()) {
      onRename({data: data, updateData: updateData, index: index})
    }
    this.toggleUpdate()
  }

  toggleUpdate() {
    let { updateMode } = this.state
    this.setState({
      updateMode: !updateMode
    })
  }

  generateOptionMenus() {
    const { data, updating } = this.props
    if (data.gid === "member") {
      return  {
        items: [
          {text: "Invite Member", onClick: this.onOptionClick, extra: invitation}
        ]
      }
    } else if (data.gid === "administrator") {
      return  {
        items: [
          {text: "Add Member", onClick: this.onOptionClick, extra: addMember}
        ]
      }
    } else {
      const { updateMode } = this.state
      return  {
        items: [
          {text: "Add Member", onClick: this.onOptionClick, extra: addMember},
          {text: (updateMode) ? "Cancel Rename" : "Rename Group", onClick: this.toggleUpdate, extra: renameGroup, disabled: updating, className: (updateMode) ? "red-i" : ""},
          {text: "Remove Group", onClick: this.onOptionClick, extra: removeGroup, className: "red-i"}
        ]
      }
    }
  }

  onOptionClick(dataOption, text, extra) {
    const {
      index,
      data,

      onActivate,
      onInvite,
      onAddMember,
      onRemove,
    } = this.props
    switch (extra) {
      case invitation:
        onInvite()
        break
      case addMember:
        onAddMember({data: data, index:index})
        break
      case removeGroup:
        onRemove({data: data, index:index})
        break
      case invitation:
        onActivate({data: data, index:index})
        break
      default:
        break
    }
  }

  render() {
    const {data, active, options, updating} = this.props
    const { updateMode } = this.state
    return (
      <li onClick={this.onActivate} role="button" className={classnames('member transition-all', {'member-active' : active })}>
        <Avatar name={data.name}/>
        <Group
          updateMode={updateMode}
          onCancel={this.toggleUpdate}
          onUpdate={this.onUpdate}
          updating={updating}
          {...data}
        />
        <Options {...this.generateOptionMenus()}/>
      </li>
    );
  }
}

GroupRow.propTypes = propTypes
GroupRow.defaultProps = defaultProps
export default GroupRow

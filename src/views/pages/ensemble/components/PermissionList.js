import React, { Component } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import ListView from "../../../component/Listview/List.js"
import Request from "../../../../utils/Request.js"

import auth from "../../../../redux/account/authToken.js"

import PermissionRow from "../../../component/Row/PermissionRow.js"

const propTypes = {
  words: PropTypes.object.isRequired,

  show: PropTypes.bool,
  group: PropTypes.object,
  onClose: PropTypes.func,
}

const defaultProps = {
  show: false,
  group: null,
  onClose() {},
}

export default class PermissionList extends Component {
  constructor(props) {
    super(props)

    this.onRequestFailed = this.onRequestFailed.bind(this)
    this.onReadPermissionSuccess = this.onReadPermissionSuccess.bind(this)
    this.onReadGroupDetailSuccess = this.onReadGroupDetailSuccess.bind(this)
    this.onChangePermissionSuccess = this.onChangePermissionSuccess.bind(this)

    this.handlePermissionChange = this.handlePermissionChange.bind(this)

    this.state = {
      items: [],
      groupPermissions: []
    }

    this.token = auth.getActiveToken()
  }

  componentDidMount() {
    this.onReadPermission()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group) {
      this.onReadGroupDetail(nextProps.group.gid)
    } else {
      this.setState({
        groupPermissions: []
      })
    }
  }

  onRequestFailed(error) {

  }

  onReadPermission() {
    Request(
      "get",
      "permission-read",
      {Authorization: "Token " + this.token},
      {},
      [],
      this.onReadPermissionSuccess,
      this.onRequestFailed
    )
  }

  onReadPermissionSuccess(response) {
    this.setState({
      items: response.data
    })
  }

  onReadGroupDetail(groupID) {
    Request(
      "get",
      "group-detail",
      {Authorization: "Token " + this.token},
      {},
      [groupID],
      this.onReadGroupDetailSuccess,
      this.onRequestFailed
    )
  }

  onReadGroupDetailSuccess(response) {
    this.setState({
      groupPermissions: response.data.permissions
    })
  }

  handlePermissionChange(index, checked, data) {
    const { group } = this.props

    let method = "post"
    if (checked) {
      method = "put"
    }

    Request(
      method,
      "group-permission-add-remove",
      {Authorization: "Token " + this.token},
      {code: data.code},
      [group.gid],
      this.onChangePermissionSuccess,
      this.onRequestFailed,
      {data: data, checked: checked}
    )
  }

  onChangePermissionSuccess(response, extra) {
    let { groupPermissions } = this.state

    if(extra.checked) {
      groupPermissions.push(extra.data)
    }else {
      for (let i = 0;  i < groupPermissions.length; i++) {
        if (groupPermissions[i].code === extra.data.code) {
          groupPermissions.splice(i, 1)
          break
        }
      }
    }

    this.setState({
      groupPermissions: groupPermissions
    })

  }

  isChecked(code) {
    const { groupPermissions } = this.state
    for (let i = 0; i < groupPermissions.length; i++) {
      if (code === groupPermissions[i].code) {
        return true
      }
    }
    return false
  }

  render() {
    const { show, onClose, words } = this.props
    const { items } = this.state

    return (
      <ListView
        className={classnames("col-md-7 col-sm-12 col-xs-12 user-main-info no-margin no-padding", {"hide": !show})}
        title={words.institution_group_rights}
        emptyMessage={words.institution_permission_empty}
        canClose={true}
        onClose={onClose}
      >
        {items.map((value, index) => {
          return (
            <PermissionRow
              key={index}
              index={index}
              data={value}
              name={words["permission_"+value.code]}
              checked={this.isChecked(value.code)}
              onClick={this.handlePermissionChange}
            />
          )
        })}
      </ListView>
    )
  }
}

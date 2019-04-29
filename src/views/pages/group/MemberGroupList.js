import React from 'react';
import Presenter from '../../../group/presenter.js';
import Request from '../../../group/utils/request.js';

import MemberGroupRow from './MemberGroupRow.js';

export default class MemberGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowElement : '',
      count      : 0,
      gid        : ''
    }

    this.onReadMemberSuccess = this.onReadMemberSuccess.bind(this)
    this.onReadMemberFailed = this.onReadMemberFailed.bind(this)

    this.onRemoveMember = this.onRemoveMember.bind(this)
    this.onRemoveMemberSuccess = this.onRemoveMemberSuccess.bind(this)
    this.onRemoveMemberFailed = this.onRemoveMemberFailed.bind(this)

  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <MemberGroupRow
          rowData      = {val}
          key          = {index}
          history      = {this.props.history}
          removeMember = {this.onRemoveMember}
        />
      )
    })
    return element;
  }

  onReadMember(gid){
    Presenter.ReadMember(
      Request.ReadMember(gid, this, this.onReadMemberSuccess, this.onReadMemberFailed)
    )
  }

  onReadMemberSuccess(params, response) {
    this.setState({
      count      : response.data.count,
      rowElement : this.generateRow(response.data.results),
    })
  }

  onReadMemberFailed(response) {
  }

  onRemoveMember(uid) {
    Presenter.RemoveMember(
      Request.RemoveMember(uid, this, this.onRemoveMemberSuccess, this.onRemoveMemberFailed)
    )
  }

  onRemoveMemberSuccess(params, response) {

  }

  onRemoveMemberFailed(response) {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.gid !== null) {
      this.setState({
        gid: nextProps.gid
      })
      this.onReadMember(nextProps.gid)
    }
  }

  componentDidMount() {
  }

  render() {
    const {count} = this.state;

    return (
      <div>
        <div className="institution-list-header">Member Group ({count})</div>
        <ul className="institution-list">
          {this.state.rowElement}
        </ul>
      </div>
    );
  }
}

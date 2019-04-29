import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import auth from '../../../redux/account/authToken.js';
import Request from '../../../utils/Request.js';

import SearchInput from '../../component/SearchInput';
import ListView from '../../component/Listview/List.js';
import Options from '../../component/Option/Options.js';
import ScoreRow from '../../component/Row/PurchasedScoreRow.js';
import AddRow from '../../component/Row/PurchasedAddRow.js';
import AssignedRow from '../../component/Row/PurchasedAssignedRow.js';
import { InfoModal } from '../../component/Modal';
// import Uplaod from "../../component/Upload.js"
import Radio from '../../component/Radio';

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.onReadPurchased = this.onReadPurchased.bind(this);
    this.onReadPurchasedSuccess = this.onReadPurchasedSuccess.bind(this);
    // this.onReadPurchasedFailed = this.onReadPurchasedFailed.bind(this)

    this.onReadAssignmentSuccess = this.onReadAssignmentSuccess.bind(this);
    // this.onReadAssignmentFailed = this.onReadAssignmentFailed.bind(this)

    this.onReadUnregisteredSuccess = this.onReadUnregisteredSuccess.bind(this);
    // this.onReadUnregisteredFailed = this.onReadUnregisteredFailed.bind(this)

    this.onAssign = this.onAssign.bind(this);
    this.onAssignSuccess = this.onAssignSuccess.bind(this);

    this.onUnassign = this.onUnassign.bind(this);
    this.onUnassignSuccess = this.onUnassignSuccess.bind(this);

    this.onRequestFailed = this.onRequestFailed.bind(this);

    this.handleScoreClick = this.handleScoreClick.bind(this);

    // this.toggleUplaod = this.toggleUplaod.bind(this)
    this.gotoSetPrice = this.gotoSetPrice.bind(this);
    this.gotoSetDiscount = this.gotoSetDiscount.bind(this);
    this.gotoPubLibrary = this.gotoPubLibrary.bind(this);

    this.state = {
      items: [],

      groups: [],
      unregisteredGroups: [],

      members: [],
      unregisteredMembers: [],

      loadingRegistered: false,
      loadingUnregistered: false,

      showAddGroup: false,
      showAddMember: false,
      activeScoreIndex: -1,

      upload_toggle: true,
      showModal: false
    };

    this.token = auth.getActiveToken();
  }

  toggleModal = infoMsg =>
    this.setState({ showModal: !this.state.showModal, infoMsg });

  componentDidMount() {
    this.toggleModal();
    this.onReadPurchased('', '');
  }

  gotoSetPrice() {
    this.props.history.push('/set-price');
  }

  gotoSetDiscount() {
    this.props.history.push('/set-discount');
  }

  gotoPubLibrary() {
    this.props.history.push('/pub-library');
  }

  handleSubmit = searchQuery => {
    this.setState({
      activeScoreIndex: -1,
      groups: [],
      unregisteredGroups: [],
      members: [],
      unregisteredMembers: []
    });
    this.onReadPurchased(searchQuery);
    this.toggleModal();
  };

  // toggleUplaod() {
  //   this.setState({
  //     toggle_upload : !this.state.toggle_upload
  //   })
  // }

  toggle(key, value) {
    let nextVal = this.state[key];

    if (nextVal === undefined) {
      return;
    }

    if (typeof nextVal !== 'boolean') {
      return;
    }

    if (value === undefined) {
      nextVal = !nextVal;
    }

    if (typeof value !== 'boolean') {
      return;
    } else {
      nextVal = value;
    }

    let incomingState = {};
    incomingState[key] = nextVal;
    this.setState(incomingState);
  }

  onRequestFailed(error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.details
    ) {
      this.toggleModal(error.response.data.details);
    }
    // console.error(error.message)
  }

  onReadPurchased(search = '', order = '') {
    this.toggleModal();
    Request(
      'get',
      'purchase-read',
      { Authorization: 'Token ' + this.token },
      { ordering: order, search: search },
      [],
      this.onReadPurchasedSuccess,
      this.onRequestFailed
    );
  }

  onReadPurchasedSuccess(response) {
    if (response.data.results.length > 0) {
      response.data.results.sort(function(a, b) {
        var nameA = a.book.play.title.toLowerCase();
        var nameB = b.book.play.title.toLowerCase();

        var nameX = a.book.instrument.toLowerCase();
        var nameY = b.book.instrument.toLowerCase();

        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;

        if (nameX < nameY)
          //sort string ascending
          return -1;
        if (nameX > nameY) return 1;

        return 0; //default return value (no sorting)
      });
    }
    this.setState({
      items: response.data.results
    });
    this.toggleModal();
    if (response.data.results.length > 0) {
      this.handleScoreClick(undefined, response.data);
    }
  }

  onReadPurchasedFailed(error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.details
    ) {
      this.toggleModal(error.response.data.details);
    }
  }

  onReadAssignment(data, search, order) {
    let purchase_id = data.pid;

    Request(
      'get',
      'purchase-assigned-read',
      { Authorization: 'Token ' + this.token },
      { ordering: order, search: search },
      [purchase_id],
      this.onReadAssignmentSuccess,
      this.onRequestFailed
    );
  }

  onReadAssignmentSuccess(response) {
    this.setState({
      groups: response.data.groups,
      members: response.data.users
    });
  }

  onReadAssignmentFailed(error) {}

  onReadUnregistered(data) {
    Request(
      'get',
      'purchase-assign',
      { Authorization: 'Token ' + this.token },
      { purchase: data.pid },
      [],
      this.onReadUnregisteredSuccess,
      this.onRequestFailed
    );
  }

  onReadUnregisteredSuccess(response) {
    this.setState({
      unregisteredGroups: response.data.groups,
      unregisteredMembers: response.data.users
    });
  }

  onReadUnregisteredFailed(error) {}

  onAssign(index, data) {
    const { activeScoreIndex, items } = this.state;
    let payload = {
      purchase: items[activeScoreIndex].pid
    };

    payload[data.type] = data.id;

    Request(
      'post',
      'purchase-assign',
      { Authorization: 'Token ' + this.token },
      payload,
      [],
      this.onAssignSuccess,
      this.onRequestFailed,
      { requested: data, index: index }
    );
  }

  onAssignSuccess(response, extra) {
    let {
      unregisteredGroups,
      groups,
      unregisteredMembers,
      members
    } = this.state;
    if (extra.requested.type === 'group') {
      let tmp = unregisteredGroups.splice(extra.index, 1);
      tmp[0].aid = response.data.aid;
      groups = groups.concat(tmp);
    } else {
      let tmp = unregisteredMembers.splice(extra.index, 1);
      tmp[0].aid = response.data.aid;
      members = members.concat(tmp);
    }

    this.setState({
      groups: this.sortData(groups),
      unregisteredGroups: this.sortData(unregisteredGroups),
      members: this.sortData(members),
      unregisteredMembers: this.sortData(unregisteredMembers)
    });
  }

  onUnassign(index, data) {
    const { groups, members } = this.state;
    let aid = null;

    if (data.type === 'group') {
      aid = groups[index].aid;
    } else {
      aid = members[index].aid;
    }

    Request(
      'patch',
      'purchase-unassign',
      { Authorization: 'Token ' + this.token },
      {},
      [aid],
      this.onUnassignSuccess,
      this.onRequestFailed,
      { requested: data, index: index }
    );
  }

  onUnassignSuccess(response, extra) {
    let {
      unregisteredGroups,
      groups,
      unregisteredMembers,
      members
    } = this.state;
    if (extra.requested.type === 'group') {
      let tmp = groups.splice(extra.index, 1);
      delete tmp[0].aid;
      unregisteredGroups = unregisteredGroups.concat(tmp);
    } else {
      let tmp = members.splice(extra.index, 1);
      delete tmp[0].aid;
      unregisteredMembers = unregisteredMembers.concat(tmp);
    }

    this.setState({
      groups: this.sortData(groups),
      unregisteredGroups: this.sortData(unregisteredGroups),
      members: this.sortData(members),
      unregisteredMembers: this.sortData(unregisteredMembers)
    });
  }

  onAssignError(error) {}

  handleScoreClick(index, extra) {
    const { words } = this.props.ActiveLanguageReducer;

    let data = null;
    if (index === undefined) {
      index = 0;
      data = extra[index];
    } else {
      const { items } = this.state;
      data = items[index];
    }

    const { activeScoreIndex } = this.state;
    if (index !== activeScoreIndex) {
      this.onReadAssignment(data);
      this.onReadUnregistered(data);

      this.setState({
        activeScoreIndex: index
      });
    }
  }

  sortData(data) {
    console.log(data);
    if (data.length > 0) {
      data.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      });
    }
    return data;
  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <ScoreRow
          key={index}
          index={index}
          data={val}
          load={this.onReadPurchased}
          active={this.state.activeScoreIndex === index}
          onClick={this.handleScoreClick}
          words={this.props.ActiveLanguageReducer.words}
        />
      );
    });
    return element;
  }

  renderRow() {
    const { items } = this.state;
    if (items.length >= 0) {
      return this.generateRow(items);
    }
  }

  handleScreen = ({value, name}) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const {
      items,

      groups,
      unregisteredGroups,

      members,
      unregisteredMembers,

      activeScoreIndex,
      showAddGroup,
      showAddMember,
      showModal,
      infoMsg
    } = this.state;

    const { words } = this.props.ActiveLanguageReducer;

    const assignedGroupProps = {
      title: words.library_group_assigned,
      emptyMessage:
        activeScoreIndex === -1
          ? words.library_no_selected_score
          : words.library_no_group_found,
      height: 197
    };

    const unassignedGroupProps = {
      title: words.library_group_not_assigned,
      emptyMessage:
        activeScoreIndex === -1
          ? words.library_no_selected_score
          : words.library_no_group_found,
      height: 197
    };

    const assignedMemberProps = {
      title: words.library_member_assigned,
      emptyMessage:
        activeScoreIndex === -1
          ? words.library_no_selected_score
          : words.library_no_member_found,
      height: 197
    };

    const unassignedMemberProps = {
      title: words.library_member_not_assigned,
      emptyMessage:
        activeScoreIndex === -1
          ? words.library_no_selected_score
          : words.library_no_member_found,
      height: 197
    };

    
    

    return (
      <React.Fragment>
        <InfoModal
          small
          headline={words.library_title}
          info={infoMsg}
          toggleModal={this.toggleModal}
          isActive={showModal}
        >
          <img
            src="media/images/icon/loading.gif"
            width="80"
            height="80"
            style={{ marginBottom: '30px' }}
          />
        </InfoModal>
        <section className="product-content institution-library">
          <div className="container-fluid">
            {/* TITLE */}
              <div className="musinote-center institution-name-header">
                <h3 className="no-margin no-padding full-width library-title">
                  {words.library_title}
                </h3>
              </div>
              {/*<div className="col-md-2 col-sm-2 col-xs-2 center-content">
              <div>
                {this.props.PublisherReducer.is_auth ?
                  <Options
                    items={[
                      {text: 'Price', onClick: this.gotoSetPrice, className: "text-center"},
                      {text: 'Discount', onClick: this.gotoSetDiscount, className: "text-center"},
                      {text: 'Pub-Library', onClick: this.gotoPubLibrary, className: "text-center"},
                      {text: 'Upload', onClick: this.toggleUplaod, className: "text-center"}
                    ]}
                    iconClassName={"md-icon"}
                  />
                  :
                  <Options items={[{text: 'Upload', onClick: this.toggleUplaod, className: "text-center"}]} iconClassName={"md-icon"} />
                }
              </div>
            </div>*/}
            {/* END TITLE */}
            {/* SEARCH */}
            <div className="container e-i-search-input-wrapper">
              <div className="row search-form-box">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <SearchInput words={words} onSubmit={this.handleSubmit} />
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* END SEARCH */}

            {/* CONTENT */}
            <div className='container'>
            <div className="row library-border">
              <div className='col-md-5 col-sm-12 col-xs-12'>
                <div className='radios-wrp'>
                  <Radio
                    label={words.library_scores}
                    name='screen'
                    checked={this.state.screen === 'scores'}
                    value='scores'
                    onChange={this.handleScreen}
                  />
                  <Radio
                    label='Plays'
                    name='screen'
                    checked={this.state.screen === 'plays'}
                    value='plays'
                    onChange={this.handleScreen}
                  />
                </div>
                <div className='row'>
                  <ListView
                    emptyMessage={words.library_score_empty}
                    className="no-margin no-padding col-xs-12"
                  >
                    {this.renderRow()}
                  </ListView>
                </div>
              </div>
              {/* RIGHT COLUMN*/}
              <div className="col-md-7 col-sm-12 col-xs-12">
                <div className="animated fadeIn">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12 border-left">
                      <div className="row">
                        {/* ASSIGNED GROUPS */}
                        <ListView
                          className="col-md-12 col-sm-12 col-xs-12 no-margin no-padding"
                          {...assignedGroupProps}
                        >
                          {groups.map((value, index) => {
                            return (
                              <AssignedRow
                                key={index}
                                index={index}
                                data={{
                                  data: value,
                                  type: 'group',
                                  id: value.gid
                                }}
                                name={value.name}
                                onClick={this.onUnassign}
                              />
                            );
                          })}
                        </ListView>
                        {/* END ASSIGNED GROUPS */}

                        {/* UNASSIGNED GROUP */}
                        <ListView
                          className="col-md-12 col-sm-12 col-xs-12 no-margin no-padding"
                          {...unassignedGroupProps}
                        >
                          {unregisteredGroups.map((value, index) => {
                            return (
                              <AssignedRow
                                key={index}
                                index={index}
                                data={{
                                  data: value,
                                  type: 'group',
                                  id: value.gid
                                }}
                                name={value.name}
                                onClick={this.onAssign}
                              />
                            );
                          })}
                        </ListView>
                        {/* END UNASSIGNED GROUP */}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12 border-left">
                      <div className="row">
                        {/* ASSIGNED MEMBER */}
                        <ListView
                          className="col-md-12 col-sm-12 col-xs-12 no-margin no-padding"
                          {...assignedMemberProps}
                        >
                          {members.map((value, index) => {
                            return (
                              <AssignedRow
                                key={index}
                                index={index}
                                data={{
                                  data: value,
                                  type: 'user',
                                  id: value.uid
                                }}
                                name={
                                  value.name.trim() === ''
                                    ? value.email
                                    : value.name
                                }
                                unregistered={value.name.trim() === ''}
                                onClick={this.onUnassign}
                              />
                            );
                          })}
                        </ListView>
                        {/* END ASSIGNED MEMBER */}

                        {/* UNASSIGNED MEMBER */}
                        <ListView
                          className="col-md-12 col-sm-12 col-xs-12 no-margin no-padding"
                          {...unassignedMemberProps}
                        >
                          {unregisteredMembers.map((value, index) => {
                            return (
                              <AssignedRow
                                key={index}
                                index={index}
                                data={{
                                  data: value,
                                  type: 'user',
                                  id: value.uid
                                }}
                                name={
                                  value.name.trim() === ''
                                    ? value.email
                                    : value.name
                                }
                                unregistered={value.name.trim() === ''}
                                onClick={this.onAssign}
                              />
                            );
                          })}
                        </ListView>
                        {/* END UNASSIGNED MEMBER */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END RIGHT COLUMN*/}
            </div>
            </div>
          </div>

          {/*<Uplaod
        toggle = {this.state.toggle_upload}
        toggleAction = {this.toggleUplaod}
      />*/}
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    // SessionReducer     : state.SessionReducer,
    // TokenReducer       : state.TokenReducer,
    PublisherReducer: state.PublisherReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    RunRedux: data => {
      dispatch(data);
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchase);

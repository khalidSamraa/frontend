import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import checkSession from '../../../utils/check_session.js';
import { setSearchQuery } from '../../../redux/actions/SearchAction.js';

import ComposerList from '../home/component/ComposerList.js';
import InstrumentList from '../home/component/InstrumentList.js';
import CategoryList from '../home/component/CategoryList.js';
import EditionList from '../home/component/EditionList.js';
import Duration from '../home/component/Duration.js';
import PubLibraryRow from './component/PubLibraryRow.js';

import Request from '../../../utils/Request.js';
import Table from '../../component/Table/Table.js';
import PaginationNumber from '../../component/PaginationNumber.js';
import SinglePagination from '../../component/SinglePagination.js';
import SearchInput from '../../component/SearchInput';
import { InfoModal } from '../../component/Modal';

class PubLibraryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.loggedIn = checkSession.isLoggedIn(
      props.history,
      props.SessionReducer.is_auth
    );
    this.loggedInPublisher = checkSession.isLoggedIn(
      props.history,
      props.PublisherReducer.is_auth
    );

    this.state = {
      activeTabIndex: 0,
      searchQuery: this.props.SearchReducer.query,
      from: moment(),
      to: moment('12/31/2099'),
      min_date: moment(),
      type_price: 'otp',
      action: 'add',
      raw_data: [],
      active_id: null,
      active_sub_index: null,
      loading: false,
      showModal: false,

      // Register
      price: 0,
      score: '',
      pid: '',
      spid: '',
      selected_items: {},
      check_all: false,
      bulk_mode: false,

      //pagination
      count: null,
      currentPage: 0,
      number_page: 0,
      nextLink: null,
      prevLink: null,
      rpp: 999,

      sort: null
    };

    this._mounted = false;
    this.searchInput = null;
    this.toggleTab = this.toggleTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComposerClick = this.handleComposerClick.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeAction = this.handleChangeAction.bind(this);

    this.dateChange = this.dateChange.bind(this);

    this.onReadScore = this.onReadScore.bind(this);
    this.onReadScoreSuccess = this.onReadScoreSuccess.bind(this);
    this.onReadScoreFailed = this.onReadScoreFailed.bind(this);

    this.onRegister = this.onRegister.bind(this);
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this);
    this.onRegisterFailed = this.onRegisterFailed.bind(this);

    this.onUpdate = this.onUpdate.bind(this);
    this.onUpdateSuccess = this.onUpdateSuccess.bind(this);
    this.onUpdateFailed = this.onUpdateFailed.bind(this);

    this.onDelete = this.onDelete.bind(this);
    this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
    this.onDeleteFailed = this.onDeleteFailed.bind(this);

    this.singleSelected = this.singleSelected.bind(this);
    this.multipleSelected = this.multipleSelected.bind(this);
    this.checkAll = this.checkAll.bind(this);

    this.onTableHeaderItemClick = this.onTableHeaderItemClick.bind(this);
    this.changeRPP = this.changeRPP.bind(this);
  }

  dateChange(date) {
    this.setState({
      from: date,
      to: date,
      min_date: moment(date)
    });
  }

  toggleModal = infoMsg =>
    this.setState({ showModal: !this.state.showModal, infoMsg });

  handleChangeType(e) {
    this.setState({
      type_price: e.target.value,
      active_id: null,
      action: null,
      selected_items: {},
      check_all: false
    });
    this.onReadScore();
  }

  handleChangeAction(e) {
    this.setState({ action: e.target.value });
  }

  validateDate(date) {
    if (date === '') {
      return moment();
    } else {
      return moment(date);
    }
  }

  singleSelected(have_price, active_id, data) {
    if (active_id !== this.state.active_id) {
      this.setState({
        active_id: active_id,
        to: this.validateDate(data.to_date),
        from: this.validateDate(data.from_date),
        price: data.price,
        score: data.score,
        pid: data.pid
      });
    } else {
      this.setState({
        active_id: null,
        price: '',
        score: '',
        pid: ''
      });
    }
  }

  multipleSelected(checked, selected, data) {
    const { selected_items } = this.state;

    if (checked) {
      selected_items[selected] = data;
    } else {
      delete selected_items[selected];
    }

    this.setState({
      selected_items: selected_items
    });
  }

  checkAll(e) {
    const { raw_data, type_price } = this.state;
    let check_all, selected;

    if (e.target.checked) {
      check_all = true;
      selected = {};

      if (!_.isEmpty(raw_data)) {
        for (let i = 0; i < raw_data.length; i++) {
          if (_.has(raw_data[i], type_price)) {
            for (let j = 0; j < raw_data[i][type_price].length; j++) {
              selected[raw_data[i][type_price][j].pid] = {
                title: raw_data[i].title,
                sid: raw_data[i].sid,
                ...raw_data[i][type_price][j]
              };
            }
          }
          selected[raw_data[i].sid] = raw_data[i];
        }
      }
    } else {
      check_all = false;
      selected = {};
    }
    this.setState({
      check_all: check_all,
      selected_items: selected
    });
  }

  renderCheckBoxAll() {
    const { check_all } = this.state;

    return (
      <label className="control control--checkbox ">
        <input type="checkbox" checked={check_all} onChange={this.checkAll} />
        <div className="control__indicator" />
      </label>
    );
  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <PubLibraryRow
          index={index}
          key={index}
          activeId={this.state.active_id}
          selectedItems={this.state.selected_items}
          multipleSelected={this.multipleSelected}
          rowData={val}
          singleSelected={this.singleSelected}
          typePrice={this.state.type_price}
        />
      );
    });
    return element;
  }

  onReadScore(data) {
    let payload = {
      // pid : this.props.PublisherReducer.publisher.pid,
      rpp: data && data.rpp ? data.rpp : this.state.rpp,
      q: this.state.searchQuery,
      sort: data && data.order ? data.order : '',
      page: data && data.page ? data.page : 1
    };
    Request(
      'get',
      'read-pub-library',
      { Authorization: 'Token ' + this.props.Token.tokenPublisher },
      payload,
      [],
      this.onReadScoreSuccess,
      this.onReadScoreFailed
    );
    this.toggleModal();
  }

  onReadScoreSuccess(response) {
    this.setState({
      raw_data: response.data.results,
      count: response.data.number_result,
      nextLink: response.data.next_url,
      prevLink: response.data.before_url,
      currentPage: response.data.current_page,
      number_page: response.data.number_page,
      rpp: response.data.rpp,
      showModal: false
    });
  }

  onReadScoreFailed(err) {
    // this.setState({
    //   source  : "search",
    // })
  }

  getPayloadBulk() {
    const { selected_items } = this.state;
    let tmp = [];
    for (let i in selected_items) {
      tmp.push({
        score: selected_items[i].sid,
        title: selected_items[i].title,
        pid: selected_items[i].pid,
        to_date: moment(this.state.to).format('YYYY-MM-DD'),
        from_date: moment(this.state.from).format('YYYY-MM-DD'),
        price: this.state.price
      });
    }
    return tmp;
  }

  onRegister(generic_id, type) {
    const { selected_items } = this.state;
    let payload, url;

    if (_.isEmpty(selected_items)) {
      if (this.state.score === '') {
        return;
      } else if (
        this.state.price < 1 ||
        this.state.price === '' ||
        this.state.price === undefined
      ) {
        return;
      }

      url = this.getUrl('create', type);
      payload = {
        to_date: moment(this.state.to).format('YYYY-MM-DD'),
        from_date: moment(this.state.from).format('YYYY-MM-DD'),
        price: this.state.price,
        score: this.state.score
      };
    } else {
      url = this.getUrl('bulk', type);

      payload = {
        prices: JSON.stringify(this.getPayloadBulk())
      };
    }

    this.setState({ loading: true });

    Request(
      'post',
      url,
      { Authorization: 'Token ' + this.props.Token.tokenPublisher },
      payload,
      [generic_id],
      this.onRegisterSuccess,
      this.onRegisterFailed
    );
  }

  onRegisterSuccess() {
    this.setState({
      loading: false,
      active_id: null,
      price: '',
      score: ''
    });
    let data = {
      page: this.state.currentPage
    };
    this.onReadScore(data);
  }

  onRegisterFailed(err) {
    this.setState({ loading: false });
  }

  // UPDATE
  onUpdate(generic_id, type) {
    const { selected_items } = this.state;

    let payload, url, method;

    if (_.isEmpty(selected_items)) {
      if (this.state.score === '') {
        return;
      } else if (
        this.state.price < 1 ||
        this.state.price === '' ||
        this.state.price === undefined
      ) {
        return;
      }

      method = 'patch';
      url = this.getUrl('update', type);

      payload = {
        to_date: moment(this.state.to).format('YYYY-MM-DD'),
        from_date: moment(this.state.from).format('YYYY-MM-DD'),
        price: this.state.price
      };
    } else {
      method = 'post';
      url = this.getUrl('bulk', type);
      payload = {
        prices: JSON.stringify(this.getPayloadBulk())
      };
    }

    this.setState({ loading: true });
    Request(
      method,
      url,
      { Authorization: 'Token ' + this.props.Token.tokenPublisher },
      payload,
      [generic_id],
      this.onUpdateSuccess,
      this.onUpdateFailed
    );
  }

  onUpdateSuccess() {
    this.setState({
      loading: false,
      active_id: null,
      score: '',
      price: '',
      selected_items: {}
    });

    let data = {
      page: this.state.currentPage
    };
    this.onReadScore(data);
  }

  onUpdateFailed() {
    this.setState({ loading: false });
  }

  onDelete(generic_id, type) {
    const { selected_items } = this.state;

    let method, payload, url, gid;

    if (_.isEmpty(selected_items)) {
      if (this.state.score === '') {
        return;
      }
      method = 'delete';
      url = this.getUrl('delete', type);
      gid = generic_id;
      payload = {};
    } else {
      method = 'post';
      url = this.getUrl('bulk', type);
      gid = '';
      payload = {
        prices: JSON.stringify(this.getPayloadBulk())
      };
    }

    this.setState({ loading: true });
    Request(
      method,
      url,
      { Authorization: 'Token ' + this.props.Token.tokenPublisher },
      payload,
      [gid],
      this.onDeleteSuccess,
      this.onDeleteFailed
    );
  }

  onDeleteSuccess() {
    this.setState({
      loading: false,
      active_id: null,
      score: ''
    });

    let data = {
      page: this.state.currentPage
    };

    this.onReadScore(data);
  }

  onDeleteFailed() {
    this.setState({ loading: false });
  }

  hasMount() {
    if (this._mounted) {
      this.onReadScore();
    }
  }

  componentDidMount() {
    this._mounted = true;
    this.hasMount();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchQuery: nextProps.SearchReducer.query
    });
  }

  // Toogle Tab
  toggleTab(tab = null) {
    if (!tab || this.state.activeTabIndex === tab) {
      this.setState({
        activeTabIndex: 0
      });
    } else {
      this.setState({
        activeTabIndex: tab
      });
    }
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(searchQuery) {
    this.props.RunRedux(setSearchQuery(searchQuery));
    this.setState({ searchQuery }, () => {
      this.onReadScore();
    });
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  delete(event) {
    event.preventDefault();
    this.setState({ searchQuery: '' });
  }

  handleComposerClick(data) {
    let { searchQuery } = this.state;
    if (data.name.trim() !== '') {
      if (searchQuery.trim() && !searchQuery.endsWith(' ')) {
        searchQuery += ' ';
      }
      searchQuery += data.name;
      this.setState({ searchQuery: searchQuery });
    }
    this.toggleTab();
    window.scrollTo(0, 0);
  }

  renderRow() {
    const { raw_data } = this.state;

    if (raw_data.length) return this.generateRow(raw_data);

    return (
      <tr>
        <td colSpan={100}>
          <p className="grey text-center">Data Empty</p>
        </td>
      </tr>
    );
  }

  onTableHeaderItemClick(e, data) {
    if (data.data === null) return;

    let fields = data.data.sort.split(',');
    for (let i = 0; i < fields.length; i++) {
      if (!data.ascending) {
        fields[i] = '-' + fields[i];
      }
    }
    this.setState({ sort: fields.join(',') });
    let resData = {
      order: fields.join(','),
      rpp: this.state.rpp
    };
    this.onReadScore(resData);
  }

  pagination(page) {
    this.setState({
      rpp: this.state.rpp
    });
    let resData = {
      order: this.state.sort,
      page: page,
      rpp: this.state.rpp
    };
    this.onReadScore(resData);
  }

  handlePageClick = data => {
    let selected = data.selected + 1;
    this.pagination(selected);
  };

  changeRPP(event) {
    this.setState({ rpp: event.target.value });
    let resData = {
      order: this.state.sort,
      page: 1,
      rpp: event.target.value
    };

    this.onReadScore(resData);
  }

  render() {
    // Check if login session null or not login
    if (!this.loggedIn) return null;

    // Check if session isntitution or not swith to insitution
    if (!this.loggedInPublisher) return null;

    const { words, lang } = this.props.ActiveLanguageReducer;
    const { code } = this.props.ActiveCurrencyReducer;
    const { action, type_price, loading } = this.state;
    const { count, currentPage, nextLink, prevLink, number_page } = this.state;

    let button;

    if (action === 'add') {
      button = (
        <button
          className="btn-change-price"
          onClick={() =>
            this.onRegister(this.getGenericID(type_price), type_price)
          }
          disabled={loading}
        >
          Add
        </button>
      );
    } else if (action === 'replace') {
      button = (
        <button
          className="btn-change-price"
          onClick={() =>
            this.onUpdate(this.getGenericID(type_price), type_price)
          }
          disabled={loading}
        >
          Replace
        </button>
      );
    } else if (action === 'remove') {
      button = (
        <button
          className="btn-change-price"
          onClick={() =>
            this.onDelete(this.getGenericID(type_price), type_price)
          }
          disabled={loading}
        >
          Remove
        </button>
      );
    } else {
      button = (
        <button className="btn-change-price" disabled>
          Change
        </button>
      );
    }

    let tableColumns = [
      words.publibrary_table_title,
      words.publibrary_table_composer,
      words.publibrary_table_instrument,
      words.publibrary_table_edition,
      words.publibrary_table_category,
      words.publibrary_table_uploaded_by
    ];

    let tableColumnExtras = {};
    tableColumnExtras[words.publibrary_table_title] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'title'
      }
    };
    tableColumnExtras[words.publibrary_table_composer] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'composer'
      }
    };
    tableColumnExtras[words.publibrary_table_instrument] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12 ',
      canSort: true,
      data: {
        sort: 'instrument'
      }
    };
    tableColumnExtras[words.publibrary_table_edition] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12',
      canSort: true,
      data: {
        sort: 'edition'
      }
    };
    tableColumnExtras[words.publibrary_table_category] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12',
      canSort: true,
      data: {
        sort: 'category'
      }
    };
    tableColumnExtras[words.publibrary_table_uploaded_by] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: 'col-content col-header col-md-2 col-sm-2 col-xs-12',
      canSort: true,
      data: {
        sort: ''
      }
    };

    return (
      <div className="set-price">
        <div className="container">
          <h2>{words.library_title}</h2>
          <section className="search-area">
            <div className="row search-form-box">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <SearchInput
                  words={words}
                  onSubmit={this.handleSubmit}
                  value={this.state.searchQuery}
                />
              </div>
            </div>
            <div className="row search-controls">
              <div className="col-md-12">
                <ul id="tab" className=" row jtab-ul">
                  <li
                    onClick={() => this.toggleTab(1)}
                    className={classnames('col-xs-6 col-sm-3 col-md-2_4', {
                      active: this.state.activeTabIndex === 1
                    })}
                  >
                    <a className="box" id="composer">
                      {words.setprice_tab_composer}
                      <p />
                    </a>
                  </li>
                  <li
                    onClick={() => this.toggleTab(2)}
                    className={classnames('col-xs-6 col-sm-3 col-md-2_4', {
                      active: this.state.activeTabIndex === 2
                    })}
                  >
                    <a className="box" id="edition">
                      {words.setprice_tab_edition}
                      <p />
                    </a>
                  </li>
                  <li
                    onClick={() => this.toggleTab(3)}
                    className={classnames('col-xs-6 col-sm-3 col-md-2_4', {
                      active: this.state.activeTabIndex === 3
                    })}
                  >
                    <a className="box" id="instrument">
                      {words.setprice_tab_instrument}
                      <p />
                    </a>
                  </li>
                  <li
                    onClick={() => this.toggleTab(4)}
                    className={classnames('col-xs-6 col-sm-3 col-md-2_4', {
                      active: this.state.activeTabIndex === 4
                    })}
                  >
                    <a className="box" id="category">
                      {words.setprice_tab_category}
                      <p />
                    </a>
                  </li>
                  <li
                    onClick={() => this.toggleTab(5)}
                    className={classnames('col-xs-12 col-sm-12 col-md-2_4', {
                      active: this.state.activeTabIndex === 5
                    })}
                  >
                    <a className="box" id="duration">
                      {words.setprice_tab_duration}
                      <p />
                    </a>
                  </li>
                </ul>

                {/*content filters*/}
                <div className="jtab-content-list">
                  <div
                    id="tab_composer"
                    className={
                      this.state.activeTabIndex === 1
                        ? 'jtab-content composer show'
                        : 'jtab-content composer'
                    }
                  >
                    <ComposerList
                      {...this.props}
                      onClick={this.handleComposerClick}
                      lang={lang}
                    />
                  </div>

                  <div
                    id="tab_edition"
                    className={
                      this.state.activeTabIndex === 2
                        ? 'jtab-content composer show'
                        : 'jtab-content composer'
                    }
                  >
                    <EditionList
                      {...this.props}
                      onClick={this.handleComposerClick}
                      lang={lang}
                    />
                  </div>

                  <div
                    id="tab_instrument"
                    className={
                      this.state.activeTabIndex === 3
                        ? 'jtab-content composer show'
                        : 'jtab-content composer'
                    }
                  >
                    <InstrumentList
                      {...this.props}
                      onClick={this.handleComposerClick}
                      lang={lang}
                    />
                  </div>

                  <div
                    id="tab_category"
                    className={
                      this.state.activeTabIndex === 4
                        ? 'jtab-content composer show'
                        : 'jtab-content composer'
                    }
                  >
                    <CategoryList
                      {...this.props}
                      onClick={this.handleComposerClick}
                      lang={lang}
                    />
                  </div>

                  <div
                    id="tab_durtion"
                    className={
                      this.state.activeTabIndex === 5
                        ? 'jtab-content duration show'
                        : 'jtab-content duration'
                    }
                  >
                    <Duration
                      {...this.props}
                      onDurationClick={this.handleComposerClick}
                      maxHours={5}
                      steps={6}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container-publibrary">
            <div className="row pubLibrary">
              <InfoModal
                small
                toggleModal={this.toggleModal}
                isActive={this.state.showModal}
              >
                <img
                  src="media/images/icon/loading.gif"
                  width="80"
                  height="80"
                  style={{ marginBottom: '30px' }}
                />
              </InfoModal>
              <Table
                columns={tableColumns}
                columnsExtras={tableColumnExtras}
                onHeaderItemClick={this.onTableHeaderItemClick}
              >
                {this.renderRow()}
              </Table>
            </div>

            {/*<div className="row page-numeration-box">
              <div className="col-md-4 col-sm-4 col-xs-6" style={{textAlign: 'right'}}>
                  <div className="select col-md-2 col-sm-2 col-xs-3" >
                    <select onChange={this.changeRPP} value={this.state.rpp}>
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="48">48</option>
                      <option value="96">96</option>
                    </select>
                    <div className="select__arrow"></div>
                  </div>
                  <span>{words.catalog_score_per_page}</span>
              </div>
              <div className="col-md-8 col-sm-8 col-xs-12">
                <div className="page-numeration" style={{padding: "unset"}}>
                  <PaginationNumber
                    current     ={currentPage}
                    count       ={count}
                    number_page ={number_page}
                    handle      ={this.handlePageClick}
                  />
                </div>
              </div>
            </div>*/}
          </section>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    SessionReducer: state.SessionReducer,
    Token: state.TokenReducer,
    SearchReducer: state.SearchReducer,
    PublisherReducer: state.PublisherReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    ActiveCurrencyReducer: state.ActiveCurrencyReducer
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
)(PubLibraryScreen);

import React from "react"
import classnames from "classnames"
import { connect } from "react-redux"
import _ from "lodash/core"
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import checkSession from "../../../utils/check_session.js"
import { setSearchQuery } from "../../../redux/actions/SearchAction.js"

import ComposerList from "../home/component/ComposerList.js"
import InstrumentList from "../home/component/InstrumentList.js"
import CategoryList from "../home/component/CategoryList.js"
import EditionList from "../home/component/EditionList.js"
import Duration from "../home/component/Duration.js"
import ScoreUploadRow from "./component/ScoreUploadRow.js"

import Request from "../../../utils/Request.js"
import Table from "../../component/Table/Table.js"
import PaginationNumber from '../../component/PaginationNumber.js'
import SinglePagination from '../../component/SinglePagination.js'

import axios from "axios"
import server from "../../../config/server.js"
import urls from "../../../config/urls.js"

class ScoreUploadScreen extends React.Component {
  constructor(props) {
    super(props)

    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)
    // this.loggedInPublisher = checkSession.isLoggedIn(props.history, props.PublisherReducer.is_auth)

    this.state = {
      activeTabIndex: 0,
      searchQuery: this.props.SearchReducer.query,
      from: moment(),
      to: moment("12/31/2099"),
      min_date: moment(),
      type_price: "otp",
      action: "add",
      raw_data: "",
      active_id: null,
      active_sub_index: null,
      loading: false,

      // Register
      price: 0,
      currency: "EUR",
      score: "",
      pid: "",
      spid: "",
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

      sort: null,

      mode: "pdf",
      progress: 0,
      disabled: true,
      token: null,
      filename: [],
      nameSortType: 'asc',
      dateSortType: 'asc',
      userSortType: 'asc'

    }
    this.payload = []
    this.data = new FormData()

    this._mounted = false
    this.searchInput = null
    this.toggleTab = this.toggleTab.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleComposerClick = this.handleComposerClick.bind(this)

    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleChangeAction = this.handleChangeAction.bind(this)

    this.dateChange = this.dateChange.bind(this)

    this.onReadScore = this.onReadScore.bind(this)
    this.onReadScoreSuccess = this.onReadScoreSuccess.bind(this)
    this.onReadScoreFailed = this.onReadScoreFailed.bind(this)

    this.onDelete = this.onDelete.bind(this)
    this.onDeleteSuccess = this.onDeleteSuccess.bind(this)
    this.onDeleteFailed = this.onDeleteFailed.bind(this)

    this.singleSelected = this.singleSelected.bind(this)
    this.multipleSelected = this.multipleSelected.bind(this)
    this.checkAll = this.checkAll.bind(this)

    this.onTableHeaderItemClick = this.onTableHeaderItemClick.bind(this)
    this.changeRPP = this.changeRPP.bind(this);

    this.currencyChange = this.currencyChange.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  dateChange(date) {
    this.setState({
      from: date,
      to: date,
      min_date: moment(date)
    })
  }

  currencyChange(e) {
    this.setState({ currency: e.target.value })
  }

  handleChangeType(e) {
    this.setState({
      type_price: e.target.value,
      active_id: null,
      action: null,
      selected_items: {},
      check_all: false
    })
    this.onReadScore()
  }

  handleChangeAction(e) {
    this.setState({ action: e.target.value })
  }

  validateDate(date, param = null) {
    if (date === "") {
      if (param === "to") {
        return moment("12/31/2099")
      } else if (param === "from") {
        return moment()
      }
    } else {
      return moment(date)
    }
  }

  singleSelected(have_price, active_id, data) {
    if (active_id !== this.state.active_id) {
      this.setState({
        active_id: active_id,
        original_file_name: data.original_file_name,
        created: this.validateDate(data.created, "from"),
        user: data.user,
        sid: data.sid,
        pid: data.pid,
      })
    } else {
      this.setState({
        active_id: null,
        original_file_name: "",
        sid: "",
        user: "",
        created: ""
      })
    }
  }

  multipleSelected(checked, selected, data) {
    const { selected_items } = this.state

    if (checked) {
      selected_items[selected] = data

    } else {
      delete selected_items[selected]
    }
    this.setState({
      selected_items: selected_items,
    })
  }

  checkAll(e) {
    const { raw_data } = this.state
    let check_all, selected

    if (e.target.checked) {
      check_all = true
      selected = {}

      if (!_.isEmpty(raw_data)) {
        for (let i = 0; i < raw_data.length; i++) {
          selected[raw_data[i].sid] = { ...raw_data[i] }

        }
      }

    } else {
      check_all = false
      selected = {}
    }

    this.setState({
      check_all: check_all,
      selected_items: selected
    })
  }

  renderCheckBoxAll() {
    const { check_all } = this.state

    return (
      <label className="control control--checkbox ">
        <input type="checkbox" checked={check_all} onChange={this.checkAll} />
        <div className="control__indicator"></div>
      </label>
    )
  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <ScoreUploadRow
          index={index}
          key={index}
          activeId={this.state.active_id}
          selectedItems={this.state.selected_items}
          multipleSelected={this.multipleSelected}
          rowData={val}
          singleSelected={this.singleSelected}
          typePrice={this.state.type_price}
        />
      )
    })
    return element
  }

  getGenericID(type) {
    if (type === "dr" || type === "otp") {
      if (this.state.pid !== "") {
        return this.state.pid
      } else {
        return this.props.PublisherReducer.publisher.pid
      }

    } else if (type === "institution") {
      return this.state.spid

    } else if (type === "so") {
      return this.state.oid

    }
  }

  getUrl(mode, type) {
    if (mode === "read") {
      if (type === "dr") { return "read-price-dr" }
      else if (type === "otp") { return "read-price-otp" }

    } else if (mode === "create") {
      if (type === "dr") { return "create-price-dr" }
      else if (type === "otp") { return "create-price-otp" }

    } else if (mode === "update") {
      if (type === "dr") { return "update-price-dr" }
      else if (type === "otp") { return "update-price-otp" }

    } else if (mode === "delete") {
      if (type === "dr") { return "delete-price-dr" }
      else if (type === "otp") { return "delete-price-otp" }

    } else if (mode === "bulk") {
      if (type === "dr") { return "dr-bulk" }
      else if (type === "otp") { return "otp-bulk" }
    }
  }

  onReadScore(data) {
    let payload = {
      // pid : this.props.PublisherReducer.publisher.pid,
      rpp: data && data.rpp ? data.rpp : this.state.rpp,
      q: this.state.searchQuery,
      sort: data && data.order ? data.order : "",
      // page: data && data.page ? data.page : 1
    }
    Request(
      "get",
      "read-score-upload",
      { Authorization: "Token " + this.state.token },
      payload,
      [],
      this.onReadScoreSuccess,
      this.onReadScoreFailed
    )
  }

  onReadScoreSuccess(response) {
    this.setState({
      raw_data: response.data.scores,
      count: response.data.number_result,
      nextLink: response.data.next_url,
      prevLink: response.data.before_url,
      currentPage: response.data.current_page,
      number_page: response.data.number_page,
      rpp: response.data.rpp
    })
  }

  onReadScoreFailed(err) {
    // this.setState({
    //   source  : "search",
    // })
  }

  onDelete() {
    const { selected_items } = this.state

    let method, payload, url, sid;

    this.setState({ loading: true })

    if (_.isEmpty(selected_items)) {
      if (this.state.score === "") {
        return
      }
    } else {
      let data = this.getPayloadBulk();

      for (var i = 0; i < data.length; i++) {
        Request(
          "delete",
          "delete-score-upload",
          { Authorization: "Token " + this.state.token },
          payload,
          [data[i].sid],
          this.onDeleteSuccess,
          this.onDeleteFailed
        )
      }
    }

  }

  onDeleteSuccess() {
    this.setState({
      loading: false,
      active_id: null,
      score: "",
      selected_items: {},
      check_all: false,
    })

    let data = {
      page: this.state.currentPage
    }

    this.onReadScore(data)
  }

  onDeleteFailed() {
    this.setState({ loading: false })
  }

  getPayloadBulk() {
    const { selected_items } = this.state
    let tmp = []

    for (let i in selected_items) {

      if (this.state.check_all) {
        // If have PID

        tmp.push({
          sid: selected_items[i].sid,
          original_file_name: selected_items[i].original_file_name,
          created: moment(selected_items[i].created).format("YYYY-MM-DD"),
          user: selected_items[i].user,
        })

      } else {
        // If have PID

        tmp.push({
          sid: selected_items[i].sid,
          original_file_name: selected_items[i].original_file_name,
          created: moment(selected_items[i].created).format("YYYY-MM-DD"),
          user: selected_items[i].user,
        })
      }

    }
    return tmp
  }

  hasMount() {
    if (this._mounted) {
      this.onReadScore()
    }
  }

  componentWillMount() {
    const { SessionReducer, InstitutionReducer, EnsembleReducer, PublisherReducer } = this.props
    if (SessionReducer.is_auth) {
      this.setState({ token: this.props.Token.token })
    }

    if (InstitutionReducer && InstitutionReducer.is_auth) {
      this.setState({ token: this.props.Token.tokenInstitution })
    }

    if (EnsembleReducer && EnsembleReducer.is_auth) {
      this.setState({ token: this.props.Token.tokenEnsemble })
    }

    if (PublisherReducer && PublisherReducer.is_auth) {
      this.setState({ token: this.props.Token.tokenPublisher })
    }
  }

  componentDidMount() {
    this._mounted = true
    this.hasMount()

    const { SessionReducer, InstitutionReducer, EnsembleReducer, PublisherReducer } = this.props
    if (SessionReducer.is_auth) {
      this.data.append("uid", SessionReducer.user.uid)
      this.setState({ name_of: SessionReducer.user.name, token: this.props.Token.token })
    }

    if (InstitutionReducer && InstitutionReducer.is_auth) {
      this.data.append("iid", InstitutionReducer.institution.iid)
      this.setState({ name_of: InstitutionReducer.institution.name, token: this.props.Token.tokenInstitution })
    }

    if (EnsembleReducer && EnsembleReducer.is_auth) {
      this.data.append("eid", EnsembleReducer.ensemble.eid)
      this.setState({ name_of: EnsembleReducer.ensemble.name, token: this.props.Token.tokenEnsemble })
    }

    if (PublisherReducer && PublisherReducer.is_auth) {
      this.data.append("pid", PublisherReducer.publisher.pid)
      this.setState({ name_of: PublisherReducer.publisher.name, token: this.props.Token.tokenPublisher })
    }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchQuery: nextProps.SearchReducer.query,
    })
  }

  // Toogle Tab
  toggleTab(tab = null) {
    if (!tab || this.state.activeTabIndex === tab) {
      this.setState({
        activeTabIndex: 0
      })
    } else {
      this.setState({
        activeTabIndex: tab
      })
    }
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.RunRedux(setSearchQuery(this.state.searchQuery))
    this.onReadScore()
  }

  handleComposerClick(data) {
    let { searchQuery } = this.state
    if (data.name.trim() !== "") {
      if (searchQuery.trim() && !searchQuery.endsWith(" ")) {
        searchQuery += " "
      }
      searchQuery += data.name
      this.setState({ searchQuery: searchQuery })
    }
    this.toggleTab()
    window.scrollTo(0, 0)
  }

  renderRow() {
    const { raw_data } = this.state

    if (typeof raw_data === "undefined") {
      return (<tr><td colSpan={100}><p className="grey text-center">Data Empty</p></td></tr>)
    } else {
      if (raw_data.length === 0) {
        return (<tr><td colSpan={100}><p className="grey text-center">Data Empty</p></td></tr>)
      } else {
        return (this.generateRow(raw_data))
      }
    }
  }

  onTableHeaderItemClick(e, data) {
    if (data.data === null) return
    if (data.data.sort === 'original_file_name') {
      if (this.state.nameSortType === 'asc') {
          this.setState({
              items: this.state.raw_data.sort((a ,b) => {
                  if(a.original_file_name < b.original_file_name) { return -1; }
                  if(a.original_file_name > b.original_file_name) { return 1; }
              })
          }, () => {
            this.setState({
              nameSortType: 'des'
            })
          })
      } else if (this.state.nameSortType === 'des') {
          this.setState({
              raw_data: this.state.raw_data.sort((a ,b) => {
                  if(a.original_file_name < b.original_file_name) { return 1; }
                  if(a.original_file_name > b.original_file_name) { return -1; }
              })
          }, () => {
            this.setState({
              nameSortType: 'asc'
            })
          })
      }
    } else if (data.data.sort === 'created') {
        if (this.state.dateSortType === 'asc') {
            this.setState({
                raw_data: this.state.raw_data.sort(function(a,b){
                    return new Date(b.created) - new Date(a.created);
                })
            }, () => {
              this.setState({
                dateSortType: 'des'
              })
            })
        } else if (this.state.dateSortType === 'des') {
            this.setState({
                raw_data: this.state.raw_data.sort(function(a,b){
                    return new Date(a.created) - new Date(b.created);
                })
            }, () => {
              this.setState({
                dateSortType: 'asc'
              })
            })
        }
    } else if (data.data.sort === 'user') {
      if (this.state.userSortType === 'asc') {
          this.setState({
              items: this.state.raw_data.sort((a ,b) => {
                  if(a.user < b.user) { return -1; }
                  if(a.user > b.user) { return 1; }
              })
          }, () => {
            this.setState({
              userSortType: 'des'
            })
          })
      } else if (this.state.userSortType === 'des') {
          
          this.setState({
              raw_data: this.state.raw_data.sort((a ,b) => {
                  if(a.user < b.user) { return 1; }
                  if(a.user > b.user) { return -1; }
              })
          }, () => {
            this.setState({
              userSortType: 'asc'
            })
          })
      }
    }
  }

  pagination(page) {
    this.setState({
      rpp: this.state.rpp,
    });
    let resData = {
      order: this.state.sort,
      page: page,
      rpp: this.state.rpp

    }
    this.onReadScore(resData)
  }

  handlePageClick = (data) => {
    let selected = data.selected + 1
    this.pagination(selected)
  };

  changeRPP(event) {
    this.setState({ rpp: event.target.value });
    let resData = {
      order: this.state.sort,
      page: 1,
      rpp: event.target.value
    }

    this.onReadScore(resData);

  }

  onUpload() {
    let config = {
      onUploadProgress: function (progressEvent) {
        let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({
          progress: percent,
          disabled: true,
        })
      }.bind(this)
    }

    axios.defaults.headers.common = {}
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
    axios.post(server.API_WUL + urls.upload, this.payload, config)
      .then(function (res) {
        this.reset()
        this.setState({
          progress: 0,
          disabled: true
        })
        this.onReadScore();
      }.bind(this))

      .catch(function (err) {
        this.setState({
          progress: 0,
          disabled: true
        })


      }.bind(this))
  }

  handleFileUpload(e) {
    let file = e.target.files
    let filename = this.state.filename;

    if (this.state.mode === "pdf") {
      for (let i = 0; i < e.target.files.length; i++) {
        this.data.append("files", file[i])
        filename.push(file[i].name)
      }

    } else {
      this.data.append("csv", file[0])
    }

    this.payload = this.data

    this.setState({ filename })

    this.setState({
      disabled: false
    })

  }

  reset() {
    this.data.delete("files")
    this.data.delete("csv")
    this.setState({
      filename: []
    });
  }

  render() {
    // Check if login session null or not login
    if (!this.loggedIn) return (null)

    // Check if session isntitution or not swith to insitution
    // if(!this.loggedInPublisher) return(null)

    const { words, lang } = this.props.ActiveLanguageReducer
    const { code } = this.props.ActiveCurrencyReducer
    // const {action, type_price, loading} = this.state
    const { count, currentPage, nextLink, prevLink, number_page } = this.state
    // let button

    // if(action === "add") {
    //   button = <button className="btn-change-price" onClick={()=>this.onRegister(this.getGenericID(type_price), type_price)} disabled={loading}>Add</button>
    // } else if (action === "replace") {
    //   button = <button className="btn-change-price" onClick={()=>this.onUpdate(this.getGenericID(type_price), type_price)} disabled={loading}>Replace</button>
    // } else if (action === "remove") {
    //   button = <button className="btn-change-price" onClick={()=>this.onDelete(this.getGenericID(type_price), type_price)} disabled={loading}>Remove</button>
    // } else {
    //   button = <button className="btn-change-price" disabled>Change</button>
    // }

    let tableColumns = [
      this.renderCheckBoxAll(),
      words.upload_filename,
      words.upload_uploaded_at,
      words.upload_uploaded_by
    ]

    let tableColumnExtras = {}
    tableColumnExtras[this.renderCheckBoxAll()] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-1 col-sm-1 col-xs-12 ",
      canSort: false,
    }
    tableColumnExtras[words.upload_filename] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-4 col-sm-4 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'original_file_name'
      },
    }
    tableColumnExtras[words.upload_uploaded_at] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-offset-1 col-sm-offset-1 col-md-3 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'created'
      },
    }
    tableColumnExtras[words.upload_uploaded_by] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-3 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'user'
      },
    }
    
    return (
      <div className='upload-score'>
        <section className="search-area">
          <div className="row title">{words.upload_score_upload}</div>

        </section>

        <section className="container">
          <div className="row page-numeration-box">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <button className="btn black" onClick={this.onDelete} disabled={!Object.keys(this.state.selected_items).length}>{words.upload_delete}</button>
            </div>

            <div className="col-md-offset-1 col-md-4 col-sm-offset-1 col-sm-4 col-xs-12">
              <label className="uploadLabel">
                <span className="browse-btn">{words.upload_browse} ...</span>
                <span className="noselected-text">&nbsp;&nbsp;
                 {this.state.filename.length > 0 && this.state.filename.length != 1 && this.state.filename.length + " " + words.upload_files_selected}
                  {this.state.filename.length == 1 && this.state.filename.length + " " + words.upload_file_selected}
                  {this.state.filename.length == 0 && words.upload_no_file_selected}
                </span>
                <input
                  type="file"
                  onChange={this.handleFileUpload}
                  multiple accept="application/pdf, .csv"
                // ref             ={ref=> this.fileInputPDF = ref}
                // className       ={classnames("", {"hide" : this.state.mode === "csv"})}
                />
              </label>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12" style={{ textAlign: 'right' }}>
              <button className="btn black" onClick={this.onUpload} disabled={this.state.disabled}>{words.upload_upload}</button>
            </div>
          </div>
          
          <div className="scoreUpload">
            <Table
              columns={tableColumns}
              columnsExtras={tableColumnExtras}
              onHeaderItemClick={this.onTableHeaderItemClick}
            >
              {this.renderRow()}
            </Table>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    SessionReducer: state.SessionReducer,
    Token: state.TokenReducer,
    SearchReducer: state.SearchReducer,
    PublisherReducer: state.PublisherReducer,
    InstitutionReducer: state.InstitutionReducer,
    EnsembleReducer: state.EnsembleReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    ActiveCurrencyReducer: state.ActiveCurrencyReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScoreUploadScreen)

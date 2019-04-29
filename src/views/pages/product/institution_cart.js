import React from 'react'
import { connect } from 'react-redux'
import Table from "../../component/Table/Table.js"
import moment from 'moment'
import DatePicker from 'react-datepicker'
import InstCartRow from "./component/InstCartRow.js"
import Request from "../../../utils/Request.js"

class InstitutionCart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      raw_data_scores: [],
      raw_data_play: [],

      order_perusal_material: false,
      order_perusal_material_start_date: moment(),
      order_perusal_material_to_date: moment(),
      order_perusal_material_order_printed_material: false,
      order_perusal_material_name_1: "",
      order_perusal_material_name_2: "",
      order_perusal_material_address_1: "",
      order_perusal_material_address_2: "",
      order_perusal_material_city: "",
      order_perusal_material_postial_code: "",
      order_perusal_material_additional_information: "",

      play: [],
      order_performance_material: false,
      order_performance_material_order_printed_material: false,
      order_performance_material_start_date: moment(),
      order_performance_material_to_date: moment(),
      order_performance_material_name_1: "",
      order_performance_material_name_2: "",
      order_performance_material_address_1: "",
      order_performance_material_address_2: "",
      order_performance_material_city: "",
      order_performance_material_postial_code: "",
      order_performance_material_additional_information: ""
    }

    this.removeItem = this.removeItem.bind(this)
    this.onOrder = this.onOrder.bind(this)
    this.onOrderSuccess = this.onOrderSuccess.bind(this)
    this.onOrderFailed = this.onOrderFailed.bind(this)

    this.onReadList = this.onReadList.bind(this)
    this.onReadListSuccess = this.onReadListSuccess.bind(this)
    this.onReadListFailed = this.onReadListFailed.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.checkValidation = this.checkValidation.bind(this)

    this.scores_list = []
    this.play_list = []
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.checked
    })
  }

  checkValidation() {
    const { words } = this.props.ActiveLanguageReducer

    if (!this.state.order_perusal_material && !this.state.order_performance_material) {
      return true

    } else if (this.state.order_perusal_material && !this.state.order_performance_material) {
      // list score
      for (let i = 0; i < this.state.raw_data_scores.length; i++) {
        this.scores_list.push(this.state.raw_data_scores[i].sid)
      }
    } else if (!this.state.order_perusal_material && this.state.order_performance_material) {
      // list play
      for (let i = 0; i < this.state.raw_data_play.length; i++) {
        this.play_list.push(this.state.raw_data_play[i].ssid)
      }
    } else if (this.state.order_perusal_material && this.state.order_performance_material) {
      // list keduanya
      for (let i = 0; i < this.state.raw_data_scores.length; i++) {
        this.scores_list.push(this.state.raw_data_scores[i].sid)
      }
      for (let i = 0; i < this.state.raw_data_play.length; i++) {
        this.play_list.push(this.state.raw_data_play[i].ssid)
      }
    }
  }

  onOrder() {
    if (this.checkValidation()) return true

    let o_prsl_mn1,
      o_prsl_mn2,
      o_prsl_ma1,
      o_prsl_ma2,
      o_prsl_mc,
      o_prsl_mpc,
      o_prsl_mai,
      o_prf_mn1,
      o_prf_mn2,
      o_prf_ma1,
      o_prf_ma2,
      o_prf_mc,
      o_prf_mpc,
      o_prf_mai

    if (this.state.order_perusal_material_order_printed_material && !this.state.order_performance_material_order_printed_material) {
      o_prsl_mn1 = this.state.order_perusal_material_name_1
      o_prsl_mn2 = this.state.order_perusal_material_name_2
      o_prsl_ma1 = this.state.order_perusal_material_address_1
      o_prsl_ma2 = this.state.order_perusal_material_address_2
      o_prsl_mc = this.state.order_perusal_material_city
      o_prsl_mpc = this.state.order_perusal_material_postial_code
      o_prsl_mai = this.state.order_perusal_material_additional_information

      o_prf_mn1 = ""
      o_prf_mn2 = ""
      o_prf_ma1 = ""
      o_prf_ma2 = ""
      o_prf_mc = ""
      o_prf_mpc = ""
      o_prf_mai = ""

    } else if (!this.state.order_perusal_material_order_printed_material && this.state.order_performance_material_order_printed_material) {
      o_prsl_mn1 = ""
      o_prsl_mn2 = ""
      o_prsl_ma1 = ""
      o_prsl_ma2 = ""
      o_prsl_mc = ""
      o_prsl_mpc = ""
      o_prsl_mai = ""

      o_prf_mn1 = this.state.order_performance_material_name_1
      o_prf_mn2 = this.state.order_performance_material_name_2
      o_prf_ma1 = this.state.order_performance_material_address_1
      o_prf_ma2 = this.state.order_performance_material_address_2
      o_prf_mc = this.state.order_performance_material_city
      o_prf_mpc = this.state.order_performance_material_postial_code
      o_prf_mai = this.state.order_performance_material_additional_information
    } else {
      o_prsl_mn1 = this.state.order_perusal_material_name_1
      o_prsl_mn2 = this.state.order_perusal_material_name_2
      o_prsl_ma1 = this.state.order_perusal_material_address_1
      o_prsl_ma2 = this.state.order_perusal_material_address_2
      o_prsl_mc = this.state.order_perusal_material_city
      o_prsl_mpc = this.state.order_perusal_material_postial_code
      o_prsl_mai = this.state.order_perusal_material_additional_information

      o_prf_mn1 = this.state.order_performance_material_name_1
      o_prf_mn2 = this.state.order_performance_material_name_2
      o_prf_ma1 = this.state.order_performance_material_address_1
      o_prf_ma2 = this.state.order_performance_material_address_2
      o_prf_mc = this.state.order_performance_material_city
      o_prf_mpc = this.state.order_performance_material_postial_code
      o_prf_mai = this.state.order_performance_material_additional_information
    }

    let payload = {
      scores: JSON.stringify(this.scores_list),
      order_perusal_material: this.state.order_perusal_material,
      order_perusal_material_start_date: moment(this.state.order_perusal_material_start_date).format("YYYY-MM-DD"),
      order_perusal_material_to_date: moment(this.state.order_perusal_material_to_date).format("YYYY-MM-DD"),
      order_perusal_material_order_printed_material: this.state.order_perusal_material_order_printed_material,

      order_perusal_material_name_1: o_prsl_mn1,
      order_perusal_material_name_2: o_prsl_mn2,
      order_perusal_material_address_1: o_prsl_ma1,
      order_perusal_material_address_2: o_prsl_ma2,
      order_perusal_material_city: o_prsl_mc,
      order_perusal_material_postial_code: o_prsl_mai,
      order_perusal_material_additional_information: o_prf_mn1,

      play: JSON.stringify(this.play_list),
      order_performance_material: this.state.order_performance_material,
      order_performance_material_order_printed_material: this.state.order_performance_material_order_printed_material,
      order_performance_material_start_date: moment(this.state.order_performance_material_start_date).format("YYYY-MM-DD"),
      order_performance_material_to_date: moment(this.state.order_performance_material_to_date).format("YYYY-MM-DD"),

      order_performance_material_name_1: o_prf_mn1,
      order_performance_material_name_2: o_prf_mn2,
      order_performance_material_address_1: o_prf_ma1,
      order_performance_material_address_2: o_prf_ma2,
      order_performance_material_city: o_prf_mc,
      order_performance_material_postial_code: o_prf_mpc,
      order_performance_material_additional_information: o_prf_mai
    }

    Request(
      "post",
      "institution-order",
      { Authorization: "Token " + this.props.TokenReducer.tokenInstitution },
      payload,
      [],
      this.onOrderSuccess,
      this.onOrderFailed
    )
  }

  onOrderSuccess(response) {
    const { words } = this.props.ActiveLanguageReducer

    // Remove all data on state and localStorage
    let no_item = []
    this.setState({
      raw_data_scores: no_item,
      raw_data_play: no_item,

      order_perusal_material: false,
      order_perusal_material_start_date: moment(),
      order_perusal_material_to_date: moment(),
      order_perusal_material_order_printed_material: false,
      order_perusal_material_name_1: "",
      order_perusal_material_name_2: "",
      order_perusal_material_address_1: "",
      order_perusal_material_address_2: "",
      order_perusal_material_city: "",
      order_perusal_material_postial_code: "",
      order_perusal_material_additional_information: "",

      play: [],
      order_performance_material: false,
      order_performance_material_order_printed_material: false,
      order_performance_material_start_date: moment(),
      order_performance_material_to_date: moment(),
      order_performance_material_name_1: "",
      order_performance_material_name_2: "",
      order_performance_material_address_1: "",
      order_performance_material_address_2: "",
      order_performance_material_city: "",
      order_performance_material_postial_code: "",
      order_performance_material_additional_information: ""
    })

    localStorage.removeItem("items_package")
    this.props.updateCartCount(no_item.length, true)
  }

  onOrderFailed(error) {
  }

  onReadList() {
    let oldItems = JSON.parse(localStorage.getItem("items_package")) || []
    if (oldItems.length !== 0) {
      let uniqueArray = oldItems.filter(function (item, pos) {
        return oldItems.indexOf(item) == pos;
      })

      let payload = {
        scores: JSON.stringify(uniqueArray)
      }

      Request(
        "post",
        "institution-order-list",
        { Authorization: "Token " + this.props.TokenReducer.tokenInstitution },
        payload,
        [],
        this.onReadListSuccess,
        this.onReadListFailed
      )
    }
  }

  onReadListSuccess(response) {
    this.setState({
      raw_data_play: response.data.play,
      raw_data_scores: response.data.scores,
    })
  }

  onReadListFailed(error) {

  }

  removeItem(key, remove_type) {
    if (remove_type === "score") {
      let items = this.state.raw_data_scores
      items.splice(key, 1)
      this.setState({ raw_data_scores: items })

    } else if (remove_type === "play") {
      let items = this.state.raw_data_play
      items.splice(key, 1)
      this.setState({ raw_data_play: items })
    }


    // let items = this.state.raw_data

    // items.splice(key, 1)
    // this.setState({raw_data: items})
    // localStorage.setItem("items_package", JSON.stringify(items))
    // this.props.updateCartCount(items.length, true)
  }

  generateRow(row, type) {
    var element = row.map((val, index) => {
      return (
        <InstCartRow
          index={index}
          key={index}
          rowData={val}
          removeItem={this.removeItem}
          type={type}
        />
      )
    })
    return element
  }

  renderRow(type) {
    let raw = []

    if (type === "play") {
      raw = this.state.raw_data_play
    } else {
      raw = this.state.raw_data_scores
    }

    if (typeof raw === "undefined") {
      return (<tr><td colSpan={100}><p className="grey text-center">Data Empty</p></td></tr>)
    } else {
      if (raw.length === 0) {
        return (<tr><td colSpan={100}><p className="grey text-center">Data Empty</p></td></tr>)
      } else {
        return (this.generateRow(raw, type))
      }
    }
  }

  componentDidMount() {
    this.onReadList()
  }

  render() {
    const { words } = this.props.ActiveLanguageReducer

    let tableColumns = [
      words.order_table_title,
      words.order_table_composer,
      words.order_table_edition,
      words.order_table_instrument,
      words.order_table_action,
    ]

    let tableColumnExtras = {}
    tableColumnExtras[words.order_table_title] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-3 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'title'
      },
    }
    tableColumnExtras[words.order_table_composer] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-3 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'composer'
      },
    }
    tableColumnExtras[words.order_table_edition] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-2 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'edition'
      },
    }
    tableColumnExtras[words.order_table_instrument] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-2 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'instrument'
      },
    }
    tableColumnExtras[words.order_table_action] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-2 col-sm-3 col-xs-12 ",
      canSort: false,
    }

    const tableColumnsPerformance = [
      words.order_table_title,
      words.order_table_composer,
      words.order_table_action,
    ]

    const tableColumnExtrasPerformance = {}
    tableColumnExtrasPerformance[words.order_table_title] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-4 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'title'
      },
    }
    tableColumnExtrasPerformance[words.order_table_composer] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-4 col-sm-3 col-xs-12 ",
      canSort: true,
      data: {
        'sort': 'composer'
      },
    }

    tableColumnExtrasPerformance[words.order_table_action] = {
      disabled: false,
      visible: true,
      clickable: true,
      className: "col-content col-header col-md-4 col-sm-3 col-xs-12 ",
      canSort: false,
    }

    return (
      <div className="animated fadeIn institution-wrp">
        <div className="container order-container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 cart-big-title no-border">
              <h3>{words.order_title}</h3>
            </div>
          </div>

          <div className="row">
            <p className="divider-midle">
              <label className="control control--checkbox">
                <span className="ov-divider">{words.order_perusal_material}</span>
                <input
                  type="checkbox"
                  checked={this.state.order_perusal_material}
                  onChange={(e) => this.handleChange(e, 'order_perusal_material')}
                />
                <div className="control__indicator"></div>
              </label>
            </p>
          </div>

          <div className="row border-table-generator">
            <Table
              columns={tableColumns}
              columnsExtras={tableColumnExtras}
              onHeaderItemClick={this.onTableHeaderItemClick}
            >
              {this.renderRow("score")}
            </Table>
          </div>

          <div className="row center-xs">
            <div class="col-xs-12">
              <div class="box dates-wrp">
                <div className="row">
                  <div class="col-xs">
                    <div class="box flex-center">
                      <span className="horizontal-field">
                        <label>{words.order_from}</label>
                        <DatePicker
                          selected={this.state.order_perusal_material_start_date}
                          onChange={(date) => this.setState({ order_perusal_material_start_date: moment(date._d) })}
                          minDate={moment()}
                        />
                      </span>
                      <div className="spacer"></div>
                      <span className="horizontal-field">
                        <label>{words.order_to}</label>
                        <DatePicker
                          selected={this.state.order_perusal_material_to_date}
                          onChange={(date) => this.setState({ order_perusal_material_to_date: moment(date._d) })}
                          minDate={moment()}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row nested">
            <p className="divider-midle">
              <label className="control control--checkbox">
                <span className="ov-divider">{words.order_additional_printed_material}</span>
                <input
                  type="checkbox"
                  checked={this.state.order_perusal_material_order_printed_material}
                  onChange={(e) => this.handleChange(e, 'order_perusal_material_order_printed_material')}
                />
                <div className="control__indicator"></div>
              </label>
            </p>
          </div>

          <div className="row nested">
            <div className="col-md-2 col-md-offset-3 address-title">
                {words.order_deliverd_to}:
                <button className='btn black small'>Change</button>
            </div>
            <div className="address-box col-md-4">
                <p>Address I</p>
                <p>City, PO Box</p>
                <p>DE</p>
            </div>
            {/* <div className="col-md-10">
              <div className="row">
                <div className="col-md-6">
                  <div className="vertical-field">
                    <label>{words.order_name_1}</label>
                    <input
                      type="text"
                      value={this.state.order_perusal_material_name_1}
                      onChange={(e) => this.setState({ order_perusal_material_name_1: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_address_1}</label>
                    <input
                      type="text"
                      value={this.state.order_perusal_material_address_1}
                      onChange={(e) => this.setState({ order_perusal_material_address_1: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_city}</label>
                    <input
                      type="text"
                      value={this.state.order_perusal_material_city}
                      onChange={(e) => this.setState({ order_perusal_material_city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="vertical-field">
                    <label>{words.order_name_2}</label>
                    <input
                      type="text"
                      value={this.state.order_perusal_material_name_2}
                      onChange={(e) => this.setState({ order_perusal_material_name_2: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_address_2}</label>
                    <input
                      type="text"
                      value={this.state.order_perusal_material_address_2}
                      onChange={(e) => this.setState({ order_perusal_material_address_2: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_postal_code}</label>
                    <input
                      type="text"
                      value={this.state.order_perusal_material_postial_code}
                      onChange={(e) => this.setState({ order_perusal_material_postial_code: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="vertical-field">
                    <label>{words.order_additional_information}</label>
                    <textarea
                      cols="5"
                      rows="3"
                      value={this.state.order_perusal_material_additional_information}
                      onChange={(e) => this.setState({ order_perusal_material_additional_information: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row">
            <p className="divider-midle">
              <label className="control control--checkbox">
                <span className="ov-divider">{words.order_performance_material}</span>
                <input
                  type="checkbox"
                  checked={this.state.order_performance_material}
                  onChange={(e) => this.handleChange(e, 'order_performance_material')}
                />
                <div className="control__indicator"></div>
              </label>
            </p>
          </div>

          <div className="row border-table-generator">
            <Table
              columns={tableColumnsPerformance}
              columnsExtras={tableColumnExtrasPerformance}
              onHeaderItemClick={this.onTableHeaderItemClick}
            >
              {this.renderRow("play")}
            </Table>
          </div>

          <div className="row center-xs">
            <div class="col-xs-12">
              <div class="box dates-wrp">
                <div className="row">
                  <div class="col-xs">
                    <div class="box flex-center">
                      <span className="horizontal-field">
                        <label>{words.order_from}</label>
                        <DatePicker
                          selected={this.state.order_performance_material_start_date}
                          onChange={(date) => this.setState({ order_performance_material_start_date: moment(date._d) })}
                          minDate={moment()}
                        />
                      </span>
                      <div className="spacer"></div>
                      <span className="horizontal-field">
                        <label>{words.order_to}</label>
                        <DatePicker
                          selected={this.state.order_performance_material_to_date}
                          onChange={(date) => this.setState({ order_performance_material_to_date: moment(date._d) })}
                          minDate={moment()}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row nested">
            <p className="divider-midle">
              <label className="control control--checkbox">
                <span className="ov-divider">{words.order_additional_printed_material}</span>
                <input
                  type="checkbox"
                  checked={this.state.order_performance_material_order_printed_material}
                  onChange={(e) => this.handleChange(e, 'order_performance_material_order_printed_material')}
                />
                <div className="control__indicator"></div>
              </label>
            </p>
          </div>

          <div className="row nested">
            <div className="col-md-2 col-md-offset-3 address-title">
                {words.order_deliverd_to}:
                <button className='btn black small'>Change</button>
            </div>
            <div className="address-box col-md-4">
                <p>Address I</p>
                <p>City, PO Box</p>
                <p>DE</p>
            </div>
            {/* <div className="col-md-10">
              <div className="row">
                <div className="col-md-6">
                  <div className="vertical-field">
                    <label>{words.order_name_1}</label>
                    <input
                      type="text"
                      value={this.state.order_performance_material_name_1}
                      onChange={(e) => this.setState({ order_performance_material_name_1: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_address_1}</label>
                    <input
                      type="text"
                      value={this.state.order_performance_material_address_1}
                      onChange={(e) => this.setState({ order_performance_material_address_1: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_city}</label>
                    <input
                      type="text"
                      value={this.state.order_performance_material_city}
                      onChange={(e) => this.setState({ order_performance_material_city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="vertical-field">
                    <label>{words.order_name_2}</label>
                    <input
                      type="text"
                      value={this.state.order_performance_material_name_2}
                      onChange={(e) => this.setState({ order_performance_material_name_2: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_address_2}</label>
                    <input
                      type="text"
                      value={this.state.order_performance_material_address_2}
                      onChange={(e) => this.setState({ order_performance_material_address_2: e.target.value })}
                    />
                  </div>
                  <div className="vertical-field">
                    <label>{words.order_postal_code}</label>
                    <input
                      type="text"
                      value={this.state.order_performance_material_postial_code}
                      onChange={(e) => this.setState({ order_performance_material_postial_code: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="vertical-field">
                    <label>{words.order_additional_information}</label>
                    <textarea
                      cols="5"
                      rows="3"
                      value={this.state.order_performance_material_additional_information}
                      onChange={(e) => this.setState({ order_performance_material_additional_information: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row center-xs">
            <div class="col-xs-5">
              <div class="box">
                <button onClick={this.onOrder} className="btn-order btn black small">{words.order_button_now}</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ActiveLanguageReducer: state.ActiveLanguageReducer,
    TokenReducer: state.TokenReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionCart)

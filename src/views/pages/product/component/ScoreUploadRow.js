import React from "react"
import moment from "moment"
import classnames from "classnames"
import _ from "lodash/core"

const symbol = {
  "EUR" : "€",
  "USD" : "$",
}

export default class ScoreUploadRow extends React.Component {
  constructor(props) {
    super(props)
    this.single = this.single.bind(this)
    this.multiple = this.multiple.bind(this)
    this.renderChechbox = this.renderChechbox.bind(this)
  }

  getInfoFromSearch(key, index=0) {
    const {rowData, typePrice} = this.props;

    if(!_.isEmpty(rowData)) {
      if(_.has(rowData, typePrice)) {
        if(!_.isEmpty(rowData[typePrice])) {
          if(_.has(rowData[typePrice][index], key)) {
            return rowData[typePrice][index][key]
          }
        } else {
          return ""
        }

      }
    }
  }

  single(e, have_price, i) {
    const {rowData, singleSelected} = this.props

    let customeData = {
      sid       : rowData.sid,
      original_file_name       : this.getInfoFromSearch("original_file_name", i), // pid is price id
      created : moment(this.getInfoFromSearch("created", i)).format("YYYY-MM-DD"),
      user   : this.getInfoFromSearch("user", i),
    }

    if(have_price) {
      singleSelected(have_price, this.getInfoFromSearch("sid", i), customeData)
    }else {
      singleSelected(have_price, rowData.sid, customeData)
    }
  }

  multiple(e, price_id, index) {

    const {rowData} = this.props

    let customeData = {
      sid       : rowData.sid,
      original_file_name : this.getInfoFromSearch("original_file_name", index), // pid is price id
      created : moment(this.getInfoFromSearch("created", index)).format("YYYY-MM-DD"),
      user   : this.getInfoFromSearch("user", index),
    }


    this.props.multipleSelected(e.target.checked, price_id, customeData)
  }

  renderChechbox(price_id, index=0) {

    return(
      <label className="control control--checkbox">
        <input
          type="checkbox"
          checked={this.props.selectedItems[price_id] !== undefined}
          onChange={(e)=>this.multiple(e, price_id, index)}
        />
        <div className="control__indicator"></div>
      </label>
    )
  }

  renderRow() {
    const {rowData, typePrice, activeId, selectedItems} = this.props
    let element = []

    if(!_.isEmpty(rowData)) {

          element.push(
              <li
                className={classnames(
                  "standard-container transition-all",
                  {"active-row" : selectedItems[rowData.sid] !== undefined || activeId === rowData.sid}
                )}
                key={rowData.sid}>
                <div className="pointer no-margin row full-width">
                  <div className={"col-content col-body col-md-1 col-sm-1 col-xs-12"}>
                    {this.renderChechbox(rowData.sid, 0)}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-4 col-sm-4 col-xs-12 content-left"}>
                    {rowData.original_file_name}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-offset-1 col-sm-offset-1 col-md-3 col-sm-3 col-xs-12"}>
                    {moment(rowData.created).format("YYYY - MM - DD")}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                    {rowData.user}
                  </div>
                </div>
              </li>
          )
        }


    return element
  }

  render() {
    return (
      this.renderRow()
    )
  }
}

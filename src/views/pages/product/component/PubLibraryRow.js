import React from "react"
import moment from "moment"
import classnames from "classnames"
import _ from "lodash/core"

const symbol = {
  "EUR" : "€",
  "USD" : "$",
}

export default class PubLibraryRow extends React.Component {
  constructor(props) {
    super(props)
    this.single = this.single.bind(this)
    this.multiple = this.multiple.bind(this)
  }

  getInfoFromSearch(key, index=0) {
    const {rowData, typePrice} = this.props

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

  single(have_price, i) {
    const {rowData, singleSelected} = this.props

    let customeData = {
      score     : rowData.sid,
      pid       : this.getInfoFromSearch("pid", i), // pid is price id
      from_date : this.getInfoFromSearch("from", i),
      to_date   : this.getInfoFromSearch("to", i),
      price     : this.getInfoFromSearch("price", i),
    }

    if(have_price) {
      singleSelected(have_price, this.getInfoFromSearch("pid", i), customeData)
    }else {
      singleSelected(have_price, rowData.sid, customeData)
    }
  }

  multiple(e, price_id, index) {
    const {rowData} = this.props
    let customeData = {
      title     : rowData.title,
      score     : rowData.sid,
      pid       : this.getInfoFromSearch("pid", index), // pid is price id
      from_date : this.getInfoFromSearch("from", index),
      to_date   : this.getInfoFromSearch("to", index),
      price     : this.getInfoFromSearch("price", index),
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
          <li className="standard-container transition-all" key={rowData.sid}>
            <div
              onClick={()=>this.single(false, 0)}
              className={
                classnames("pointer no-margin row full-width",
                  {"active-row" : selectedItems[rowData.id] !== undefined || activeId === rowData.id}
                )
              }>
              <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
                {rowData.title}
              </div>
              <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
                {rowData.composer.name}
              </div>
              <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
                {rowData.instrument}
              </div>
              <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
                {rowData.edition}
              </div>
              <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
                {rowData.category}
              </div>
              <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
                {rowData.created_by}
              </div>
             <div className="more">
                <a>...</a>
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

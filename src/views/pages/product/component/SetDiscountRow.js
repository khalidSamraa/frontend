import React from "react"
import moment from "moment"
import classnames from "classnames"
import _ from "lodash/core"

const symbol = {
  "EUR" : "€",
  "USD" : "$",
}

export default class SetDiscountRow extends React.Component {
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
      oid       : this.getInfoFromSearch("oid", i), // oid is price id
      from_date : this.getInfoFromSearch("from", i),
      to_date   : this.getInfoFromSearch("to", i),
      price     : this.getInfoFromSearch("price", i),
    }

    if(have_price) {
      singleSelected(have_price, this.getInfoFromSearch("oid", i), customeData)
    }else {
      singleSelected(have_price, rowData.sid, customeData)
    }
  }

  multiple(e, price_id, index) {

    const {rowData} = this.props
    let customeData = {
      title     : rowData.title,
      sid       : rowData.sid,
      oid       : this.getInfoFromSearch("oid", index), // oid is price id
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
      if(_.has(rowData, typePrice)) {

        if(!_.isEmpty(rowData[typePrice])) {
          for(let i = 0; i < rowData[typePrice].length; i++) {
            element.push(
               <li key={i} className={
                   classnames("standard-container transition-all",
                   {"active-row" : selectedItems[this.getInfoFromSearch("oid", i)] !== undefined || activeId === this.getInfoFromSearch("oid", i)}
                 )}>
                  <div className="pointer no-margin row full-width">
                    <div className={"col-content col-body col-md-1 col-sm-1 col-xs-12"}>
                      {this.renderChechbox(this.getInfoFromSearch("oid", i), i)}
                    </div>
                    <div onClick={(e)=>this.single(e, true, i)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                      {rowData.title}
                    </div>
                    <div onClick={(e)=>this.single(e, true, i)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                      {rowData.composer}
                    </div>
                    <div onClick={(e)=>this.single(e, true, i)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                      {rowData.instrument}
                    </div>
                    <div onClick={(e)=>this.single(e, true, i)} className={"col-content col-body col-md-2 col-sm-2 col-xs-12 descrease-width"}>
                      {this.getInfoFromSearch("from", i) === "" ? "-" : moment(this.getInfoFromSearch("from", i)).format("ll")}
                    </div>
                    <div onClick={(e)=>this.single(e, true, i)} className={"col-content col-body col-md-2 col-sm-2 col-xs-12 descrease-width"}>
                      {this.getInfoFromSearch("to", i) === "" ? "-" : moment(this.getInfoFromSearch("to", i)).format("ll")}
                    </div>
                    <div onClick={(e)=>this.single(e, true, i)} className={"col-content col-body col-md-2 col-sm-2 col-xs-12 descrease-width"}>
                      {this.getInfoFromSearch("discount", i).toFixed(2)}
                    </div>
                  </div>
                </li>
            )
          }
        } else {
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
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                    {rowData.title}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                    {rowData.composer}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
                    {rowData.instrument}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-2 col-sm-2 col-xs-12 descrease-width"}>
                    {this.getInfoFromSearch("from") === "" ? "-" : moment(this.getInfoFromSearch("from")).format("ll")}
                  </div>
                  <div onClick={(e)=>this.single(e, false, 0)} className={"col-content col-body col-md-2 col-sm-2 col-xs-12 descrease-width"}>
                    {this.getInfoFromSearch("to") === "" ? "-" : moment(this.getInfoFromSearch("to")).format("ll")}
                  </div>
                  <div className={"col-content col-body col-md-2 col-sm- col-xs-12 descrease-width"}>
                    {this.getInfoFromSearch("discount") ? this.getInfoFromSearch("discount").toFixed(2) : ''}
                  </div>
                </div>
              </li>
          )
        }
      }
    }
    return element
  }

  render() {
    return (
      this.renderRow()
    )
  }
}

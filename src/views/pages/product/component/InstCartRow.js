import React from "react"
import moment from "moment"
import classnames from "classnames"
import _ from "lodash/core"

export default class InstCartRow extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRow() {
    const {index, rowData, type, removeItem} = this.props

    if(type === "score") {
      return (
        <li className="standard-container transition-all">
           <div className="pointer no-margin row full-width">
             <div className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
               {rowData.play.title}
             </div>
             <div className={"col-content col-body col-md-3 col-sm-3 col-xs-12"}>
               {rowData.play.composer}
             </div>
             <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
               {rowData.edition}
             </div>
             <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
               {rowData.instrument}
             </div>
             <div className={"col-content col-body col-md-2 col-sm-2 col-xs-12"}>
               <button onClick={()=>removeItem(index, type)}>Delete</button>
             </div>
           </div>
         </li>
      )
    } else {
      return (
        <li className="standard-container transition-all">
           <div className="pointer no-margin row full-width">
             <div className={"col-content col-body col-md-4 col-sm-3 col-xs-12"}>
               {rowData.title}
             </div>
             <div className={"col-content col-body col-md-4 col-sm-3 col-xs-12"}>
               {rowData.composer}
             </div>
             <div className={"col-content col-body col-md-4 col-sm-3 col-xs-12"}>
               <button onClick={()=>removeItem(index, type)}>Delete</button>
             </div>
           </div>
         </li>
      )
    }

  }

  render() {
    return (
      this.renderRow()
    )
  }
}

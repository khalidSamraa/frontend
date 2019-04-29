import React from "react"

export default class InstitutionRow extends React.Component {

  render() {
    const {rowData, onSwitch} = this.props
    return (
      <ul className="institution-list">
        <li className="institution transition-all" onClick={()=>onSwitch(rowData.eid)}>
          {rowData.name}
        </li>
      </ul>
    )
  }
}

import React from "react"

export default class PublisherRow extends React.Component {

  render() {
    const {rowData, onSwitch} = this.props
  
    return (
      <ul className="institution-list">
        <li className="institution transition-all" onClick={()=>onSwitch(rowData.pid)}>
          {rowData.name}
        </li>
      </ul>
    )
  }
}

import React from "react"
// import getFirstCaracter from "../../../../utils/get_first_caracter.js"

export default class ComposerRow extends React.Component {
  constructor(props) {
    super(props)
  }

  renderData() {
    const {rowData} = this.props

    let tmp = []
    for(let i = 0; i < rowData.length; i++) {
      tmp.push(<a href="" key={rowData[i].cid}>{rowData[i].name}<span>{rowData[i].total_score}</span></a>)
    }
    return tmp
  }

  render() {
    const {letter} = this.props
    
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="box">
          <ul>
            <li>
              <h2>{letter}</h2>
              {this.renderData()}
            </li> 
          </ul>               
        </div>
      </div>

    )
  }
}

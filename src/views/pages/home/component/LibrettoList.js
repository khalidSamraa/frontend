import React from "react"
import LibrettoRow from "../../../component/Row/LibrettoRow.js"
import Request from '../../../../utils/Request.js'
// Dummy Api
import {DATA_LIBRETTO_SIMPLE} from "../../../../data/libretto.js"

export default class LibrettoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed  = this.onReadFailed.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
  }

  componentDidMount() {
    this.onRead()
  }

  onRead() {
    this.onReadSuccess({data: DATA_LIBRETTO_SIMPLE.sort( (a,b) => {return a.libretto.localeCompare(b.libretto) } )})
  }

  onReadSuccess(response) {
    this.setState({
      items: response.data
    })
  }

  onReadFailed(error) {
  }

  onItemClick(data) {
    const { onClick } = this.props
    onClick(data)
  }

  generateRow() {
    const {items} = this.state
    let clusters = {}

    for(let i = 0; i < items.length; i++) {
      if (items[i].libretto.trim().length > 0) {
        let newData = {
          id: items[i].id,
          name: items[i].libretto,
          totalScore: items[i].total_score
        }

        let firstChar = newData.name[0].toUpperCase()
        if(!clusters[firstChar]) {
          clusters[firstChar] = [newData]
        } else {
          clusters[firstChar].push(newData)
        }
      }
    }

    let row = []
    for(let cluster in clusters) {
      row.push(
        <LibrettoRow
          index={cluster}
          letter={cluster}
          key={cluster}
          librettos={clusters[cluster]}
          onClick={this.onItemClick}
        />
      )
    }
    return row
  }

  render() {
    return (
      <div className="row no-border">
        {this.generateRow()}
      </div>
    )
  }
}

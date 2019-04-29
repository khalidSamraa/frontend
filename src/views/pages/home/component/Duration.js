import "rc-slider/assets/index.css"
import React from "react"
import Slider from "rc-slider"
import moment from "moment"

const style = { margin: 50 }

export default class Duration extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      min: 0,
      max: 100,
    }
    
    this.log = this.log.bind(this)
    this.durationResult = this.durationResult.bind(this)
  }

  getSec(percent) {
    return this.getTotalSec() / 100 * percent
  }

  getValue(value) {
    // let minutes = value % 60;
    let seconds = (value % 60).toString()
    if (seconds.length < 2) {
      seconds = "0" + seconds
    }
    return Math.floor(value / 60) + ":" + seconds
    // return moment.utc( Math.round(value * 1000) ).format("HH:mm:ss")
  }

  getTotalSec() {
    const { maxHours } = this.props
    return maxHours * 60 * 60
  }

  generateMarks() {
    const { steps } = this.props

    let useSteps = steps
    if (useSteps < 2) {
      useSteps = 2
    }

    let perStep = this.getTotalSec() / (useSteps - 1)
    let perPercent = 100 / (useSteps - 1)
    let loopStep = 0
    let loopPercent = 0
    let res = {0: this.getValue(loopStep)}

    for (let i = 0 ; i < useSteps - 1 ; i++) {
      loopStep += perStep
      loopPercent += perPercent
      res[Math.round(loopPercent)] = this.getValue(loopStep)
    }

    return res
  }

  log(value) {    
    this.setState({
      min: value[0],
      max: value[1],
    })
  }

  durationResult() {
    const { onDurationClick } = this.props
    const { min, max } = this.state
    
    let query = ""
    if (min > 0) {
      query += this.getValue( this.getSec(min) )
    }
    if (max < 100) {
      query += "-" + this.getValue( this.getSec(max) )
    }
    onDurationClick({name: query})
  }

  render() {
    const {min, max} = this.state
    return (
      <div>
        <div className="flex-center">
          <a role="button" onClick={this.durationResult} className="text-center">{this.getValue(this.getSec(min))} - {this.getValue(this.getSec(max))}</a>
        </div>
        <div style={style}>
          <Slider.Range min={0} marks={this.generateMarks()} onChange={this.log} defaultValue={[0, 100]} />
        </div>
      </div>
    )
  }
}

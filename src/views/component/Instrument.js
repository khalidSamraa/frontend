import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  id        : PropTypes.number.isRequired,
  name       : PropTypes.string.isRequired,
  totalScore : PropTypes.number,
  
  className  : PropTypes.string,
  designType : PropTypes.number,

  onClick    : PropTypes.func,
}

const defaultProps = {
  totalScore : 0,
  
  className  : "",
  designType : 1,

  onClick() {}
}

class Instrument extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const {onClick, id, name} = this.props
    onClick({id: id, name: name})
  }

  renderTypeOne(){
    const {name, totalScore} = this.props
    return(
      <a role="button" onClick={this.onClick}>
        {name}
        <span>{totalScore}</span>
      </a>
    )
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderTypeOne()
    }
    return (null)
  }
}

Instrument.propTypes = propTypes
Instrument.defaultProps = defaultProps
export default Instrument
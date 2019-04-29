import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  cid        : PropTypes.string.isRequired,
  name       : PropTypes.string.isRequired,
  short_text : PropTypes.string,
  long_text  : PropTypes.string,
  images     : PropTypes.array,
  icon       : PropTypes.string,
  totalScore : PropTypes.number,
  
  className  : PropTypes.string,
  designType : PropTypes.number,

  onClick    : PropTypes.func,
}

const defaultProps = {
  short_text : "",
  long_text  : "",
  images     : [],
  icon       : "",
  totalScore : 0,
  
  className  : "",
  designType : 1,

  onClick() {}
}

class Composer extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const {onClick, cid, name} = this.props
    onClick({cid: cid, name: name})
  }

  renderSimple(){
    const { name, words } = this.props
    return (
      <div className="book-composer">
        {words.home_composer_by} {name}
      </div>
    )
  }

  renderFistLetter() {
    const {name, totalScore} = this.props
    return(
      <a role="button" onClick={this.onClick}>
        {name}
        <span>{totalScore}</span>
      </a>
    )
  }

  renderTypeThree() {
    const { value, className } = this.props
    return (
      <div className={className}>
        <div className="book-title">
          {value}
        </div>
      </div>
    );
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderSimple()
    } else if (designType === 2) {
      return this.renderFistLetter()
    } else if (designType === 3) {
      return this.renderTypeThree()
    }
    return (null)
  }
}

Composer.propTypes = propTypes
Composer.defaultProps = defaultProps
export default Composer
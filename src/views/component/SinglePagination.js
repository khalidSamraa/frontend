import React from "react"
import PropTypes from "prop-types"

export default class SinglePagination extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      count,
      previousLink,
      nextLink,
      currentPage,
      click,
    } = this.props

    let buttonNext, buttonPrev = null
    if(count === 0 || count === null) {
      buttonPrev = null
    } else if(previousLink === "" ) {
      buttonPrev = <li className="disable"><a tabIndex="0" role="button"><span className="first big-arrow"></span></a></li>
    } else {
      buttonPrev = <li onClick={()=>click(currentPage - 1)}><a tabIndex="0" role="button"><span className="first big-arrow"></span></a></li>
    }

    if(count === 0 || count === null) {
      buttonNext = null
    } else if (nextLink === "") {
      buttonNext = <li className="disable"><a tabIndex="0" role="button"><span className="last big-arrow"></span></a></li>
    } else {
      buttonNext = <li onClick={()=>click(currentPage + 1)}><a tabIndex="0" role="button"><span className="last big-arrow"></span></a></li>
    }

    return (
      <div className="page-numeration-box">
        <div className="page-numeration no-padding">
          <ul className="no-padding">
            {buttonPrev}
            {count === null || count === 0 ? null : <li><a tabIndex="0">{currentPage}</a></li>}
            {buttonNext}
          </ul>
        </div>
      </div>
    )
  }
}

SinglePagination.propTypes = {
  count        : PropTypes.number,
  previousLink : PropTypes.string,
  nextLink     : PropTypes.string,
  currentPage  : PropTypes.number,
  click        : PropTypes.func.isRequired,
}

SinglePagination.defaultProps = {
  count        : 0,
  previousLink : null,
  nextLink     : null,
  currentPage  : 0,
  click        : null,
}
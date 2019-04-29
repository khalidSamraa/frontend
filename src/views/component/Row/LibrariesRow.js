import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookOrderer from '../BookOrderer.js';
import Score from '../Score.js';
import UsageFee from '../UsageFee.js';
import Composer from '../Composer.js'

const propTypes = {
  words: PropTypes.object.isRequired,

  index: PropTypes.number.isRequired,
  score: PropTypes.object.isRequired,
  composer: PropTypes.object.isRequired,
  usageFee: PropTypes.object.isRequired,
  orderer: PropTypes.object.isRequired,
  options: PropTypes.element.isRequired,
}

const defaultProps = {}

class LibrariesRow extends Component {

  render() {
    const {
      score,
      composer,
      usageFee,
      orderer,
      options,
      words
    } = this.props
    return (
      <li className="standart-container transition-all">
        <div className="no-margin row full-width">
          <Score {...score} words={words} className={"col-content col-md-2 col-sm-2 col-xs-12"} />
          <Composer {...composer} words={words} className={"col-content col-md-2 col-sm-2 col-xs-12"} designType={3}/>
          <div className={"col-content col-md-2 col-sm-2 col-xs-12"}>
            <div className="book-title">
              {score.edition}
            </div>
          </div>
          <div className={"col-content col-md-2 col-sm-2 col-xs-12"}>
            <div className="book-title">
              {score.instrument}
            </div>
          </div>
          <UsageFee {...usageFee} words={words} className={"col-content col-md-2 col-sm-2 col-xs-12"} />
          <BookOrderer {...orderer} words={words} className={"col-content content-center col-md-2 col-sm-2 col-xs-12"} />
        </div>
        {options}
      </li>
    )
  }
}

LibrariesRow.propTypes = propTypes
LibrariesRow.defaultProps = defaultProps
export default LibrariesRow

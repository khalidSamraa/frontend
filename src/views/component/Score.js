import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Composer from './Composer.js'

const propTypes = {
  sid: PropTypes.string.isRequired,
  ssid: PropTypes.string,
  title: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
  edition: PropTypes.string,
  arrangement: PropTypes.string,
  translation: PropTypes.string,
  orchestration: PropTypes.string,
  category: PropTypes.string,
  images: PropTypes.array,
  icon: PropTypes.string,
  prices: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),

  className: PropTypes.string,
  designType: PropTypes.number,
}

const defaultProps = {
  ssid: '',
  pages: 0,
  edition: '',
  arrangement: '',
  translation: '',
  orchestration: '',
  category: '',
  images: [],
  icon: '',
  prices: {},

  className: '',
  designType: 1,
}

class Score extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderTypeOne(){
    const {className, title, category, pages, words} = this.props
    return (
      <div className={className}>
        <div className="book-title">
          {title}
        </div>
        <div className="book-composer">
          {(!category || category === '') ? '-' : category},
          <span>&nbsp;{pages} {pages > 1 ? words.library_pages : words.library_page}</span>
        </div>
      </div>
    );
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderTypeOne()
    }
    return (null)
  }
}

Score.propTypes = propTypes
Score.defaultProps = defaultProps
export default Score
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimesRemaining from '../../utils/TimesRemaining.js'

const propTypes = {
  oid: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  finishDate: PropTypes.string.isRequired,

  className: PropTypes.string,
  designType: PropTypes.number,
}

const defaultProps = {
  className: '',
  designType: 1,
}

class RentalPeriod extends Component {
  // constructor(props) {
  //   super(props);
  // }
   
  getDifferent(different) {
    let keys = ['weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']
    for (let i = 0 ; i < keys.length ; i++) {
      if (different[keys[i]]) {
        return (different[keys[i]] + ' ' + keys[i] + ' remaining')
      }
    }
  }

  renderSimple(){
    const {className, startDate, finishDate} = this.props
    let remaining = new TimesRemaining(moment(), moment(finishDate, "DD-MM-YYYY"))
    return (
      <div className={className}>
        <div>
          <div className="book-title">
            {moment(startDate, "DD-MM-YYYY")._i} - {remaining._finishDate._i}
          </div>
          <div className="user-type align-right">
            {this.getDifferent(remaining.different())}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderSimple()
    }
    return (null)
  }
}

RentalPeriod.propTypes = propTypes
RentalPeriod.defaultProps = defaultProps
export default RentalPeriod
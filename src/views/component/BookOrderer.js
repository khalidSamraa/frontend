import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User.js';
import Institution from './Institution.js';

const propTypes = {
  oid: PropTypes.string.isRequired,
  buyer: PropTypes.object,
  state: PropTypes.number,
  created: PropTypes.string,

  className: PropTypes.string,
  designType: PropTypes.number,
}

const defaultProps = {
  buyer: null,
  state: 0,
  created: '',

  className: '',
  designType: 1,
}

class BookOrderer extends Component {

  getUser() {
    const { buyer } = this.props;
    return {
      uid: buyer.detail.uid,
      userName: buyer.detail.name,
      email: buyer.detail.email,
    }
  }

  getInstitution() {
    const { buyer } = this.props;
    return {
      iid: buyer.detail.iid,
      name: buyer.detail.name
    }
  }

  renderSimple(){
    const { className, buyer, words } = this.props;
    return (
      <div className={className}>
        {buyer.type === 'individual' ? <User {...this.getUser()} words={words} /> : <Institution {...this.getInstitution()} words={words} />}
      </div>
    )
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderSimple()
    }
    return (null)
  }
}

BookOrderer.propTypes = propTypes
BookOrderer.defaultProps = defaultProps
export default BookOrderer
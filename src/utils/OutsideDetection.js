import React from 'react'
import PropTypes from 'prop-types'

class OutsideDetection extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggle(false)
    } else {
      this.props.toggle(true)
    }
  }

  render () {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}

export default OutsideDetection;

OutsideDetection.propTypes = {
  children: PropTypes.element.isRequired,
};

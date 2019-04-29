import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { validate } from '../../../utils/validate.js'

const propTypes = {
  placeHolder: PropTypes.string,

  show: PropTypes.bool,
  executeOnEnter: PropTypes.bool,

  onSearch: PropTypes.func,
  onSearchTime: PropTypes.number,

  className: PropTypes.string,
}

const defaultProps = {
  placeHolder: "Type input",

  show: false,
  executeOnEnter: true,

  onSearch() {},
  onSearchTime: 300,

  className: "",
}

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }

    this.eventTrigger = this.eventTrigger.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)

    this.searchedValue = ""
  }

  onChange(e) {
    const { onSearchTime } = this.props
    clearTimeout(this.timer);
    this.timer = setTimeout(this.eventTrigger, onSearchTime);
    this.setState({ value: e.target.value });
  }

  onKeyPress(e) {
    const { executeOnEnter } = this.props
    if (executeOnEnter && e.key === 'Enter') {
      clearTimeout(this.timer);
      this.eventTrigger();
    }
  }

  eventTrigger() {
    const { onSearch } = this.props
    let { value } = this.state;
    value = value.trim()
    if (value !== this.searchedValue) {
      onSearch(value);
      this.searchedValue = value
    }
  }

  componentWillMount() {
    this.timer = null;
  }

  render() {
    const {
      show,
      placeholder,
      className
    } = this.props;

    return (
      <div className={classnames("search-box-with-border", {'show': show}, className)}>
        <label className="input-search-overlay-label">
          <input 
            type="text" 
            className="input-search-overlay" 
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            placeholder={placeholder}
          />
        </label>
      </div>
    );
  }
}

SearchPanel.propTypes = propTypes
SearchPanel.defaultProps = defaultProps
export default SearchPanel
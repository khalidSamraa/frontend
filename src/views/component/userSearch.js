import React from 'react';
import classnames from 'classnames';

const WAIT_INTERVAL = 600;

export default class userSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value       : ''
    }

    this.triggerChange = this.triggerChange.bind(this);
  }

  handleChange(e) {
    clearTimeout(this.timer);
    this.setState({ value: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.triggerChange();
    }
  }

  triggerChange() {
    const { value } = this.state;
    this.props.onChange(value);
  }

  componentWillMount() {
    this.timer = null;
  }

  render() {

    const {
      placeholder, 
      model, 
      toggle,
      rtl,
    } = this.props;

    if(model === 'overlay') {
      return (
        <label className="input-search-overlay-label">
          <input 
            type="text" 
            className="input-search-overlay" 
            onChange={(e)=>this.handleChange(e)}
            onKeyPress={(e)=>this.handleKeyDown(e)}
            placeholder={placeholder}
          />
        </label>
      )
    }

    return (
      <div className={classnames("search-box-with-border", {'show': toggle, 'search-rtl': rtl})}>
        <label className="input-search-overlay-label">
          <input 
            type="text" 
            className="input-search-overlay" 
            onChange={(e)=>this.handleChange(e)}
            onKeyPress={(e)=>this.handleKeyDown(e)}
            placeholder={placeholder}

          />
        </label>
      </div>
    );
  }
}

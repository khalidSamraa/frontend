import React, { Component } from 'react';
import './style.css';

class Radio extends Component {
    state = {
      checked: false
    }

    onChange = (ev) => {
      const { checked } = ev.target;
      this.setState({
        checked: checked
      });
      this.props.onChange(ev.target);
    }

    render () {
      return (
        <div className={this.props.checked ? 'radio active' : 'radio'}>
          <label className='label' htmlFor={`radio-${this.props.name}-${this.props.value}`}>
            <span className='button'>
              <i className='fill' />
            </span>
            {this.props.label}
          </label>
          <input
            id={`radio-${this.props.name}-${this.props.value}`}
            type='radio'
            onChange={this.onChange}
            name={this.props.name}
            value={this.props.value}
            label='Choose this'
          />
        </div>
      );
    }
}

export default Radio;

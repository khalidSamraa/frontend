import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from '../../utils/validate.js';

const propTypes = {
  gid: PropTypes.string.isRequired,
  name: PropTypes.string,
  memberCount: PropTypes.number,

  updateMode: PropTypes.bool,
  updateOnEnter: PropTypes.bool,
  updating: PropTypes.bool,
  // validators: PropTypes.array

  className: PropTypes.string,
  designType: PropTypes.number,

  onCancel: PropTypes.func,
  onUpdate: PropTypes.func,
}

const defaultProps = {
  name: "",
  memberCount: -1,

  updateMode: false,
  updateOnEnter: true,
  updating: false,
  // validators: [],

  className: "",
  designType: 1,

  onCancel() {},
  onUpdate() {},
}

class Group extends Component {
  constructor(props) {
    super(props)

    this.onKeyPress = this.onKeyPress.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onUpdate = this.onUpdate.bind(this)

    if (props.updateMode) {
      this.state = {
        inputValue: props.name
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inputValue: nextProps.name
    })
  }

  onUpdate(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const { onUpdate, name } = this.props
    let { inputValue } = this.state
    if (validate(['required'], inputValue)) {
      onUpdate({input: inputValue, default: name})
    }
  }

  onCancel(e) {
    e.preventDefault()
    e.stopPropagation()
    const { onCancel } = this.props
    onCancel()
  }

  onKeyPress(e) {
    const { updateOnEnter } = this.props
    if(updateOnEnter && e.key === 'Enter' && e.shiftKey === false) {
      // e.preventDefault();
      this.onUpdate()
    }
  }

  renderTypeOne() {
    const { updateMode } = this.props

    if (updateMode) {
      let { inputValue, onCancel } = this.state
      let extraProps = {}
      if (!validate(['required'], inputValue)) {
        extraProps.disabled = true
      }
      return (
        <div className="member-name">
          <input 
            type="text"
            defaultValue={inputValue}
            onKeyPress  ={this.onKeyPress}
            onChange={ (e)=>this.setState( {inputValue: e.target.value} ) }
            maxLength={16}
          />
          <div>
            <button
              className="btn-arb"
              style={{'padding': '4px'}}
              onClick={this.onUpdate}
              {...extraProps}
            >
              update
            </button>
            <button
              className="btn-arb red-i"
              style={{'padding': '4px'}}
              onClick={this.onCancel}
            >
              cancel
            </button>
          </div>
        </div>
      )
    } else {
      const { name, memberCount, updating } = this.props
      return (
        <div className="member-name">
          { !updating ? <div role="button">{name}</div> : <div role="button" style={{color : "#b5b5b5"}}>Updating...</div> }
          { !updating &&
            <div className="member-email-info">
              <a className="member-email link-member">({memberCount})</a>
            </div>            
          }
        </div>
      ); 
    }
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderTypeOne()
    }
    return (null)
  }
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps
export default Group
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { validate } from '../../../utils/validate.js';

const propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
  placeHolder: PropTypes.string,
  maxLength: PropTypes.number,
  defaultValue: PropTypes.string,
  
  buttonText: PropTypes.string,

  isProcessing: PropTypes.bool,
  show: PropTypes.bool,
  validators: PropTypes.array,
  executeOnEnter: PropTypes.bool,

  onExecute: PropTypes.func,
  onClose: PropTypes.func,
}

const defaultProps = {
  label: "Input",
  inputType: "text",
  placeHolder: "Type input",
  maxLength: 16,
  defaultValue: "",

  buttonText: "Execute",

  isProcessing: false,
  show: false,
  validators: [],
  executeOnEnter: true,

  onExecute() {},
  onClose() {},
}

class AddPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: props.defaultValue
    }

    this.onKeyPress = this.onKeyPress.bind(this)
    this.onExecute = this.onExecute.bind(this)
  }

  // validate() {
  //   const { validators } = this.props
  //   let { inputValue } = this.state

  //   for (let i = 0 ; i < validators.length ; i++) {
  //     if ( validators[i] === "required" ) {
  //       if (validator.isEmpty(inputValue)) {
  //         return false
  //       }
  //     } else {
  //       if (typeof validator[validators[i]] !== "function") {
  //         throw ("Invalid validator name '" + validators[i] + "'")
  //       }
  //       if (!validator[validators[i]](inputValue)){
  //         return false
  //       }
  //     }
  //   }
  //   return true
  // }

  onExecute() {
    const { onExecute, validators } = this.props
    let { inputValue } = this.state
    if (validate(validators, inputValue)) {
      onExecute(inputValue)
    }
  }

  onClose() {
    const { isProcessing } = this.props
    if (!isProcessing) {
      const { onClose } = this.props
      onClose()
    }
  }

  onKeyPress(e) {
    const { executeOnEnter } = this.props
    if(executeOnEnter && e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      this.onExecute()
    }
  }

  render() {
    const {
      label,
      inputType,
      placeHolder,
      maxLength,
      buttonText,
      isProcessing,
      show,
      validators,
      onClose,
    } = this.props
    let { inputValue } = this.state
    let buttonExtraAttr = {}
    if (!validate(validators, inputValue)) {
      buttonExtraAttr.disabled = true
    }

    return (
      <div className={classnames('add-panel-overlay', {'show': show})}>
        <div className="add-panel">
          <i className="material-icons add-panel-close" onClick={onClose}>close</i>
          <div className="add-panel-title">
            <p className="add-panel-text-header">
              {label}
            </p>
          </div>
          <div className="add-panel-body">
            <input 
              type={inputType}
              placeholder= {placeHolder}
              value={inputValue}
              onKeyPress={this.onKeyPress}
              onChange={ (e)=>this.setState( {inputValue: e.target.value} ) }
              maxLength={maxLength}
            />
            <button className="btn-arb" onClick={this.onExecute} {...buttonExtraAttr}>
              { (isProcessing) ? "...Processing" : buttonText }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddPanel.propTypes = propTypes
AddPanel.defaultProps = defaultProps
export default AddPanel
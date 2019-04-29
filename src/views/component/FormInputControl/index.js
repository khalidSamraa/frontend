import React from 'react';

import DropDown from '../DropDown';

import './styles.css';

const FormInputControl = props => {
  const {
    label,
    validationLabel,
    onChange,
    name,
    value,
    type,
    defaultValue,
    dropDownOptions
  } = props;

  let Content = null;
  switch (type) {
    case 'dropdown':
      Content = (
        <DropDown
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          options={dropDownOptions}
          className="form-control"
          label="Choose a country"
          search
        />
      );
      break;

    case 'textarea':
      Content = (
        <textarea
          rows="5"
          name={name}
          className="form-control form__textarea"
          onChange={onChange}
          value={value}
        />
      );
      break;

    default:
      Content = (
        <input
          type="text"
          name={name}
          className="form-control"
          onChange={onChange}
          value={value}
        />
      );
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <span className="validation__message">{validationLabel}</span>
      {Content}
    </div>
  );
};

export default FormInputControl;

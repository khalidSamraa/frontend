import React from 'react';

import FormInputControl from '../FormInputControl';

const PublisherBox = props => (
  <div className="create-publisher__publisher-box">
    <label>{props.words[`general_${props.type}`]}</label>
    <div className="box">
      <FormInputControl
        validationLabel={props.validationErrors[`${props.type}Name`]}
        name={`${props.type}Name`}
        value={props[`${props.type}Name`]}
        onChange={props.onChange}
      />
      <FormInputControl
        label={props.words['general_email']}
        validationLabel={props.validationErrors[`${props.type}Email`]}
        name={`${props.type}Email`}
        value={props[`${props.type}Email`]}
        onChange={props.onChange}
      />
    </div>
  </div>
);

export default PublisherBox;

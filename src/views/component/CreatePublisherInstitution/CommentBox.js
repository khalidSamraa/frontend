import React from 'react';

import FormInputControl from '../FormInputControl';

const ContactBox = props => (
  <div>
    <label>{props.words['general_comment']}</label>
    <div className="box">
      <FormInputControl
        type="textarea"
        validationLabel={props.validationErrors['comment']}
        name="comment"
        value={props.comment}
        onChange={props.onChange}
      />
    </div>
  </div>
);

export default ContactBox;

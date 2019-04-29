import React from 'react';

import FormInputControl from '../FormInputControl';

const ContactBox = props => (
  <div>
    <label>{props.words['general_contact']}</label>
    <div className="box">
      <div className="row">
        <div className="col-xs-5">
          <FormInputControl
            label={props.words['profile_man-ctrct_add-ctrct_name1']}
            validationLabel={props.validationErrors['firstName']}
            name="firstName"
            value={props.firstName}
            onChange={props.onChange}
          />
        </div>
        <div className="col-xs-7">
          <FormInputControl
            label={props.words['profile_man-ctrct_add-ctrct_name2']}
            validationLabel={props.validationErrors['lastName']}
            name="lastName"
            value={props.lastName}
            onChange={props.onChange}
          />
        </div>
      </div>
      <FormInputControl
        label={props.words['general_email']}
        validationLabel={props.validationErrors['contactEmail']}
        name="contactEmail"
        value={props.contactEmail}
        onChange={props.onChange}
      />
      <div className="row">
        <div className="col-xs-6">
          <FormInputControl
            label={props.words['general_addr-phone1']}
            validationLabel={props.validationErrors['contactPhone1']}
            name="contactPhone1"
            value={props.contactPhone1}
            onChange={props.onChange}
          />
        </div>
        <div className="col-xs-6">
          <FormInputControl
            label={props.words['general_addr-phone2']}
            validationLabel={props.validationErrors['contactPhone2']}
            name="contactPhone2"
            value={props.contactPhone2}
            onChange={props.onChange}
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactBox;

import React from 'react';

import FormInputControl from '../FormInputControl';

const AddressBox = props => (
  <div>
    <label>{props.words['general_addr']}</label>
    <div className="box">
      <FormInputControl
        label={props.words['general_addr-addr1']}
        validationLabel={props.validationErrors['userAddress1']}
        name="userAddress1"
        value={props.userAdddress1}
        onChange={props.onChange}
      />
      <FormInputControl
        label={props.words['general_addr-addr2']}
        validationLabel={props.validationErrors['userAddress2']}
        name="userAddress2"
        value={props.userAddress2}
        onChange={props.onChange}
      />
      <FormInputControl
        label={props.words['general_addr-addr3']}
        validationLabel={props.validationErrors['userAddress3']}
        name="userAddress3"
        value={props.userAddress3}
        onChange={props.onChange}
      />
      <div className="row">
        <div className="col-xs-8">
          <FormInputControl
            label={props.words['general_addr-city']}
            validationLabel={props.validationErrors['city']}
            name="city"
            value={props.city}
            onChange={props.onChange}
          />
        </div>
        <div className="col-xs-4">
          <FormInputControl
            label={props.words['general_addr-zip']}
            validationLabel={props.validationErrors['zip']}
            name="zip"
            value={props.zip}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6">
          <FormInputControl
            label={props.words['general_addr-country']}
            validationLabel={props.validationErrors['country']}
            value={props.country}
            defaultValue={props.userCountry}
            onChange={props.handleDrop}
            type="dropdown"
            dropDownOptions={props.options}
          />
        </div>
        <div className="col-xs-6">
          <FormInputControl
            label={props.words['general_addr-state']}
            validationLabel={props.validationErrors['state']}
            name="state"
            value={props.state}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6">
          <FormInputControl
            label={props.words['general_addr-phone1']}
            validationLabel={props.validationErrors['userAddressPhone1']}
            name="userAddressPhone1"
            value={props.userAddressPhone1}
            onChange={props.onChange}
          />
        </div>
        <div className="col-xs-6">
          <FormInputControl
            label={props.words['general_addr-phone2']}
            validationLabel={props.validationErrors['userAddressPhone2']}
            name="userAddressPhone2"
            value={props.userAddressPhone2}
            onChange={props.onChange}
          />
        </div>
      </div>
    </div>
  </div>
);

export default AddressBox;

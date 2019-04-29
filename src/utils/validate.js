import React from 'react';
import validator from 'validator';

/* Validate Field Required */
export const required = (value) => {
  if (!value.toString().trim().length) {
    return <span className="form-error is-visible">require</span>;
  }
};

/* Validate Email Format */
export const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="form-error is-visible"><code>{value}</code> is not a valid email.</span>
  }  
};

export const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>
  }
};

export const validate = (validators, value) => {
  for (let i = 0 ; i < validators.length ; i++) {
    if ( validators[i] === "required" ) {
      if (validator.isEmpty(value)) {
        return false
      }
    } else {
      if (typeof validator[validators[i]] !== "function") {
        throw ("Invalid validator name '" + validators[i] + "'")
      }
      if (!validator[validators[i]](value)){
        return false
      }
    }
  }
  return true
}
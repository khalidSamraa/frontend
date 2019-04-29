import React from 'react';
import { button } from 'react-validation';

// Define own Button component
const Button = ({ hasErrors, ...props }) => {
  return (
    <button {...props} disabled={hasErrors} />
  );
};

export function ButtonValidation() {
  return button(Button)
}

import React from "react"
import { button } from "react-validation"

export const ButtonLoading = ({ ...props }) => {
  return (
    <input type="button" {...props} className="black" disabled />
  )
}

const Button = ({ hasErrors, disabled, ...props }) => {
  return (
    <input type="button" {...props} className="black" disabled={disabled || hasErrors} />
  )
}

export const PrimaryButton = ({ children, className, ...rest }) =>
  <button className={`btn-primary ${className}`} {...rest}>{children}</button>

export const ButtonValidation = button(Button)
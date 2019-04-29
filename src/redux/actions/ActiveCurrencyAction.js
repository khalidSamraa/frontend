export const CHANGE_CURRENCY = "changeCurrency"
export const UPDATED_CURRENCY = "UpdatedCurrency"

export function changeCurrency(payload) {
  return {
    type: CHANGE_CURRENCY,
    payload: payload
  }
}

export function UpdatedCurrency(payload) {
  return {
    type: UPDATED_CURRENCY,
    payload: payload
  }
}

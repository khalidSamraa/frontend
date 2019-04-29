export const CHANGE_LOCATION = "changeLocation"

export function changeLocation(code) {
  return {
    type: CHANGE_LOCATION,
    payload: {countryCode: code}
  }
}

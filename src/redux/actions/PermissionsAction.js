export const SET_PERMISSION = "setPermission"

export function setPermission(payload) {
  return {
    type: SET_PERMISSION,
    payload: payload
  }
}

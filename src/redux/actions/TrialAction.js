export const SET_TRIAL = "setTrial"
export const GET_TRIAL = "getTrial"
export const REMOVE_TRIAL = "removeTrial"

export function setTrial(payload) {
  return {
    type: SET_TRIAL,
    payload: payload
  }
}

export function getTrial(payload) {
  return {
    type: GET_TRIAL,
    payload: payload
  }
}

export function removeTrial() {
  return {
    type: REMOVE_TRIAL,
  }
}
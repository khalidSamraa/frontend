export function WriteToken(payload) {
  return {
    type: "WriteToken",
    payload: payload,
  }
}

export function WriteTokenInstitution(payload) {
  return {
    type: "WriteTokenInstitution",
    payload: payload
  }
}

export function WriteTokenPublisher(payload) {
  return {
    type: "WriteTokenPublisher",
    payload: payload
  }
}


export function WriteTokenEnsemble(payload) {
  return {
    type: "WriteTokenEnsemble",
    payload: payload
  }
}

export function RemoveToken(payload) {
  return {
    type: "RemoveToken",
    payload: payload
  }
}

export function RemoveTokenInstitution(payload) {
  return {
    type: "RemoveTokenInstitution",
    payload: payload
  }
}

export function RemoveTokenPublisher(payload) {
  return {
    type: "RemoveTokenPublisher",
    payload: payload
  }
}

export function RemoveTokenEnsemble(payload) {
  return {
    type: "RemoveTokenEnsemble",
    payload: payload
  }
}
export function CreateUserSession(payload) {
  return {
    type: "CreateUserSession",
    payload: payload
  }
}

export function UpdateUserSession(payload) {
  return {
    type: "UpdateUserSession",
    payload: payload
  }
}

export function RemoveUserSession() {
  return {
    type: "RemoveUserSession",
    payload: {},
  }
}



export function CreateInstitutionSession(payload) {
  return {
    type: "CreateInstitutionSession",
    payload: payload
  }
}

export function UpdateInstitutionSession(payload) {
  return {
    type: "UpdateInstitutionSession",
    payload: payload
  }
}

export function StopInstitutionSession(payload) {
  return {
    type    : "StopInstitutionSession",
    payload : payload
  }
}

export function RemoveInstitutionSession() {
  return {
    type: "RemoveInstitutionSession",
    payload: {},
  }
}



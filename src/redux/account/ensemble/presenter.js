export function CreateEnsembleSession(payload) {
  return {
    type: "CreateEnsembleSession",
    payload: payload
  }
}

export function UpdateEnsembleSession(payload) {
  return {
    type: "UpdateEnsembleSession",
    payload: payload
  }
}

export function StopEnsembleSession(payload) {
  return {
    type    : "StopEnsembleSession",
    payload : payload
  }
}

export function RemoveEnsembleSession() {
  return {
    type: "RemoveEnsembleSession",
    payload: {},
  }
}



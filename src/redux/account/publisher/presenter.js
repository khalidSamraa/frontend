export function CreatePublisherSession(payload) {
  return {
    type: "CreatePublisherSession",
    payload: payload
  }
}

export function UpdatePublisherSession(payload) {
  return {
    type: "UpdatePublisherSession",
    payload: payload
  }
}

export function StopPublisherSession(payload) {
  return {
    type    : "StopPublisherSession",
    payload : payload
  }
}

export function RemovePublisherSession() {
  return {
    type: "RemovePublisherSession",
    payload: {},
  }
}



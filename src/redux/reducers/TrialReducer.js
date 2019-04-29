import { SET_TRIAL, GET_TRIAL, REMOVE_TRIAL } from "../actions/TrialAction.js"
// import Security from "../../utils/security.js";
import Request from "../../utils/Request.js"

const
  LOCAL_KEY = "dimusco",

  // this flag for activate Request trial code per render,
  // if this activate it will load more resource data connection
  REQUEST_ON_RENDER = false

function loadStorage() {
  // let local = Security.Decrypt(localStorage.getItem(LOCAL_KEY))
  let local = JSON.parse(localStorage.getItem(LOCAL_KEY))

  if (!local || !local.hasOwnProperty("trial")) {
    throw "nothing"
  }
  // return JSON.parse(local)
  return local
}

function defaultState() {
  try {
    return loadStorage()
  }catch(err) {
    return {
      trial: {}
    }
  }
}

function setStorage(state) {
  // localStorage.setItem(LOCAL_KEY, Security.Encrypt(JSON.stringify(state)))
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
}

function checkSuccess(response) {
  let state = {
    trial: {
      ...response.data
    }
  }
  setStorage(state)
}

function checkFailed() {
  localStorage.removeItem(LOCAL_KEY)
  // window.location.reload()
}

const TrialReducer = (state = defaultState(), action) => {
  switch (action.type) {

  case SET_TRIAL:
    state.trial = action.payload
    setStorage(state)
    break

  case GET_TRIAL:
    if(REQUEST_ON_RENDER) {
      Request(
        "post",
        "check-trial",
        {},
        {},
        [action.payload],
        checkSuccess,
        checkFailed
      )
    }
    break

  case REMOVE_TRIAL:
    state = {
      trial : {}
    }
    setStorage(state)
    break

  default:
    break
  }
  return state
}
export default TrialReducer

import { CHANGE_LOCATION } from "../actions/ActiveLocationAction.js"

const LOCAL_KEY = "country"

function loadStorage() {
  let location = JSON.parse(localStorage.getItem(LOCAL_KEY))
  if (!location) {
    throw "nothing"
  }
  return location
}

function defaultState() {
  try {
    return loadStorage()
  }catch(err) {
    return {
      "countryCode": "IN",
      "changed": true,
    }
  }
}

const ActiveLocationReducer = (state = defaultState(), action) => {
  switch (action.type) {
  case CHANGE_LOCATION:
    let change
    if(state.countryCode !== action.payload.countryCode) {
      change = true
    } else {
      change = false
    }
    
    state = {
      "countryCode" : action.payload.countryCode,
      "changed" : change
    }
    localStorage.setItem( LOCAL_KEY, JSON.stringify(state) )
    break

  default:
    break
  }
  return state
}
export default ActiveLocationReducer
import { CHANGE_CURRENCY, UPDATED_CURRENCY } from "../actions/ActiveCurrencyAction.js"

const LOCAL_KEY = "curr"

function loadStorage() {
  let currency = JSON.parse(localStorage.getItem(LOCAL_KEY))
  if (!currency) {
    throw "nothing"
  }
  return currency
}

function defaultState() {
  try {
    return loadStorage()
  }catch(err) {
    return {
      "code"   : "USD",
      "name"   : "US Dollar",
      "changed": true,
      "symbol" : "$",
    }
  }
}

const ActiveCurrencyReducer = (state = defaultState(), action) => {
  switch (action.type) {
  case CHANGE_CURRENCY:

    let change
    if(state.code !== action.payload.code) {
      change = true
    } else {
      change = false
    }

    state = {
      "code"    : action.payload.code,
      "name"    : action.payload.name,
      "changed" : change,
      "symbol"  : action.payload.symbol,
    }
    localStorage.setItem( LOCAL_KEY, JSON.stringify(state) )
    break

    case UPDATED_CURRENCY:
      state = {
        "code" : state.code,
        "name": state.name,
        "changed" : action.payload,
        "symbol": state.symbol,
      }
      localStorage.setItem( LOCAL_KEY, JSON.stringify(state) )
      break

  default:
    break
  }
  return state
}
export default ActiveCurrencyReducer

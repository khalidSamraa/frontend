import { SET_PERMISSION } from "../actions/PermissionsAction.js"

const LOCAL_KEY = "permission"

function loadStorage() {
  let data = JSON.parse(localStorage.getItem(LOCAL_KEY))
  if (!data) {
    throw "nothing"
  }
  return data
}

function defaultState() {
  try {
    return loadStorage()
  }catch(err) {
    return {
      "order_book"    : false,
      "assign_book"   : false,
      "group_access"  : false,
      "invite_member" : false,
    }
  }
}

const PermissionsReducer = (state = defaultState(), action) => {
  switch (action.type) {
  
  case SET_PERMISSION:
    state = {
      "order_book"    : action.payload.order_book,
      "assign_book"   : action.payload.assign_book,
      "group_access"  : action.payload.group_access,
      "invite_member" : action.payload.invite_member,
    }
    localStorage.setItem( LOCAL_KEY, JSON.stringify(state) )

    break

  default:
    break
  }
  return state
}
export default PermissionsReducer

import { SET_INDEX } from "../actions/ActiveIndexAction.js"

const ActiveIndexReducer = (state = {index: 0}, action) => {
  switch (action.type) {

  case SET_INDEX:
    state = {
      index: action.payload
    }
    break

  default:
    break
  }

  return state
}
export default ActiveIndexReducer

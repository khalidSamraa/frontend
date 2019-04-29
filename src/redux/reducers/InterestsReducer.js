import { INTERESTS_LOADED } from "../actions/InterestsAction.js"

const InterestsReducer = (state = {interests: []}, action) => {
  switch (action.type) {
    case INTERESTS_LOADED:
      state = {
        interests: action.payload
      }
      break

    default:
      break
  }
  return state
}
export default InterestsReducer

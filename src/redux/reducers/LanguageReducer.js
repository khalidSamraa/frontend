import { LANGUAGE_LOADED } from "../actions/LanguageAction.js"

const LanguageReducer = (state = {loaded: false}, action) => {
  switch (action.type) {
    case LANGUAGE_LOADED:
      state = {
        loaded: true,
        data: action.payload
      }
      break

    default:
      break
  }
  return state
}
export default LanguageReducer

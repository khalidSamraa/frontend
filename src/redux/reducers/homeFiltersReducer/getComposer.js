import { GET_COMPOSER } from "../../actions/homeFiltersActions";

export const composer = (state = [], action) => {
  switch (action.type) {
    case GET_COMPOSER:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

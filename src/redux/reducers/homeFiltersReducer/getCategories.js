import { GET_CATEGORIES } from "../../actions/homeFiltersActions";

export const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

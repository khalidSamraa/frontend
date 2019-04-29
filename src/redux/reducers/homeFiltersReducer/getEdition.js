import { GET_EDITION } from "../../actions/homeFiltersActions";

export const edition = (state = [], action) => {
  switch (action.type) {
    case GET_EDITION:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

import { GET_INSTRUMENT } from "../../actions/homeFiltersActions";

export const instrument = (state = [], action) => {
  switch (action.type) {
    case GET_INSTRUMENT:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

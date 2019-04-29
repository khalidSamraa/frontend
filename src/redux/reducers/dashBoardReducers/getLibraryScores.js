import { GET_LIBRARY_SCORES } from "../../actions/dashBoardActions";

export const libraryScores = (state = [], action) => {
  switch (action.type) {
    case GET_LIBRARY_SCORES:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

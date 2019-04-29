import { DELETE_LIBRARY_SCORE } from "../../actions/dashBoardActions";

export const deleteLibraryScoreStatus = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LIBRARY_SCORE:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

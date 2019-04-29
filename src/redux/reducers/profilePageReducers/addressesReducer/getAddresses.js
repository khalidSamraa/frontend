import { GET_ADDRESSES } from "../../../actions/profilePageActions/addressesActions";

export const addressesStatus = (state = [], action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

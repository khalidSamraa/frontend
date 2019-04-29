import { DELETE_ADDRESS } from "../../../actions/profilePageActions/addressesActions";

export const deleteAddressStatus = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADDRESS:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

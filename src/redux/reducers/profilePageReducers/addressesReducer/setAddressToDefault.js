import { SET_ADDRESS_TO_DEFAULT } from "../../../actions/profilePageActions/addressesActions";

export const setAddressToDefaultStatus = (state = {}, action) => {
  switch (action.type) {
    case SET_ADDRESS_TO_DEFAULT:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

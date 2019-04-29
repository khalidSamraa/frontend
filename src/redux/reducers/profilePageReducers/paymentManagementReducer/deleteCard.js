import { DELETE_CRAD } from "../../../actions/profilePageActions/paymentManagementActions";

export const deleteCardStatus = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CRAD:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

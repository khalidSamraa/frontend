import { GET_CARDS } from "../../../actions/profilePageActions/paymentManagementActions";

export const cards = (state = [], action) => {
  switch (action.type) {
    case GET_CARDS:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

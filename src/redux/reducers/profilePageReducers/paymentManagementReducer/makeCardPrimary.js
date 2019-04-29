import { MAKE_CARD_PRIMARY } from "../../../actions/profilePageActions/paymentManagementActions";

export const makeCardPrimaryStatus = (state = {}, action) => {
  switch (action.type) {
    case MAKE_CARD_PRIMARY:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

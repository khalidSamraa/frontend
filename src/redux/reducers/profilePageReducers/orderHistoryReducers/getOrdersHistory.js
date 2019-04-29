import { GET_ORDERS_HISTORY } from "../../../actions/profilePageActions/orderHistoryActions";

export const ordersHistory = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS_HISTORY:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

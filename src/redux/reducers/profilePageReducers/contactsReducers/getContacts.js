import { GET_CONTACTS } from "../../../actions/profilePageActions/contactsActions";

export const contacts = (state = [], action) => {
  switch (action.type) {
    case GET_CONTACTS:
      state = action.payload;
      break
    default:
      break
  }
  return state
}

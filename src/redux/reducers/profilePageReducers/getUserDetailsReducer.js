import { GET_USER_DETAILS } from "../../actions/profilePageActions/UserDetailsActions";

export const userDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      state = {
        ...action.payload
      }
      break
    default:
      break
  }
  return state
}

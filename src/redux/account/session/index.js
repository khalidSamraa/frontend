import UserAuthentication from "../auth.js"

const SessionReducer = (state = UserAuthentication.GetCredential(), action) => {
  switch (action.type) {
  case "CreateUserSession": 
    state = {
      is_auth :true,
      user: {
        ...action.payload
      }, 
    }
    UserAuthentication.WriteCredential(state)
    break

  case "RemoveUserSession":
    state = {
      is_auth : false,
      user: {
        uid: null,
        email: null,
        name: null,
        state: null,
        created: null,
        settings_version: null,
        library_version: null,
        currency: null, 
        language: null,
        location: null
      }
    }
    UserAuthentication.RemoveCredential()
    break

  case "UpdateUserSession":
    state = {
      is_auth :true,
      user: {
        ...action.payload
      }, 
    }
    UserAuthentication.WriteCredential(state)
    break
    
  default:
    break
  }   
  return state
}
export default SessionReducer
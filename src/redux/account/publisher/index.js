import PublisherAuthentication from "../authPublisher.js"

const PublisherReducer = (state = PublisherAuthentication.GetCredential(), action) => {
  switch (action.type) {
  case "CreatePublisherSession": 
    state = {
      is_auth : true,
      is_admin: action.payload.is_admin,
      publisher: {
        pid     : action.payload.publisher.pid,
        name    : action.payload.publisher.name,
      }
    }
    PublisherAuthentication.WriteCredential(state)
    break       

  case "UpdatePublisherSession":
    state = {
      is_auth : true,
      is_admin: action.payload.is_admin,
      publisher: {
        pid     : action.payload.pid,
        name    : action.payload.name,            
      }
    }
    PublisherAuthentication.WriteCredential(state)
    break

  case "StopPublisherSession": 
    state = {
      is_auth: false,
      is_admin: false,
      publisher: {
        pid: null,
        name: null
      }
    }
    PublisherAuthentication.WriteCredential(state)
    break

  case "RemovePublisherSession":
    state = {
      is_auth : false,
      is_admin: false,
      publisher: {
        pid     : null,
        name    : null
      }
    }
    PublisherAuthentication.RemoveCredential()
    break
    
  default:
    break
  }   
  return state
}
export default PublisherReducer
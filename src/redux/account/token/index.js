import authenticationToken from "../authToken.js"

const TokenReducer = (state = authenticationToken.GetCredential(), action) => {
  switch (action.type) {

  case "WriteToken": 
    state = {
      token            : action.payload,
      tokenInstitution : null,
      tokenEnsemble    : null,
      tokenPublisher   : null,
    }
    authenticationToken.WriteCredential(state)
    break

  case "WriteTokenInstitution":
    state.tokenInstitution = action.payload
    authenticationToken.WriteCredential(state)
    break

  case "WriteTokenEnsemble": 
    state.tokenEnsemble = action.payload
    authenticationToken.WriteCredential(state)
    break

  case "WriteTokenPublisher": 
    state.tokenPublisher = action.payload
    authenticationToken.WriteCredential(state)
    break

  case "RemoveToken": 
    state = {
      token            : null,
      tokenInstitution : null,
      tokenEnsemble    : null,
      tokenPublisher   : null
    }
    authenticationToken.RemoveCredential(state)
    break
    
  case "RemoveTokenInstitution": 
    state.tokenInstitution = null
    authenticationToken.WriteCredential(state)
    break

  case "RemoveTokenEnsemble":
    state.tokenEnsemble = null
    authenticationToken.WriteCredential(state)
    break

  case "RemoveTokenPublisher":
    state.tokenPublisher = null
    authenticationToken.WriteCredential(state)
    break

  default:
    break
  }

  return state
}

export default TokenReducer
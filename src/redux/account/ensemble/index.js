import EnsembleAuthentication from "../authEnsemble.js"

const EnsembleReducer = (state = EnsembleAuthentication.GetCredential(), action) => {
  switch (action.type) {
  case "CreateEnsembleSession":
    state = {
      is_auth : true,
      order_permission: action.payload.order_permission,
      ensemble: {
        eid     : action.payload.ensemble.eid,
        name    : action.payload.ensemble.name,
      }
    }
    EnsembleAuthentication.WriteCredential(state)
    break

  case "UpdateEnsembleSession":
    state = {
      is_auth : true,
      order_permission: EnsembleAuthentication.GetCredential().order_permission,
      ensemble: {
        eid     : action.payload.eid,
        name    : action.payload.name,
      }
    }
    EnsembleAuthentication.WriteCredential(state)
    break

  case "StopEnsembleSession":
    state = {
      is_auth: false,
      order_permission: false,
      ensemble: {
        eid: null,
        name: null
      }
    }
    EnsembleAuthentication.WriteCredential(state)
    break

  case "RemoveEnsembleSession":
    state = {
      is_auth : false,
      order_permission: false,
      ensemble: {
        eid     : null,
        name    : null
      }
    }
    EnsembleAuthentication.RemoveCredential()
    break

  default:
    break
  }
  return state
}
export default EnsembleReducer

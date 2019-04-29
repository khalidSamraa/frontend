import InstitutionAuthentication from "../authInstitution.js"

const InstitutionReducer = (state = InstitutionAuthentication.GetCredential(), action) => {
  switch (action.type) {
  case "CreateInstitutionSession":
    state = {
      is_auth : true,
      is_admin: action.payload.is_admin,
      order_permission: action.payload.order_permission,
      institution: {
        iid     : action.payload.institution.iid,
        name    : action.payload.institution.name,
      }
    }
    InstitutionAuthentication.WriteCredential(state)
    break

  case "UpdateInstitutionSession":
    state = {
      is_auth : true,
      is_admin: action.payload.is_admin,
      order_permission: InstitutionAuthentication.GetCredential().order_permission,
      institution: {
        iid     : action.payload.iid,
        name    : action.payload.name,
      }
    }
    InstitutionAuthentication.WriteCredential(state)
    break

  case "StopInstitutionSession":
    state = {
      is_auth: false,
      is_admin: false,
      order_permission: false,
      institution: {
        iid: null,
        name: null
      }
    }
    InstitutionAuthentication.WriteCredential(state)
    break

  case "RemoveInstitutionSession":
    state = {
      is_auth : false,
      is_admin: false,
      order_permission: false,
      institution: {
        iid     : null,
        name    : null
      }
    }
    InstitutionAuthentication.RemoveCredential()
    break

  default:
    break
  }
  return state
}
export default InstitutionReducer

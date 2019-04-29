import Security from "../../utils/security.js"
import EnsembleCredential from "./authEnsemble.js"
import InstitutionCredential from "./authInstitution.js"
import PublisherCredential from "./authPublisher.js"
import UserCredential from "./auth.js"

const LOCAL_KEY = "Token"

export default {
  WriteCredential: function(data) {
    // localStorage.setItem(LOCAL_KEY, Security.Encrypt(data))
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
  },

  GetCredential: function(name) {
    // let Credential = Security.Decrypt(localStorage.getItem(LOCAL_KEY))
    let Credential = JSON.parse(localStorage.getItem(LOCAL_KEY))
    if(Credential === null || Credential === undefined || Credential === "") {
      return {
        token: null,
        tokenEnsemble: null,
        tokenInstitution: null,
        tokenPublisher: null,
      }
    }

    for(let key in Credential) {
      if(key === name) {
        return Credential[key]
      }
    }

    // return JSON.parse(Credential)
    return Credential
  },

  RemoveCredential: function() {
    localStorage.removeItem(LOCAL_KEY)
  },

  getActiveToken: function() {
    let tokens = this.GetCredential()

    // Ensemble Checking
    let selected = EnsembleCredential.GetCredential()
    if (selected.is_auth) {
      return tokens.tokenEnsemble
    }

    // Institution Checking
    selected = InstitutionCredential.GetCredential()
    if (selected.is_auth) {
      return tokens.tokenInstitution
    }

    // Publisher Checking
    selected = PublisherCredential.GetCredential()
    if (selected.is_auth) {
      return tokens.tokenPublisher
    }

    // User Checking
    selected = UserCredential.GetCredential()
    if (selected.is_auth) {
      return tokens.token
    }

    return null
  }

  
}

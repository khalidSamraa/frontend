import Security from "../../utils/security.js"

export default {
  WriteCredential: function(data){
    // localStorage.setItem("Ensemble", Security.Encrypt(data))
    localStorage.setItem("Ensemble", JSON.stringify(data))
  },
  GetCredential: function() {
    // let Credential = Security.Decrypt(localStorage.getItem("Ensemble"))
    let Credential = localStorage.getItem("Ensemble")
    if(Credential === null || Credential === undefined || Credential === "") {
      return{
        is_auth : false,
      }
    }        
    // return Credential
    return JSON.parse(Credential)
  },
  RemoveCredential: function() {
    localStorage.removeItem("Ensemble")
  }
}
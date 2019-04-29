// import Security from '../../utils/security.js';

export default {
  WriteCredential: function(data){
    localStorage.setItem("Institution", JSON.stringify(data))
  },
  GetCredential: function() {
    let Credential = localStorage.getItem("Institution")
    if(Credential === null || Credential === undefined || Credential === "") {
      return{
        is_auth : false,
        institution: {
          iid     : null,
          name    : null,
        }
      }
    }        
    return JSON.parse(Credential)
  },
  RemoveCredential: function() {
    localStorage.removeItem("Institution")
  }
}
import Security from '../../utils/security.js';

export default {
  WriteCredential: function(data){
    localStorage.setItem("Publisher", JSON.stringify(data))
  },
  GetCredential: function() {
    let Credential = localStorage.getItem("Publisher")
    if(Credential === null || Credential === undefined || Credential === "") {
      return{
        is_auth : false,
        publisher: {
          pid     : null,
          name    : null,
        }
      }
    }        
    return JSON.parse(Credential)
  },
  RemoveCredential: function() {
    localStorage.removeItem("Publisher")
  }
}
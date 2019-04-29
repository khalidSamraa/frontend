import Security from '../../utils/security.js';

export default {
    WriteCredential: function(data){
      localStorage.setItem('Authorization', Security.Encrypt(data))
    },
    GetCredential: function() {
      var Credential = Security.Decrypt(localStorage.getItem('Authorization'))
      if(Credential === null || Credential === undefined || Credential === '') {
        return{
          is_auth : false,
          user : {
            uid   : null,
            email : null,
            name  : null,
            state : null,
          }
        }
      }        
      return Credential
    },
    RemoveCredential: function() {
      localStorage.removeItem('Authorization')
    }
}
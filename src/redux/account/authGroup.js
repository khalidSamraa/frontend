import Security from '../../utils/security.js';

export default {
    WriteCredential: function(data){
      localStorage.setItem('Group', JSON.stringify(data))
    },
    GetCredential: function() {
      let Credential = Security.Decrypt(localStorage.getItem('Group'))
      if(Credential === null || Credential === undefined || Credential === '') {
        return{
          is_auth : false,
          gid     : null,
          name    : null
        }
      }        
      return JSON.parse(Credential)
    },
    RemoveCredential: function() {
      localStorage.removeItem('Group')
    }
}
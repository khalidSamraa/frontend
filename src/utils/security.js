import CryptoJS from 'crypto-js';

export default{
  Encrypt: function(data) {
    if(data != null) {
      let result = CryptoJS.AES.encrypt(JSON.stringify(data), 'Fph8Ffb895');
      return result;
    }
  },
  Decrypt: function(data) {
    if(data != null) {
      let bytes  = CryptoJS.AES.decrypt(data.toString(), 'Fph8Ffb895');
      let result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return result;
    }
  }
}


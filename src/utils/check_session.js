export default {
  isLoggedIn: function(history, is_auth) {
    if(!is_auth) {
      history.push('/login');
      return false;
    }
    return true;
  },
}


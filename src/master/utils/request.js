export default {
  ReadMasterCountry(self, onsuccess, onfailed) {
    return {
      data: {
        AuthorizationToken : self.props.TokenReducer.token,
      },
      self: self,
      onsuccess : onsuccess,
      onfailed  : onfailed,
    }
  }
}
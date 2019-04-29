export default { 
  Read(self, onsuccess, onfailed) {
    return {
      data: {
        AuthorizationToken : self.props.Token.token,
      },
      onsuccess : self.onReadSuccess,
      onfailed  : self.onReadFailed,
      self      : self,
    }
  },
}
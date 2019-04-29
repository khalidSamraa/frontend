import auth from "../../redux/account/authToken.js"

export default {
  Read(action, data, self, onsuccess, onfailed) {
    return {
      data: {
        page        : data.page,
        searchQuery : data.query,
        rpp         : data.rpp,
        sort        : data.sort
      },
      action    : action,
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onReadSuccess,
      onfailed  : self.onReadFailed,
      self      : self,
    }
  },
  ReadDetail(self, onsuccess, onfailed, sid, id_curr) {
    return {
      data: {
        sid : sid,
        id_curr: id_curr,
        AuthorizationToken : auth.getActiveToken(),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : onsuccess,
      onfailed  : onfailed,
      self : self,
    }
  },
  ReadCartDetails(score, self, onsuccess, onfailed){
    return {
      data: {
        score : score,
        AuthorizationToken : auth.getActiveToken(),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.ReadCartDetailsSuccess,
      onfailed  : self.ReadCartDetailsFailed,
      self : self,
    }
  },
  Checkout(score, self, onsuccess, onfailed) {
    return {
      data: {
        score: score,
        AuthorizationToken : auth.getActiveToken(),
        // AuthorizationToken : self.props.TokenReducer.token,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onCheckoutSuccess,
      onfailed  : self.onCheckoutFailed,
      self : self,
    }
  }
}

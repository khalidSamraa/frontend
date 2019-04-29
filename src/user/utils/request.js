export default {
  Login(self, onSuccess, onFailed) {
    return {
      data: {
        email    : self.state.email,
        password : self.state.password
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : onSuccess,
      onfailed  : onFailed,
      self : self,
    }
  },
  Register(self, onSuccess, onFailed) {
    return {
      data: {
        name     : self.state.registerFullname,
        username : self.state.registerUsername,
        password : self.state.registerPassword,
        language : self.state.language,
        country  : self.state.country,
        currency : self.state.currency
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onRegisterSuccess,
      onfailed  : self.onRegisterFailed,
      self : self,
    }
  },
  CheckUid(self, onSuccess, onFailed) {
    return{
      data: {
        uid     : self.state.uid,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onCheckUidSuccess,
      onfailed  : self.onCheckUidFailed,
      self : self,
    }
  },
  CheckToken(self, onSuccess, onFailed) {
    return{
      data: {
        token     : self.state.token,
      },
      onsuccess : self.onCheckTokenSuccess,
      onfailed  : self.onCheckTokenFailed,
      self : self,
    }
  },
  RequestEmailResetPassword(self, onSuccess, onFailed) {
    return {
      data: {
        email : self.state.recoveryEmail,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onRequestEmailSuccess,
      onfailed  : self.onRequestEmailFailed,
      self : self,
    }
  },
  RecoveryPassword(self, onSuccess, onFailed) {
    return {
      data: {
        new_password : self.state.newPassword,
        token        : self.state.uid,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onRecoveryPasswordSuccess,
      onfailed  : self.onRecoveryPasswordFailed,
      self : self,
    }
  },
  UpdatePassword(self, onSuccess, onFailed) {
    return {
      data: {
        field: {
          old_password : self.state.password,
          new_password : self.state.new_password,
        },
        AuthorizationToken : self.props.TokenReducer.token,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onUpdateSuccess,
      onfailed  : self.onUpdateFailed,
      self : self,
    }
  },
  UpdateUser(self, onSuccess, onFailed) {
    return {
      data: {
        email              : self.state.email,
        name               : self.state.newName,
        AuthorizationToken : self.props.TokenReducer.token,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onUpdateUserSuccess,
      onfailed  : self.onUpdateUserFailed,
      self : self,
    }
  },
  SignupInvitation(self, onSuccess, onFailed) {
    return {
      data: {
        uid      : self.state.uid,
        name     : self.state.name,
        password : self.state.password,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onSignupInvitationSuccess,
      onfailed  : self.onSignupInvitationFailed,
      self : self,
    }
  },
  CheckPassword(self, onSuccess, onFailed) {
    return {
      data: {
        password : self.state.password,
        AuthorizationToken : self.props.TokenReducer.token,
      },
      onsuccess : onSuccess,
      onfailed  : onFailed,
      self : self,
    }
  },
  ReadCurLocLang(self, onSuccess, onFailed) {
    return {
      onsuccess : onSuccess,
      onfailed  : onFailed,
      self      : self,

    }
  }

}
import Model from './model.js';

export default {
  Login: function(params) {
    Model.Login(params)
  },
  Register: function(params) {
    Model.Register(params)
  },
  CheckUid: function(params) {
    Model.CheckUid(params)
  },
  CheckToken: function(params) {
    Model.CheckToken(params)
  },
  RequestEmailResetPassword: function(params) {
    Model.RequestEmailResetPassword(params)
  },
  RecoveryPassword: function(params) {
    Model.RecoveryPassword(params)
  },
  UpdatePassword: function(params) {
    Model.UpdatePassword(params)
  },
  UpdateUser: function(params) {
    Model.UpdateUser(params)
  },
  SignupInvitation: function(params) {
    Model.SignupInvitation(params)
  },
  CheckPassword: function(params) {
    Model.CheckPassword(params)
  },
  ReadCurLocLang: function(params) {
    Model.ReadCurLocLang(params)
  }
}
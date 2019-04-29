import Model from "./model.js";

export default {
  Register: function(params) {
    Model.Register(params)
  },
  AddMember: function(params) {
    Model.AddMember(params)
  },
  AddMemberToGroup: function(params) {
    Model.AddMemberToGroup(params)
  },
  Read: function(params) {
    Model.Read(params)
  },
  GetTokenInstitution: function(params) {
    Model.GetTokenInstitution(params)
  },
  ReadMember: function(params) {
    Model.ReadMember(params)
  },
  ReadMemberGroup: function(params) {
    Model.ReadMemberGroup(params)
  },
  RemoveMember: function(params) {
    Model.RemoveMember(params)
  },
  MakeAdministrator: function(params) {
    Model.MakeAdministrator(params)
  },
  RemoveAdministrator: function(params) {
    Model.RemoveAdministrator(params)
  },
  ReadAdministrator: function(params) {
    Model.ReadAdministrator(params)
  },
  RemoveEnsemble: function(params) {
    Model.RemoveEnsemble(params)
  }
}
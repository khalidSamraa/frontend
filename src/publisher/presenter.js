import Model from "./model.js"

export default {
  ReadAsMaster: function(params) {
    Model.ReadAsMaster(params)
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
  Register: function(params) {
    Model.Register(params)
  },
  Update: function(params) {
    Model.Update(params)
  },
  Delete: function(params) {
    Model.Delete(params)
  },
  GetTokenPublisher: function(params) {
    Model.GetTokenPublisher(params)
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
  RemovePublisher: function(params) {
    Model.RemovePublisher(params)
  }
}
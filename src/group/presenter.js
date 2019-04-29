import Model from "./model.js";

export default {
  Register: function(params) {
    Model.Register(params)
  },
  Update: function(params) {
    Model.Update(params)
  },
  Read: function(params) {
    Model.Read(params)
  },
  ReadMember: function(params) {
    Model.ReadMember(params)
  },
  GroupDetails: function(params) {
    Model.GroupDetails(params)
  },
  AddMember: function(params) {
    Model.AddMember(params)
  },
  RemoveMember: function(params) {
    Model.RemoveMember(params)
  },
  RemoveGroup: function(params) {
    Model.RemoveGroup(params)
  },
}
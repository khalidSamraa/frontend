function getToken(props) {
  if(props.TokenReducer.tokenInstitution) {
    return props.TokenReducer.tokenInstitution

  } else if(props.TokenReducer.tokenEnsemble) {
    return props.TokenReducer.tokenEnsemble

  } else if(props.TokenReducer.tokenPublisher) {
    return props.TokenReducer.tokenPublisher
  }
}

export default {
  Register(self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          name     : self.state.name,
        },
        AuthorizationToken : getToken(self.props),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onRegisterSuccess,
      onfailed  : self.onRegisterFailed,
      self : self,
    }
  },
  Update(id, self, onsuccess, onfailed) {

    return {
      data: {
        name     : self.state.new_name,
        id       : id,
        AuthorizationToken : getToken(self.props),
      },
      onsuccess : self.onUpdateSuccess,
      onfailed  : self.onUpdateFailed,
      self : self,
    }
  },
  Read(search, page, self, onsuccess, onfailed) {
    return {
      data: {
        Search             : search,
        Page               : page,
        AuthorizationToken : getToken(self.props),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onReadSuccess,
      onfailed  : self.onReadFailed,
      self : self,
    }
  },
  ReadMember(search, page, gid, self, onsuccess, onfailed) {
    return {
      data: {
        search             : search,
        page               : page,
        gid                : gid,
        AuthorizationToken : getToken(self.props),
      },
      onsuccess : self.onReadMemberGroupSuccess,
      onfailed  : self.onReadMemberGroupFailed,
      self : self,
    }
  },
  GroupDetails(id, self, onsuccess, onfailed) {
    return {
      data: {
        id     : id,
        AuthorizationToken : getToken(self.props),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onGroupDetailsSuccess,
      onfailed  : self.onGroupDetailsFailed,
      self : self,
    }
  },
  AddMember(uid, self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          user     : uid,
        },
        gid : self.props.gid,
        AuthorizationToken : getToken(self.props),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onAddMemberSuccess,
      onfailed  : self.onAddMemberFailed,
      self : self,
    }
  },
  RemoveMember(uid, self, onsuccess, onfailed) {
    return {
      data: {
        user               : uid,
        gid                : self.state.groupID,
        AuthorizationToken : getToken(self.props),
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onRemoveMemberSuccess,
      onfailed  : self.onRemoveMemberFailed,
      self : self,
    }
  },
  RemoveGroup(gid, self, onsuccess, onfailed) {
    return {
      data: {
        gid                : gid,
        AuthorizationToken : getToken(self.props),
      },
      onsuccess : self.onRemoveGroupSuccess,
      onfailed  : self.onRemoveGroupFailed,
      self : self,
    }
  },
}

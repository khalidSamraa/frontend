export default { 
  Register(self, onsuccess, onfailed) {
    return {
      data: {
        name     : self.state.institutionName,
        AuthorizationToken : self.props.TokenReducer.token,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onRegisterSuccess,
      onfailed  : self.onRegisterFailed,
      self : self,
    }
  },
  AddMember(self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          email : self.state.email,
          authority_auids: self.state.authority_auid
        },
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onAddMemberSuccess,
      onfailed  : self.onAddMemberFailed,
      self : self,
    }
  },
  AddMemberToGroup(uid, self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          user     : uid,
        },
        gid : self.state.groupID,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      RunRedux  : self.props.RunRedux,
      onsuccess : self.onAddMemberToGroupSuccess,
      onfailed  : self.onAddMemberToGroupFailed,
      self : self,
    }
  },
  Read(self, onsuccess, onfailed, page) {
    return {
      data: {
        page : page,
        AuthorizationToken : self.props.TokenReducer.token,
      },
      onsuccess : self.onReadSuccess,
      onfailed  : self.onReadFailed,
      self : self,
    }
  },
  GetTokenInstitution(institutionId, self, onsuccess, onfailed) {
    return {
      data: {
        ensemble : institutionId,
        AuthorizationToken : self.props.TokenReducer.token,
      },
      onsuccess : self.getTokenInstitutionSuccess,
      onfailed  : self.getTokenInstitutionFailed,
      self : self,
    }
  },
  ReadMember(search, page, self, onsuccess, onfailed) {
    return {
      data: {
        Search             : search,
        Page               : page,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onReadMemberSuccess,
      onfailed  : self.onReadMemberFailed,
      self      : self,
    }
  },
  ReadMemberGroup(search, page, gid, self, onsuccess, onfailed) {
    return {
      data: {
        Search             : search,
        Page               : page,
        Type               : "group_member",
        Group              : gid,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onReadMemberSuccess,
      onfailed  : self.onReadMemberFailed,
      self      : self,
    }
  },
  RemoveMember(email, self, onsuccess, onfailed) {
    return {
      data: {
        email              : email,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onRemoveMemberSuccess,
      onfailed  : self.onRemoveMemberFailed,
      self      : self,
    }
  },
  MakeAdministrator(uid, self, onsuccess, onfailed) {
    return {
      data: {
        Admin              : uid,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onAddAdministratorSuccess,
      onfailed  : self.onAddAdministratorFailed,
      self      : self,
    }
  },
  RemoveAdministrator(uid, self, onsuccess, onfailed) {
    return {
      data: {
        admin              : uid,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onRemoveAdministratorSuccess,
      onfailed  : self.onRemoveAdministratorFailed,
      self      : self,
    }
  },
  ReadAdministrator(search, page, self, onsuccess, onfailed) {
    return {
      data: {
        Search             : search,
        Page               : page,
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onReadAdministratorSuccess,
      onfailed  : self.onReadAdministratorFailed,
      self      : self,
    }
  },
  RemoveEnsemble(self, onsuccess, onfailed) {
    return {
      data: {
        AuthorizationToken : self.props.TokenReducer.tokenEnsemble,
      },
      onsuccess : self.onRemoveEnsembleSuccess,
      onfailed  : self.onRemoveEnsembleFailed,
      self      : self,
    }
  },
}
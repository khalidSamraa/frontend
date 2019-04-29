export default {
  Register(self, onsuccess, onfailed) {
    return {
      data: {
        institution: {
          name: self.institutionName,
          country: self.institutionEmail
        },
        contact: {
          first_name: self.firstName,
          last_name: self.lastName,
          email: self.contactEmail,
          phone_1: self.contactPhone1,
          phone_2: self.contactPhone2
        },
        userAddress: {
          address_line_1: self.userAddress1,
          address_line_2: self.userAddress2,
          address_line_3: self.userAddress3,
          city: self.city,
          state: self.state,
          country: self.country,
          zip: self.zip,
          phone_1: self.userAddressPhone1,
          phone_2: self.userAddressPhone2
        },
        AuthorizationToken: self.props.TokenReducer.token
      },
      RunRedux: self.props.RunRedux,
      onsuccess,
      onfailed,
      self: self
    };
  },
  AddMember(self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          email: self.state.email,
          authority_auids: self.state.authority_auid
        },
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onAddMemberSuccess,
      onfailed: self.onAddMemberFailed,
      self: self
    };
  },
  AddMemberToGroup(uid, self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          user: uid
        },
        gid: self.state.groupID,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      RunRedux: self.props.RunRedux,
      onsuccess: self.onAddMemberToGroupSuccess,
      onfailed: self.onAddMemberToGroupFailed,
      self: self
    };
  },
  Read(self, onsuccess, onfailed, page) {
    return {
      data: {
        page: page,
        AuthorizationToken: self.props.TokenReducer.token
      },
      onsuccess: self.onReadSuccess,
      onfailed: self.onReadFailed,
      self: self
    };
  },
  GetTokenInstitution(institutionId, self, onsuccess, onfailed) {
    return {
      data: {
        institution: institutionId,
        AuthorizationToken: self.props.TokenReducer.token
      },
      onsuccess: self.getTokenInstitutionSuccess,
      onfailed: self.getTokenInstitutionFailed,
      self: self
    };
  },
  ReadMember(search, page, self, onsuccess, onfailed) {
    return {
      data: {
        Search: search,
        Page: page,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onReadMemberSuccess,
      onfailed: self.onReadMemberFailed,
      self: self
    };
  },
  ReadMemberGroup(search, page, gid, self, onsuccess, onfailed) {
    return {
      data: {
        Search: search,
        Page: page,
        Type: 'group_member',
        Group: gid,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onReadMemberSuccess,
      onfailed: self.onReadMemberFailed,
      self: self
    };
  },
  RemoveMember(email, self, onsuccess, onfailed) {
    return {
      data: {
        email: email,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onRemoveMemberSuccess,
      onfailed: self.onRemoveMemberFailed,
      self: self
    };
  },
  MakeAdministrator(uid, self, onsuccess, onfailed) {
    return {
      data: {
        Admin: uid,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onAddAdministratorSuccess,
      onfailed: self.onAddAdministratorFailed,
      self: self
    };
  },
  RemoveAdministrator(uid, self, onsuccess, onfailed) {
    return {
      data: {
        admin: uid,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onRemoveAdministratorSuccess,
      onfailed: self.onRemoveAdministratorFailed,
      self: self
    };
  },
  ReadAdministrator(search, page, self, onsuccess, onfailed) {
    return {
      data: {
        Search: search,
        Page: page,
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onReadAdministratorSuccess,
      onfailed: self.onReadAdministratorFailed,
      self: self
    };
  },
  RemoveInstitution(self, onsuccess, onfailed) {
    return {
      data: {
        AuthorizationToken: self.props.TokenReducer.tokenInstitution
      },
      onsuccess: self.onRemoveInstitutionSuccess,
      onfailed: self.onRemoveInstitutionFailed,
      self: self
    };
  }
};

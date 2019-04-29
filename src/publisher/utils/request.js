export default {
  ReadAsMaster(self, onsuccess, onfailed) {
    return {
      data: {
        AuthorizationToken: self.props.TokenReducer.token
      },
      self: self,
      onsuccess: onsuccess,
      onfailed: onfailed
    };
  },
  AddMember(self, onsuccess, onfailed) {
    return {
      data: {
        field: {
          email: self.state.email
        },
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
      onsuccess: onsuccess,
      onfailed: onfailed,
      self: self
    };
  },
  Register(self, onsuccess, onfailed) {
    return {
      data: {
        publisher: {
          name: self.publisherName,
          email: self.publisherEmail
        },
        contact: {
          first_name: self.firstName,
          last_name: self.lastName,
          email: self.contactEmail,
          phone_1: self.contactPhone1,
          phone_2: self.contactPhone2,
          comment: self.comment
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
      onsuccess: onsuccess,
      onfailed: onfailed,
      self: self
    };
  },
  GetTokenPublisher(publisherId, self, onsuccess, onfailed) {
    return {
      data: {
        publisher: publisherId,
        AuthorizationToken: self.props.TokenReducer.token
      },
      onsuccess: self.getTokenPublisherSuccess,
      onfailed: self.getTokenPublisherFailed,
      self: self
    };
  },
  ReadMember(search, page, self, onsuccess, onfailed) {
    return {
      data: {
        Search: search,
        Page: page,
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
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
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
      },
      onsuccess: self.onReadAdministratorSuccess,
      onfailed: self.onReadAdministratorFailed,
      self: self
    };
  },
  RemovePublisher(self, onsuccess, onfailed) {
    return {
      data: {
        AuthorizationToken: self.props.TokenReducer.tokenPublisher
      },
      onsuccess: self.onRemovePublisherSuccess,
      onfailed: self.onRemovePublisherFailed,
      self: self
    };
  }
};

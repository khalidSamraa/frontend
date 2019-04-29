import axios from 'axios';
import Server from '../config/server.js';

export default {
  ReadAsMaster: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .get(Server.API + 'account/publisher/')
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error.response);
      });
  },

  AddMember: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .put(Server.API + 'account/publisher/member/', params.data.field)
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  AddMemberToGroup: function(params) {
    axios.defaults.headers.common['Authorization'] =
    'Token ' + params.data.AuthorizationToken;
    axios
      .put(
        Server.API + 'account/group/member/' + params.data.gid + '/',
        params.data.field
      )
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },
  
  Read: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .get(Server.API + 'account/publisher/', {
        params: {
          page: params.data.page
        }
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  Register: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .post(Server.API + 'account/publisher/signup/', params.data)
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error.response);
      });
  },

  GetTokenPublisher: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .post(Server.API + 'account/publisher/auth/', {
        publisher: params.data.publisher
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  ReadMember: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .get(Server.API + 'account/publisher/member/read/', {
        params: {
          search: params.data.Search,
          page: params.data.Page
        }
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  ReadMemberGroup: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .get(Server.API + 'account/publisher/member/read/', {
        params: {
          search: params.data.Search,
          page: params.data.Page,
          type: params.data.Type,
          group: params.data.Group
        }
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  RemoveMember: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .post(Server.API + 'account/publisher/member/', {
        email: params.data.email
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  RemoveAdministrator: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .post(Server.API + 'account/publisher/administrator/', {
        admin: params.data.admin
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  MakeAdministrator: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .put(Server.API + 'account/publisher/administrator/', {
        admin: params.data.Admin
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  ReadAdministrator: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .get(Server.API + 'account/publisher/administrator/read/', {
        params: {
          search: params.data.Search,
          page: params.data.Page
        }
      })
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error);
      });
  },

  RemovePublisher: function(params) {
    axios.defaults.headers.common['Authorization'] =
      'Token ' + params.data.AuthorizationToken;
    axios
      .delete(Server.API + 'account/publisher/delete/')
      .then(function(response) {
        params.onsuccess(params, response);
      })
      .catch(error => {
        params.onfailed(error.response);
      });
  }
};

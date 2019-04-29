import axios from 'axios';
import Server from '../config/server.js';

export default {
  Register: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.post(
      Server.API + 'account/group/register/',
      params.data.field
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)
    });
  },
  Update: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.patch(
      Server.API + 'account/group/update/' + params.data.id + '/',
      {name: params.data.name}
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)
    });
  },
  Read: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.get(
      Server.API + 'account/group/', {
        params: {
          search: params.data.Search,
          page  : params.data.Page,
        }
      }
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)
    });
  },
  ReadMember: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.get(Server.API + 'account/group/member/read/' + params.data.gid + '/', {
      params: {
        search: params.data.search,
        page  : params.data.page,
      }
    })
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)
    });
  },
  GroupDetails: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.get(
      Server.API + 'account/group/details/' + params.data.id + '/',
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    });
  },
  AddMember: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.put(
      Server.API + 'account/group/member/' + params.data.gid + '/',
      params.data.field
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    });
  },
  RemoveMember: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.post(
      Server.API + 'account/group/member/' + params.data.gid + '/', {
        user: params.data.user
      }
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
    });
  },
  RemoveGroup: function(params) {
    axios.defaults.headers.common['Authorization'] = "Token "+params.data.AuthorizationToken;
    axios.delete(
      Server.API + 'account/group/delete/' + params.data.gid + '/'
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
      console.log(error.response)
    });
  },
}

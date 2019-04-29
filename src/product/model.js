import axios from "axios"
import Server from "../config/server.js"

export default {
  Read: function(params) {
    axios.get(
      Server.API + "item/score/", {
        params: {
          // type: "catalog",
          page: params.data.page,
          q: params.data.searchQuery,
          rpp: params.data.rpp,
          sort: params.data.sort,
          hasprice: ''
        }
      })
      .then(function(response) {
        params.onsuccess(params, response)
      })
      .catch(error => {
        params.onfailed(error.response)
      })
  },

  ReadDetail: function(params) {
    axios.get(
      Server.API + "item/score/detail/", {
        params: {
          q: params.data.sid,
          cur: params.data.id_curr,
        },
        transformRequest: [function (data, headers) {
          if(params.data.AuthorizationToken === null) {
            delete headers.common.Authorization
          }else {
            headers.common["Authorization"] = "Token " + params.data.AuthorizationToken
          }
        }],
      })
      .then(function(response) {
        params.onsuccess(params, response)
      })
      .catch(error => {
        params.onfailed(error)
      })
  },

  ReadCartDetails: function(params) {
    if(params.data.AuthorizationToken === null) {
      axios.defaults.headers.common = {}
    } else {
      axios.defaults.headers.common["Authorization"] = "Token "+params.data.AuthorizationToken
    }

    axios.post(
      Server.API + "item/score/cart/summary/", {
        scores: JSON.stringify(params.data.score)
      })
      .then(function(response) {
        params.onsuccess(params, response)
      })
      .catch(error => {
        params.onfailed(error)
      })
  },

  Checkout: function(params) {
    axios.defaults.headers.common["Authorization"] = "Token "+params.data.AuthorizationToken
    axios.post(
      Server.API + "item/purchase/", {
      // Server.API + "payment/purchase/request/", {
        scores: JSON.stringify(params.data.score)
      })
      .then(function(response) {
        params.onsuccess(params, response)
      })
      .catch(error => {
        params.onfailed(error.response)
      })
  }
}

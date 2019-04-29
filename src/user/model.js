import axios from "axios"
import Server from "../config/server.js"

export default {
  Login: function(params) {
    axios.defaults.headers.common["Authorization"] = "null"
    axios.post(
      Server.API + "account/auth/", 
      params.data
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)
    })
  },
  Register: function(params) {
    axios.post(
      Server.API + "account/register/", 
      params.data
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    })
  },
  CheckUid: function(params) {
    axios.get(
      Server.API + "account/password/reset/?token=" + params.data.uid
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    })
  },
  CheckToken: function(params) {
    axios.get(
      Server.API + "account/verification/" + params.data.token + "/"
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    })
  },
  RequestEmailResetPassword: function(params) {
    axios.post(
      Server.API + "account/password/reset/",
      params.data
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    })
  },
  RecoveryPassword: function(params) {
    axios.patch(
      Server.API + "account/password/reset/",
      params.data
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    })
  },
  UpdatePassword: function(params) {
    axios.defaults.headers.common["Authorization"] = "Token "+params.data.AuthorizationToken
    axios.put(
      Server.API + "account/password/reset/",
      params.data.field
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)      
    })
  },
  UpdateUser: function(params) {
    axios.defaults.headers.common["Authorization"] = "Token "+params.data.AuthorizationToken
    axios.patch(
      Server.API + "account/update/",
      params.data
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)      
    })
  },
  SignupInvitation: function(params) {
    axios.post(
      Server.API + "account/register/invitation/",
      params.data
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)      
    })
  },
  CheckPassword: function(params) {
    axios.defaults.headers.common["Authorization"] = "Token "+params.data.AuthorizationToken
    axios.post(
      Server.API + "account/password/check/",
      params.data
    )
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)      
    })
  },
  ReadCurLocLang: function(params) {
    axios.get(Server.API + "system/defaults/")
    .then(function(response){
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error.response)
    });
  }
}
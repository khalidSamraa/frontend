import axios from "axios"
import Server from "../config/server.js"

export default {
  ReadMasterCountry: function(params) {
    axios.defaults.headers.common["Authorization"] = "Token "+params.data.AuthorizationToken
    axios.get(Server.API + "account/publisher/")
      .then(function(response) {
        params.onsuccess(params, response)
      })
      .catch(error => {
        params.onfailed(error.response)
      })
  },
}
import axios from "axios"
import Server from "../config/server.js"

export default { 
  Read: function(params) {
    axios.defaults.headers.common["Authorization"] = "null"
    axios.get(
      Server.API + "item/composer/all/", {
        params: {
          ordering: "name",
        }
      }
    )
    .then(function(response) {
      params.onsuccess(params, response)
    })
    .catch(error => {
      params.onfailed(error)      
    });
  }
}
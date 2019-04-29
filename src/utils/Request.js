import axios from "axios"
import server from "../config/server.js"
import urls from "../config/urls.js"

function Request(method, url_key, headers={}, data={}, args=[], onSuccess=()=>{}, onFailed=()=>{}, extra=undefined, param=undefined, query = '') {
  let new_method = method

  if (typeof headers !== "object") {
    throw ("Invalid headers, headers must be an object")
  }

  if (typeof data !== "object") {
    throw ("Invalid data, data must be an object")
  }

  if (!Array.isArray(args)) {
    throw ("Invalid arguments, data must be an array")
  }

  if (typeof onSuccess !== "function") {
    throw ("Invalid onSuccess, onSuccess must be a function")
  }

  if (typeof onFailed !== "function") {
    throw ("Invalid onSuccess, onSuccess must be a function")
  }

  if (new_method === "get" && data) {
    data = {
      params: data
    }
  }

  if(headers.constructor === Object && Object.keys(headers).length === 0) {
    axios.defaults.headers.common = {}
  } else {
    for (let header in headers) {
      axios.defaults.headers.common[header] = headers[header]
    }
  }

  let api = urls[url_key]

  if (!api) {
    throw ("Invalid url key")
  }

  args.map((value, index) => {
    api = api.replace("{}", value)
  })

  if (param !== undefined) {
    if(api.indexOf("?") === -1) {
      throw ("cant find symbol ? in url, please add ? to use param on url")
    }else{
      for(let index in param) {
        api = api.replace("?",  "?" + index + "=" + param[index])
      }
    }
  }

  if (typeof axios[new_method] !== "function") {
    throw ("Invalid method")
  }


  axios[new_method](
    server.API + api + query,
    data,
  ).then(
    function(response) {
      onSuccess(response, extra)
    }

  ).catch(
    function(error) {
      onFailed(error, extra)
    }
  )
  return true
}

export default Request

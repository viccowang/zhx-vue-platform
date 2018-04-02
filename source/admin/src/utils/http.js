import axios from 'axios'
import { Message } from 'element-ui'
import { BASE_PER_FIX_URL } from './baseUrlPerFix.js'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Per fix url
const basePerfix = BASE_PER_FIX_URL

// request interceptors
axios.interceptors.request.use(config => {
  // dosth before request
  // config.headers['Content-type'] = 'application/x-www-form-urlencoded'

  return config
}, error => Promise.reject(error))

// response interceptors
axios.interceptors.response.use(response => {
  // do sth befor response

  return response
}, error => Promise.reject(error.response))

// check response code
function checkResponseStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response.data
  }
  return response
}
function cactchError (error) {
  if (error.status === 400 || error.status === 404 || error.status === 500) {
    return Message({
      message: `服务器访问出错. Error:${error.data.error},Message:${error.data.message}`,
      type: 'error',
      duration: 5000
    })
  }
}

// check server response
function checkResponseCode (response) {
  const header = response.head
  if (header && header.success === 'true') {
    return response.data
  } else {
    return Message({
      message: header.msg,
      type: 'error',
      duration: 2000
    })
  }
}

/*
 * 这里定义的接口都应该符合RESTFul规范
*/
export default {
  // normal method
  get (url, params) {
    if (!url) return
    return axios.get(basePerfix + url, params)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError)
  },
  // post request
  post (url, data) {
    if (!url) return
    return axios.post(basePerfix + url, data)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError)
  },
  // update request for All data
  put (url, data) {

  },
  // update request path data
  patch (url, data) {

  },
  // delete request
  delete (url, data) {

  },
  // head
  head (url, data) {

  }

}

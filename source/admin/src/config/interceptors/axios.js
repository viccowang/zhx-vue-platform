/**
 * AXIOS Interceptors Configuration
 */

/**
 *
 *
 * @export
 * @param {*} config
 * @returns
 */
export function axiosRequestSucessFunc (config) {
  // dosth before request
  // config.headers['Content-type'] = 'application/x-www-form-urlencoded'
  return config
}

/**
 *
 *
 * @export
 * @param {*} error
 * @returns
 */
export function axiosRequestFailFunc (error) {
  return Promise.reject(error)
}
/**
 *
 *
 * @export
 * @param {*} response
 * @returns
 */
export function axiosResponseSucessFunc (response) {
  /**
   *
   */
  if (response.status === 200 || response.status === 304) {
    const responseData = response.data

    if (responseData.head && responseData.head.success === 'true') {
      return responseData.data || ''
    } else {
      return Promise.reject(responseData.msg)
    }
  } else {
    return Promise.reject(response.data)
  }
}

export function axiosResponseFailFunc (error) {
  return Promise.reject(error)
}

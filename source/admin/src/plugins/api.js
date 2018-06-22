/**
 *
 */
import http from './axios'

import { API_DEFAULT_CONFIG } from '@/config/settings'
import apis from '@/service/api'

class ApiCounstructor {
  //
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }

  //
  apiBuilder ({ apis = {}, isMocked = false, mockBaseUrl, prodBaseUrl }) {
    Object.keys(apis).forEach(namespace => {
      this.buildApiWidthNamespace({ namespace, isMocked, mockBaseUrl, prodBaseUrl, apis: apis[namespace] })
    })
  }

  buildApiWidthNamespace ({ namespace, isMocked, mockBaseUrl, prodBaseUrl, apis }) {
    apis.forEach(api => {
      const { name, method, path, mockPath, params, desc } = api
      const apiNamespace = `${namespace}/${name}`
      const url = isMocked ? `${mockBaseUrl}${mockPath}` : `${prodBaseUrl}${path}`

      Object.defineProperty(this.api, apiNamespace, {
        value (outerParams, outerOptions) {
          const data = outerParams || params
          return http(axiosParamBuilder(Object.assign({}, {url, method, desc}, outerOptions), data))
        }
      })

      console.log(this.api)
    })
  }
}

function axiosParamBuilder (options, data) {
  if (options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH') {
    options.data = data
  } else if (options.method === 'GET') { options.params = data }
  return options
}

export default new ApiCounstructor({ apis: apis, ...API_DEFAULT_CONFIG })['api']

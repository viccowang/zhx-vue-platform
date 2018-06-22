/**
 * API CONSTRUCTION ClASS
 * ========================================================================
 * 该类负责构建生成对应全局API对象。API对象可以通过直接导入该类实例使用， 也可以
 * 通过在Vue组件中通过 this.$api 方式调用。注入方式请参考 inject.js
 * 例如：
 * this.$api['user/login'](params)
 * 或
 * import api from '@/plugins/api'
 *
 * api['user/login'](params)
 * ========================================================================
 * Author: Vicco Wang
 * Date: 2018.06.22
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
      // console.log(this.api)
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

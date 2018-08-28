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
import axios from './axios'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { API_DEFAULT_CONFIG } from '@/config/settings'
import apis from '@/service/api'

class ApiCounstructor {
  //
  constructor (options) {
    this.api = Object.create(null)
    this.debugApi = []
    this.apiBuilder(options)
  }

  //
  apiBuilder ({ apis = {}, mockBaseUrl, prodBaseUrl, isMocked = false, isDebug = false, sep = '/' }) {
    Object.keys(apis).forEach(namespace => {
      this.buildApiWidthNamespace({ namespace, apis: apis[namespace], isMocked, isDebug, mockBaseUrl, prodBaseUrl, sep })
    })
  }

  buildApiWidthNamespace ({ namespace, apis, mockBaseUrl, prodBaseUrl, isMocked, isDebug, sep }) {
    apis.forEach(api => {
      const { name, method, path, mockPath, params, desc } = api
      const apiNamespace = `${namespace}${sep}${name}`
      const url = isMocked ? `${mockBaseUrl}${mockPath}` : `${prodBaseUrl}${path}`

      Object.defineProperty(this.api, apiNamespace, {
        value (outerParams, outerOptions) {
          // 如果没传入参数 则传递默认参数
          const data = _isEmpty(outerParams) ? params : _assign(params, outerParams)
          // 开启debug时打印一些提示信息
          isDebug && console.info(`调用业务接口名称:${apiNamespace}, 类型:${method}, 地址:${url}, 描述:${desc}`)
          //
          return axios(axiosParamBuilder(_assign({url, method, desc}, outerOptions), data))
        }
      })
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

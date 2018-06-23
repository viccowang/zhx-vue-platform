/**
 * Global Configurations
 * =========================
 * Author: Vicco Wang
 * Date: 2018.0622
 */

/**
  * 全局项目名称配置
  */
export const PLATFORM_PERFIX_NAME = 'ZVP'

/**
  * API接口默认参数配置
  */
export const API_DEFAULT_CONFIG = {
  // mockBaseUrl: 'http://192.168.10.241:3000/mock/144',
  mockBaseUrl: 'http://192.168.3.108:3000/mock/18',
  prodBaseUrl: 'http://117.34.118.17:8083',
  isMocked: process.env.NODE_ENV !== 'production',
  isDebug: false
}

/**
 * AXIOS默认参数配置
 */
export const AXIOS_DEFAULT_CONFIG = {

}

/**
  * 平台基础参数配置
  */
export const PLATEFORM_DEFAULT_CONFIG = {
  header: {
    height: '35px',
    tagBarHeight: '30px'
  },
  sidebar: {
    minWidth: '60px',
    maxWidth: '180px'
  },
  productionTip: false
}

/**
  * 路由表默认参数配置
  */
export const ROUTER_DEFAULT_CONFIG = {
  isUseStaticeRouter: true
}

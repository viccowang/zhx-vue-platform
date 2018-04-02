/**
 *  Data Transfer Plugin
 *  Author: Vicco Wang
 *  Date: 2018.03.23
 *  Ver: 1.0
 */
const __isArray = (arrayObject) => {
  return Object.prototype.toString.call(arrayObject) === '[object Array]'
}
const __isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export default {
  install (Vue, options) {
    Vue.prototype.$transferData = (data, keyMap) => {
      //
      if (!__isArray(data)) throw Error('第一个参数必须为数组对象')
      if (!__isObject(keyMap)) throw Error('第二个参数必须是对象')
    }
  }
}

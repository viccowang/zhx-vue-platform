import moment from 'moment'
/**
 * COMMON UTILS
 * Author: Vicco Wang
 * Date: 2018.06.25
 */

/**
  *
  * assert(a === b, "yes , they are the same!")
  *
  * asser(turlyFunc(), "test a function")
  *
  */
export function assert (expression, message) {
  if (expression) {
    return message
  }
}

export function getGreetingTime () {
  const now = parseInt(moment().format('HH'))
  let dayTime = ''
  if (now < 12) dayTime = '早上'
  else if (now >= 12 && now < 18) dayTime = '下午'
  else if (now >= 18 && now <= 23) dayTime = '晚上'
  else dayTime = ''
  return dayTime
}

/**
 * 函数调用n秒后才会执行，如果函数在n秒内被调用的话则函数不执行，重新计算执行时间
 * @param { } method  需要去抖的函数体
 * @param {*} delay   在多少秒内该函数只能触发一次.默认2秒内.防止多次触发
 *
 * usage:
 *
 * old:
 *
 * actionMethods (params) {
 *   alert('abc)
 * }
 *
 * new:
 * actionMethods: this.$utils.debounce((params) => {
 *   alert('abc')
 * },500)
 *
 *
 */

export function debounce (method, delay = 300) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(context, args)
    }, delay)
  }
}

/**
 * 函数节流, 防止函数在特定时间内多次执行
 * @param { } method  需要节流的函数体
 * @param {*} duration   在多少秒内该函数只能触发一次.默认1.5秒内.防止多次触发
 *
 * usage:
 *
 * old:
 *
 * actionMethods (params) {
 *   alert('abc)
 * }
 *
 * new:
 * actionMethods: this.$utils.throttle((params) => {
 *   alert('abc')
 * },2500)
 *
 *
 */

export function throttle (method, duration = 1500) {
  let begin = new Date()
  return function () {
    const context = this
    const args = arguments
    const current = new Date()
    if (current - begin >= duration) {
      method.apply(context, args)
      begin = current
    }
  }
}

export function Map () {
  var Struct = function (key, value) {
    this.key = key
    this.value = value
  }
  // 添加map键值对
  var put = function (key, value) {
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].key === key) {
        this.arr[i].value = value
        return
      }
    };
    this.arr[this.arr.length] = new Struct(key, value)
  }
  // 根据key获取value
  var get = function (key) {
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].key === key) {
        return this.arr[i].value
      }
    }
    return null
  }
  // 删除MAP所有元素
  this.clear = function () {
    this.arr = []
  }
  // 根据key删除
  var remove = function (key) {
    var v
    for (var i = 0; i < this.arr.length; i++) {
      v = this.arr.pop()
      if (v.key === key) {
        continue
      }
      this.arr.unshift(v)
    }
  }
  // 获取map键值对个数
  var size = function () {
    return this.arr.length
  }
  // 判断map是否为空
  var isEmpty = function () {
    return this.arr.length <= 0
  }
  this.arr = []
  this.get = get
  this.put = put
  this.remove = remove
  this.size = size
  this.isEmpty = isEmpty
}

export function GetUuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

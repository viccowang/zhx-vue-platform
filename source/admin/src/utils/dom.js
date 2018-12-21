/**
 * 基本DOM的样式类操作
 * ===============================
 * Author: Vicco Wang
 * Date: 2018.12.17
 *
 */

/**
 *
 *
 * @param {*} ele
 * @param {*} cls
 */
function hasClass (ele, cls) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 *
 *
 * @param {*} ele
 * @param {*} cls
 */
function addClass (ele, cls) {
  if (!this.hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 *
 *
 * @param {*} ele
 * @param {*} cls
 */
function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 *
 *
 * @param {*} ele
 * @param {*} cls
 */
function toggleClass (ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls)
  } else {
    addClass(ele, cls)
  }
}

export {
  hasClass,
  addClass,
  removeClass,
  toggleClass
}

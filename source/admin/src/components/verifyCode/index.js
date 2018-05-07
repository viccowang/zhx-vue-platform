/**
 * Login Verify Code for web
 * Original: https://github.com/AiMe1991/identify/
 * Modified: Vicco Wang
 * Date: 2018.05.07
 */

import WebVerifyCode from './WebVerifyCode'

const install = function (Vue) {
  Vue.component(WebVerifyCode.name, WebVerifyCode)
}
const VueWebVertifyCode = { WebVerifyCode, install }

export default VueWebVertifyCode
export { WebVerifyCode, install }

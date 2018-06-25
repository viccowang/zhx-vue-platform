/**
 * Global Configurations
 * =================================
 * Author: Vicco Wang
 * Date: 2018.06.22
 */

import * as GlobalSettings from './settings'
import GLOBAL_CONST from './const'

export default {
  install (Vue, options) {
    // use custom configurations
    Vue.prototype.$config = GlobalSettings
    // set custom consts
    Vue.prototype.$const = GLOBAL_CONST
    // set vue productionTip in console
    Vue.config.productionTip = GlobalSettings.PLATFORM_DEFAULT_CONFIG.productionTip
  }
}

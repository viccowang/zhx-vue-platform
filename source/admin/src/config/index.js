/**
 * Global Configurations
 *
 */

import * as GlobalSettings from './settings'
import GLOBAL_CONST from './const'
import { loadCurrentTheme } from '@/utils/theme'

export default {
  install (Vue, options) {
    // use custom configurations
    Vue.prototype.$config = GlobalSettings
    // set custom consts
    Vue.prototype.$const = GLOBAL_CONST
    //
    Vue.config.productionTip = GlobalSettings.PLATEFORM_DEFAULT_CONFIG.productionTip
    //
    loadCurrentTheme()
  }
}

/**
 * Global Configurations
 *
 */

import * as GlobalSettings from './settings'
import { loadCurrentTheme } from '@/utils/theme'

export { GlobalSettings }

export default {
  install (Vue, options) {
    // use custom configurations
    Vue.prototype.$config = GlobalSettings
    //
    Vue.config.productionTip = GlobalSettings.PLATEFORM_DEFAULT_CONFIG.productionTip
    //
    loadCurrentTheme()
  }
}

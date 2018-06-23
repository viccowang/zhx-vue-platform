import store from '@/plugins/store'
import Dashboard from './store'

export default {
  install () {
    store.registerModule('Dashboard', Dashboard)
  },
  uninstall () {
    store.unregisterModule('Dashboard')
  }
}

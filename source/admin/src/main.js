// initialize base framework
import Vue from 'vue'
// vuex
import store from './store'
// vue router
import {router} from './router'
import './router/permission'
import App from './App'
// load custom theme
import { loadCurrentTheme } from '@/utils/theme'
// Element UI module & style
import ElementUI from 'element-ui'
// custom zhx-vue-plateform icons
import '@/assets/plateform-font/iconfont.css'
/**
 * custom vue plugins
 */
// contextmenu
import contextmenu from '@/components/contextmenu'
// nextPage
import NextPage from './components/nextPage/'
// config to use Staic router or dynamic one
Vue.useStaticRouter = true
// initialize custom theme
loadCurrentTheme()
// apply plugins
Vue.use(ElementUI, { size: 'mini' })
Vue.use(NextPage, { router, store })
Vue.use(contextmenu)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

// initialize base framework
import Vue from 'vue'
import App from './App'
// vue router
import {router} from './router'
import './router/permission'
// vuex
import store from './store'
// Element UI module & style
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// custom zhx-vue-plateform icons
import '@/font/plateform-font/iconfont.css'
/**
 * custom vue plugins
 */
// contextmenu
import contextmenu from '@/components/contextmenu'
// nextPage
import NextPage from './components/nextPage/'
// config to use Staic router or dynamic one
Vue.useStaticRouter = false
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

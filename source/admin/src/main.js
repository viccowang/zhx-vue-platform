// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import './router/permission'
// Element UI module & style
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// common icon font
import '@/font/plateform-font/iconfont.css'
//
import contextmenu from '@/components/contextmenu'
// nextPage
import NextPage from './components/nextPage/'
//
Vue.use(ElementUI, { size: 'mini' })
// Vue.use(VueAwesomeSwiper)
Vue.use(NextPage, { router, store })
// contextmenu plugin
Vue.use(contextmenu)
// config to use Staic router or dynamic one
Vue.useStaticRouter = false

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

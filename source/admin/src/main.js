// initialize base framework
import Vue from 'vue'
// vuex
import store from './store'
//
import config from '@/config'
import router from '@/plugins/router'
// import './router/permission'
import App from './App'
// Element UI module & style
import ElementUI from 'element-ui'
// custom zhx-vue-plateform icons
import '@/assets/plateform-font/iconfont.css'
// contextmenu
import contextmenu from '@/components/contextmenu'
// nextPage
import NextPage from './components/nextPage/'
//
Vue.use(config)
// apply plugins
Vue.use(ElementUI, { size: 'mini' })
Vue.use(NextPage, { router, store })
Vue.use(contextmenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

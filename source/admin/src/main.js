// initialize base framework
import Vue from 'vue'
import config from '@/config'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import router from '@/plugins/router'
import App from './App'
// custom zhx-vue-plateform icons
import '@/assets/plateform-font/iconfont.css'

Vue.use(config)
Vue.use(inject)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

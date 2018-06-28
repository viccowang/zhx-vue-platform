// initialize base framework
import Vue from 'vue'
import config from '@/config'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import router from '@/plugins/router'
import App from './App'
import '@/assets/platform-font/iconfont.css'
// 注册window属性
window.$GLOBAL = Object.create(null)
// 挂全局eventBus
window.$GLOBAL.$eventBus = new Vue()
// 全局配置项
Vue.use(config)
// 注入自定义组件和方法
Vue.use(inject)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

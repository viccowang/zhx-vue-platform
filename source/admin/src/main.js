// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
// Element UI module & style
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/font/plateform-font/iconfont.css'

// import './common/style/element-variable-extend.scss'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import './router/premission'

import NextPage from './components/nextPage/'

Vue.use(ElementUI, { size: 'mini' })
// Vue.use(VueAwesomeSwiper)
Vue.use(NextPage, { router, store })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

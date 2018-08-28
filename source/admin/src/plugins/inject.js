import Vue from 'vue'
import store from '@/plugins/store'
import router from '@/plugins/router'
import api from './api'
import axios from './axios'
import ElementUI from 'element-ui'
import VueKonva from 'vue-konva'
// contextmenu
import contextmenu from '@/components/contextmenu'
// nextPage
import NextPage from '@/components/nextPage/'
// system theme
import { loadCurrentTheme } from '@/service/expands/theme'

Vue.use(ElementUI, { size: 'mini' })
Vue.use(NextPage, { router, store })
Vue.use(contextmenu)
Vue.use(VueKonva)
//
loadCurrentTheme()

export default {
  install (Vue, options) {
    Vue.prototype.$api = api
    Vue.prototype.$ajax = axios
  }
}

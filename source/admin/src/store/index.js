import Vue from 'vue'
import Vuex from 'vuex'
// custom store
import user from './modules/user'
import asyncRouter from './modules/asyncRouter'
import views from './modules/views'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    asyncRouter,
    user,
    views
  },
  getters
})

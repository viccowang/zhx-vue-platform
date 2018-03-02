import Vue from 'vue'
import Vuex from 'vuex'
// custom store
import plateform from './modules/plateform'
import asyncRouter from './modules/asyncRouter'
import user from './modules/user'
import views from './modules/views'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    plateform,
    asyncRouter,
    user,
    views
  },
  getters
})

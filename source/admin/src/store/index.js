import Vue from 'vue'
import Vuex from 'vuex'
// combined modules
import Modules from './combindModules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: Modules,
  getters
})

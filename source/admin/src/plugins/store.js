import Vue from 'vue'
import Vuex from 'vuex'
// combined modules
import Modules from '@/service/store/combindModules'
import getters from '@/service/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: Modules,
  getters
})

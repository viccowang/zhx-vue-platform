const Dashborad = {
  namespaced: true,
  state: {
    map: {},
    operateItem: null
  },
  mutations: {
    SET_OPERATE_ITEM (state, item) {
      state.operateItem = item
    },
    GET_OPERATE_ITEM (state) {
      return state.operateItem
    },
    SET_MAP_STATE (state, mapParams) {
      state.map = Object.assign({}, state.map, mapParams)
    },
    GET_MAP_STATE (state) {
      return state.map
    }
  },

  actions: {
    setOperateItem ({ commit }, payload) {
      commit('SET_OPERATE_ITEM', payload)
    },
    getOperateItem ({ commit }) {
      commit('GET_OPERATE_ITEM')
    },
    setMapState ({ commit }, payload) {
      commit('SET_MAP_STATE', payload)
    },
    getMapState ({ commit }, payload) {
      commit('GET_MAP_STATE')
    }
  }
}

export default Dashborad

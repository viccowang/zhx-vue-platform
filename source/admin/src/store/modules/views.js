import Cookie from 'vue-cookie'

const views = {
  //
  state: {
    visitedViews: [], // 已经点击访问过的View, 用于展示为tag-tabs
    cachedViews: [], // 哪些Views需要使用keep-alive进行缓存,默认不加noCache的都会缓存(根据业务需求)
    breadcrumb: [], // 面包屑,在路由时应根据父子关系存入当前的路由情况
    _theNextView: null, // 内部判断当前移除的view是否在visitedViews数组的最后
    sidebarState: {
      isOpen: Cookie.get('ZVP_sidebar_state') === 'true', // 边栏折叠状态
      width: Cookie.get('ZVP_sidebar_state') === 'true' ? '180px' : '64px' // 边栏宽度,elementUI 折叠变量为64px
    }
  },

  mutations: {
    // 增加浏览记录路由对象
    ADD_VISITED_VIEW (state, route) {
      if (state.visitedViews.some(v => v.path === route.path)) return
      state.visitedViews.push(route)
      if (route.name && route.meta && !route.meta.noCache) {
        state.cachedViews.push(route.name)
      }
    },
    // 移除浏览记录路由对象
    REMOVE_VISITED_VIEW (state, route) {
      // 处理visitedViews
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === route.path) {
          state._theNextView = (i < state.visitedViews.length - 1) ? state.visitedViews[i + 1] : null
          state.visitedViews.splice(i, 1)
          break
        }
      }
      // 处理cachedViews
      for (const i of state.cachedViews) {
        if (i === route.name) {
          const idx = state.cachedViews.indexOf(i)
          state.cachedViews.splice(idx, 1)
          break
        }
      }
    },
    //
    REMOVE_ALL_VISITED (state, route) {
      state.visitedViews = []
      state.cachedViews = []
      state.breadcrumb = []
      state._theNextView = null
    },
    //
    SET_COLLAPSE_SIDEBAR (state, sidebarStatus) {
      state.sidebarState.isOpen = sidebarStatus
      state.sidebarState.width = sidebarStatus ? '180px' : '64px'
      Cookie.set('ZVP_sidebar_state', sidebarStatus)
    }
  },

  actions: {
    addVisitedViews ({commit}, route) {
      commit('ADD_VISITED_VIEW', route)
    },
    removeVisitedViews ({commit, state}, route) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_VISITED_VIEW', route)
        resolve({views: state.visitedViews, theNextView: state._theNextView})
      })
    },
    removeAllVisited ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_ALL_VISITED')
        resolve()
      })
    },
    collapseSidebar ({ commit }, sidebarStatus) {
      commit('SET_COLLAPSE_SIDEBAR', sidebarStatus)
    }
  }
}

export default views

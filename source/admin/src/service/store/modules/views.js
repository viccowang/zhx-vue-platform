const views = {
  //
  state: {
    visitedViews: [], // 已经点击访问过的View, 用于展示为tag-tabs
    cachedViews: [], // 哪些Views需要使用keep-alive进行缓存,默认不加noCache的都会缓存(根据业务需求)
    breadcrumb: [], // 面包屑,在路由时应根据父子关系存入当前的路由情况
    _theNextView: null // 内部判断当前移除的view是否在visitedViews数组的最后
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
    // 移除除当前路由的其他所有路由页面
    REMOVE_OTHER_VIEW (state, route) {
      state.visitedViews = state.visitedViews.filter(r => {
        return r.name === 'Dashboard' || r.path === route.path
      })
    },
    // 移除当前标签右侧的所有标签页
    REMOVE_RIGHT_VIEW (state, route) {
      const idx = state.visitedViews.findIndex(view => view.path === route.path)
      state.visitedViews = state.visitedViews.filter((view, index) => (index <= idx || view.name === 'Dashboard'))
    },
    //
    REMOVE_ALL_VISITED (state, route) {
      state.visitedViews = []
      state.cachedViews = []
      state.breadcrumb = []
      state._theNextView = null
    },
    ADD_CACHED_VIEW (state, view) {
      if (!state.cachedViews.some(v => v === view)) {
        state.cachedViews.push(view)
      }
    },
    REMOVE_CACHED_VIEW (state, view) {
      state.cachedViews = state.cachedViews.filter(v => v === view)
    },
    DRAGED_VIEWS (state, views) {
      state.visitedViews = views
    }
  },

  actions: {
    addVisitedViews ({commit}, route) {
      commit('ADD_VISITED_VIEW', route)
    },
    addCachedView ({commit}, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    removeCachedView ({commit}, view) {
      commit('REMOVE_CACHED_VIEW', view)
    },
    removeVisitedViews ({commit, state}, route) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_VISITED_VIEW', route)
        resolve({views: state.visitedViews, theNextView: state._theNextView})
      })
    },
    removeOtherViews ({commit, state}, route) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_OTHER_VIEW', route)
        resolve()
      })
    },
    removeRightViews ({commit, state}, route) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_RIGHT_VIEW', route)
        resolve()
      })
    },
    removeAllVisited ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_ALL_VISITED')
        resolve()
      })
    },
    dragedViews ({commit}, views) {
      return new Promise((resolve, reject) => {
        commit('DRAGED_VIEWS', views)
        resolve()
      })
    }
  }
}

export default views

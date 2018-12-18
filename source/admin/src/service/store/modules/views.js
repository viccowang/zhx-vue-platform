/**
 * 根据visitedView初始化缓存页面列表
 * @param {*} state
 */
const _initVisitedViews = (state) => {
  let cachedViewByVisited = []
  for (const v of state.visitedViews) {
    if (v.matched.length > 2) {
      v.matched.forEach(r => {
        if (r.name && cachedViewByVisited.indexOf(r.name) === -1) cachedViewByVisited.push(r.name)
      })
    } else {
      cachedViewByVisited.push(v.name)
    }
  }
  return cachedViewByVisited
}

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

      state.cachedViews = _initVisitedViews(state)

      // 处理cachedViews
      // for (const i of state.cachedViews) {
      //   if (i === route.name) {
      //     const idx = state.cachedViews.indexOf(i)
      //     state.cachedViews.splice(idx, 1)
      //     break
      //   }
      // }
    },
    // 移除除当前路由的其他所有路由页面
    REMOVE_OTHER_VIEW (state, route) {
      state.visitedViews = state.visitedViews.filter(r => {
        return r.name === 'Dashboard' || r.path === route.path
      })
      state.cachedViews = _initVisitedViews(state)
    },
    // 移除当前标签右侧的所有标签页
    REMOVE_RIGHT_VIEW (state, route) {
      const idx = state.visitedViews.findIndex(view => view.path === route.path)
      state.visitedViews = state.visitedViews.filter((view, index) => (index <= idx || view.name === 'Dashboard'))
      state.cachedViews = _initVisitedViews(state)
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
      // 因多层级路由时会手动嵌套,原先已通过使用路由matched属性来拼接正确的缓存路由名称, 该方法将废弃,否则会引起
      // 路由表清空的问题
      // state.cachedViews = state.cachedViews.filter(v => v === view || v === 'Dashboard')
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

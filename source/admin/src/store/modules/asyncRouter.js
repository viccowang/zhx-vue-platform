import { constantRouterMap } from '@/router/routes/staticRoutes'
import { aysncRoutesMap } from '@/router/routes/aysncRoutes'

/**
 * TODO: 应该将超管独立出去
 * 判断传入的权限是否能和路由匹配
 * @param {} roles
 * @param {*} route
 */
function hasPermission (roles, route) {
  // admin is the super user
  if (roles.indexOf('admin') >= 0) return true
  // 跳转路由不包含meta.role,则表示不需要验证权限
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 通过权限过滤出可供访问的路由表
 * @param {*} asyncRoutesMap
 * @param {*} roles
 */
function filterAsyncRoutes (asyncRoutesMap, roles) {
  const filterRoutes = asyncRoutesMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        filterAsyncRoutes(route.children, roles)
      }
      return true
    }
    return false
  })
  return filterRoutes
}

const asyncRouter = {
  //
  state: {
    addRouters: null, // 动态添加的路由表
    router: constantRouterMap // 静态路由表或和动态路由表合并后的总路由表
  },

  mutations: {
    SET_ROUTERS: (state, router) => {
      state.addRouters = router
      state.router = constantRouterMap.concat(router)
    },
    RESET_ROUTERS: (state, router) => {
      state.addRouters = null
      state.router = constantRouterMap
    }
  },

  actions: {
    generateRouters: ({commit}, roles) => {
      return new Promise((resolve, reject) => {
        // 这里通过权限来过滤出该权限所拥有的动态路由表,然后再SET_ROUTERS
        const filterRoutes = filterAsyncRoutes(aysncRoutesMap, roles)

        commit('SET_ROUTERS', filterRoutes)
        resolve()
      })
    }
  }

}

export default asyncRouter

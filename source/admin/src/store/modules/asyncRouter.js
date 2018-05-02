import Vue from 'vue'
import { constantRouterMap } from '@/router/routes/staticRoutes'
import { aysncRoutesMap } from '@/router/routes/aysncRoutes'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'
import { setSession, getSession, removeSession } from '@/utils/session'
// layout component
import Layout from '@/views/Layout'
// api
import { getGenerateRoutes } from '@/api/route'
// async load
const _import_ = file => () => import('@/views/' + file + '.vue')
// session storage key
const ZVP_USER_PERMISSION_ROUTERS = `${BASE_PER_FIX_KEY}_USER_PERMISSION_ROUTERS`

/**
 * 判断传入的权限是否能和路由匹配
 * @param {} roles
 * @param {*} route
 */
function hasPermission (roles, route) {
  // admin is the super user
  // if (roles.indexOf('admin') >= 0) return true
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

/**
 * 动态路由创建, 可以读取静态文件,也可以后端维护实现权限分级菜单;
 *
 * @param {Array} remoteRoutes 远程获取到的路由表数据
 * @returns {Array} 重构的vue路由表
 */
function generateNewRoutes (remoteRoutes) {
  let addRouters = []
  /**
   * 创建子路由
   * @param { Array } childRoute
   */
  const _createRoutes = (childRoute) => {
    const newRoute = childRoute.map(route => {
      const addChildRoute = {
        path: route.path,
        name: route.name,
        component: _import_(route.component),
        meta: { ...route.meta }
      }
      // 如果有子路由,则递归创建
      if (route.children && route.children.length) {
        addChildRoute.children = _createRoutes(route.children)
      }
      return addChildRoute
    })
    return newRoute
  }

  /**
   * 创建父路由
   */
  remoteRoutes.forEach(route => {
    let newRoute = {
      path: route.path,
      component: Layout,
      meta: { ...route.meta }
    }
    // 判断是否有子路由
    if (route.children && route.children.length) {
      newRoute.children = _createRoutes(route.children)
    }
    addRouters.push(newRoute)
  })
  return addRouters
}

const asyncRouter = {
  //
  state: {
    addRouters: null, // 动态添加的路由表
    router: constantRouterMap // 静态路由表或和动态路由表合并后的总路由表
  },

  mutations: {
    SET_ROUTERS: (state, {addRoutes, routerRawData}) => {
      state.addRouters = addRoutes
      state.router = constantRouterMap.concat(addRoutes)
      // set session router
      routerRawData && setSession(ZVP_USER_PERMISSION_ROUTERS, routerRawData)
    },
    RESET_ROUTERS: (state, router) => {
      state.addRouters = null
      state.router = constantRouterMap
      // remove session router
      removeSession(ZVP_USER_PERMISSION_ROUTERS)
    }
  },

  actions: {
    generateRouters: ({ commit }, roles) => {
      // 获取静态路由
      if (Vue.useStaticRouter) {
        return new Promise((resolve, reject) => {
          // 这里通过权限来过滤出该权限所拥有的动态路由表,然后再SET_ROUTERS
          const addRoutes = filterAsyncRoutes(aysncRoutesMap, roles)
          commit('SET_ROUTERS', {addRoutes, routerRawData: null})
          resolve()
        })
      // 获取动态路由
      } else {
        /**
         * 检查sessionStorage是否包含路由信息
         * 取出数据并重构成路由表对象存入
         */
        const routerRawData = getSession(ZVP_USER_PERMISSION_ROUTERS)
        if (routerRawData) {
          return new Promise(resolve => {
            const addRoutes = generateNewRoutes(routerRawData)
            commit('SET_ROUTERS', {addRoutes, routerRawData})
            resolve()
          })
        } else {
        // 动态读取数据,构建路由表,这里可以后端通过传入用户ID来获取对应的路由表
          return getGenerateRoutes({userRoles: roles}).then(routerRawData => {
            const addRoutes = generateNewRoutes(routerRawData)
            commit('SET_ROUTERS', {addRoutes, routerRawData})
          })
        }
      }
    }
  }

}

export default asyncRouter

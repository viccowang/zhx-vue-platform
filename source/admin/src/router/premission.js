import { router } from './index'
import { getToken } from '@/utils/auth'
import store from '@/store'

const whiteList = ['/login']

/**
 * TODO: 应该将超管独立出去
 * @param {*} roles
 * @param {*} hasMetaRole
 */
function hasPermession (roles, hasMetaRole) {
  // admin is the super user
  if (roles.indexOf('admin') >= 0) return true
  // 跳转路由不包含meta.role,则表示不需要验证权限
  if (!hasMetaRole) return true
  // 跳转路由需要的权限是否与当前用户所拥有权限匹配
  return roles.some(role => hasMetaRole.indexOf(role) >= 0)
}

// premissions
// 简单登录的验证
// 这里后面挂权限,生成权限路由表
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else {
      /**
       * 首次进入系统，刷新页面会需要重新获取用户权限信息
       * 如果没有获取到当前用户的权限数据则需要远程获取用户权限
       */
      if (!store.getters.roles) {
        // 获取权限列表
        store.dispatch('getUserInfo').then(res => {
          // 根据获取到的用户权限来构建动态路由表,或者做其他事情;
          store.dispatch('generateRouters', res.data.roles)
            .then((res) => {
              router.addRoutes(store.getters.addRouters)
              // 每次刷新页面都回到dash页面
              if (to.path !== '/dash') {
                next({ path: '/', replace: true })
              } else {
                next({ ...to, replace: true })
              }
            })
        })
      } else {
        // 判断 超管或其他超级用户
        if (hasPermession(store.getters.roles, to.meta.role)) {
          next()
        } else {
          // 权限不够,跳转错误页面, 不留路由记录
          next({path: '/401', replace: true})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

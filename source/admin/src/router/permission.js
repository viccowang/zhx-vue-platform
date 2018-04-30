import { router } from './index'
import { getToken } from '@/utils/auth'
import store from '@/store'

const whiteList = ['/login']

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
        // TODO 还没有权限部分 获取权限列表
        store.dispatch('getUserInfo').then(res => {
          // 根据获取到的用户权限来构建动态路由表,或者做其他事情;
          store.dispatch('generateRouters', res.roles)
            .then(() => {
              router.addRoutes(store.getters.addRouters)
              // 每次刷新页面都回到dash页面
              if (to.path !== '/dash') {
                next({ path: '/', replace: true })
              } else {
                next({ ...to, replace: true })
              }
            })
        })
      // 未刷新页面,在系统中跳转路由
      } else {
        if (to.name === null) {
          next({path: '*', replace: true})
        } else {
          next()
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
  // 在切换路由时,为了保证不出现忘记回复窗口大小导致看不到标签页问题
  if (store.getters.windowMaxState) {
    store.dispatch('maxWindow', false)
  }
})

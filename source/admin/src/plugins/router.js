import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/router/staticRoutes'
import { routerBeforeEachFunc } from '@/config/interceptors/router'
//
Vue.use(Router)
// 实例化路由
const routerInstance = new Router({
  routes: constantRouterMap
})
// 路由注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)

export default routerInstance

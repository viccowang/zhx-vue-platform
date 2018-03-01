import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './routes/staticRoutes'

Vue.use(Router)

export const router = new Router({
  routes: constantRouterMap
})

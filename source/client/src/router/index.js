import Vue from 'vue'
import Router from 'vue-router'
// import modules
import Home from '@/components/home/home'
import History from '@/components/history/history'
import Project from '@/components/project/project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    }
  ]
})

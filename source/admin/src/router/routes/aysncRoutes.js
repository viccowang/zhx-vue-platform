import Layout from '@/views/Layout'

const _import_ = file => () => import('@/views/' + file + '.vue')
/**
 * 权限路由表, 判断依据了获取到的权限;
 */
export const aysncRoutesMap = [
  {
    path: '/demo',
    component: Layout,
    meta: { title: 'Demo', icon: 'el-icon-news', role: ['user'] },
    children: [
      {
        path: 'demo-list',
        name: 'DemoList',
        component: _import_('DemoList/index'),
        meta: { title: 'demoList', icon: 'el-icon-service' }
      },
      {
        path: 'demo-chart',
        name: 'DemoChart',
        component: _import_('DemoChart/index'),
        meta: { title: 'demoChart', icon: 'el-icon-date' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    meta: { role: ['admin'] },
    children: [
      {
        path: 'user-list',
        name: 'UserList',
        component: _import_('Manage/UserList/index'),
        meta: { title: 'userList', icon: 'el-icon-service' }
      }
    ]
  }
]

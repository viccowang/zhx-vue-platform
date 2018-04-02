import Layout from '@/views/Layout'

const _import_ = file => () => import('@/views/' + file + '.vue')
/*
 * 静态异步加载路由,
 * 任何人都会拥有的可使用路由表
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: _import_('Login/index'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/dash',
    children: [
      {
        path: 'dash',
        name: 'Dashboard',
        component: _import_('Dashboard/index'),
        meta: { title: '主页', icon: 'zvpfont icon-home', noCache: false } }
    ]
  },
  {
    path: '/modify-password',
    component: _import_('Layout/Components/ModifyPassword/index'),
    hidden: true,
    meta: { title: '修改密码', icon: 'zvpfont icon-home', noCache: true }
  },
  { path: '/401', component: _import_('others/401'), hidden: true },
  { path: '*', component: _import_('others/404'), hidden: true }
]

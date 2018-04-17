import Layout from '@/views/Layout'

const _import_ = file => () => import('@/views/' + file + '.vue')
/**
 * 权限路由表, 判断依据了获取到的权限;
 */
export const aysncRoutesMap = [
  {
    path: '/form',
    component: Layout,
    meta: { title: 'Form', icon: 'el-icon-news', role: ['user'] },
    children: [
      {
        path: 'table-list',
        name: 'TableList',
        component: _import_('Form/List/index'),
        meta: { title: 'Table List', icon: 'el-icon-service' }
      },
      {
        path: 'nextpage',
        name: 'NextPage',
        component: _import_('Form/NextPage/index'),
        meta: { title: 'NextPage', icon: 'el-icon-service' }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    meta: { title: 'Charts', icon: 'el-icon-news', role: ['user'] },
    children: [
      {
        path: 'echart',
        name: 'Charts',
        component: _import_('Charts/index'),
        meta: { title: 'chart', icon: 'el-icon-service' }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    meta: { title: 'Map', icon: 'el-icon-news', role: ['user'] },
    children: [
      {
        path: 'bmap',
        name: 'BaiduMapCom',
        component: _import_('Map/BaiduMap/index'),
        meta: { title: 'baidu Map', icon: 'el-icon-service' }
      },
      {
        path: 'heat-map',
        name: 'HeatMap',
        component: _import_('Map/HeatMap/index'),
        meta: { title: 'Heat Map', icon: 'el-icon-service' }
      }
    ]
  }
]

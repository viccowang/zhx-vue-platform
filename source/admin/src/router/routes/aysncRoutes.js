import Layout from '@/views/Layout'

const _import_ = file => () => import('@/views/' + file + '.vue')
/**
 * 静态路由表配置
 *
 * 可根据{role}字段来模拟权限访问. 用户登录后必须含有{role}字段, 与之匹配的路由会被最终过滤出来供访问.
 * 不匹配的则不会包含在内.
 * 具体字段表说明可以访问平台文档查看详细资料.
 */
export const aysncRoutesMap = [
  {
    path: '/form',
    component: Layout,
    meta: { title: 'Form', icon: 'zvpfont icon-orderform', role: ['admin'] },
    children: [
      {
        path: 'table-list',
        name: 'TableList',
        component: _import_('Form/List/index'),
        meta: { title: 'Table List', icon: 'zvpfont icon-menu-list' }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    meta: { title: 'Charts', icon: 'zvpfont icon-chart2', role: ['user'] },
    children: [
      {
        path: 'echart',
        name: 'Charts',
        component: _import_('Charts/index'),
        meta: { title: 'Chart', icon: 'zvpfont icon-chart2' }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    meta: { title: 'Video', icon: 'zvpfont icon-video', role: ['user'] },
    children: [
      {
        path: '',
        name: 'VideoPlayer',
        component: _import_('Video/index'),
        meta: { title: 'Video', icon: 'zvpfont icon-video' }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    meta: { title: 'Map', icon: 'zvpfont icon-map', role: ['user'] },
    children: [
      {
        path: 'bmap',
        name: 'BaiduMapCom',
        component: _import_('Map/BaiduMap/index'),
        meta: { title: 'Baidu Map', icon: 'zvpfont icon-dizhi1' }
      },
      {
        path: 'heat-map',
        name: 'HeatMap',
        component: _import_('Map/HeatMap/index'),
        meta: { title: 'Heat Map', icon: 'zvpfont icon-icheatmap' }
      }
    ]
  },
  {
    path: '/utils',
    component: Layout,
    meta: { title: 'Utils', icon: 'zvpfont icon-tools', role: ['user'] },
    children: [
      {
        path: 'nextpage',
        name: 'NextPage',
        component: _import_('Utils/NextPage/index'),
        meta: { title: 'NextPage', icon: 'zvpfont icon-page' }
      },
      {
        path: 'contextmenu',
        name: 'Contextmenu',
        component: _import_('Utils/Contextmenu/index'),
        meta: { title: 'Contextmenu', icon: 'zvpfont icon-menu3caidan3' }
      }
    ]
  }
]

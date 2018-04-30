import Layout from '@/views/Layout'

const _import_ = file => () => import('@/views/' + file + '.vue')
/**
 * 静态路由表配置,
 * 在这里配置业务路由表
 *
 * PS: 请勿修改 导出的路由名称, 只需要填写路由即可. 如果有任何疑问可以参考平台说明文档.
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

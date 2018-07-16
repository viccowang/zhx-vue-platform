/**
 *
 */

export const platformApi = {
  menu: [
    {
      name: 'list',
      method: 'POST',
      path: '/menu/list',
      mockPath: '/menu/list',
      params: {
        role: []
      },
      desc: '获取菜单列表'
    },
    {
      name: 'heatmapstart',
      method: 'POST',
      path: '/temp/heatmap-start',
      mockPath: '/temp/heatmap-start',
      params: {},
      desc: '热力图（临时）'
    },
    {
      name: 'heatmapend',
      method: 'POST',
      path: '/temp/heatmap-end',
      mockPath: '/temp/heatmap-end',
      params: {},
      desc: '热力图（临时）'
    }
  ]
}

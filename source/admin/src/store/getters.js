const getters = {
  // 平台
  sidebarState: state => state.plateform.sidebarState,
  // 用户
  userName: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // 路由
  addRouters: state => state.asyncRouter.addRouters,
  asyncRouter: state => state.asyncRouter.router,
  // 页面
  cachedViews: state => state.views.cachedViews,
  visitedViews: state => state.views.visitedViews
}

export default getters

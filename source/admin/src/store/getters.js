const getters = {
  // 平台
  systemTheme: state => state.plateform.systemTheme,
  shortcutMenu: state => state.plateform.shortcutMenu,
  sidebarState: state => state.plateform.sidebarState,
  windowMaxState: state => state.plateform.windowMaxState,
  headerHeight: state => state.plateform.headerHeight,
  tagTabHeight: state => state.plateform.tagTabHeight,
  // 用户
  userAccount: state => state.user.userAccount,
  userName: state => state.user.userName,
  userId: state => state.user.userId,
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

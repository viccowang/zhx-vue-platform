const getters = {
  //
  userName: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.asyncRouter.addRouters,
  asyncRouter: state => state.asyncRouter.router,
  cachedViews: state => state.views.cachedViews,
  visitedViews: state => state.views.visitedViews
}

export default getters

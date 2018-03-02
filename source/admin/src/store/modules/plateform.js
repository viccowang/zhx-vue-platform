import Cookie from 'vue-cookie'

const plateform = {
  state: {
    sidebarState: {
      isOpen: Cookie.get('ZVP_sidebar_state') === 'true', // 边栏折叠状态
      width: Cookie.get('ZVP_sidebar_state') === 'true' ? '180px' : '64px' // 边栏宽度,elementUI 折叠变量为64px
    }
  },

  mutations: {
    //
    SET_COLLAPSE_SIDEBAR (state, sidebarStatus) {
      state.sidebarState.isOpen = sidebarStatus
      state.sidebarState.width = sidebarStatus ? '180px' : '64px'
      Cookie.set('ZVP_sidebar_state', sidebarStatus)
    }
  },

  actions: {
    collapseSidebar ({ commit }, sidebarStatus) {
      commit('SET_COLLAPSE_SIDEBAR', sidebarStatus)
    }
  }
}

export default plateform

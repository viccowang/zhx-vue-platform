import Cookie from 'vue-cookie'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'

const SIDEBAR_EXPANDED_WIDTH = '180px' // 展开宽度
const SIDEBAR_COLLAPSED_WIDTH = '60px' // 折叠宽度
const HEADER_HEIGHT = '35px'
const TAGTAB_HEIGHT = '30px'

const plateform = {
  state: {
    sidebarState: {
      isOpen: Cookie.get(`${BASE_PER_FIX_KEY}_sidebar_state`) === 'true', // 边栏折叠状态
      width: Cookie.get(`${BASE_PER_FIX_KEY}_sidebar_state`) === 'true' ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH // 边栏宽度,elementUI 折叠变量为64px
    },
    windowMaxState: false,
    headerHeight: HEADER_HEIGHT,
    tagTabHeight: TAGTAB_HEIGHT
  },

  mutations: {
    //
    SET_COLLAPSE_SIDEBAR (state, sidebarStatus) {
      state.sidebarState.isOpen = sidebarStatus
      state.sidebarState.width = sidebarStatus ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH
      Cookie.set(`${BASE_PER_FIX_KEY}_sidebar_state`, sidebarStatus, 60)
    },
    //
    SET_WINDOW_MAXIMIZE (state, isMaxWindow) {
      state.windowMaxState = isMaxWindow
    }
  },

  actions: {
    collapseSidebar ({ commit }, sidebarStatus) {
      commit('SET_COLLAPSE_SIDEBAR', sidebarStatus)
    },
    maxWindow ({ commit }, isMaxWindow) {
      commit('SET_WINDOW_MAXIMIZE', isMaxWindow)
    }
  }
}

export default plateform

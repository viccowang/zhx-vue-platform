import Cookie from 'vue-cookie'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'
import { setLocalStorage, getLocalStorage } from '@/utils/session'
import { Message } from 'element-ui'

const SIDEBAR_EXPANDED_WIDTH = '180px' // 展开宽度
const SIDEBAR_COLLAPSED_WIDTH = '60px' // 折叠宽度
const HEADER_HEIGHT = '35px' // 头部(header)高度
const TAGTAB_HEIGHT = '30px' // 标签页(tagTabs)高度
// 侧边栏隐藏状态
const SIDEBAR_HIDDEN_STATE = Cookie.get(`${BASE_PER_FIX_KEY}_sidebar_hidden_state`)
// 侧边栏折叠状态
const SIDEBAR_OPEN_STATE = Cookie.get(`${BASE_PER_FIX_KEY}_sidebar_open_state`)

const plateform = {
  state: {
    sidebarState: {
      isHidden: SIDEBAR_HIDDEN_STATE === 'true',
      isOpen: SIDEBAR_OPEN_STATE === 'true', // 边栏折叠状态
      width: SIDEBAR_HIDDEN_STATE === 'true' ? '0px'
        : SIDEBAR_OPEN_STATE === 'true' ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH // 边栏宽度,elementUI 折叠变量为64px
    },
    systemTheme: Cookie.get(`${BASE_PER_FIX_KEY}_SYSTEM_THEME`) || 'chalk',
    shortcutMenu: getLocalStorage(`${BASE_PER_FIX_KEY}_shortcut_menu`) || [], // 自定义菜单项,由用户自定义出的菜单项
    windowMaxState: false, // 最大化操作区域(因此顶部header)的显示状态,该属性一般在展示地图等时使用
    headerHeight: HEADER_HEIGHT, // 头部(header)高度
    tagTabHeight: TAGTAB_HEIGHT //  标签页(tagTabs)高度
  },

  mutations: {
    // 设置侧边栏折叠
    SET_COLLAPSE_SIDEBAR (state, sidebarStatus) {
      state.sidebarState.isOpen = sidebarStatus
      state.sidebarState.width = sidebarStatus ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH
      Cookie.set(`${BASE_PER_FIX_KEY}_sidebar_open_state`, sidebarStatus, 60)
    },
    // 设置侧边栏隐藏
    SET_HIDDEN_SIDEBAR (state, isHidden) {
      state.sidebarState.isHidden = isHidden
      // 为了保证隐藏动效,这里设置sidebar隐藏后的宽度
      // 这里因为计算的原因,必须保证为 {string} 0px, 请勿修改成 {number} 0
      state.sidebarState.width = isHidden ? '0px' : SIDEBAR_OPEN_STATE === 'true' ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH
      Cookie.set(`${BASE_PER_FIX_KEY}_sidebar_hidden_state`, isHidden, 1000)
    },
    // 添加快捷菜单
    ADD_SHORTCUTMENU (state, menuItem) {
      if (!state.shortcutMenu || state.shortcutMenu.some(menu => menu.name === menuItem.name)) return
      if (state.shortcutMenu.length > 15) {
        return Message({
          message: `已添加满了,请移除不必要的菜单后再尝试添加.`,
          type: 'warning',
          duration: 5000
        })
      }
      state.shortcutMenu.push(menuItem)
      setLocalStorage(`${BASE_PER_FIX_KEY}_shortcut_menu`, state.shortcutMenu)
    },
    // 移除快捷菜单
    REMOVE_SHORTCUTMENU (state, menuItem) {
      state.shortcutMenu = state.shortcutMenu.filter(menu => menu.name !== menuItem.name)
      setLocalStorage(`${BASE_PER_FIX_KEY}_shortcut_menu`, state.shortcutMenu)
    },
    // 设置最大化操作区域(隐藏顶部)
    SET_WINDOW_MAXIMIZE (state, isMaxWindow) {
      state.windowMaxState = isMaxWindow
    },
    // 设置主题
    SET_THEME (state, theme) {
      state.systemTheme = theme
    }
  },

  actions: {
    collapseSidebar ({ commit }, sidebarStatus) {
      commit('SET_COLLAPSE_SIDEBAR', sidebarStatus)
    },
    hideSidebar ({ commit }, isHidden) {
      commit('SET_HIDDEN_SIDEBAR', isHidden)
    },
    addShortcutMenu ({ commit }, menuItem) {
      commit('ADD_SHORTCUTMENU', menuItem)
    },
    removeShortcutMenu ({ commit }, menuItem) {
      commit('REMOVE_SHORTCUTMENU', menuItem)
    },
    setTheme ({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    maxWindow ({ commit }, isMaxWindow) {
      commit('SET_WINDOW_MAXIMIZE', isMaxWindow)
    }
  }
}

export default plateform

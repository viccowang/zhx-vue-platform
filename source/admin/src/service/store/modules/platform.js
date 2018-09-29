import Cookie from 'vue-cookie'
import { setLocalStorage, getLocalStorage } from '@/service/expands/session'
import { Message } from 'element-ui'
import { PLATFORM_DEFAULT_CONFIG } from '@/config/settings'
import GLOBAL_CONST from '@/config/const'

// 侧边栏属性
const SIDEBAR_COLLAPSED_WIDTH = PLATFORM_DEFAULT_CONFIG.sidebar.minWidth // 折叠宽度
const SIDEBAR_EXPANDED_WIDTH = PLATFORM_DEFAULT_CONFIG.sidebar.maxWidth // 展开宽度
const HEADER_HEIGHT = PLATFORM_DEFAULT_CONFIG.header.height // 头部(header)高度
const TAGTAB_HEIGHT = PLATFORM_DEFAULT_CONFIG.header.tagBarHeight // 标签页(tagTabs)高度
// 侧边栏隐藏状态
const SIDEBAR_HIDDEN_STATE_KEY = GLOBAL_CONST.sidebar.isHiddenSideBarKey
const SIDEBAR_HIDDEN_STATE = Cookie.get(SIDEBAR_HIDDEN_STATE_KEY)
// 侧边栏折叠状态
const SIDEBAR_OPEN_KEY = GLOBAL_CONST.sidebar.isCollpasedSideBarKey
const SIDEBAR_OPEN_STATE = Cookie.get(SIDEBAR_OPEN_KEY)
// THEME
const SYSTEM_THEME_KEY = GLOBAL_CONST.systemTheme.systemThemeKey
// Shortcut
const SHORTCUT_MENU_KEY = GLOBAL_CONST.shortcut.shortcutKey

const platform = {
  state: {
    sidebarState: {
      isHidden: SIDEBAR_HIDDEN_STATE === 'true',
      isOpen: SIDEBAR_OPEN_STATE === 'true', // 边栏折叠状态
      width: SIDEBAR_HIDDEN_STATE === 'true' ? '0px'
        : SIDEBAR_OPEN_STATE === 'true' ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH // 边栏宽度,elementUI 折叠变量为64px
    },
    systemTheme: Cookie.get(SYSTEM_THEME_KEY) || 'chalk',
    shortcutMenu: getLocalStorage(SHORTCUT_MENU_KEY) || [], // 自定义菜单项,由用户自定义出的菜单项
    windowMaxState: false, // 最大化操作区域(因此顶部header)的显示状态,该属性一般在展示地图等时使用
    headerHeight: HEADER_HEIGHT, // 头部(header)高度
    tagTabHeight: TAGTAB_HEIGHT //  标签页(tagTabs)高度
  },

  mutations: {
    // 设置侧边栏折叠
    SET_COLLAPSE_SIDEBAR (state, sidebarStatus) {
      state.sidebarState.isOpen = sidebarStatus
      state.sidebarState.width = sidebarStatus ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH
      Cookie.set(SIDEBAR_OPEN_KEY, sidebarStatus, 60)
    },
    // 设置侧边栏隐藏
    SET_HIDDEN_SIDEBAR (state, isHidden) {
      state.sidebarState.isHidden = isHidden
      // 为了保证隐藏动效,这里设置sidebar隐藏后的宽度
      // 这里因为计算的原因,必须保证为 {string} 0px, 请勿修改成 {number} 0
      state.sidebarState.width = isHidden ? '0px' : SIDEBAR_OPEN_STATE === 'true' ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH
      Cookie.set(SIDEBAR_HIDDEN_STATE_KEY, isHidden, 1000)
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
      setLocalStorage(SHORTCUT_MENU_KEY, state.shortcutMenu)
    },
    // 移除快捷菜单
    REMOVE_SHORTCUTMENU (state, menuItem) {
      state.shortcutMenu = state.shortcutMenu.filter(menu => menu.name !== menuItem.name)
      setLocalStorage(SHORTCUT_MENU_KEY, state.shortcutMenu)
    },
    DRAGED_SHORTCUTS (state, items) {
      state.shortcutMenu = items
      setLocalStorage(SHORTCUT_MENU_KEY, state.shortcutMenu)
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
    dragedShortcuts ({ commit }, items) {
      commit('DRAGED_SHORTCUTS', items)
    },
    setTheme ({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    maxWindow ({ commit }, isMaxWindow) {
      commit('SET_WINDOW_MAXIMIZE', isMaxWindow)
    }
  }
}

export default platform

import { PLATFORM_PREFIX_NAME } from '../settings'

/**
 * 平台通用常量配置
 * =========================================
 * 这里的配置在每次项目创建后基本不会做任何修改。
 * =========================================
 * Author: Vicco Wang
 * Date: 2018.0622
 */
export default {
  // 侧边栏
  sidebar: {
    isHiddenSideBarKey: `${PLATFORM_PREFIX_NAME}_SIDEBAR_HIDDEN_STATE`,
    isCollpasedSideBarKey: `${PLATFORM_PREFIX_NAME}_SIDEBAR_COLLAPSED_STATE`
  },
  // 快捷菜单
  shortcut: {
    shortcutKey: `${PLATFORM_PREFIX_NAME}_SHORTCUT_MENU`
  },
  // TOKEN NAME
  token: {
    tokenKey: `${PLATFORM_PREFIX_NAME}_PLATFORM`
  },
  // ROUTER NAME
  router: {
    permissonRoutesKey: `${PLATFORM_PREFIX_NAME}_USER_PERMISSION_ROUTERS`
  },
  // SYSTEM THEME
  systemTheme: {
    theme: {
      chalk: '#409eff',
      jade: '#26A69A',
      batman: '#37474F',
      belles: '#F06292'
    },
    systemThemeKey: `${PLATFORM_PREFIX_NAME}_SYSTEM_THEME`
  }
}

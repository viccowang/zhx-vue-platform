import { PLATFORM_PERFIX_NAME } from '../settings'

export default {
  sidebar: {
    isHiddenSideBarKey: `${PLATFORM_PERFIX_NAME}_SIDEBAR_HIDDEN_STATE`,
    isCollpasedSideBarKey: `${PLATFORM_PERFIX_NAME}_SIDEBAR_COLLAPSED_STATE`
  },
  shortcut: {
    shortcutKey: `${PLATFORM_PERFIX_NAME}_SHORTCUT_MENU`
  },
  token: {
    tokenKey: `${PLATFORM_PERFIX_NAME}_PLATFORM`
  },
  router: {
    permissonRoutesKey: `${PLATFORM_PERFIX_NAME}_USER_PERMISSION_ROUTERS`
  },
  systemTheme: {
    theme: {
      chalk: '#409eff',
      jade: '#26A69A',
      batman: '#37474F',
      belles: '#F06292'
    },
    systemThemeKey: `${PLATFORM_PERFIX_NAME}_SYSTEM_THEME`
  }
}

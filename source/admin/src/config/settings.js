/**
 * Global Configurations
 *
 */

/**
  *
  */
export const PLATFORM_PERFIX_NAME = 'ZVP'

/**
  *
  */
export const API_DEFAULT_CONFIG = {
  mockBaseUrl: 'http://192.168.10.241:3000/mock/144',
  prodBaseUrl: '',
  isMocked: true,
  isDebug: false
}

/**
  *
  */
export const PLATEFORM_DEFAULT_CONFIG = {
  header: {
    height: '35px',
    tagBarHeight: '30px'
  },
  sidebar: {
    minWidth: '60px',
    maxWidth: '180px',
    isHiddenSideBarKey: `${PLATFORM_PERFIX_NAME}_SIDEBAR_HIDDEN_STATE`,
    isCollpasedSideBarKey: `${PLATFORM_PERFIX_NAME}_SIDEBAR_COLLAPSED_STATE`
  },
  shortcut: {
    shortcutKey: `${PLATFORM_PERFIX_NAME}_SHORTCUT_MENU`
  },
  productionTip: false
}

/**
  *
  */
export const TOKEN_DEFAULT_CONFIG = {
  tokenKey: `${PLATFORM_PERFIX_NAME}_PLATFORM`
}

/**
  *
  */
export const ROUTER_DEFAULT_CONFIG = {
  permissonRoutesKey: `${PLATFORM_PERFIX_NAME}_USER_PERMISSION_ROUTERS`,
  isUseStaticeRouter: true
}

/**
  *
  */
export const THEME_DEFAULT_CONFIG = {
  /**
 * 该对象用来配置个性化选项和一些ElementUI框架之外的样式,
 * 配置项的{key}要和主题包保持一致, {value}为主题主色
 * 自定义主题的色彩取自'static/elementUI'目录的主题包
 */
  theme: {
    chalk: '#409eff',
    jade: '#26A69A',
    batman: '#37474F',
    belles: '#F06292'
  },
  systemThemeKey: `${PLATFORM_PERFIX_NAME}_SYSTEM_THEME`
}

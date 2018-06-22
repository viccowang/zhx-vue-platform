/**
 * Load custom theme
 */
import Cookie from 'vue-cookie'
import GLOBAL_CONST from '@/config/const'

const SYSTEM_THEME_KEY = GLOBAL_CONST.systemTheme.systemThemeKey

/**
 * 根据主题名称动态配置当前系统主题包
 * @param {string} theme
 */
export function loadCurrentTheme (theme) {
  const cookieThemeName = Cookie.get(SYSTEM_THEME_KEY)
  const themePath = cookieThemeName
    ? `./static/elementUI/${cookieThemeName}`
    : `./static/elementUI/chalk`

  // 加在主样式表
  const head = document.getElementsByTagName('head')[0]
  let link = document.createElement('link')
  link.href = `${themePath}/index.css`
  link.rel = 'stylesheet'
  link.type = 'text/css'
  head.appendChild(link)

  // 加载覆盖样式表
  let baseLink = document.createElement('link')
  baseLink.href = `${themePath}/base.css`
  baseLink.rel = 'stylesheet'
  baseLink.type = 'text/css'
  head.appendChild(baseLink)
}

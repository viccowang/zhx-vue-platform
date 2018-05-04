/**
 * Load custom theme
 */
import Cookie from 'vue-cookie'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'

/**
 * 该对象用来配置个性化选项和一些ElementUI框架之外的样式,
 * 配置项的{key}要和主题包保持一致, {value}为主题主色
 * 自定义主题的色彩取自'static/elementUI'目录的主题包
 */
export const baseTheme = {
  'chalk': '#409eff',
  'jade': '#26A69A',
  'batman': '#37474F',
  'belles': '#F06292'
}

/**
 * 根据主题名称动态配置当前系统主题包
 * @param {string} theme
 */
export function loadCurrentTheme (theme) {
  const cookieThemeName = Cookie.get(`${BASE_PER_FIX_KEY}_SYSTEM_THEME`)
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

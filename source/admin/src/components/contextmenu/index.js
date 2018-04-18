import directive from './Directives'

import Contextmenu from './Components/Contextmenu.vue'
import ContextmenuItem from './Components/ContextmenuItem.vue'
import ContextmenuSubmenu from './Components/ContextmenuSubmenu.vue'
import ContextmenuGroup from './Components/ContextmenuGroup.vue'

import './Style/index.scss'
import './Style/font/iconfont.css'

export {
  directive,

  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
  ContextmenuGroup
}

export default {
  install (Vue) {
    Vue.directive('contextmenu', directive)

    Vue.component(Contextmenu.name, Contextmenu)
    Vue.component(ContextmenuItem.name, ContextmenuItem)
    Vue.component(ContextmenuSubmenu.name, ContextmenuSubmenu)
    Vue.component(ContextmenuGroup.name, ContextmenuGroup)
  }
}

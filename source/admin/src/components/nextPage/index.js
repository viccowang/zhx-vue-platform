import Vue from 'vue'
import Main from './nextpage.vue'
/**
 * NextPage Plugin
 * ver: 0.2
 * Author: Vicco Wang
 * Date: 2018.03.07
 *
 * usage:
 *
 */

let NEXTPAGE_CONSTRUCTOR = Vue.extend(Main)
let NEXTPAGES = [] // 所有添加到页面的Nextpage组件数组

/**
 * 创建NEXTPAGE组件,一个路由节点下只有一个NEXTPAGE组件
 * @param {*} options component options
 * @return Vue Component
 */
const __createNextPage = options => {
  let NextpageInstance = new NEXTPAGE_CONSTRUCTOR({
    data: options,
    component: {
      [options.component.name]: options.component
    }
  })
  return NextpageInstance
}

/**
 * 判断当前路由下是否已经创建过NEXTPAGE组件
 * @param {*} name
 */
const __hasCreated = name => {
  for (let i = 0, l = NEXTPAGES.length; i < l; i++) {
    const np = NEXTPAGES[i]
    if (np.currentRoute.name === name) return true
  }
  return false
}

/**
 * 根据路由名称获取对应的NEXTPAGE组件
 * @param {*} name
 */
const __getCurrentNextPage = name => {
  for (let i = 0, l = NEXTPAGES.length; i < l; i++) {
    const np = NEXTPAGES[i]
    if (np.currentRoute.name === name) return np
  }
}

/**
 * 根据路由名称移除特定的NEXTPAGE组件
 * @param {*} npInstance
 */
const __removeNextPage = npInstance => {
  for (let i = 0, l = NEXTPAGES.length; i < l; i++) {
    const np = NEXTPAGES[i]
    if (np.currentRoute.name === npInstance.currentRoute.name) {
      NEXTPAGES.splice(i, 1)
      break
    }
  }
}

/**
 * 移除某个NEXTPAGE组件中定义的自定义Component
 * @param {*} name
 * @param {*} nextPages
 */
const __removeNextPageComponentByName = (name, nextPages) => {
  for (let i = 0, l = nextPages.length; i < l; i++) {
    const np = nextPages[i]
    if (np.name === name) {
      nextPages.splice(i, 1)
      break
    }
  }
}

/**
 * 异步加载NextPage需要加载的Component
 * @param {*} userOptions
 */
const getUserComponentAsync = (userOptions) => {
  return new Promise((resolve, reject) => {
    if (typeof userOptions.component === 'function') {
      try {
        userOptions.component().then(res => {
          resolve(res.default)
        })
      } catch (e) {}
    } else {
      resolve(userOptions.component)
    }
  })
}

export default {
  install: (Vue, option) => {
    const defaultOptions = {
      cacheList: [],
      currentRoute: null,
      currentCrumb: null,
      nextPages: []
    }
    // 合并总配置项
    const mergeOptions = Object.assign({}, option, defaultOptions)
    // 创建组件
    Vue.prototype.$nextPage = (options) => {
      let NpInstance
      // console.log(mergeOptions.router.currentRoute)
      let userOptions = Object.assign({}, mergeOptions, options)
      if (!userOptions.router) {
        throw new Error('NextPage需要绑定router实例,Vue.use()时传入router实例.')
      }
      if (!userOptions.store) {
        throw new Error('NextPage需要绑定Store实例,Vue.use()时传入Store实例.')
      }
      //
      userOptions.currentRoute = userOptions.router.currentRoute

      getUserComponentAsync(userOptions).then(userComponent => {
      // 如果配置了需要缓存,则打开的该组件将会被缓存起来.
        if (userOptions.cache) userOptions.cacheList.push(userComponent.name)
        //
        userComponent.title = userOptions.title || '新建页面'

        // 为自定义组件添加一个关闭当前自定义组件的方法
        if (userComponent.methods === undefined) userComponent.methods = {}
        userComponent.methods.closeNextPage = (component) => {
          NpInstance.__closeNextPage(component.$options.name)
        }

        const routerName = userOptions.router.currentRoute.name
        // 每一个路由节点只能创建一个Nextpage组件;
        if (!__hasCreated(routerName)) {
        //
          NpInstance = __createNextPage(userOptions)
          //
          NpInstance.store = userOptions.store
          // 根据目前项目的路径挂载DOM
          document.getElementById('mainWrapper').childNodes[0].childNodes[0].appendChild(NpInstance.$mount().$el)
          NEXTPAGES.push(NpInstance)
        } else {
        //
          NpInstance = __getCurrentNextPage(routerName)
          NpInstance = Object.assign(NpInstance, userOptions)
        }

        NpInstance.nextPages.push(userComponent)

        // 关闭当前Nextpage下的特定自定义组件
        NpInstance.__closeNextPage = (name) => {
          __removeNextPageComponentByName(name, NpInstance.nextPages)
          if (NpInstance.nextPages.length) {
          // 最后一个组件
            const lastNpInstance = NpInstance.nextPages[ NpInstance.nextPages.length - 1 ]
            NpInstance.component = lastNpInstance
          } else {
          // 如果移除当前组件后数组中没有组件了,则移除NextPage
            try {
              NpInstance.destroyNextPage()
              // 如果该NEXTPAGE下没有打开的组件了,则移除该NEXTPAGE组件
              __removeNextPage(NpInstance)
            } catch (e) {}
          }
        }

        // 通过面包屑关闭多个或单个自定义组件
        NpInstance.__closeNextPageComponentsByCrumb = (name) => {
          let sliceNextPages = []
          // 如果关闭的是顶级结点(面包屑的首个),则会关闭所有NEXTPAGE下的component
          if (name === NpInstance.currentRoute.name) {
            sliceNextPages = NpInstance.nextPages.concat()
          } else {
          // 遍历出哪些自定义组件需要移除
            for (let i = 0, l = NpInstance.nextPages.length; i < l; i++) {
              let np = NpInstance.nextPages[i]
              if (np.name === name) {
                sliceNextPages = NpInstance.nextPages.slice(i + 1)
              }
            }
          }
          // 移除所有待移除自定义组件
          for (let i = 0, l = sliceNextPages.length; i < l; i++) {
            let np = sliceNextPages[i]
            NpInstance.__closeNextPage(np.name)
          }
        }
      })
    }
  }
}

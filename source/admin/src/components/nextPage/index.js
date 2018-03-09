import Vue from 'vue'
import Main from './nextpage.vue'

let NextPageConstructor = Vue.extend(Main)

let Nextpages = [] // 所有添加到页面的Nextpage组件数组
let Idseed = 1 // 一个自增的ID
let zIndex = 100 // Nextpage的层级,每次添加都会递增
// 通用关闭方法
let __closeNextPage = (id) => {
  for (let i = 0, l = Nextpages.length; i < l; i++) {
    if (Nextpages[i].id === id) {
      try {
        // 调用实例组件的移除方法
        Nextpages[i].component.destroyNextPage.call(this)
      } catch (e) {}
      Nextpages.splice(i, 1)
      zIndex--
      break
    }
  }
}

/**
 * NextPage Plugin
 * ver: 0.1
 * Author: Vicco Wang
 * Date: 2018.03.07
 *
 * @param {any} Vue
 * @param {any} option
 * @returns
 */
export default {
  install: (Vue, option) => {
    const defaultOptions = {
      props: [],
      currentCrumb: null,
      nextPages: [],
      component: null // 需要开启NextPage加载的组件对象
    }
    // 合并总配置项
    const mergeOptions = Object.assign({}, option, defaultOptions)
    // 创建组件
    Vue.prototype.$nextPage = (options) => {
      // 给NextPage配置一个ID,用于遍历
      let id = `nextpage_${Idseed++}`
      // 合并用户自定义配置项,
      options = Object.assign({}, mergeOptions, options || {})
      /**
       * 给NexptPage需要加载的组件绑定一个关闭当前Nextpage方法
       */
      options.component.methods.closeNextPage = (com) => {
        if (com.$parent.id) {
          __closeNextPage(com.$parent.id)
        } else {
          console.warn('没有在当前组件的父组件中找到Nexpage的id')
        }
      }
      // 通过extend()构造器构造NextPage组件
      let NextpageInstance = new NextPageConstructor({
        data: options,
        components: {
          [options.component.name]: options.component
        }
      })
      // set id
      NextpageInstance.id = id
      // 将当前已添加的Nextpages数组给实例,这样可以在Nextpage实例中循环创建面包屑
      NextpageInstance.nextPages = Nextpages
      /**
       * 移除指定Id的Nextpage
       * @param {*} id
       */
      NextpageInstance.__closeNextPage = (id) => {
        __closeNextPage(id)
      }
      /**
       * 根据点击的面包屑来移除特定的 Nextpage,这里移除的是点击右侧全部的 Nextpage
       * @param {*} id
       */
      NextpageInstance.__closePageByCrumb = (id) => {
        let sliceNp = []
        for (let i = 0, l = Nextpages.length; i < l; i++) {
          if (Nextpages[i].id === id) {
            sliceNp = Nextpages.slice(i + 1)
            break
          }
        }
        // 关闭剩余所有NextPage
        for (let i = 0, l = sliceNp.length; i < l; i++) {
          __closeNextPage(sliceNp[i].id)
        }
      }
      /**
       * 移除全部的 Nextpage
       */
      NextpageInstance.__closeAllNextPage = () => {
        for (let i = 0, l = Nextpages.length; i < l; i++) {
          try {
            // 调用实例组件的移除方法
            Nextpages[i].component.destroyNextPage.call(this)
          } catch (e) {}
        }
        // 移除完毕后将数组清空
        Nextpages = []
        zIndex = 100
      }
      //
      NextpageInstance.vm = NextpageInstance.$mount()
      NextpageInstance.dom = NextpageInstance.vm.$el
      // hack 必须添加至指定DOM 的第一个DIV节点, 放在keep-alive 节点内
      document.getElementById('contentMain').childNodes[0].appendChild(NextpageInstance.dom)
      NextpageInstance.dom.style.zIndex = zIndex++
      // 每次添加完成后,将当前Nextpage组件添加进数组
      Nextpages.push({
        id: id,
        name: options.name,
        component: NextpageInstance
      })
    }
  }
}

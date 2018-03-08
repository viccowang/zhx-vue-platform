import Vue from 'vue'
import Main from './nextpage.vue'

let NextPageConstructor = Vue.extend(Main)

let Nextpage = {}
let Nextpages = []
let Idseed = 1
let zIndex = 1000

let closeNextPage = (id) => {
  for (let i = 0, l = Nextpages.length; i < l; i++) {
    if (Nextpages[i].id === id) {
      try {
        Nextpages[i].destroyNextPage.call(this)
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
    let defaultOptions = {
      props: [],
      component: null // 需要开启NextPage加载的组件对象
    }

    Vue.prototype.$nextPage = (options) => {
      // 给NextPage配置一个ID,用于遍历
      let id = `nextpage_${Idseed++}`
      // 合并用户配置项,
      options = Object.assign({}, defaultOptions, options || {})

      /**
       * 配置NexptPage需要加载的组件,绑定一些配置项
       */
      options.component.methods.closeNextPage = (com) => {
        if (com.$parent.id) {
          closeNextPage(com.$parent.id)
        } else {
          console.warn('没有在当前组件的父组件中找到Nexpage的id')
        }
      }

      // 通过extend()构造器构造NextPage组件
      Nextpage = new NextPageConstructor({
        data: options,
        components: {
          [options.component.name]: options.component
        }
      })
      // set id
      Nextpage.id = id
      // set close method
      Nextpage.closeNextPage = (id) => {
        closeNextPage(id)
      }

      Nextpage.vm = Nextpage.$mount()
      Nextpage.dom = Nextpage.vm.$el
      // hack 必须添加至指定DOM 的第一个DIV节点, 放在keep-alive 节点内
      document.getElementById('contentMain').childNodes[0].appendChild(Nextpage.dom)
      Nextpage.dom.style.zIndex = zIndex++

      Nextpages.push(Nextpage)
    }
  }
}

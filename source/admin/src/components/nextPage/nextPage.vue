<template>
  <div class="zhx-next-page"
  v-bind:style="{
    width: `calc(100% - ${this.sidebarState.width})`,
    height: `calc(100% - ${this.headerCmpHeight})`,
    top: headerCmpHeight,
    left: sidebarState.width }"
  >
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="closeNextPage(router.currentRoute.name)">{{rootCrumb}}</el-breadcrumb-item>
       <el-breadcrumb-item v-for="np in nextPages" :key="np.id" @click.native="closeNextPage(np.name)">{{np.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <VuePerfectScrollbar class="scroll-area" :settings="scrollOptions">
    <keep-alive :include="cacheList">
      <component :is="component" v-bind="props" class="main"></component>
    </keep-alive>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
// import eventBus from '@/components/eventBus'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'Nextpage',
  data () {
    return {
      props: null, // 给子组件传递的参数对象
      cacheList: [], // 需要缓存的组件名称
      currentRoute: null,
      rootCrumb: null,
      nextPages: [],
      viewList: [], // 对应 store.getters.visitedViews
      component: null,
      scrollOptions: {
        maxScrollbarLength: 500
      }
    }
  },
  computed: {
    headerCmpHeight: function () {
      return this.isMaxWin
        ? parseInt(this.tagTabHeight) + 'px'
        : parseInt(this.headerHeight) + parseInt(this.tagTabHeight) + 'px'
    }
  },
  watch: {
    // 监听store中的visitedViews来判断当前是否移除了Nextpage所在的页面,如果页面移除了,则自动销毁当前NextPage
    viewList: function (newVal, oldVal) {
      if (oldVal.length) {
        for (let i = 0, l = newVal.length; i < l; i++) {
          if (this.currentRoute) {
            if (newVal[i].name === this.currentRoute.name) return
          }
        }
        this.__closeNextPageComponentsByCrumb(this.currentRoute.name)
      }
    }
  },
  created () {
    this.currentRoute = this.router.currentRoute
    this.rootCrumb = this.router.currentRoute.meta.title
    this.viewList = this.store.getters.visitedViews

    this.sidebarState = this.store.getters.sidebarState
    this.headerHeight = this.store.getters.headerHeight
    this.tagTabHeight = this.store.getters.tagTabHeight
    this.isMaxWin = this.store.getters.windowMaxState
  },
  mounted () {
    // 监听如果当前navTab被关闭后, 当前NextPage组件需要同步销毁
    // TODO: 咱不使用该方式来监听是否销毁当前NextPage
    // eventBus.$on('plateform.navTab.removed', res => {
    //   if (res.removed.name === this.currentRoute.name) {
    //     this.__closeNextPageComponentsByCrumb(this.currentRoute.name)
    //     // $on并不会跟随组件一起销毁,需要自行移除
    //     eventBus.$off('plateform.navTab.removed')
    //   }
    // })
  },
  methods: {
    closeNextPage (name) {
      this.__closeNextPageComponentsByCrumb(name)
    },
    destroyNextPage () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  components: { VuePerfectScrollbar }
}
</script>

<style lang="scss">
.zhx-next-page {
    position:fixed;
    overflow:hidden;
    background:#fff;
    z-index:600;
    display:flex;
    flex-direction: column;
    transition: all .4s ease 0s;

    .breadcrumb{
      padding:10px;
      box-sizing: border-box;
      border-bottom:1px solid $base-light-color;
    }

    .main {
      flex:1;
      box-sizing: border-box;
    }

    .nextpage-button {
      position:relative;
      top:1px;
    }
}
</style>

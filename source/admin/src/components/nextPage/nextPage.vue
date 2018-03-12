<template>
  <div class="zhx-next-page" >
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="closeNextPage(router.currentRoute.name)">{{rootCrumb}}</el-breadcrumb-item>
       <el-breadcrumb-item v-for="np in nextPages" :key="np.id" @click.native="closeNextPage(np.name)">{{np.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <keep-alive :include="cacheList">
      <component :is="component" v-bind="props"></component>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'Nextpage',
  data () {
    return {
      props: null, // 给子组件传递的参数对象
      cacheList: [], // 需要缓存的组件名称
      currentRoute: null,
      rootCrumb: null,
      nextPages: [],
      component: null
    }
  },
  mounted () {
    this.rootCrumb = this.router.currentRoute.meta.title
  },
  methods: {
    closeNextPage (name) {
      this.__closeNextPageComponentsByCrumb(name)
    },
    destroyNextPage () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss">
.zhx-next-page {
    position:absolute;
    width:100%;
    height:100%;
    top:0;left:0;
    overflow:hidden;
    background:#fff;
    z-index:100;

    .breadcrumb{
      padding:10px;
      box-sizing: border-box;
      border-bottom:1px solid $base-light-color;
    }

    .nextpage-button {
      position:relative;
      top:1px;
    }
}
</style>

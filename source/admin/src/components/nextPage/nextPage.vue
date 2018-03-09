<template>
  <div class="zhx-next-page" >
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="closeAll">{{rootCrumb}}</el-breadcrumb-item>
       <el-breadcrumb-item v-for="np in nextPages" :key="np.id" @click.native="np.component.__closePageByCrumb(np.id)">{{np.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <component :is="component" v-bind="props">
        <el-button slot="button" @click="closeBySelf" size="small" icon="el-icon-arrow-left" class="nextpage-button">返回</el-button>
    </component>
  </div>
</template>

<script>

export default {
  name: 'Nextpage',
  data () {
    return {
      props: null, // 给子组件传递的参数对象
      rootCrumb: null,
      nextPages: [],
      component: null
    }
  },
  mounted () {
    this.rootCrumb = this.router.currentRoute.meta.title
  },
  methods: {
    closeBySelf () {
      // 插件方法
      this.__closeNextPage(this.id)
    },
    closeAll () {
      // 插件方法
      this.__closeAllNextPage()
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

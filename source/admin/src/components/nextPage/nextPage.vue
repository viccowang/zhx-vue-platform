<template>
  <div class="zhx-next-page" >
    <component :is="component" v-bind="data">
        <el-button slot="button" @click="closeBySelf" size="small" icon="el-icon-arrow-left" class="nextpage-button">返回</el-button>
    </component>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'Nextpage',
  data () {
    return {
      data: null,
      scrollOptions: {
        maxScrollbarLength: 500
      }
    }
  },
  methods: {
    closeBySelf () {
      this.closeNextPage(this.id)
    },
    destroyNextPage () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  components: {
    VuePerfectScrollbar
  }
}
</script>

<style lang="scss">
.zhx-next-page {
    position:absolute;
    width:100%;
    height:100%;
    top:0;left:0;
    overflow:auto;
    background:#fff;

    .nextpage-button {
      position:relative;
      top:1px;
    }
}
</style>

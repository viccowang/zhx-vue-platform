<template>
  <component :is="componentLoader" class="component-wrapper"/>
</template>
<script>
/**
 * Dynamic component loader
 * 动态加载预设组件;
 * 组件开发必须放在 Dashboard/Components/ 目录下
 */
export default {
  name: 'DynamicComponent',
  props: {
    com: {
      type: String,
      required: true
    }
  },
  computed: {
    componentLoader () {
      return () => import(`@/views/Dashboard/Components/${this.com}.vue`)
    }
  }
}
</script>
<style scoped>
.component-wrapper{
  flex:1 auto;
  width:100%;
  height:100%;
}
</style>

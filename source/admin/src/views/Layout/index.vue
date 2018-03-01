<template>
  <div class="layout">
    <sidebar :width="sidebarWidth"></sidebar>
    <div class="main-content" :style="{width: `calc(100% - ${sidebarWidth})`}">
      <headers></headers>
      <tag-tabs></tag-tabs>
      <app-main class="main-wrapper"></app-main>
    </div>
  </div>
</template>

<script>
import headers from './components/header'
import sidebar from './components/Sidebar'
import tagTabs from './components/tagTabs'
import appMain from './components/main'

export default {
  name: 'Layout',
  components: {
    headers,
    sidebar,
    tagTabs,
    appMain
  },
  data () {
    return {
      sidebarWidth: '180px'
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  display:flex;
  width:100%;
  height:100%;

  .main-content{
      display: inherit;
      flex-direction: column;

      .main-wrapper{
        flex:1;
      }
  }
}
</style>

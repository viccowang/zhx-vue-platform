<template>
  <div class="layout">
    <sidebar></sidebar>
    <div class="main-content" :style="{width: `calc(100% - ${sidebarState.width})`}">
      <headers></headers>
      <tag-tabs></tag-tabs>
      <app-main class="main-wrapper" id="mainWrapper"></app-main>
    </div>
  </div>
</template>

<script>
import headers from './Components/header'
import sidebar from './Components/Sidebar'
import tagTabs from './Components/tagTabs'
import appMain from './Components/main'

import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    headers,
    sidebar,
    tagTabs,
    appMain
  },
  computed: {
    ...mapGetters(['sidebarState'])
  }
}
</script>

<style lang="scss">
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

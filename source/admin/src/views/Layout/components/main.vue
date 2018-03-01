<template>
    <!-- custom scroll bar for main area -->
    <VuePerfectScrollbar class="scroll-area" :settings="scrollOptions">
        <el-main class="main">
          <keep-alive :include="cachedViews">
            <router-view />
          </keep-alive>
        </el-main>
    </VuePerfectScrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'Main',
  data () {
    return {
      scrollOptions: {
        maxScrollbarLength: 500
      }
    }
  },
  computed: {
    ...mapGetters(['cachedViews'])
  },
  components: {
    VuePerfectScrollbar
  }
}
</script>

<style lang="scss" scoped>
.scroll-area{
    width:100%;

    .main {
      padding:0;
    }

}
</style>

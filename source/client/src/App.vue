<template>
  <div id="app">
    <VuePerfectScrollbar class="scroll-area" :settings="scrollOptions">
      <div class="app-wrapper">
        <system-header></system-header>
        <div class="main">
          <router-view></router-view>
        </div>
        <system-footer></system-footer>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'App',
  data () {
    return {
      scrollOptions: {
        maxScrollbarLength: 500
      }
    }
  },
  components: {
    'system-header': Header,
    'system-footer': Footer,
    VuePerfectScrollbar
  }
}
</script>

<style lang="scss">

html,body{
  padding:0;
  margin:0;
  height:100%;
  font-size:12px;
  font-family: "Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft Yahei", "STXihei" !important;
  overflow: hidden;

  ul,li{
    list-style:none;
    padding:0;
    margin:0;
  }

  #app {
    height:100%;

    .app-wrapper{
      height:100vh;

      .main{
        display: inherit;
        justify-content: center;
        flex-direction: column;
      }

    }

  }
}
</style>

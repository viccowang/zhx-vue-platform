<template>
    <router-view />
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'App',
  created () {
    this.initGlobalEvents()
  },
  methods: {
    initGlobalEvents () {
      window.$GLOBAL.$eventBus.$on('global.message.show', (msg, callback) => {
        MessageBox.alert(msg, '提醒', {
          confirmButtonText: '确定',
          callback: () => { callback() }
        })
      })
    }
  }
}
</script>

<style lang="scss">
html,body {
    padding:0;
    margin:0;
    height:100%;
    font-size:12px;
    font-family: "Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft Yahei", "STXihei" !important;
    overflow: hidden;

    ul,li {
        padding:0;
        margin:0;
        list-style:none;
    }
}
</style>

<template>
  <div class="scroll-wrapper" ref="scrollContainer" @wheel.prevent="handelScroll">
      <!-- <div class="handle handle-left el-icon-arrow-left" :style="{width: handleWidth + 'px'}" @click="scrollTo('left')"></div> -->
      <div class="scroll-content" ref="scrollWrapper" :style="{left: left + 'px'}">
        <slot></slot>
      </div>
      <!-- <div class="handle handle-right el-icon-arrow-right" v-show="isShowHandle" :style="{width: handleWidth + 'px'}" @click="scrollTo('right')"></div> -->
  </div>
</template>

<script>
export default {
  name: 'scrollPane',
  data () {
    return {
      handleWidth: 35,
      left: 0
    }
  },
  computed: {
    isShowHandle () {
      return false
    }
  },
  methods: {
    handelScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 4 // 滚动距离
      const container = this.$refs.scrollContainer // 外容器
      const containerWidth = container.offsetWidth // 外容器宽度
      const wrapper = this.$refs.scrollWrapper // 滚动区域
      const wrapperWidth = wrapper.offsetWidth // 滚动区域宽度

      // scroll to right +
      if (eventDelta > 10) {
        this.left = Math.min(0, this.left + eventDelta)
      // scroll to left -
      } else {
        // 可滚动区域溢出
        if (containerWidth < wrapperWidth) {
          if (this.left >= -(wrapperWidth - containerWidth)) {
            // containerWidth - wrapperWidth = 全部可滚动距离
            // this.left + eventDelta = 预计滚动后的距离
            this.left = Math.max(this.left + eventDelta, containerWidth - wrapperWidth)
          }
        // 可滚动区域不足以触发滚动或缩小至可滚动区域内
        } else {
          this.left = 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper{
    width:100%;
    height:100%;
    display: flex;
    overflow:hidden;
    position:relative;

    .scroll-content{
        flex:1;
        display:inherit;
        position:absolute;
        transition: all .5s ease 0s;
        z-index:1;
    }

    .handle{
        display: inherit;
        @include flexCenter;
        position:absolute;
        z-index:2;
        height:100%;
        background-color: $base-light-color;

        &.handle-left{ left: 0 }
        &.handle-right{ right: 0 }
    }

}
</style>

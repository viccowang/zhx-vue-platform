<template>
    <div class="common-table" :class="{'flex-table': flex}" :style="{height: flexGridHeight + 'px'}">
        <div :class="{'small-table': size === 'small'}">
            <slot name="table"></slot>
        </div>
        <div class="panination">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    size: {
      type: String,
      default: 'small'
    },
    flex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      flexGridHeight: document.documentElement.clientHeight - this.flex
    }
  },
  mounted () {
    // 如果配置了flex属性, 则在组件加载完成后配置一个reisze监听,保证表格的高度为动态计算
    if (this.flex !== 0) {
      const vm = this
      let timer = null
      window.onresize = () => {
        // 这里增加一个延迟保证不会触发频次不会太高,减少开销
        if (timer) return
        timer = setTimeout(() => {
          vm.flexGridHeight = document.documentElement.clientHeight - vm.flex
          timer = null
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss">
.common-table {

    &.flex-table {
        display: flex;
        flex-direction: column;
    }
    .small-table {
        width:100%;
        flex:1;
        display: inherit;
        thead th, tbody td { padding: 7px 0 !important; }
    }
    .panination {
        margin:5px 0;
        display: flex;
        flex:none;
        justify-content: flex-end;
    }

}
</style>

<template>
  <el-container class="content">
      <grid-layout
        :layout="layout"
        :column="columnSize"
        :row-height="itemRowHeight"
        :margin="itemMargin"
        @layout-updated="updateLayout"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          @resized="itemResize(item)"
          @moved="itemMoved(item)"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".no-drag"
        >
         <div class="item-main">
           <div class="vue-draggable-handle item-move-handle"><i class="zvpfont icon-circle-move"></i></div>
           <div class="item-remove-handle" @click="removeComponent(item)"><i class="zvpfont icon-circle-close"></i></div>
           <div class="item-content no-drag">
             <dynamic-component :com="item.component" />
           </div>
         </div>
        </grid-item>
      </grid-layout>
  </el-container>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import DynamicComponent from './DynamicComponent'
import EventBus from '@/components/eventBus'

import { layoutData } from '@/testData/layoutData'
// vue-grid-layout css
import './layout.scss'

export default {
  name: 'Dashboard',
  data () {
    return {
      // 布局数据
      layout: [],
      // 初始布局,用于判断布局是否有过变动
      initLayout: [],
      // 默认可配置的列数
      columnSize: 12,
      // 行高度(px),表示默认单行的高度,在数据队形中对应字段'h',
      // 如果配置了'h': 10, 则表示组件默认高度为300px
      itemRowHeight: 30,
      // 默认元素间距
      itemMargin: [10, 10]
    }
  },
  mounted () {
    this.initLayoutData()
  },
  methods: {
    initLayoutData () {
      this.layout = layoutData.filter(layout => layout.component)
      this.initLayout = Object.assign({}, this.layout)
      this.isShowLoading = false
    },
    // 当布局更新时,自动保存最新的布局
    updateLayout (newLayout) {
      // TODO: update remote data

    },
    itemResize (item) {
      EventBus.$emit('resized', item)
    },
    itemMoved (item) {
      EventBus.$emit('moved', item)
    },
    removeComponent (item) {
      this.$confirm(`是否要移除组件:${item.component}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.layout = this.layout.filter(ly => ly.component !== item.component)
        // 移除操作需要自触发
        this.updateLayout(this.layout)
      }).catch(() => { })
    }
  },
  components: { GridLayout, GridItem, DynamicComponent, EventBus }
}
</script>
<style lang="scss" scoped>
.content{

  .item-main {
    display: flex;
    width:100%; height:100%;
    position:relative;

    .item-title {
      position: absolute;
      z-index:10;
    }

    .item-content {
      flex:1;
      overflow: hidden;
    }
  }
}
</style>

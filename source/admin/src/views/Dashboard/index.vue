<template>
  <el-container class="content">
      <grid-layout
        :layout="layout"
        :column="columnSize"
        :row-height="itemRowHeight"
        :margin="itemMargin"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".no-drag"
        >
         <div class="item-main">
           <div class="vue-draggable-handle item-title"></div>
           <div class="item-content no-drag">
             {{item.i}}
           </div>
         </div>
        </grid-item>
      </grid-layout>
  </el-container>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import { layoutData } from './layoutData'

import './layout.scss'

export default {
  name: 'Dashboard',
  components: { GridLayout, GridItem },
  data () {
    return {
      // 布局数据
      layout: layoutData,
      // 一共可放置多少列
      columnSize: 12,
      // 行高度(px)
      itemRowHeight: 30,
      // 默认元素间距
      itemMargin: [10, 10]
    }
  }
}
</script>

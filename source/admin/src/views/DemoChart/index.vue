<template>
    <div>
       <h4>Demo Chart</h4>
       进行了页面缓存,noCache值为false <p/>
       该页面为动态增加自定义组件Demo <p/>
      <button @click="addChart('e-chart','barChar1Data')">Add Chart1</button>
      <button @click="addChart('e-chart','barChar2Data')">Add Chart2</button>
      <br>
      <echart-coms :charts="charts"/>
    </div>
</template>

<script>
import Vue from 'vue'
import echartComs from './echartComs'
import { Component } from 'vue-property-decorator' // 使用Class(类)的方式创建Vue实例需要引入该组件

@Component({
  components: { echartComs }
})
export default class DemoChart extends Vue {
  // initial Data()
  charts = []

  addChart (componentName, dataName) {
    this.charts.push({name: componentName, data: dataName})
  }
}
</script>

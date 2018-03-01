import Vue from 'vue'
import EChart from 'vue-echarts/components/Echarts'

import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'

import * as ChartData from './chartData'

export default Vue.component('echartComs', {
  props: {
    charts: Array
  },
  components: { EChart },
  // 使用 JSX 语法 渲染组件,依赖babel-plugin-transform-vue-jsx转换组件.该组件在使用vue-cli构建项目时默认开启
  render (h) {
    if (!this.charts.length) return <span style={{ display: 'inline-block', padding: '15px', color: 'red' }}>暂无图标数据</span>
    return h('div', this.charts.map(component => {
    // 使用标准vue 语法渲染组件
    //   return h(component.name, {
    //     props: {
    //       options: ChartData[component.data]
    //     }
    //   })
      return (
        <e-chart options={ChartData[component.data]} />
      )
    }))
  }
})

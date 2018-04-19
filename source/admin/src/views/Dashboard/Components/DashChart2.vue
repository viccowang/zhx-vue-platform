<template>
    <e-chart class="chart" :init-options="initOptions" :options="chartData" ref="chart2"></e-chart>
</template>

<script>

import EChart from 'vue-echarts/components/Echarts'
import EventBus from '@/components/eventBus'

import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'

import { barChar2Data } from '@/testData/chartData'

const COM_NAME = 'DashChart2'

export default {
  name: 'DashChart2',
  data () {
    return {
      chartData: null,
      initOptions: { }
    }
  },
  mounted () {
    this.chartData = barChar2Data
    window.addEventListener('resize', this.resizeChart)
    // watch and resize chart
    EventBus.$on('resize', item => {
      if (item.component === COM_NAME) this.resizeChart()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    resizeChart () {
      setTimeout(() => {
        this.$refs.chart2.resize()
      }, 100)
    }
  },
  components: { EChart, EventBus }
}
</script>
<style>
.chart {
    width:100%;
    height:100%;
  }
</style>

<template>
    <e-chart class="chart" :init-options="initOptions" :options="chartData" ref="chart3"></e-chart>
</template>

<script>

import EChart from 'vue-echarts/components/Echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'

import { barChar3Data } from '@/mock/chartData'

const COM_NAME = 'DashChart3'

export default {
  name: 'DashChart3',
  data () {
    return {
      chartData: null,
      initOptions: { }
    }
  },
  activated () {
    this.resizeChart()
  },
  watch: {
    '$store.state.Dashboard.operateItem': {
      handler (item) {
        if (item.component === COM_NAME) this.resizeChart()
      },
      deep: true
    }
  },
  mounted () {
    this.chartData = barChar3Data
    window.addEventListener('resized', this.resizeChart)
  },
  beforeDestroy () {
    window.removeEventListener('resized', this.resizeChart)
  },
  methods: {
    resizeChart () {
      setTimeout(() => {
        this.$refs.chart3.resize()
      }, 100)
    }
  },
  components: { EChart }
}
</script>
<style>
.chart {
    width:100%;
    height:100%;
  }
</style>

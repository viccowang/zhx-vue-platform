<template>
  <div class="chart-wrapper">
    <div class="chart-col">
        <e-chart class="chart" :init-options="initOptions" :options="chart1" ref="chart1"></e-chart>
    </div>
    <div class="chart-col">
        <e-chart class="chart" :init-options="initOptions" :options="chart2" ref="chart2"></e-chart>
    </div>
  </div>
</template>
<script>
import EChart from 'vue-echarts/components/Echarts'

import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'

import { barChar1Data, barChar2Data } from '@/testData/chartData'

export default {
  name: 'Charts',
  data () {
    return {
      chart1: null,
      chart2: null,
      initOptions: {
      }
    }
  },
  mounted () {
    this.chart1 = barChar1Data
    this.chart2 = barChar2Data
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    resizeChart () {
      setTimeout(() => {
        this.$refs.chart1.resize()
        this.$refs.chart2.resize()
      }, 100)
    }
  },
  components: { EChart }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  padding:20px;
  box-sizing: border-box;
  display: flex;

  .chart-col {
    width:50%;
    margin:15px;
    padding:5px;
    height:350px;
    box-sizing: border-box;
    overflow: hidden;

    .chart {
      width:100%;
      height:100%;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
  }
}

</style>

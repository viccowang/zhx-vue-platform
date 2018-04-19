<template>
    <baidu-map class="map"
    v-loading="isLoading"
    :ak="mapParams.ak"
    :center="mapParams.center"
    :zoom="mapParams.zoom"
    :scroll-wheel-zoom="false"
    @ready="initMap"
    >
      <bml-heatmap :data="data" :max="100" :radius="40"></bml-heatmap>
    </baidu-map>
</template>

<script>
import { BaiduMap, BmlHeatmap } from 'vue-baidu-map'

import { heatMapData } from '@/testData/heatmapData'

export default {
  name: 'HeatMap',
  data () {
    return {
      isLoading: true,
      mapParams: {
        center: {lng: 0, lat: 0},
        zoom: 10,
        ak: '7vVOlMOKr03PaWX82WajF6m'
      },
      data: []
    }
  },
  methods: {
    initMap ({ BMap, map }) {
      this.mapParams.center = {lng: 116.404, lat: 39.915}
      this.mapParams.zoom = 13
      this.getMapData()
    },
    getMapData () {
      setTimeout(() => {
        this.data = heatMapData
        this.isLoading = false
      }, 1500)
    }
  },
  components: { BaiduMap, BmlHeatmap }
}
</script>
<style scoped>
.map {
  width:100%;
  height:100%;
}
</style>

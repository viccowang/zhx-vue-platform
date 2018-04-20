<template>
    <baidu-map class="map"
    v-loading="isLoading"
    :ak="mapParams.ak"
    :center="mapParams.center"
    :zoom="mapParams.zoom"
    :scroll-wheel-zoom="false"
    @ready="initMap"
    ></baidu-map>
</template>

<script>
import { BaiduMap } from 'vue-baidu-map'

export default {
  name: 'BaiduMapCom',
  data () {
    return {
      isLoading: true,
      mapParams: {
        center: {lng: 0, lat: 0},
        zoom: 15,
        ak: '7vVOlMOKr03PaWX82WajF6m'
      }
    }
  },
  methods: {
    initMap ({ BMap, map }) {
      this.mapParams.center = '西安'
      this.mapParams.zoom = 15
      this.isLoading = false
    }
  },
  components: { BaiduMap }
}
</script>
<style scoped>
.map {
  width:100%;
  height:100%;
}
</style>

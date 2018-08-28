<template>
  <div class="container">
    <!-- <v-stage :config="stageConfig" ref="stage">
      <v-layer>
        <v-rect :config="rectConfig" ref="layer" />
      </v-layer>
    </v-stage> -->
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'LineGraph',

  data () {
    return {
      text: '',
      stageConfig: {
        width: 700,
        height: 700
      },
      rectConfig: {
        x: 50,
        y: 50,
        width: 300,
        height: 20,
        cornerRadius: 20,
        fill: 'green'
      }
    }
  },

  mounted () {
    // console.log(this.$refs.layer)
    // setTimeout(() => {
    //   this.$refs.layer.getStage().setWidth(500)
    //   this.$refs.layer.getStage().draw()
    //   console.log('draw')
    // }, 2000)
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  width:100%
}
</style>

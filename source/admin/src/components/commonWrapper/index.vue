<template>
  <div class="common-wrapper" v-bind:class="{'full': full}">
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CommonWrapper',
  props: {
    full: Boolean
  }
}
</script>
<style lang="scss" scoped>
.common-wrapper{
    padding:10px 10px 0 10px;
    margin:10px;
    box-sizing: border-box;
    border-radius:8px;
    border: 1px solid darken($base-light-color, 10%);

    &.full {
       padding:0 !important;
       border: none !important;
    }
}
</style>

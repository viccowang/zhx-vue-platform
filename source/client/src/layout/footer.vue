<template>
  <footer>
    Designed by Vicco.W © 2018
  </footer>
</template>

<script>
export default {
  name: 'system-footer'
}
</script>

<style lang="scss" scoped>
footer {
  height:100px;
  padding:10px;
  display: flex;
  @include flexCenter;
  box-sizing:border-box;
  background-color: $base-light-color;
  border-top:1px solid darken($base-light-color, 5%);
}
</style>

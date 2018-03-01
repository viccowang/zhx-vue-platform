<template>
    <transition name="el-zoom-in-top">
        <div class="search-wrapper section-content" v-if="isShow">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'CommonSearchWrapper',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper{
    position:absolute;
    padding:10px;
    margin:5px;
    width:calc(100% - 10px);
    box-sizing: border-box;
    border: 1px solid darken($base-light-color, 10%);
    border-radius: 8px;
    background-color: lighten($base-light-color, 100%);
    opacity:.95;
    box-shadow:0 5px 10px rgba(0,0,0,.10);
    z-index:10;
}
</style>

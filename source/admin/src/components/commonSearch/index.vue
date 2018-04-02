<template>
    <transition name="el-zoom-in-top">
        <div
         class="section-content search-wrapper-absolute"
         v-bind:class="{'search-wrapper': !isShow && isAbsolute}"
         v-show="(isShow && !isAbsolute) || (!isShow && isAbsolute)">
            <slot></slot>
        </div>
        <!-- <div class="search-wrapper section-content" v-if="!isShow && isAbsolute">
            <slot></slot>
        </div> -->
    </transition>
</template>

<script>
import CommonWrapper from '@/components/commonWrapper'

export default {
  name: 'CommonSearch',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isAbsolute: Boolean
  },
  components: { CommonWrapper }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
    padding:0 !important;
    position: static !important;
    box-shadow:none !important;
    border: none !important;
    border-radius:none !important;
    opacity:none !important;
}
.search-wrapper-absolute{
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

<template>
  <ul class="shortcut-menu-list">
      <li v-for="item in menu" :key="item.name" @click="goToMenu(item)" :class="{active: activeMenu.name === item.name }">
          <el-tooltip :content="item.meta.title" placement="bottom-start" :enterable="false">
            <span :class="item.meta.icon"></span>
          </el-tooltip>
          <i class="active-dot" :style="{background: systemThemeColor}"></i>
      </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import { baseTheme } from '@/utils/theme'

export default {
  name: 'HeaderShortcut',
  data () {
    return {
      activeMenu: null
    }
  },
  props: {
    menu: Array
  },
  computed: {
    ...mapGetters(['systemTheme']),
    systemThemeColor: function () {
      return baseTheme[this.systemTheme]
    }
  },
  watch: {
    $route: {
      handler (to, from) {
        this.activeMenu = to
      },
      immediate: true
    }
  },
  methods: {
    goToMenu (item) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>
<style lang="scss" scoped>
.shortcut-menu-list {
    width:100%;
    height:100%;
    padding:0;margin:0;
    display: flex;
    align-items: center;

    li {
      display: inherit;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
      background: lighten($base-light-color, 1%);
      border-right:1px solid darken($base-light-color, 8%);
      transition: all .1s ease-in-out 0s;

      span {
          display: inline-block;
          width:100%;height:100%;
          padding:8px 10px;
      }

      .active-dot {
        position:absolute;
        width:5px;height:5px;
        overflow: hidden;
        border-radius:10px;
        left:50%; margin-left:-2.5px;
        bottom: 2px;
        display: none;
      }

      &.active {
        .active-dot {
          display: block
        }

      }

      &:hover {
         box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
         z-index:500;
      }
    }

}
</style>

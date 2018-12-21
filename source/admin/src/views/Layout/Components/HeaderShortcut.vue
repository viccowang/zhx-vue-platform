<template>
  <ul class="shortcut-menu-list">
    <v-contextmenu ref="menu">
      <v-contextmenu-item @click="removeShortcut">移除快捷菜单</v-contextmenu-item>
    </v-contextmenu>
    <draggable v-model="shortcuts" :options="sortOptions">
      <li v-for="item in shortcuts" v-contextmenu:menu="item" :key="item.name" @click="goToMenu(item)" :class="{active: activeMenu.name === item.name }">
        <el-tooltip :content="item.meta.title" placement="bottom-start" :enterable="false">
          <span v-if="item.meta.icon !==''" :class="item.meta.icon"></span>
          <span v-else>{{ item.meta.title !== '' ? item.meta.title.substring(0,2) : 'icon' }}</span>
        </el-tooltip>
        <i class="active-dot" :style="{background: systemThemeColor}"></i>
      </li>
    </draggable>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'HeaderShortcut',
  data () {
    return {
      activeMenu: null,
      sortOptions: {
        sort: true,
        animation: 120
      }
    }
  },
  props: {
    menu: Array
  },
  computed: {
    ...mapGetters(['systemTheme']),
    systemThemeColor: function () {
      const baseTheme = this.$const.systemTheme.theme
      return baseTheme[this.systemTheme]
    },
    shortcuts: {
      get () {
        return this.menu
      },
      set (items) {
        this.$store.dispatch('dragedShortcuts', items)
      }
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
    },
    removeShortcut (contextmenu, event, item) {
      this.$store.dispatch('removeShortcutMenu', item)
    }
  },
  components: { draggable }
}
</script>
<style lang="scss" scoped>
.shortcut-menu-list {
    width:100%;
    height:100%;
    padding:0;margin:0;
    display: flex;
    align-items: center;

    div {
      display: inherit;
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
}
</style>

<template>
  <div class="tag-tabs" v-bind:style="{height: tagTabHeight}">
    <v-contextmenu ref="menu" @beforeShow="beforeShowContextmenu">
      <v-contextmenu-item :disabled="isDisableCloseItem" @click="closeTabByContextmenu">关闭标签页</v-contextmenu-item>
      <v-contextmenu-item divider />
      <v-contextmenu-item @click="closeOthersTabByContextmenu">关闭其他标签页</v-contextmenu-item>
      <v-contextmenu-item @click="closeRightTabByContextmenu">关闭右侧标签页</v-contextmenu-item>
      <v-contextmenu-item divider />
      <v-contextmenu-item :disabled="isDisableCloseItem " @click="addToShortcutMenu">添加为快捷菜单</v-contextmenu-item>
      <v-contextmenu-item @click="removeShortcutMenu">移除快捷菜单</v-contextmenu-item>
    </v-contextmenu>
    <scroll-pane>
      <draggable v-model="visitedViews" :options="tabDragOptions">
        <router-link
          tag="div"
          class="tab-item"
          v-contextmenu:menu="tab"
          v-for="tab in visitedViews"
          :to="tab.path"
          :key="tab.path"
          :class="{'no-drag': tab.name === 'Dashboard',active: isActive(tab), isShowCloseBtn: !isShowCloseBtn(tab)}"
        >
          <span>
            <i :class="tab.meta.icon"></i>
            <span class="top-line" v-bind:style="{background: systemThemeColor}"></span>
            {{ tab.meta.title }}
          </span>
          <span v-if="isShowCloseBtn(tab)" class="close el-icon-close" @click.prevent.stop="closeTab(tab)"></span>
        </router-link>
      </draggable>
    </scroll-pane>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import scrollPane from '@/components/scrollPane'

export default {
  name: 'TagTabs',
  data () {
    return {
      isDashboard: false,
      isDisableCloseItem: false,
      isAddedToShortcut: false,
      tabDragOptions: {
        animation: 120,
        filter: '.no-drag'
      }
    }
  },
  computed: {
    ...mapGetters(['tagTabHeight', 'systemTheme', 'shortcutMenu']),
    visitedViews: {
      get () {
        return this.$store.state.views.visitedViews
      },
      set (views) {
        this.$store.dispatch('dragedViews', views)
      }
    },
    systemThemeColor: function () {
      const baseTheme = this.$const.systemTheme.theme
      return baseTheme[this.systemTheme]
    }
  },
  watch: {
    $route () {
      this.addViewToVisided()
    }
  },
  mounted () {
    this.addViewToVisided()
  },
  methods: {
    isActive (view) {
      return this.$route.path === view.path
    },
    isShowCloseBtn (view) {
      return view.path !== this.$const.dashboard.router
    },
    addViewToVisided () {
      var thisRoute = this.$route.name ? this.$route : null
      if (thisRoute) this.$store.dispatch('addVisitedViews', thisRoute)
    },
    closeTab (view) {
      this.$store.dispatch('removeVisitedViews', view).then((res) => {
        this.$nextTick(() => {
        // 移除过后的visitedViews Array object
          const views = [...res.views]
          // 移除view的下一个view, 用于帮助自动Acitve下一个view
          const nextView = res.theNextView
          // 如果移除的是已Active的View才需要协助触发一些后续操作
          if (this.isActive(view)) {
          // 如果没有下一个view,可能当前移除的已经是最后一个,那么需要返回 visitedViews的最后一个
            const lastView = nextView === null && views.slice(-1)[0]
            // 如果有下一个则直接跳转路由
            if (nextView) {
              this.$router.push(nextView.path)
              // 如果当前移除的已经是最后一个,则应该跳转至visitedViews的最后一个路由
            } else {
              if (lastView) {
                this.$router.push(lastView.path)
              } else {
              // 保证最后不能出现空visitedList
              // TODO 应该做一个可以默认无法关闭的首页view
                this.$router.push({
                  path: '/',
                  query: {
                    t: new Date().getTime()
                  }
                })
              }
            }
          }
        })
        // 关闭标签时触发一个广播
        // TODO: 暂时不发送广播
        // eventBus.$emit('platform.navTab.removed', { removed: view })
      })
    },
    closeOtherTabs (view) {
      this.$store.dispatch('removeOtherViews', view).then(() => {
        this.$router.push(view.path)
      })
    },
    closeRightTabs (view) {
      this.$store.dispatch('removeRightViews', view).then(() => {
        this.$router.push(view.path)
      })
    },
    addToShortcutMenu (contextmenu, event, {path, name, meta}) {
      const menuItem = { path, name, meta }
      this.$store.dispatch('addShortcutMenu', menuItem)
    },
    removeShortcutMenu (contextmenu, event, {path, name, meta}) {
      const menuItem = { path, name, meta }
      this.$store.dispatch('removeShortcutMenu', menuItem)
    },
    beforeShowContextmenu (contextmenu, event, { path, name }) {
      this.isDisableCloseItem = name === this.$const.dashboard.name
      // this.isAddedToShortcut = this.shortcutMenu.some(menu => menu.name === name && menu.path === path)
    },
    closeTabByContextmenu (contextmenu, event, tabView) {
      this.closeTab(tabView)
    },
    closeOthersTabByContextmenu (contextmenu, event, tabView) {
      this.closeOtherTabs(tabView)
    },
    closeRightTabByContextmenu (contextmenu, event, tabView) {
      this.closeRightTabs(tabView)
    }
  },
  components: {
    scrollPane,
    draggable
  }
}
</script>

<style lang="scss" scoped>
.tag-tabs{
  background-color: $base-light-color;
  box-shadow: 10px 0 15px -6px rgba(0,0,0,.4) inset;

  div {
    display: flex;

     .tab-item{
      display: flex;
      align-items: center;
      padding:7px 10px 6px 15px;
      background-color: lighten($base-gray-color, 21%);
      border-right:1px solid lighten($base-gray-color, 14%);
      box-sizing: border-box;
      cursor:pointer;
      overflow: hidden;
      user-select: none;
      transition: all .2s ease 0s;

      &.isShowCloseBtn > span {
        padding-right: 10px;
      }

      > span {
        display: inline-block;
        white-space:nowrap;
        vertical-align: middle;

        > i {
          color: lighten($base-dark-color, 30%);
          position:relative;
          top:1px;
          margin-right:5px;
        }

        &.close {
          width:12px;height:12px;
          border-radius:15px;
          margin:1px 0 0 10px;

          &:before {
            position:relative;
            top:1px;
          }

          &:hover {
            color: darken($base-red-color, 30%);
            font-weight:600;
            background-color: lighten($base-red-color, 5%);
          }

        }

      }

      &.active{
        position:relative;
        background-color: lighten($base-light-color, 100%);
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);

        span.top-line {
          width:100%;
          height:3px;
          overflow:hidden;
          position:absolute;
          top:0;left:0;
        }

      }

      &:last-child{
        border-right:none;
      }

      &:hover:not(.active) {
        background-color: lighten($base-gray-color, 24%);
        box-shadow: 0 5px 10px -3px rgba(0,0,0,.2), 0 8px 15px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
      }

    }

  }

}
</style>

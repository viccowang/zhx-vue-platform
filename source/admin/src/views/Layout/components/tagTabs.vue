<template>
  <div class="tag-tabs">
    <scroll-pane>
      <router-link
        tag="div"
        class="tab-item"
        v-for="tab in visitedViews"
        :to="tab.path"
        :key="tab.path"
        :class="{active: isActive(tab), isShowCloseBtn: !isShowCloseBtn(tab)}"
      >
        <span >{{ tab.meta.title }}</span>
        <span v-if="isShowCloseBtn(tab)" class="close el-icon-close" @click.prevent.stop="closeTab(tab)"></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import scrollPane from '@/components/scrollPane'

export default {
  name: 'TagTabs',
  components: { scrollPane },
  data () {
    return {
      isDashboard: false
    }
  },
  computed: {
    ...mapGetters(['visitedViews'])
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
      return view.path !== '/dash'
    },
    addViewToVisided () {
      var thisRoute = this.$route.name ? this.$route : null
      if (thisRoute) this.$store.dispatch('addVisitedViews', thisRoute)
    },
    closeTab (view) {
      this.$store.dispatch('removeVisitedViews', view).then((res) => {
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
              // if (view.path === '/dash') this.$store.dispatch('addVisitedViews', view)
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-tabs{
  height:30px;
  background-color: $base-light-color;

  .tab-item{
    display: inline-flex;
    align-items: center;
    padding:6px 10px 6px 15px;
    background-color: lighten($base-gray-color, 18%);
    border-right:1px solid lighten($base-gray-color, 5%);
    box-sizing:border-box;
    cursor:pointer;
    overflow: hidden;
    user-select: none;

    &.isShowCloseBtn > span {
      padding-right: 10px;
    }

    > span {
      display: inline-block;

      &.close {
        margin-left:10px;
      }

    }

    &.active{
      background-color: lighten($base-dark-color, 8%);
      color: lighten($base-gray-color, 100%);
    }

    &:last-child{
      border-right:none;
    }

  }
}
</style>

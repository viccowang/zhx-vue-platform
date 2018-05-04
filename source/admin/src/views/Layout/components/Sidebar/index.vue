<template>
  <transition name="scale-left">
      <div class="sidebar"
      :class="{ width: sidebarState.width }"
      v-show="!sidebarState.isHidden"
      :style="{background: systemThemeColor}">
        <!-- <div class="logo">System LOGO</div> -->
        <div class="slide-handler zvpfont icon-tuozhuai" @click="slideSidebar"></div>
        <el-menu mode="vertical" class="vertical-menu"
                  :default-active="$route.path"
                  :router="true"
                  :background-color="systemThemeColor"
                  :collapse="!sidebarState.isOpen"
                  text-color="#bfcbd9">
                    <template v-for="item in asyncRouter" v-if="!item.hidden && item.children">
                        <!-- no children -->
                        <template v-if="item.children.length === 1 && !item.children[0].children" >
                          <el-menu-item :index="item.path + '/' + item.children[0].path" :key="item.path + '/' + item.children[0].path">
                              <i v-if="!sidebarState.isOpen" :class="item.children[0].meta.icon"></i>
                              <i v-else :class="item.children[0].meta.icon"></i>
                              <span slot="title">{{ item.children[0].meta.title }}</span>
                          </el-menu-item>
                        </template>
                        <!-- have children -->
                        <el-submenu v-else :index="item.name || item.path" :key="item.name">
                            <template slot="title" >
                              <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
                              <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
                            </template>
                            <template v-for="child in item.children" v-if="!child.hidden">
                              <sidebar-menu-item  v-if="child.children && child.children.length > 0"
                                  :is-nest="true" class="nest-menu" :routes="[child]" :key="child.path">
                              </sidebar-menu-item>
                              <template v-else>
                                  <el-menu-item :index="item.path + '/' + child.path" :key="item.path + '/' + child.path">
                                      <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                                      <span  v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                                  </el-menu-item>
                              </template>
                            </template>
                        </el-submenu>
                    </template>
        </el-menu>
      </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarMenuItem from './SidebarMenuItem'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['asyncRouter', 'sidebarState', 'systemTheme']),
    // 这里必须根据条件结合ElementUI的sidebar来调整颜色,保证自定义主题和sidebar的内置颜色一致.
    systemThemeColor: function () {
      switch (this.systemTheme) {
        case 'batman':
        case 'belles':
          return '#37474F'
        default:
          return '#304156'
      }
    }
  },
  methods: {
    slideSidebar () {
      this.$store.dispatch('collapseSidebar', !this.sidebarState.isOpen)
    }
  },
  components: { SidebarMenuItem }
}
</script>

<style lang="scss" scoped>

$sidebar-background-color: #304156;

.sidebar{
  display: flex;
  flex-direction: column;
  flex: none;
  transition: all .3s ease-in-out 0s;
  overflow: hidden;

  .slide-handler {
    padding:3px 0;
    background: mix($base-white-color, $sidebar-background-color, 8%);
    text-align: center;
    color: $base-light-color;
    cursor: pointer;
  }

  .logo{
    padding:10px 0;
    color: #fff;
    font-size:1.6rem;
    font-weight:300;
    display: inherit;
    @include flexCenter;
    background-color:darken($sidebar-background-color,8%);
  }

  // sidebar menu css override
  .vertical-menu:not(.el-menu--collapse) {
    width:180px;
    border-right:none;
  }

  .el-menu--collapse i {
    font-size:1.6rem;
  }
}

</style>

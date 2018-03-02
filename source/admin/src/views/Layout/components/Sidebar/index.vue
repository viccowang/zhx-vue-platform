<template>
    <div class="sidebar" :class="{ width: sidebarState.width }">
      <!-- <div class="logo">System LOGO</div> -->
      <div class="slide-handler" @click="slideSidebar">slider</div>
      <el-menu mode="vertical" class="vertical-menu"
                :default-active="$route.path"
                background-color="#304156"
                :collapse="!sidebarState.isOpen"
                text-color="#bfcbd9"
                active-text-color="#409EFF">
        <sidebar-menu-item :routes="asyncRouter"></sidebar-menu-item>
      </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarMenuItem from './SidebarMenuItem'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['asyncRouter', 'sidebarState'])
  },
  methods: {
    slideSidebar () {
      this.$store.dispatch('collapseSidebar', !this.sidebarState.isOpen)
    }
  },
  components: {
    SidebarMenuItem
  }
}
</script>

<style lang="scss" scoped>

$sidebar-background-color: #304156;

.sidebar{
  display: flex;
  flex-direction: column;
  flex: none;
  background: $sidebar-background-color;

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

  .vertical-menu:not(.el-menu--collapse) {
    width:180px;
    border-right:none;
  }
  .el-menu--collapse {
    border-right:none;
  }
}

</style>

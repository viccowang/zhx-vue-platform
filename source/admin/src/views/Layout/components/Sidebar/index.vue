<template>
    <div class="sidebar" :style="{width: width}">
      <!-- <div class="logo">System LOGO</div> -->
      <div class="side">
        <el-menu mode="vertical"
                  :default-active="$route.path"
                  background-color="#304156"
                  text-color="#bfcbd9"
                  active-text-color="#409EFF">
          <sidebar-menu-item :routes="asyncRouter"></sidebar-menu-item>
        </el-menu>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarMenuItem from './SidebarMenuItem'

export default {
  name: 'Sidebar',
  props: {
    width: String
  },
  computed: {
    ...mapGetters(['asyncRouter'])
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
  overflow: hidden;

  .logo{
    padding:10px 0;
    color: #fff;
    font-size:1.6rem;
    font-weight:300;
    display: inherit;
    @include flexCenter;
    background-color:darken($sidebar-background-color,8%);
  }

  .side{
    ul {
      border-right:none;
    }
  }
}

</style>

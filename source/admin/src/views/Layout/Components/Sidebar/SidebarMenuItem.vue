<template>
    <div class="sidebar-wrapper" :class="{'hide-sidebar': !sidebarState.isOpen}">
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            <!-- no children -->
            <template  v-if="item.children.length === 1 && !item.children[0].children" >
                <!-- <router-link tag="div" :to="item.path + '/' + item.children[0].path" :key="item.children[0].name"> -->
                    <!-- <el-tooltip :disabled="sidebarState.isOpen" :content="item.children[0].meta.title" placement="right"> -->
                        <el-menu-item :index="item.path + '/' + item.children[0].path" :key="item.path + '/' + item.children[0].path">
                            <i v-if="!sidebarState.isOpen" :class="item.children[0].meta.icon"></i>
                            <i v-else :class="item.children[0].meta.icon"></i>
                            <span class="hide">{{ item.children[0].meta.title }}</span>
                        </el-menu-item>
                    <!-- </el-tooltip> -->
                <!-- </router-link> -->
            </template>

            <!-- have children -->
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <template slot="title">
                    <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
                    <span  class="hide" v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
                </template>
                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-menu-item  v-if="child.children && child.children.length > 0"
                        :is-nest="true" class="nest-menu" :routes="[child]" :key="child.path">
                    </sidebar-menu-item>
                    <template v-else>
                        <!-- <router-link tag="div" :to="item.path + '/' + child.path" :key="child.name"> -->
                            <el-menu-item :index="item.path + '/' + child.path" :key="item.path + '/' + child.path">
                                <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                                <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                            </el-menu-item>
                        <!-- </router-link> -->
                    </template>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarMenuItem',
  props: {
    routes: Array,
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['sidebarState'])
  }
}
</script>

<style lang="scss">
// .hide-sidebar {
//     // element ui collapse hack
//     i {
//         vertical-align: middle;
//         margin-right: 5px;
//         width: 24px;
//         text-align: center;
//         font-size: 18px;
//      }
//     .hide , .el-submenu__icon-arrow { display: none }
// }
</style>

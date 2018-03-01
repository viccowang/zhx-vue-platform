<template>
    <div class="sidebar-wrapper">
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            <!-- no children -->
            <router-link tag="li" v-if="item.children.length === 1 && !item.children[0].children"
                        :to="item.path + '/' + item.children[0].path"
                        :key="item.children[0].name">
                <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
                    <i :class="item.children[0].meta.icon"></i>
                    <span>{{ item.children[0].meta.title }}</span>
                </el-menu-item>
            </router-link>
            <!-- have children -->
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <template slot="title">
                    <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
                    <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
                </template>
                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-menu-item  v-if="child.children && child.children.length > 0"
                        :is-nest="true" class="nest-menu" :routes="[child]" :key="child.path">
                    </sidebar-menu-item>
                    <router-link tag="li" v-else :to="item.path + '/' + child.path" :key="child.name">
                        <el-menu-item :index="item.path + '/' + child.path">
                            <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                            <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
  name: 'SidebarMenuItem',
  props: {
    routes: Array,
    isNest: {
      type: Boolean,
      default: false
    }
  }
}
</script>

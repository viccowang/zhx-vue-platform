<template>
    <div class="shortcut-menu">
        <div class="shortcut-menu-item" v-for="(menu,index) in shortMenu" :key="index" v-if="!menu.hidden && menu.redirect !== '/dash' ">
            <div class="item" v-if="!menu.children" >
                <i class="el-icon-document"></i>
                <span class="title">{{ menu.meta.title }}</span>
            </div>
            <template v-else-if="menu.children && menu.children.length >= 1 ">
                 <span class="title" v-if="menu.meta && menu.meta.title">{{ menu.meta.title }}</span>
                 <ul v-for="(item, index) in menu.children" :key="index">
                     <template v-if="item.children && item.children.length >= 1">
                         <dashboard-menu-item :menuList="[item]"></dashboard-menu-item>
                     </template>
                     <template v-else>
                        <li class="menu-item">
                            <el-checkbox v-model="item.meta.checked" @change="selectShortcut(item)">{{ item.meta.title }}</el-checkbox>
                        </li>
                     </template>
                 </ul>
            </template>
        </div>
    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/session'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'

export default {
  name: 'ShortcutMenu',
  props: {
    menuList: Array
  },
  computed: {
    storedShurtcutMenu () {
      return this.$store.getters.shortcutMenu || getLocalStorage(`${BASE_PER_FIX_KEY}_shortcut_menu`)
    },
    shortMenu () {
      const menuData = this.menuList.concat()
      return this.constructMenuData(menuData)
    }
  },

  methods: {
    selectShortcut (item) {
      const actionType = item.meta.checked ? 'addShortcutMenu' : 'removeShortcutMenu'
      this.$store.dispatch(actionType, item)
    },
    constructMenuData (menuData) {
      const constrctMenu = menuData.map(menu => {
        if (menu.children && menu.children.length) {
          this.constructMenuData(menu.children)
        }
        if (menu.meta) {
          menu.meta.checked = this.storedShurtcutMenu.some(m => m.name === menu.name)
        }
        return menu
      })
      return constrctMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.shortcut-menu {
    width:100%;
    display:flex;
    flex-wrap: wrap;

    .shortcut-menu-item{
        padding:10px 45px 20px 0;
        cursor: pointer;

        .title {
            display: inline-block;
            margin:0 0 8px 10px;
            font-size:14px;
            font-style:italic;
            white-space: nowrap;
            color: darken($base-light-color, 45%);
        }

        ul {
            li {
                display: flex;
                padding: 10px;
                transition: all .3s ease 0s;
                font-size:13px;
                border-radius:8px;

                i {
                    margin-right:5px;
                    color: darken($base-light-color, 25%);
                }

                .list-title {
                    white-space: nowrap;
                }

                &:hover {
                    background-color: $base-light-color;
                }
            }
        }

    }
}

</style>

<template>
  <div class="context-menu">
    <h2>Context menu</h2>

    <v-contextmenu ref="menu1">
        <v-contextmenu-item>New Item</v-contextmenu-item>
        <v-contextmenu-item>Edit Item</v-contextmenu-item>
        <v-contextmenu-item @click="showParam">click to get Param</v-contextmenu-item>
    </v-contextmenu>

    <v-contextmenu ref="menu2" eventType="click">
        <v-contextmenu-item>Subject One</v-contextmenu-item>
        <v-contextmenu-item divider></v-contextmenu-item>
        <v-contextmenu-item>Subject Two</v-contextmenu-item>
        <v-contextmenu-item>Subject Three</v-contextmenu-item>
        <v-contextmenu-item divider></v-contextmenu-item>
        <v-contextmenu-item>Subject Four</v-contextmenu-item>
    </v-contextmenu>

    <v-contextmenu ref="menu3" >
        <v-contextmenu-group>
            <v-contextmenu-item>Group One</v-contextmenu-item>
            <v-contextmenu-item>Group Tow</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
        </v-contextmenu-group>
        <v-contextmenu-item>Research</v-contextmenu-item>
        <v-contextmenu-item>Subscription</v-contextmenu-item>
    </v-contextmenu>

    <v-contextmenu ref="menu4">
        <v-contextmenu-item>Subject One</v-contextmenu-item>
        <v-contextmenu-item>Subject Two</v-contextmenu-item>
        <v-contextmenu-submenu title="Children">
            <v-contextmenu-item>Child Subject One</v-contextmenu-item>
            <v-contextmenu-item>Child Subject One</v-contextmenu-item>
        </v-contextmenu-submenu>
    </v-contextmenu>

    <v-contextmenu ref="menu5">
        <v-contextmenu-item
            v-for="item in menuItems"
            :key="item.id"
            @click="item.onClick"
        >
        {{ item.label }}
        </v-contextmenu-item>

    </v-contextmenu>

    <el-row>
        <el-col :span="6">
            <h4>默认右键菜单</h4>
            <el-button v-contextmenu:menu1="menuParams">show contextmenu</el-button>
        </el-col>
        <el-col :span="6">
             <h4>自定义按键菜单</h4>
            <el-button v-contextmenu:menu2>Left click to show contextmenu</el-button>
        </el-col>
        <el-col :span="6">
             <h4>分组右键菜单</h4>
             <el-button v-contextmenu:menu3>show group contextmenu</el-button>
        </el-col>
        <el-col :span="6">
             <h4>带层级右键菜单</h4>
            <el-button v-contextmenu:menu4>show second Level contextmenu</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6">
             <h4>动态增加条目右键菜单</h4>
            <el-button v-contextmenu:menu5>show Dynamic menu</el-button>
        </el-col>
    </el-row>
  </div>
</template>

<script>

let MENU_ID = 2

export default {
  name: 'Contextmenu',
  data () {
    return {
      menuParams: { name: 'Vicco.W.', message: 'Hello World!' },
      menuItems: [
        { id: 0, label: 'Add Other Item', onClick: this.addItems }
      ]
    }
  },
  methods: {
    addItems () {
      const item = {
        id: MENU_ID++,
        label: `Dynamic menu ${MENU_ID}`,
        onClick: this.addItems
      }
      this.menuItems.push(item)
    },
    showParam (menuItem, event, {name, message}) {
      this.$message({
        message: `name: ${name}, text: ${message}`,
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
    margin: 20px 0;
}
.context-menu {
    padding:50px;
    box-sizing: border-box;
}
</style>

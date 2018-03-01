<template>
    <div class="nav-button">
        <el-button-group>
            <el-button size="small" icon="el-icon-document">新建</el-button>
            <el-button size="small" icon="el-icon-edit">修改</el-button>
            <el-button size="small" icon="el-icon-share">删除</el-button>
        </el-button-group>
        <el-button-group>
            <slot></slot>
        </el-button-group>
    </div>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    options: Array
  }
}
</script>

<style lang="scss" scoped>
.nav-button {
    padding:5px;
    width:100%;
    box-sizing: border-box;
    border-bottom:1px solid $base-light-color;
}
</style>

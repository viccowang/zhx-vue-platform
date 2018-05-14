<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>主页</el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="(bread, index) in breadData"
            :key="index"
        >
            {{ bread.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'HeaderBreadcrumb',
  props: {
    breadData: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.header-breadcrumb{
    display: flex;
    // justify-content: center;
    align-items: center;
    padding: 8px 5px;
    background-color: lighten( $base-light-color, 100% );
    border-bottom: 1px solid darken( $base-light-color, 5%);

    .el-breadcrumb {
        font-size:.8rem;
        color: darken( $base-light-color, 15%) !important;
    }
}
</style>

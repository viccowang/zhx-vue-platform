<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>主页</el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="(bread, index) in filterBread"
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
  data () {
    return {
      filterBread: []
    }
  },
  props: {
    breadData: {
      type: Array,
      required: true
    }
  },
  beforeMount () {
    // 如果返回的路由仅仅是单层及(有且仅有1个children时为单层及).
    // 则不需要展现父级,因为父级和子级的标题是一样的.
    if (this.breadData && this.breadData.length === 2) {
      // 去除所有斜杠
      const breadFirstPath = this.breadData[0].path.replace(/\//g, '')
      const breadSecondPath = this.breadData[1].path.replace(/\//g, '')
      if (breadSecondPath === 'dash') {
        this.filterBread = []
      } else {
        breadFirstPath === breadSecondPath ? this.filterBread.push(this.breadData[1]) : this.filterBread = this.breadData
      }
    } else {
      this.filterBread = this.breadData
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

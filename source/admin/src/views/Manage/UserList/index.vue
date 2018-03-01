<template>
    <div>
      <!-- 顶部菜单部分 封装的组件在components/navButton -->
      <nav-button :options="buttonList">
        <el-button size="small" icon="el-icon-search" @click="showSearch = !showSearch">检索</el-button>
        <el-button size="small" icon="el-icon-upload2">导出</el-button>
      </nav-button>
      <!-- 检索框部分 重新封装的组件在components/commonSearchWrapper -->
      <common-search-wrapper :isShow="showSearch">
        <user-list-search @resetSearch="resetSearch"></user-list-search>
      </common-search-wrapper>
      <!-- Grid表格部分 组件在components/commonTable
         重新封装后配置,主要用于保证table和pagination的样式
         size 属性  行高会变窄,显示更多内容
         flex 属性  可以配置表格自动根据配置的数值动态计算高度, 配置该属性时需要保证el-table的高度为100%
       -->
      <common-table size="small" :flex="120">
         <template slot="table">
           <el-table height="100%" :data="tableData">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
           </el-table>
         </template>
         <template slot="pagination">
           <el-pagination background  layout="prev, pager, next" :total="100"></el-pagination>
         </template>
      </common-table>
    </div>
</template>

<script>
import NavButton from '@/components/navButton'
import CommonSearchWrapper from '@/components/commonSearchWrapper'
import UserListSearch from './userListSearch'
import CommonTable from '@/components/CommonTable'

import {tableData} from '@/views/DemoList/tableData'

export default {
  name: 'UserList',
  components: { NavButton, CommonSearchWrapper, UserListSearch, CommonTable },
  data () {
    return {
      buttonList: [],
      showSearch: false,
      tableData: tableData
    }
  },
  methods: {
    // 重置搜索框为隐藏状态
    resetSearch () {
      this.showSearch = false
    }
  }
}
</script>

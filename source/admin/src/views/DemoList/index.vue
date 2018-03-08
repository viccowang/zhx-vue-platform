<template>
      <common-table size="small" :flex="120">
         <template slot="table">
           <el-table height="100%"
           :data="tableData"
           stripe >
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
           </el-table>
         </template>
         <template slot="pagination">
           <el-pagination background  layout="prev, pager, next" :total="100"></el-pagination>
         </template>
      </common-table>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import CommonTable from '@/components/CommonTable'

import { tableData } from './tableData'

@Component({
  components: { CommonTable }
})
export default class DemoList extends Vue {
  // initial table data()
  tableData = tableData
}

</script>

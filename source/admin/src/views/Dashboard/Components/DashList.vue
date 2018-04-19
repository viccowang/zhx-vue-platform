<template>
    <div class="dash-list">
        <el-table v-loading="!tableData.length" height="100%" :data="tableData" stripe >
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import CommonTable from '@/components/commonTable'

import { tableData } from '@/testData/tableData'

export default {
  name: 'DashList',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.tableData = tableData
    }, 1000)
  },
  methods: {
  },
  components: {
    CommonTable
  }
}
</script>
<style>
.dash-list{
    padding: 15px 0 0 0;
}
</style>

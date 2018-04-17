<template>
    <div>
        <common-wrapper>
            <common-table size="small">
                <template slot="table">
                <el-table :data="tableData" stripe >
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
                </template>
                <template slot="pagination">
                <el-pagination background  layout="prev, pager, next" :total="100"></el-pagination>
                </template>
            </common-table>
        </common-wrapper>
    </div>
</template>

<script>
import commonWrapper from '@/components/commonWrapper'
import CommonTable from '@/components/CommonTable'

import { tableData } from '@/testData/tableData'

export default {
  name: 'TableList',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.tableData = tableData
  },
  components: { commonWrapper, CommonTable }
}
</script>

<template>
    <div>
        <nav-button>
            <NavPremissonButton :buttonData="btnData" :comp="comp" />
            <el-button-group>
                <el-button class="search" @click="isShowSearch = !isShowSearch">Search</el-button>
                <el-button plain>Export</el-button>
            </el-button-group>
        </nav-button>
        <common-search :isShow="isShowSearch">
            <user-list-search @resetSearch="resetSearch"></user-list-search>
        </common-search>
        <common-wrapper>
            <common-table size="small">
                <template slot="table">
                <el-table v-loading="!tableData.length" :data="tableData" stripe >
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
import CommonWrapper from '@/components/commonWrapper'
import CommonTable from '@/components/commonTable'
import CommonSearch from '@/components/commonSearch'
import NavButton from '@/components/navButton'
import NavPremissonButton from '@/components/navButton/navPremissonButton'

import UserListSearch from './Components/search'

import { tableData } from '@/testData/tableData'
import { buttonData } from '@/testData/buttonData'

export default {
  name: 'TableList',
  data () {
    return {
      comp: this,
      isShowSearch: false,
      tableData: [],
      btnData: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.tableData = tableData
      this.btnData = buttonData
    }, 1000)
  },
  methods: {
    create () { },
    remove () { },
    resetSearch () {
      this.showSearch = false
    }
  },
  components: {
    CommonWrapper,
    CommonTable,
    CommonSearch,
    NavButton,
    NavPremissonButton,
    UserListSearch
  }
}
</script>

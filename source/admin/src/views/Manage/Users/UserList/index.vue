<template>
    <div>
      <!-- 顶部菜单部分 封装了两层组件,在components/navButton -->
      <nav-button>
        <!--
          该组件会根据远程数据返回当前页面拥有的按钮
          :buttonData 远程按钮数据对象
          :comp 当前组件实例的引用
        -->
        <NavPremissonButton :buttonData="buttonData" :comp="comp"></NavPremissonButton>
        <!-- 静态手动添加的其他按钮 -->
        <el-button-group>
          <el-button size="small" icon="el-icon-search" @click="showSearch = !showSearch">检索</el-button>
          <el-button size="small" icon="el-icon-upload2">导出</el-button>
        </el-button-group>
      </nav-button>
      <!-- 检索框部分
           重新封装的组件在components/commonSearchWrapper
           isShow
           isAbsolute
      -->
      <common-search :isShow="showSearch">
        <user-list-search @resetSearch="resetSearch"></user-list-search>
      </common-search>
      <!-- Grid表格部分 组件在components/commonTable
         重新封装后配置,主要用于保证table和pagination的样式
         size 属性  行高会变窄,显示更多内容
         flex 属性  可以配置表格自动根据配置的数值动态计算高度, 配置该属性时需要保证el-table的高度为100%
       -->
      <common-table size="small" :flex="120">
         <template slot="table">
           <el-table height="100%"
           :data="tableData"
           @selection-change="handleSelectionChange"
           stripe >
             <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
           </el-table>
         </template>
         <template slot="pagination">
           <el-pagination
            background
            layout="prev, pager, next"
            :total="100"
            @current-change="handleCurrentPage">
           </el-pagination>
         </template>
      </common-table>
    </div>
</template>

<script>
import NavButton from '@/components/navButton'
import NavPremissonButton from '@/components/navButton/navPremissonButton'
import CommonSearch from '@/components/commonSearch'
import UserListSearch from '../Components/userListSearch'
import CommonTable from '@/components/CommonTable'

import {tableData} from '@/testData/tableData'
import {buttonData} from '../Components/buttonData'

import AddUser from '../AddUser'

export default {
  name: 'UserList',
  components: { NavButton, NavPremissonButton, CommonSearch, UserListSearch, CommonTable },
  data () {
    return {
      comp: this,
      buttonData: [],
      showSearch: false,
      tableData: tableData
    }
  },
  mounted () {
    // 模拟动态按钮加载时的Loading
    setTimeout(() => {
      this.buttonData = buttonData
    }, 200)
  },
  methods: {
    create () {
      this.$nextPage({
        title: '新建用户',
        props: {
          userName: 'Vicco Wang'
        },
        component: AddUser,
        cache: true
      })
      // this.$message({
      //   message: '点击了新建按钮'
      // })
      // console.log('create')
    },
    edit () {
      this.$message({
        message: '点击了修改按钮',
        type: 'warning'
      })
      console.log('edit')
    },
    remove () {
      this.$message({
        message: '点击了删除按钮',
        type: 'error'
      })
      console.log('remove')
    },
    // 重置搜索框为隐藏状态
    resetSearch () {
      this.showSearch = false
    },
    handleSelectionChange (val) {
      console.log('已勾选数据', val)
    },
    handleCurrentPage (page) {
      console.log(`当前翻页到第${page}页`)
    }
  }
}
</script>

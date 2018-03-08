<template>
    <el-form :model="searchForm" ref="searchForm" :rules="searchRule" label-width="80px" size="mini">
       <el-row>
           <el-col :span="6">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="searchForm.userName"></el-input>
                </el-form-item>
           </el-col>
            <el-col :span="6">
                <el-form-item label="所属单位" prop="company">
                    <el-input v-model="searchForm.company"></el-input>
                </el-form-item>
           </el-col>
            <el-col :span="6">
                <el-form-item label="用户编号" prop="userNo">
                    <el-input v-model="searchForm.userNo"></el-input>
                </el-form-item>
           </el-col>
            <el-col :span="6">
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="searchForm.sex" placeholder="请选择">
                        <el-option label="男" value="0">男</el-option>
                        <el-option label="女" value="1">女</el-option>
                    </el-select>
                </el-form-item>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="6">
               <el-form-item label="起始日期" prop="startDate">
                   <el-date-picker
                   v-model="searchForm.startDate"
                   type="date"
                   :picker-options="dateBefore"
                   style="width:100%"></el-date-picker>
               </el-form-item>
           </el-col>
            <el-col :span="6">
               <el-form-item label="结束日期" prop="endDate">
                   <el-date-picker
                   v-model="searchForm.endDate"
                   type="date"
                   :picker-options="dateAfter"
                   style="width:100%"></el-date-picker>
               </el-form-item>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="4" :offset="20" class="flex-right">
               <el-button type="success" size="mini" @click="onSubmit('searchForm')">查询</el-button>
               <el-button size="mini" @click="resetForm('searchForm')">重置</el-button>
           </el-col>
       </el-row>
    </el-form>
</template>

<script>
export default {
  name: 'UserListSearch',
  data () {
    return {
      searchForm: {
        userName: '',
        company: '',
        userNo: '',
        sex: '',
        startDate: '',
        endDate: ''
      },
      searchRule: {},
      dateBefore: {
        disabledDate: (time) => {
          const endDate = this.searchForm.endDate
          return endDate === '' ? false : time.getTime() > endDate
        }
      },
      dateAfter: {
        disabledDate: (time) => {
          const startDate = this.searchForm.startDate
          return time.getTime() < startDate
        }
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
      // submit forms
        // callback
        this.$emit('resetSearch')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

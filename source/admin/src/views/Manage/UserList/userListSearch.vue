<template>
    <el-form ref="userListSearch" label-width="80px" size="mini">
       <el-row>
           <el-col :span="6">
                <el-form-item label="用户名">
                    <el-input></el-input>
                </el-form-item>
           </el-col>
            <el-col :span="6">
                <el-form-item label="所属单位">
                    <el-input></el-input>
                </el-form-item>
           </el-col>
            <el-col :span="6">
                <el-form-item label="用户编号">
                    <el-input></el-input>
                </el-form-item>
           </el-col>
            <el-col :span="6">
                <el-form-item label="性别">
                    <el-input></el-input>
                </el-form-item>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="4" :offset="20" class="flex-right">
               <el-button type="success" size="mini" @click="onSubmit">查询</el-button>
               <el-button size="mini" @click="resetForm">重置</el-button>
           </el-col>
       </el-row>
    </el-form>
</template>

<script>
export default {
  name: 'UserListSearch',
  methods: {
    onSubmit () {
      // submit forms

      // callback
      this.$emit('resetSearch')
    },
    resetForm () {
    }
  }
}
</script>

<template>
  <div style="padding:10px">
      <h2>NextPage 第三级页面</h2>
      <div style="width:400px">
        <el-form>
          <el-form-item>
            <el-input v-model="pullVal"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="close">Close</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Others2',
  props: {
    pullVal: String
  },
  methods: {
    close () {
      this.closeNextPage(this)
    }
  }
}
</script>

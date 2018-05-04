<template>
  <div class="second-page">
    <el-row type="flex" justify="center" style="width:100%;">
      <el-col :span="10">
        <h2>The Second Page</h2>
        <el-form >
          <el-form-item label="some value from prev page">
            <el-input v-model="text" readonly ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showNext">Click To Show Next Page</el-button>
            <el-button @click="back">Back to Prev</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'NextOne',
  props: {
    text: String
  },
  methods: {
    showNext () {

    },
    back () {
      this.closeNextPage(this)
    }
  }
}
</script>
<style>
.second-page {
    padding:100px;
}
.clear {
    margin: 40px 0;
}
</style>

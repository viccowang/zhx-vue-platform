<template>
  <el-row class="nextpage" type="flex" justify="center">
      <el-col :span="10">
        <h2>Next page demo</h2>
        <el-form >
          <el-form-item label="some value">
            <el-input v-model="input" placeholder="pass some value to next page"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showNext">Click To Show Next Page</el-button>
          </el-form-item>
        </el-form>
      </el-col>
  </el-row>
</template>
<script>
import NextOne from './components/NextOne'

export default {
  name: 'NextPage',
  data () {
    return {
      input: '',
      contextTarget: document.body,
      contextShow: false,
      menuData: []
    }
  },
  methods: {
    showNext () {
      this.$nextPage({
        title: 'Second page',
        props: {
          text: this.input
        },
        component: NextOne,
        cache: true
      })
    }
  },
  components: { NextOne }
}
</script>
<style scoped>
.nextpage {
  padding:100px;
}
</style>

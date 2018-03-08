<template>
  <div>
      <nav-button>
        <slot name="button"></slot>
      </nav-button>
      <div style="padding:10px;">
        <h2>第二级NextPage页面</h2>
        <div style="width:400px">
          <el-form>
          <el-form-item label="来自上一级的文字">
            <el-input v-model="pushVal" disabled size="small"></el-input>
          </el-form-item>
          <el-form-item label="输入文字会传回上一级">
            <el-input v-model="val" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="close">关闭并回传</el-button>
          </el-form-item>

        </el-form>
        </div>
      </div>
  </div>
</template>

<script>
import NavButton from '@/components/navButton/'
import eventBus from '@/components/eventBus'
export default {
  name: 'AddUserOther',
  props: {
    pushVal: String
  },
  data () {
    return {
      val: ''
    }
  },
  methods: {
    close () {
      // 传递一些参数, 用Vue基础规则
      eventBus.$emit('passSomeVal', this.val)
      // NextPage插件注入进来,默认关闭Nextpage的方法,参数必填
      this.closeNextPage(this)
    }
  },
  components: {
    NavButton
  }
}
</script>

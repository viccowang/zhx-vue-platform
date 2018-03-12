<template>
  <div>
    <nav-button>
      <el-button-group>
        <el-button size="small">增加</el-button>
        <el-button size="small">修改</el-button>
      </el-button-group>
      <slot name="button"></slot>
    </nav-button>
    <div style="padding:10px;">
      <h2>第一级NextPage页面</h2>
      <span>{{ userName }}</span>
      <div style="width:700px;">
        <el-form width="300px">
          <el-form-item label="测试回传值">
            <el-input v-model="passVal" disabled placeholder="下级页面回传值"></el-input>
          </el-form-item>
          <el-form-item label="传递给下一级NextPage">
            <el-input v-model="pushVal" placeholder="下级页面回传值"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="open">打开下一个 NextPage</el-button>
            <el-button @click="close">从组件内关闭当前NextPage</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import NavButton from '@/components/navButton/'

// import AddUserOther from './Others'

import eventBus from '@/components/eventBus'

export default {
  name: 'AddUser',
  props: ['userName'],
  data () {
    return {
      test: '这是第一层级NexPage, 理论可以无限嵌套',
      passVal: '',
      pushVal: ''
    }
  },
  mounted () {
    eventBus.$on('passSomeVal', (val) => {
      this.passVal = val
    })
  },
  methods: {
    open () {
      this.$nextPage({
        title: '其他内容',
        props: {
          pushVal: this.pushVal
        },
        component: () => import('./Others'), // 该组件会通过Webpack分开打包,并异步加载
        cache: true
      })
    },
    close () {
      // Nextpage组件注入进来的固有方法,用来关闭当前Nextpage
      this.closeNextPage(this)
    }
  },
  components: { NavButton }
}
</script>

<style lang="scss" scoped>

</style>

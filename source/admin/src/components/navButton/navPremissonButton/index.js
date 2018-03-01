import Vue from 'vue'

export default Vue.component('NavPremissonButton', {
  props: {
    buttonData: Array
  },
  render (createElement) {
    if (!this.buttonData.length) {
      return (
        <el-button size="small" loading="true">加载中</el-button>
      )
    }
    return createElement('el-button-group', this.buttonData.map(button => {
      // 没找到父对象上的方法的话则不生成按钮
      if (typeof (this.$parent.$parent[button.click]) !== 'function') return
      return (
        <el-button
          size={button.size}
          icon={button.icon}
          onClick={this.$parent.$parent[button.click]}>
          {button.name}
        </el-button>
      )
    }))
  }
})

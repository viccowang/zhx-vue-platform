import Vue from 'vue'

export default Vue.component('NavPremissonButton', {
  props: {
    comp: {
      type: Object,
      required: true
    },
    buttonData: Array
  },
  render (createElement) {
    if (!this.comp) return
    if (!this.buttonData.length) {
      return (
        <el-button loading>加载中</el-button>
      )
    }
    return (
      <el-button-group>
        {
          this.buttonData.map(button => {
            // 没找到父对象上的方法的话则不生成按钮
            if (typeof (this.comp[button.click]) !== 'function') {
              throw Error(`You must declear the button click function with ${button.click}`)
            }
            return (
              <el-button
                icon={button.icon}
                onClick={this.comp[button.click]}>
                {button.name}
              </el-button>
            )
          })

        }
      </el-button-group>
    )
  }
})

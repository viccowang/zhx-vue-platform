<template>
    <el-dialog
        title="个人配置"
        :visible.sync = "visible"
        width = "30%">
        <span>Settings</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'PersonalSetting',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    confirm () {
      // 关闭对话框
      this.visible = false
    },
    cancel () {
      // 关闭对话框
      this.visible = false
    }
  }
}
</script>

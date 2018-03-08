<template>
    <el-dialog
        title="修改密码"
        :visible.sync = "visible"
        width = "30%">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" size="small" label-width="85px">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="passwordForm.password"></el-input>
            </el-form-item>
             <el-form-item label="确认新密码" prop="rePassword">
                <el-input type="password" v-model="passwordForm.rePassword"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data () {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        // check from original
        callback()
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.passwordForm.rePassword !== '') {
          this.$refs.passwordForm.validateField('rePassword')
          callback()
        }
      }
    }

    const validateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      visible: false,
      passwordForm: {
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      passwordRules: {
        oldPassword: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        rePassword: [
          { validator: validateRePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    confirm () {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          // 关闭对话框
          this.$refs.passwordForm.resetFields()
          this.visible = false
        }
      })
    },
    cancel () {
      // 关闭对话框
      this.$refs.passwordForm.resetFields()
      this.visible = false
    }
  }
}
</script>

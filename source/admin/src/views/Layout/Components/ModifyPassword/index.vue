<template>
  <div class="main">
    <section>
      <h4>修改密码</h4>
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="85px">
        <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="passwordForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="rePassword">
            <el-input type="password" v-model="passwordForm.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">返 回</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
          <!-- <span slot="footer" class="dialog-footer">

          </span> -->
</template>

<script>
// API
import { editPassword } from '@/api/user'

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
          const params = {
            userId: this.$store.getters.userId,
            oldUserPassword: this.passwordForm.oldPassword,
            userPassword: this.passwordForm.password
          }
          editPassword(params).then(() => {
            this.$refs.passwordForm.resetFields()

            this.$alert('密码修改成功! 点击确认后重新登录.', '修改密码', {
              confirmButtonText: '确定',
              callback: action => {
                this.$store.dispatch('userLogout').then(() => {
                  this.$router.push('/login')
                })
              }
            })
          })
        }
      })
    },
    cancel () {
      this.$refs.passwordForm.resetFields()
      // this.$router.push('/dash')
      // 避免不必要的bug
      location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  display: flex;
  position:absolute;
  width:400px;
  height:300px;
  top:14%; left: 50%;
  margin-left:-200px;

  >section {
    width:100%;
    display: inherit;
    @include flexCenter;
    flex-direction: column;
    padding: 25px 15px 0 15px;
    background-color: #fff;
    border-radius:15px;
    box-shadow: 0 0 25px rgba(0,0,0,.15);

    h4 {
      width:100%;
      padding:0;
      margin:0 0 15px 0;
      text-align: left;
      color: $base-blue-color;
      border-bottom: 1px solid $base-light-color;
      font-size:1.5rem;
    }

  }
}
</style>

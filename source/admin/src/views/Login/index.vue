<template>
  <div class="login-wrapper">
      <div class="login-block">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">

            <el-form-item prop="userName">
                <el-input
                  class="login-input"
                  type="text"
                  v-model="loginForm.userName"
                  placeholder="username">
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                class="login-input"
                type="password"
                v-model="loginForm.password"
                placeholder="password">
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="login('loginForm')">Login</el-button>
              <el-button @click="resetForm('loginForm')">Reset</el-button>
            </el-form-item>

         </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('userLogin', {...this.loginForm}).then(() => {
            this.$router.push('/')
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
  position:relative;
  top:20%;
  height:300px;

  .login-block{
    position: absolute;
    display: flex;
    justify-content: center;
    left:50%;
    top:50%;
    width:300px;
    height:300px;
    padding:60px 0 40px 0;
    margin:-150px 0 0 -150px;
    border-radius:25px;
    box-sizing: border-box;
    background:lighten($base-light-color, 100%);
    box-shadow:0 0 45px rgba(0,0,0,.18);

    .login-input{
      width:220px;
    }
  }

}
</style>

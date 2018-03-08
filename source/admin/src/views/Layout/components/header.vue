<template>
    <el-header class="header" height="35px">
        <div class="center">
        </div>
        <div class="user">
                <span class="avatar">
                    <img :src="'static/' + avatar" />
                </span>
                <span class="name">Hi,{{ userName }}</span>
            </div>
        <div class="settings">
        <ul>
            <li>
                <el-dropdown>
                    <span class="el-icon-setting">设置</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="openSettingDialog">个人配置</el-dropdown-item>
                        <el-dropdown-item @click.native="openEditPwdDialog">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="zvpfont icon-logout" @click="logout">注销</li>
        </ul>
        </div>
        <!--  个人设置 Dialog  -->
        <personal-setting ref="settingDialog" />
        <!-- 修改密码 Dialog -->
        <modify-password ref="passwordDialog" />
    </el-header>
</template>

<script>
import { mapGetters } from 'vuex'

import ModifyPassword from './ModifyPassword'
import PersonalSetting from './Settings'

export default {
  name: 'Headers',
  computed: {
    ...mapGetters(['userName', 'avatar'])
  },
  methods: {
    openSettingDialog () {
      this.$refs.settingDialog.visible = true
    },
    openEditPwdDialog () {
      this.$refs.passwordDialog.visible = true
    },
    logout () {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push('/login')
      })
    }
  },
  components: {
    ModifyPassword,
    PersonalSetting
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header{
    display: flex;
    padding:0;
    // color: lighten($base-light-color, 100%);
    background-color: darken($base-light-color, 3%);
    .center{
        flex:1;
        position: relative;
    }

    .user {
        display: inherit;
        @include flexCenter();

        span {
            display: inline-block;

            &.avatar {
                width:20px;
                height:20px;
                margin-right:10px;
                border-radius:20px;
                background-color: lighten($base-dark-color, 15%);
                overflow:hidden;

                >img { width: 20px; height: 20px; }
            }
            &.name { }
        }
    }

    .settings{

        ul{
        display: flex;
        flex-direction: row;
        height:100%;

            li {
                font-size: 1rem;
                display: inherit;
                @include flexCenter;
                flex:1 auto;
                padding: 0 15px;
                cursor: pointer;

                span:before {
                    margin-right:5px;
                }

                > div, {
                    font-size:1rem;
                    font-weight:400;
                    color: $base-dark-color;
                }
            }

            .zvpfont:before {
                margin-right:5px;
            }

        }

    }
}

</style>

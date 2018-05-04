<template>
    <el-header v-show="!windowMaxState" class="header" :height="headerHeight">
        <div class="center">
           <header-shortcut :menu="shortcutMenu" />
        </div>
        <div class="user">
                <!-- <span class="avatar">
                    <img :src="'static/' + avatar" />
                </span> -->
                <span class="name">{{ dayTime }}好,{{ userName }}</span>
            </div>
        <div class="settings">
        <ul>
            <li>
                <el-dropdown size="small">
                    <span class="el-icon-setting">设置</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="modifyPassword">修改密码</el-dropdown-item>
                        <!-- 功能未完成, 暂时注释 -->
                        <el-dropdown-item @click.native="settingPersonal">个性化设置</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="zvpfont icon-logout" @click="logout">注销</li>
        </ul>
        </div>
    </el-header>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

import PersonalSetting from './Settings'
import HeaderShortcut from './HeaderShortcut'

export default {
  name: 'Headers',
  data () {
    return {
      dayTime: '',
      commonDialog: null
    }
  },
  computed: {
    ...mapGetters(['userName', 'avatar', 'shortcutMenu', 'windowMaxState', 'headerHeight'])
  },
  mounted () {
    const now = parseInt(moment().format('HH'))
    if (now < 12) this.dayTime = '早上'
    else if (now >= 12 && now < 18) this.dayTime = '下午'
    else if (now >= 18 && now <= 23) this.dayTime = '晚上'
    else this.dayTime = ''
  },
  methods: {
    settingPersonal () {
      this.$router.push({ name: 'PersonalSettings' })
    },
    modifyPassword () {
      this.$router.replace({path: '/modify-password'})
    },
    logout () {
      this.$store.dispatch('userLogout').then(() => {
        // this.$router.push('/login')
        location.reload()
      })
    }
  },
  components: {
    PersonalSetting,
    HeaderShortcut
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header{
    display: flex;
    padding:0;
    // color: lighten($base-light-color, 100%);
    background-color: darken($base-light-color, 5%);
    border-bottom: 1px solid  darken($base-light-color, 10%);
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
            // &.name { }
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

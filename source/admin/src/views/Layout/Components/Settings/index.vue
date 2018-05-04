<template>
  <div class="personal-setting">
    <section>
      <div class="setting-block">
          <h4>个人资料</h4>
          <div class="settings">
            <user-info />
          </div>
      </div>
      <div class="setting-block">
          <h4>系统配置</h4>
          <div class="settings">
            <system-config />
          </div>
      </div>
      <div class="setting-block">
          <h4>主题</h4>
          <div class="settings">
             <theme />
            <div class="info">
              注意:主题色仅会在保证正常显示与配色的前提下调整部分色彩,而非全部色彩.
            </div>
          </div>
      </div>
      <div class="setting-block">
          <h4>快捷菜单</h4>
          <div class="settings">
             <shortcut-menu :menuList="menuList" />
             <div class="info">
              最多只能添加<strong>15</strong>枚快捷菜单! 建议只选择最常用的功能.
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseTheme } from '@/utils/loadTheme'

import UserInfo from './Components/UserInfo'
import theme from './Components/Theme'
import ShortcutMenu from './Components/ShortcutMenu'
import SystemConfig from './Components/SystemConfig'

export default {
  name: 'PersonalSettings',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['systemTheme']),
    menuList () {
      return this.$store.getters.asyncRouter
    },
    headerColor: () => baseTheme[this.systemTheme]
  },
  components: { UserInfo, theme, ShortcutMenu, SystemConfig }
}
</script>
<style lang="scss" scoped>
.personal-setting{

  header {
    color: #fff;
    padding:10px;
    font-size:1.3rem;
    opacity: .5;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0;

    .setting-block {
      width:80%;
      max-width:980px;
      margin-bottom:15px;

      &:last-child {
        margin-bottom:0;
      }

      h4 {
        font-size:1.1rem;
        color: darken($base-gray-color, 10%);
      }

      .settings {
        padding:10px;
        border-radius:8px;
        box-shadow: 0 3px 14px rgba(0,0,0,.15);

        .info {
          clear:both;
          margin:5px;
          padding:5px 5px 0 5px;
          color: darken($base-gray-color, 5%);
          border-top: 1px solid darken($base-light-color, 5%);
        }
      }

    }
  }
}
</style>

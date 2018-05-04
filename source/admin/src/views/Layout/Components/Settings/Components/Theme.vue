<template>
  <div class="select-theme">
    <ul>
        <li @click="changeSystemTheme('chalk')" :class="{'active': activeTheme === 'chalk'}" :style="{ background: getColor('chalk')}">Ocean</li>
        <li @click="changeSystemTheme('batman')" :class="{'active': activeTheme === 'batman'}" :style="{ background: getColor('batman')}">Batman</li>
        <li @click="changeSystemTheme('jade')" :class="{'active': activeTheme === 'jade'}" :style="{ background: getColor('jade')}">Jade</li>
        <li @click="changeSystemTheme('belles')" :class="{'active': activeTheme === 'belles'}" :style="{ background: getColor('belles')}">Belles</li>
    </ul>
  </div>
</template>
<script>
import Cookie from 'vue-cookie'
import { BASE_PER_FIX_KEY } from '@/utils/basePer'
import { loadCurrentTheme, baseTheme } from '@/utils/theme'

export default {
  name: 'Theme',
  mounted () {

  },
  computed: {
    activeTheme () {
      return this.$store.getters.systemTheme
    }
  },
  methods: {
    changeSystemTheme (theme) {
      // set theme to store
      this.$store.dispatch('setTheme', theme)
      // save cookie
      Cookie.set(`${BASE_PER_FIX_KEY}_SYSTEM_THEME`, theme, 365)
      //
      loadCurrentTheme(theme)
    },
    getColor (theme) {
      return baseTheme[theme]
    }
  }
}
</script>
<style lang="scss" scoped>
.select-theme {
   h4 {
     padding: 10px 0;
     border-bottom: 2px solid $base-light-color;
     box-sizing: border-box;
   }

   span {
     width:100%;
     padding:10px;
     display: inline-block;
     border-top: 1px solid $base-light-color;
     color: $base-gray-color;
     box-sizing: border-box;
   }

   ul {
     widows: 100% ;
     display: flex;

     li {
       width:200px;
       height: 65px;
       margin:10px;
       font-size:1.3rem;
       border-radius:5px;
       display: inherit;
       justify-content: center;
       align-items: center;
       color:#fff;
       transition: all .2s ease-in-out 0s;
       cursor: pointer;

       &.active {
          box-shadow: 0 0 15px -1px rgba(0,0,0,.2), 0 0 15px 3px rgba(0,0,0,.24);
       }

       &:hover {
         box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 15px 3px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
       }
     }
   }
}
</style>

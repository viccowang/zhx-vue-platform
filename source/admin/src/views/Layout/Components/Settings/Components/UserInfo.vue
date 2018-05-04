<template>
  <div class="user-info">
      <el-form label-width="100px">
          <el-form-item label="用户名: ">
                {{ userAccount }}
          </el-form-item>
          <el-form-item label="用户昵称: ">
               {{ userName }}
          </el-form-item>
          <el-form-item label="所属角色: ">
               {{ userRoles }}
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters(['userAccount', 'userName']),
    userRoles () {
      const roles = this.$store.getters.roles
      return roles ? roles.join(', ') : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
    .el-form-item {
        border-bottom: 1px solid $base-light-color
    }
}
</style>

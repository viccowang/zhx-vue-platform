<template>
  <el-container class="main">
      <section>
          <div class="content">抱歉!您访问的页面权限不够.请返回.</div>
          <el-button type="primary" class="gohome" @click="backToHome">回首页 :P</el-button>
      </section>
  </el-container>
</template>

<script>
export default {
  name: 'Page401',
  methods: {
    backToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  @include flexCenter;

  >section {
    display: inherit;
    @include flexCenter;
    flex-direction: column;
    width:400px;
    height:200px;
    margin-top:15%;
    background-color: darken($base-light-color, 2%);
    border-radius:15px;

    .content{
      font-size:1.7rem;
    }

    .gohome{
      margin-top:15px;
    }

  }
}
</style>

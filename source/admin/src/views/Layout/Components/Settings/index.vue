<template>
  <div class="personal-setting">
    <header>个性化配置</header>
    <section>
      <div class="setting-block">
          <h4>个人资料</h4>
          <div class="settings">

          </div>
      </div>
      <div class="setting-block">
          <h4>主题</h4>
          <div class="settings">

          </div>
      </div>
      <div class="setting-block">
          <h4>快捷菜单</h4>
          <div class="settings">

          </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'PersonalSettings',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.personal-setting{

  header {
    background-color: $base-indigo-color;
    color: #fff;
    padding:10px;
    font-size:1.3rem;
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
        box-shadow: 0 0 4px rgba(0,0,0,.15);
      }

    }
  }
}
</style>

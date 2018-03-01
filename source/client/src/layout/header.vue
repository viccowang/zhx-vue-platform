<template>
  <header class="header">
    <div id="logo"></div>
    <div class="nav">
      <ul>
        <router-link tag="li" to="/home">Home</router-link>
        <router-link tag="li" to="/history">History</router-link>
        <router-link tag="li" to="/project">Projects</router-link>
      </ul>
    </div>
  </header>
</template>

<script>

export default {
  name: 'system-header'
}
</script>

<style lang="scss" scoped>

$headerUnderLineStartColor: lighten($base-blue-color,5%);
$headerUnderLineEndColor: darken($base-blue-color,7%);

.header{
  display: flex;
  height:60px;
  background-color:lighten($base-light-color,100%);
  border-bottom:1px solid darken($base-light-color,5%);

  #logo{
    width:300px;
  }
  .nav{
    flex:1;
    font-weight: 300;

    ul{
      height:100%;
      display: flex;
      justify-content: flex-end;
      font-size:1.4rem;

      li{
        padding:0 45px;
        position: relative;
        display: inherit;
        @include flexCenter;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
          background-color: $base-light-color;
          transition:all .3s ease 0s;
        }

        &.router-link-active{
          color:$base-dark-color;
          // animation: rainbowFont 30s ease 0s;

          &::after {
            content:'';
            position:absolute;
            width:100%;
            height:4px;
            bottom:0;
            left:0;
            background-color:$headerUnderLineEndColor;
            animation: navAnimate .4s ease 0s;
            border-radius:5px;
          }
        }
      }
      @keyframes navAnimate {
        from{
          animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          background-color:$headerUnderLineStartColor;
          transform: scale(0,1)
        }
        to {
          background-color:$headerUnderLineEndColor;
          transform: scale(1,1)
        }
      }
    }
  }
}

</style>

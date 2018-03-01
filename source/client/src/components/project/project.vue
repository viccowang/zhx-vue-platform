<template>
    <div class="section-block">
      <div class="header-project">
        <swiper :options="swiperOptions">
          <swiper-slide>my project 1</swiper-slide>
          <swiper-slide>my project 2</swiper-slide>
          <swiper-slide>my project 3</swiper-slide>
          <swiper-slide>my project 4</swiper-slide>
          <swiper-slide>my project 5</swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
      <div class="project-block">
        <ul>
          <li>
            <div class="my-project">Project Image</div>
          </li>
          <li>
            <div class="my-project">Project Image</div>
          </li>
           <li>
            <div class="my-project">Project Image</div>
          </li>
           <li>
            <div class="my-project">Project Image</div>
          </li>
           <li>
            <div class="my-project">Project Image</div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>

export default {
  name: 'project',
  data () {
    return {
      swiperOptions: {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-block{
  width:100%;
  display: flex;
  flex-direction: column;

  .header-project {
    width:100%;
    height:450px;
    background-color: $base-light-color;
    // color: lighten($base-light-color, 100%);
    border-bottom:1px solid darken($base-light-color, 5%);

    > div {
      height: 100%;

      .swiper-slide {
        display: flex;
        @include flexCenter;
        font-size:2.4rem;
      }
    }
  }

  .project-block {
      display: flex;
      justify-content: center;

      ul {
        display: inherit;
        flex-wrap: wrap;
        width:90%;

        li {
          width:25%;
          height:280px;
          display: inherit;
          box-sizing:border-box;

          .my-project{
            flex:1 auto;
            display:inherit;
            @include flexCenter;
            margin:15px;
            background-color: darken($base-light-color, 5%);
            border-radius:15px;
            overflow:hidden;
          }

        }

      }
  }
}
</style>

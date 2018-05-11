<template>
  <div class="player-content">
      <h2>ZHX Vue Video Player <span>(based on VideoJs)</span></h2>
      <div class="player">
          <!-- remote MP4 -->
          <h3>Remote Video / MP4</h3>
          <video-player
            :options="playerOpts1"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @ready="playerReady($event)"
          />
      </div>
        <!-- HLS LIVE -->
      <div class="player">
          <h3>LIVE / HLS STREAM</h3>
          <video-player
            ref="videoPlayer2"
            :options="playerOpts2"
          />
      </div>
        <!-- RTMP LIVE -->
      <div class="player">
          <h3>LIVE / RTMP STREAM &nbsp;&nbsp;(目前主流直播流推荐使用HLS方式. RTMP因必须使用swf组件而不再受主流技术支持.)</h3>
          <video-player
            ref="videoPlayer3"
            :options="playerOpts3"
          />
      </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from '@/components/videoPlayer'
// rtmp直播流需要使用flash
require('videojs-flash')
// HLS 直播流需要使用videojs-contrib-hls plugin
require('videojs-contrib-hls')

export default {
  name: 'VideoPlayer',
  data () {
    return {
      playerOpts1: {
        autoplay: false,
        muted: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: '//vjs.zencdn.net/v/oceans.mp4'
        }],
        poster: '//vjs.zencdn.net/v/oceans.png'
      },
      playerOpts2: {
        autoplay: false,
        preload: 'none',
        muted: true,
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
          // src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        poster: '//imgs.aixifan.com/live/1507369421878/1507369421878.jpg'
      },
      playerOpts3: {
        autoplay: false,
        preload: 'none',
        muted: true,
        // rtmp 必须指定techOrder 为 flash
        techOrder: ['flash'],
        sources: [{
          type: 'rtmp/mp4',
          src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks'
        }],
        poster: '//dl.bizhi.sogou.com/images/2012/04/07/145326.jpg'
      }
    }
  },
  methods: {
    onPlayerPlay (player) {
    //   this.maxWindow(true)
    },
    onPlayerPause (palyer) {
    //   this.maxWindow(false)
    },
    onPlayerEnded (player) {
    //   this.maxWindow(false)
    },
    playerReady (player) {

    },
    maxWindow (state) {
      this.$store.dispatch('maxWindow', state)
      this.$store.dispatch('hideSidebar', state)
    }
  },
  components: { videoPlayer }
}
</script>
<style lang="scss" scoped>
.player-content {
    display: flex;
    flex-direction: column;
    width:100%;
    padding: 50px 0;
    align-items: center;
    box-sizing: border-box;
    background: darken($base-dark-color, 5%);

    h2 {
        width:90%;
        max-width:1000px;
        margin: 15px 0;
        padding-bottom:25px;
        text-align: left;
        color: #fff;
        font-weight:100;
        font-size:3rem;
        text-align: left;
        border-bottom: 1px solid darken($base-light-color, 75%);

        span {
            font-size:1.5rem;
        }
    }

    .player{
        width:90%;
        max-width:1000px;
        margin: 25px 0;
        color: darken( $base-light-color, 10%);

        .video-player {
            box-shadow: 0 10px 35px rgba(0,0,0,.7)
        }

    }

}
</style>

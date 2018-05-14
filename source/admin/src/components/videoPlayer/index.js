/**
 * Vue-Video-Player
 * Base on Vue-Video-Player
 * Original: https://github.com/surmon-china/vue-video-player
 * Author: surmon@foxmail.com
 * Modified: Vicco.Wang
 * Date: 2018.05.05
 *
 */
import _videojs from 'video.js'
import videoPlayer from './player.vue'
import { zh } from './lang/zh'
const videojs = window.videojs || _videojs
// add zh-cn language
videojs.addLanguage('zh', zh)
// set default options
videojs.options.language = 'zh'
// set default local swf location
// videojs.options.flash.swf = './static/videoPlayer/video-js.swf'

const install = function (Vue, config) {
  if (config) {
    if (config.options) {
      videoPlayer.props.globalOptions.default = () => config.options
    }
    if (config.events) {
      videoPlayer.props.globalEvents.default = () => config.events
    }
  }
  Vue.component(videoPlayer.name, videoPlayer)
}

const VueVideoPlayer = { videojs, videoPlayer, install }

export default VueVideoPlayer
export { videojs, videoPlayer, install }

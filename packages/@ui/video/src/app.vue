<template>
<video ref="videoPlayer"
    class="video-js vjs-fluid tm-video"
    x5-playsinline
    x-webkit-airplay
    webkit-playsinline
    playsinline>
</video>
</template>

<script>
/**
 * 实现功能
 * 1. 同步/异步 src
 * 2. 监听 play 属性播放/暂停
 */
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
import { linkWeixinBridge, isWeixinBrowser } from 'web-util/tool/src/main'

export default {
    name: 'TmVideo',
    props: {
        src: String,
        cover: String,
        autoplay: Boolean,
        options: {
            type: Object,
            default () {
                return {}
            },
        },
    },

    data () {
        return {
            player: null,
            ready: false,
        }
    },

    watch: {
    },

    mounted () {
        this.setup()
        this.init(this.src)

        this.$watch('src', this.init)
    },

    methods: {
        setup () {
            const _options = Object.assign({}, {
                preload: 'auto',
                muted: false,
                controls: true,
                autoplay: this.autoplay,
            }, this.options)
            this.player = videojs(this.$refs.videoPlayer, _options, () => {
                console.log('video setup', this.player)
            })
            this.player.on('play', () => {
                this.$emit('play', this.src, this.player)
            })
            this.player.on('pause', () => {
                this.$emit('pause', this.src, this.player)
            })
            this.player.on('ended', () => {
                this.$emit('ended', this.src, this.player)
            })
        },
        init (src) {
            if (!src) return

            this.ready = false

            const type = src.endsWith('m3u8') ? 'application/x-mpegURL' : 'video/mp4'
            this.player.src({ type, src })
            this.player.poster(this.cover)

            this.player.ready(async () => {
                console.log('video ready', this.player)
                this.ready = true
                this.$emit('ready', src, this.player)

                // 自动播放
                if (this.autoplay && this.player.paused()) {
                    if (isWeixinBrowser()) {
                        await linkWeixinBridge()
                    }
                    this.player.play()
                }
            })
        },
    },

    beforeDestroy () {
        if (this.player) {
            this.player.dispose()
        }
    },
}
</script>

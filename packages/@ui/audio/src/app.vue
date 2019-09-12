<template>
<audio ref="videoPlayer" class="video-js"></audio>
</template>

<script>
/**
 * 实现功能
 * 1. 同步/异步 src
 * 2. 监听 play 属性播放/暂停
 * 3. 监听 value 属性设置播放进度
 */
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { linkWeixinBridge, isWeixinBrowser } from 'web-util/tool/src/main'

export default {
    name: 'TmAudio',
    props: {
        play: {
            type: Boolean,
            default: false,
        },
        src: String,
        // 播放进度
        value: {
            type: Number,
            default: 0,
        },
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
            currentPlay: this.play,
            currentValue: this.value,
            ready: false,
        }
    },

    watch: {
        play (val) {
            this.currentPlay = val
        },
    },

    mounted () {
        this.setup()
        this.init(this.src)

        this.$watch('src', this.init)
        // 以下音频属性这里不管是否设置成功，在 ready 事件中会再次设置
        this.$watch('currentPlay', (val) => {
            this.$emit('update:play', val)

            // 估计音频内部会保留 play 事件状态，但不会保留 pause 事件
            // 所以如果在音频未就绪的情况下执行播放/暂停，可能会导致状态不一致，需禁止
            // 在 ready 事件中根据属性执行自动播放
            if (!this.ready) return
            val ? this.player.play() : this.player.pause()
        })
        this.$watch('value', (val) => {
            if (val !== this.currentValue) {
                this.player.currentTime(val)
            }
        })
    },

    methods: {
        setup () {
            const _options = Object.assign({}, {
                preload: 'auto',
                height: 0,
                muted: false,
                autoplay: this.currentPlay,
            }, this.options)
            this.player = videojs(this.$refs.videoPlayer, _options, () => {
                console.log('audio setup')
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
            this.player.on('canplay', () => {
                this.player.currentTime(this.currentValue)
            })
            // 播放中，持续触发
            this.player.on('timeupdate', () => {
                const currentTime = this.player.currentTime()
                this.currentValue = currentTime
                this.$emit('input', currentTime)
            })
        },
        init (src) {
            if (!src) return

            this.ready = false
            this.player.src({ src, type: 'audio/mp3' })
            this.player.ready(async () => {
                this.ready = true
                this.$emit('ready', src, this.player)
                // ios 音频没有就绪的时候，设置播放位置是无效的（readyState < 3）
                // 改为在 canplay 事件中设置进度
                // this.player.currentTime(this.currentValue)

                // 自动播放
                if (this.currentPlay && this.player.paused()) {
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

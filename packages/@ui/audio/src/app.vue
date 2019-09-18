<template>
<audio ref="videoPlayer" class="video-js tm-audio"></audio>
</template>

<script>
/**
 * 实现功能
 * 1. 同步/异步 src
 * 2. 监听 play 属性播放/暂停
 * 3. 监听 value 属性设置播放进度
 */
import videojs from 'video.js'
import { linkWeixinBridge, isWeixinBrowser } from 'web-util/tool/src/main'
const PLAYBACK_RATE = [0.5, 1, 1.5, 2]

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
        playbackRate: {
            type: Number,
            default: 1,
        },
    },

    data () {
        return {
            player: null,
            currentPlay: this.play,
            currentValue: this.value,
            cacheValue: this.value, // 为了在 value change 事件中判断是否需要更新音频进度
            ready: false,
        }
    },

    watch: {
        play (val) {
            this.currentPlay = val
        },
        value (val) {
            this.currentValue = val
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
        this.$watch('currentValue', val => {
            if (val !== this.cacheValue) {
                this.player.currentTime(val)
            }
        })
        this.$watch('playbackRate', val => {
            this.player.playbackRate(val)
        })
    },

    methods: {
        reload () {
            if (!this.ready) return

            this.player.pause()
            this.init(this.src)
            this.$once('ready', () => {
                this.currentValue = 0
            })
        },
        setup () {
            const _options = Object.assign({}, {
                preload: 'auto',
                height: 0,
                muted: false,
                controls: true,
                autoplay: false,
                playbackRates: PLAYBACK_RATE,
                loadingSpinner: false,
                children: {},
            }, this.options)
            this.player = videojs(this.$refs.videoPlayer, _options, () => {
                console.log('audio setup')
            })
            this.player.on('play', () => {
                console.log('audio play')
                this.$emit('play', this.src, this.player)
            })
            this.player.on('pause', () => {
                console.log('audio pause')
                this.$emit('pause', this.src, this.player)
            })
            this.player.on('ended', () => {
                this.$emit('ended', this.src, this.player)
                this.currentPlay = false
                this.player.currentTime(0)
            })
            this.player.on('canplay', () => {
                // fix 多次触发
                if (!this.canplay) {
                    this.player.currentTime(this.currentValue)
                }
                this.canplay = true
            })
            // 播放中，持续触发
            this.player.on('timeupdate', () => {
                const currentTime = this.player.currentTime()
                this.cacheValue = currentTime
                this.$emit('input', currentTime)
                this.$emit('timeupdate', currentTime)
            })
            this.player.on('error', (event) => {
                console.error('audio error', event)
                this.$emit('error', `音频播放异常: ${this.src}`)
            })
        },
        init (src) {
            if (!src) return

            const type = src.endsWith('m3u8') ? 'application/x-mpegURL' : 'audio/mp3'
            const actualInit = () => {
                this.ready = false
                this.canplay = false
                this.player.src({ type, src })

                this.player.ready(async () => {
                    console.log('audio ready')
                    this.ready = true
                    this.$emit('ready', src, this.player)
                    // ios 音频没有就绪的时候，设置播放位置是无效的（readyState < 3）
                    // 改为在 canplay 事件中设置进度
                    // this.player.currentTime(this.currentValue)
                    this.player.playbackRate(this.playbackRate)

                    // 自动播放
                    if (this.currentPlay && this.player.paused()) {
                        if (isWeixinBrowser()) {
                            await linkWeixinBridge()
                        }
                        this.player.play()
                    }
                })
            }

            // fix: 第一次自动播放 m3u8 格式异常
            // 等一个mp3文件 ready 之后设置真实地址
            if (!this.ready && type === 'application/x-mpegURL') {
                this.player.src({
                    type: 'audio/mp3',
                    src: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz',
                })

                this.player.ready(actualInit)
            } else {
                actualInit()
            }
        },
    },

    beforeDestroy () {
        if (this.player) {
            this.player.dispose()
        }
    },
}
</script>

<style lang="scss">
@import '~video.js/dist/video-js.css';
</style>

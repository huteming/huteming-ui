<template>
<div class="tm-audio-player">
    <TmRange v-model="styleCurrentTime" :max="duration" @change="handleRangeChange" @moving="handleRangeMoving" v-bind="$attrs" />

    <TmAudio
        ref="audio"
        :play.sync="currentPlay"
        v-model="mediaCurrentTime"
        :src="currentSrc"
        :playback-rate="extra.playbackRate"
        @timeupdate="handleMediaChange"
        @ready="handleReady"
        @ended="handleEnded" />
</div>
</template>

<script>
import TmAudio from 'web-ui/audio/index'
import TmRange from 'web-ui/range/index'

export default {
    name: 'TmAudioPlayer',
    props: {
        // [{ src, duration, currentTime }]
        sources: {
            type: Array,
            required: true,
        },
        play: {
            type: Boolean,
            default: false,
        },
        continuous: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            // 当前播放时间
            mediaCurrentTime: 0,
            styleCurrentTime: 0,
            duration: 0,

            moving: false,
            media: null,

            // 对应 playList 中的 src
            // 不用 index 是为了方便外部改变显示顺序，否则必须必须保持两者顺序一致
            currentPlay: this.play,
            currentSrc: '',

            extra: {
                playbackRate: 1,
            },
        }
    },

    computed: {
        playList () {
            return this.sources.map(item => {
                const { src, currentTime, duration } = item
                return {
                    src,
                    currentTime: Number(currentTime) || 0,
                    duration: Number(duration) || 0,
                }
            })
        },
    },

    watch: {
        play (val) {
            this.currentPlay = val
        },
        currentPlay (val) {
            this.$emit('update:play', val)
        },
    },

    mounted () {
        this.init()

        this.$watch('playList', () => {
            this.init()
        })
    },

    methods: {
        next () {
            const index = this.playList.findIndex(item => item.src === this.currentSrc)
            if (index >= this.playList.length - 1) {
                this.$emit('error-next')
                return false
            }

            this.init(index + 1)
            return true
        },
        prev () {
            const index = this.playList.findIndex(item => item.src === this.currentSrc)
            if (index <= 0) {
                this.$emit('error-prev')
                return false
            }

            this.init(index - 1)
            return true
        },
        // 参数不合法时，设置为下一个
        setRate (playRate) {
            const ranges = [0.5, 1, 1.5, 2]

            if (!ranges.includes(playRate)) {
                const oldRate = this.extra.playbackRate
                const oldIndex = ranges.indexOf(oldRate)
                const newIndex = oldIndex >= (ranges.length - 1) ? 0 : oldIndex + 1
                playRate = ranges[newIndex]
            }

            this.set('playbackRate', playRate)
            return playRate
        },
        set (key, value) {
            this.extra[key] = value
            return value
        },
        // -------------------------------------- 分隔线 --------------------------------------
        async handleEnded () {
            if (!this.continuous) return
            await this.$nextTick()

            const valid = this.next()
            this.currentPlay = valid
        },
        handleReady (src, player) {
            const { currentTime, duration } = this.playList.find(item => item.src === src)
            this.$emit('ready', {
                src,
                currentTime,
                duration,
            })
        },
        handleRangeMoving (_isMoving) {
            this.moving = _isMoving
        },
        handleMediaChange (_currentTime) {
            this.$emit('timeupdate', _currentTime)
            // console.log('media change --- ', _currentTime, 'moving: ', this.moving)
            if (!this.moving) {
                this.styleCurrentTime = _currentTime
            }
        },
        handleRangeChange (_currentTime) {
            // console.log('style change --- ', _currentTime)
            this.mediaCurrentTime = _currentTime
        },
        async init (index = 0) {
            if (!this.playList.length) return

            const { src, duration, currentTime } = this.playList[index]
            const needUpdateSrc = (!this.currentSrc && src) || (this.currentSrc && src && src !== this.currentSrc)

            if (!needUpdateSrc) return

            this.duration = duration
            this.mediaCurrentTime = currentTime
            this.styleCurrentTime = currentTime
            this.currentSrc = src
            // await this.$nextTick()
        },
    },

    components: {
        TmAudio,
        TmRange,
    },
}
</script>

<template>
<div class="tm-mp3">
    <TmRange v-model="styleCurrentTime" :max="duration" @change="handleRangeChange" @moving="handleRangeMoving" :disabled="!isReady" v-bind="$attrs" />

    <TmAudio
        ref="audio"
        :src="currentSrc"
        :duration="duration"
        v-model="mediaCurrentTime"
        @change="handleMediaChange"
        @ready="handleReady"
        @state-change="handleStateChange" />
</div>
</template>

<script>
import TmAudio from 'web-ui/audio/index'
import TmRange from 'web-ui/range/index'

export default {
    name: 'TmMp3',

    props: {
        // [{ src, duration, currentTime }]
        list: {
            type: Array,
            required: true,
        },
        // boolean: 播放/暂停当前音频
        // string: 播放指定地址音频
        play: {
            type: [Boolean, String],
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
            isReady: false,
            media: null,

            // 对应 playList 中的 src
            // 不用 index 是为了方便外部改变显示顺序，否则必须必须保持两者顺序一致
            // 初始不设置为 play 是为了产生一次交互
            currentSrc: '',
        }
    },

    computed: {
        playList () {
            return this.list.concat()
        },
    },

    watch: {
        playList () {
            this.init()
        },
        styleCurrentTime (val, oldVal) {
            this.$emit('change', val, {
                src: this.currentSrc,
                duration: this.duration,
                currentTime: val,
            })
        },
    },

    mounted () {
        this.media = this.$refs.audio
        this.init()

        this.$watch('play', val => {
            val ? this.playAudio() : this.pauseAudio()
        })
    },

    methods: {
        async reload () {
            if (this.media && this.media.audio) {
                this.media.audio.load()
                await this.media.play(0)

                if (!this.play) {
                    await this.media.pause()
                }
            }
        },
        // 参数不合法时，设置为下一个
        setRate (playRate) {
            const ranges = [0.5, 1, 2]

            if (!ranges.includes(playRate)) {
                const oldRate = this.getValue('playbackRate')
                const oldIndex = ranges.indexOf(oldRate)
                const newIndex = oldIndex >= (ranges.length - 1) ? 0 : oldIndex + 1
                playRate = ranges[newIndex]
            }

            this.setValue('playbackRate', playRate)
            return playRate
        },
        next () {
            const index = this.playList.findIndex(item => item.src === this.currentSrc)
            if (index >= this.playList.length - 1) {
                this.$emit('error-next')
                return false
            }

            this.init(this.playList[index + 1])
            return true
        },
        prev () {
            const index = this.playList.findIndex(item => item.src === this.currentSrc)
            if (index <= 0) {
                this.$emit('error-prev')
                return false
            }

            this.init(this.playList[index - 1])
            return true
        },
        setValue (key, value) {
            this.media && this.media.audio && (this.media.audio[key] = value)
        },
        getValue (key) {
            return this.media && this.media.audio && this.media.audio[key]
        },
        // -------------------------------------- 分隔线 --------------------------------------
        handleStateChange (_state) {
            if (_state === 'ended') {
                if (!this.continuous) {
                    this.$emit('update:play', false)
                    this.$emit('ended')
                    return
                }
                const result = this.next()
                if (!result) {
                    this.$emit('update:play', false)
                    this.$emit('ended')
                }
            }
        },
        // 一定在 init src 之后才有可能触发该事件
        handleReady () {
            this.isReady = true
            this.$emit('ready')

            if (this.play) {
                this.playAudio()
            }
        },
        handleRangeMoving (_isMoving) {
            this.moving = _isMoving
        },
        handleMediaChange (_currentTime) {
            console.log('media change --- ', _currentTime, 'moving: ', this.moving)
            if (!this.moving) {
                this.styleCurrentTime = _currentTime
            }
        },
        handleRangeChange (_currentTime) {
            console.log('style change --- ', _currentTime)
            this.mediaCurrentTime = _currentTime
        },
        playAudio () {
            const _play = async () => {
                const valid = await this.media.play()
                // 播放失败，事件通知
                if (!valid) {
                    this.$emit('update:play', false)
                }
            }

            // 播放当前地址
            if ((this.play === true && this.currentSrc) || this.play === this.currentSrc) {
                return _play()
            }

            // 先初始化音频源
            const item = this.playList.find(item => item.src === this.play)
            if (item) {
                this.isReady = false
                this.init(item)
                this.$once('ready', _play)
            }
        },
        pauseAudio () {
            this.media.pause()
        },
        init (item) {
            if (!this.playList.length || !this.media) return

            let { src, duration, currentTime } = item || this.playList[0]
            duration = Number(duration)
            currentTime = Number(currentTime) || 0

            if (this.currentSrc && src === this.currentSrc) return

            this.currentSrc = src
            this.duration = duration
            this.mediaCurrentTime = currentTime
            this.styleCurrentTime = currentTime

            this.$emit('init', {
                src,
                duration,
                currentTime,
            })
        },
    },

    components: {
        TmAudio,
        TmRange,
    },
}
</script>

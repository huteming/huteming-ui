<template>
<div class="tm-audio">
    <TmRange v-model="styleCurrentTime" :max="duration" @change="handleRangeChange" @moving="handleRangeMoving" :disabled="!ready" v-bind="$attrs" />

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
        play: {
            type: [Boolean, String],
            default: false,
        },
    },

    data () {
        return {
            // 当前播放时间
            mediaCurrentTime: 0,
            styleCurrentTime: 0,
            duration: 0,

            moving: false,
            ready: false,
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
            if (index >= this.playList.length - 1) return

            this.init(this.playList[index + 1])
        },
        prev () {
            const index = this.playList.findIndex(item => item.src === this.currentSrc)
            if (index <= 0) return

            this.init(this.playList[index - 1])
        },
        // -------------------------------------- 分隔线 --------------------------------------
        playAudio () {
            if (this.play === true) {
                this.media.play()
                return
            }

            const item = this.playList.find(item => item.src === this.play)
            if (item) {
                this.ready = false
                this.init(item)
            }
        },
        pauseAudio () {
            this.media.pause()
        },
        setValue (key, value) {
            this.media && this.media.audio && (this.media.audio[key] = value)
        },
        getValue (key) {
            return this.media && this.media.audio && this.media.audio[key]
        },
        init (item) {
            if (!this.playList.length || !this.media) return

            let { src, duration, currentTime } = item || this.playList[0]
            duration = Number(duration)
            currentTime = Number(currentTime) || 0

            this.currentSrc = src
            this.duration = duration
            this.mediaCurrentTime = currentTime
            this.styleCurrentTime = currentTime

            this.$emit('next', {
                src,
                duration,
                currentTime,
            })
        },
        handleStateChange (...args) {
            this.$emit('state-change', ...args)
        },
        async handleReady () {
            this.ready = true

            if (this.play) {
                const valid = await this.media.play()
                if (!valid) {
                    this.$emit('update:play', false)
                }
            }
        },
        handleRangeMoving (_isMoving) {
            this.moving = _isMoving
        },
        handleMediaChange (_currentTime) {
            console.log('media change --- ', _currentTime, 'moving: ', this.moving)
            if (!this.moving) {
                this.styleCurrentTime = _currentTime

                this.$emit('change', _currentTime, {
                    src: this.currentSrc,
                    duration: this.duration,
                    currentTime: _currentTime,
                })
            }
        },
        handleRangeChange (_currentTime) {
            console.log('style change --- ', _currentTime)
            this.mediaCurrentTime = _currentTime
        },
    },

    components: {
        TmAudio,
        TmRange,
    },
}
</script>

<style lang="scss" scoped>
.tm-audio {
    width: 100%;
}
</style>

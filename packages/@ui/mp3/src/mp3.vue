<template>
<div class="tm-audio">
    <TmRange v-model="styleCurrentTime" :max="Number(duration)" @change="handleRangeChange" @moving="handleRangeMoving" :disabled="!ready" v-bind="$attrs" />

    <TmAudio
        ref="audio"
        :src="src"
        :duration="duration"
        v-model="mediaCurrentTime"
        v-bind="$attrs"
        @state-change="handleStateChange"
        @ready="handleReady" />
</div>
</template>

<script>
import TmAudio from 'web-ui/audio/index'
import TmRange from 'web-ui/range/index'

export default {
    name: 'TmMp3',

    props: {
        src: String,
        value: Number,
        duration: {
            type: [String, Number],
            default: 0,
        },
    },

    data () {
        return {
            // 当前播放时间
            mediaCurrentTime: this.value,
            styleCurrentTime: this.value,

            moving: false,
            ready: false,
            media: null,
        }
    },

    computed: {
    },

    watch: {
        value (val) {
            console.log('value change: ', val)
            console.log('moving: ', this.moving)
            this.styleCurrentTime = val
            if (!this.moving) {
                this.mediaCurrentTime = val
            }
        },
        styleCurrentTime (val) {
            console.log('style change: ', val)
            this.$emit('input', val)
        },
        mediaCurrentTime (val) {
            console.log('media change: ', val)
            if (!this.moving) {
                this.$emit('input', val)
            }
        },
    },

    mounted () {
        this.media = this.$refs.audio
        this.isMounted = true
        this.onReady()
    },

    methods: {
        // 供外部调用
        // todo: 如果音频未准备好，延迟执行
        exec (handle, ...args) {
            if (this.isMounted && this.ready) {
                this.media[handle](...args)
            } else {
                this.$once('ready', async () => {
                    await this.$nextTick()
                    this.media[handle](...args)
                })
            }
        },
        // 供外部调用
        // todo: 如果音频未准备好，延迟执行
        setValue (key, value) {
            this.media && this.media.audio && (this.media.audio[key] = value)
        },
        // 供外部调用
        // todo: 如果音频未准备好，延迟执行
        getValue (key) {
            return this.media && this.media.audio && this.media.audio[key]
        },
        handleReady () {
            this.ready = true
            this.onReady()
        },
        handleRangeMoving (_isMoving) {
            this.moving = _isMoving
        },
        handleRangeChange (_currentTime) {
            this.mediaCurrentTime = _currentTime
        },
        handleStateChange (...args) {
            const [_state] = args

            if (_state === 'ended') {
                this.mediaCurrentTime = 0
            }

            this.$emit('state-change', ...args)
        },
        onReady () {
            if (this.ready && this.isMounted) {
                this.$emit('ready')
            }
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

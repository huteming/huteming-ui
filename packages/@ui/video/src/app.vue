<template>
<video
    ref="video"
    :src="src"
    preload="auto"
    :x5-playsinline="inline"
    :x-webkit-airplay="inline"
    :webkit-playsinline="inline"
    :playsinline="inline"
    :controls="controls"
    :poster="cover"
    :style="styleVideo"
    @playing="handlePlaying"
    @pause="handlePause"
    @ended="handleEnd">
    <source :src="src" type="video/mp4">
    <source :src="src" type="video/ogg">
    Your browser does not support the video tag.
</video>
</template>

<script>
export default {
    name: 'TmVideo',

    props: {
        src: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '100%',
        },
        inline: {
            type: Boolean,
            default: true,
        },
        controls: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            state: 'load', // load, playing, pause, ended

            video: null,
            ready: false,
        }
    },

    computed: {
        styleVideo () {
            return {
                width: this.width,
                height: this.height,
            }
        },
    },

    watch: {
        src (val) {
            if (val) {
                this.ready = false
                this.$refs.video.load()
                this.already()
            }
        },
        state (val) {
            this.$emit('state-change', val)
        },
    },

    mounted () {
        this.video = this.$refs.video
        if (this.src) {
            this.already()
        }
    },

    methods: {
        toggle () {
            this.state === 'playing' ? this.pause() : this.play()
        },
        async play () {
            if (!this.video) return

            try {
                await this.video.play()
                return true
            } catch (err) {
                // 这里的播放如果不是交互引起的，会出现异常 Uncaught (in promise) DOMException
                process.env.NODE_ENV === 'development' && console.error('video play error: ', err)
                return false
            }
        },
        async pause () {
            if (!this.video) return

            await this.video.pause()
        },
        handlePlaying () {
            this.state = 'playing'
        },
        handlePause () {
            if (this.video.ended) return

            console.log('pause')
            this.state = 'pause'
            // 外部谨慎监听暂停事件
            // 在拖动进度条时，也会先触发暂停事件
        },
        handleEnd () {
            console.log('ended')
            this.state = 'ended'
        },
        async already () {
            if (this.ready) return
            this.ready = true

            await this.$nextTick()

            this.$emit('ready')
        },
    },
}
</script>

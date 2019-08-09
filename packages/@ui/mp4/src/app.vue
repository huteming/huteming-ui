<template>
<div class="tm-mp4" @click.stop="handleClick">
    <TmVideo :src="currentSrc" :cover="currentCover" :controls="controls" @state-change="handleStateChange" @ready="handleReady" ref="video" />

    <TmIcon data-name="play" icon="play" class="tm-mp4-controls tm-mp4-controls__icon" v-show="state === 'load'" />
    <div class="tm-mp4-controls tm-mp4-controls-wrap" v-show="state === 'ended'">
        <TmIcon data-name="prev" icon="skip_previous" class="tm-mp4-controls__icon" />
        <TmIcon data-name="replay" icon="replay" class="tm-mp4-controls__icon" />
        <TmIcon data-name="next" icon="skip_next" class="tm-mp4-controls__icon" />
    </div>
</div>
</template>

<script>
import TmVideo from 'web-ui/video/index'
import TmIcon from 'web-ui/icon/index'

export default {
    name: 'TmMp4',

    props: {
        // [{ src, cover }]
        list: {
            type: Array,
            required: true,
        },
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
            currentSrc: '',
            currentCover: '',
            media: null,
            state: 'load', // load, playing, pause, ended
            ready: false,
            expectToPlay: false,
        }
    },

    computed: {
        playList () {
            return this.list.concat()
        },
        controls () {
            return ['playing', 'pause'].includes(this.state)
        },
    },

    watch: {
        playList () {
            this.init()
        },
    },

    mounted () {
        this.media = this.$refs.video
        this.init()

        this.$watch('play', val => {
            val ? this.playVideo() : this.pauseVideo()
        })
    },

    methods: {
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
        // -------------------------------------- 分隔线 --------------------------------------
        handleStateChange (_state) {
            if (_state === 'ended') {
                const endVideo = () => {
                    this.$emit('update:play', false)
                    this.$emit('ended')
                }

                if (!this.continuous) {
                    endVideo()
                } else {
                    const result = this.next()
                    if (!result) {
                        endVideo()
                    }
                }
            } else {
                this.$emit('update:play', _state === 'playing')
            }

            this.state = _state
            console.log('state-change', _state, this.state)
        },
        async handleReady () {
            this.ready = true

            if (this.play || this.expectToPlay) {
                this.expectToPlay = false
                const valid = await this.media.play()
                if (!valid) {
                    this.$emit('update:play', false)
                }
            }
        },
        handleClick (event) {
            const name = event.target.dataset.name
            const handlers = {
                play: this.handlePlay,
                prev: this.prev,
                next: this.next,
                replay: () => {
                    if (this.continuout && this.playList.length === 1) {
                        this.init()
                        return true
                    }
                    this.media.video.load()
                    return true
                },
            }
            const fn = handlers[name]
            if (typeof fn === 'function') {
                const result = fn()
                if (result) {
                    this.handlePlay()
                }
            }
        },
        async handlePlay () {
            if (this.ready) {
                this.media.play()
                return
            }
            this.expectToPlay = true
        },
        init (item) {
            if (!this.playList.length || !this.media) {
                return false
            }

            this.ready = false
            let { src, cover } = item || this.playList[0]

            this.currentSrc = src
            this.currentCover = cover

            this.$emit('init', {
                src,
                cover,
            })

            return true
        },
        async playVideo () {
            if (this.play === true || this.play === this.currentSrc) {
                this.media.play()
                return
            }

            const item = this.playList.find(item => item.src === this.play)
            if (item) {
                this.init(item)
            }
        },
        async pauseVideo () {
            await this.media.pause()
        },
    },

    components: {
        TmVideo,
        TmIcon,
    },
}
</script>

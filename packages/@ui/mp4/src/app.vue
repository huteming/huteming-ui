<template>
<div class="tm-mp4" :style="styles">
    <div class="tm-mp4-container">
        <TmVideo :src="currentSrc" :cover="currentCover" :controls="controls" @state-change="handleStateChange" @ready="handleReady" ref="video" />
    </div>

    <div class="tm-mp4-controls" :class="{ 'layer': state === 'ended' }" v-if="state === 'loading' || state === 'ended'">
        <template v-if="state === 'loading'">
            <div class="tm-mp4-controls-group circle" @click.stop="handleClick('play')">
                <div class="tm-mp4-controls__icon">
                    <TmIcon icon="play" />
                </div>
            </div>
        </template>

        <template v-if="state === 'ended'">
            <div class="tm-mp4-controls-group" @click.stop="handleClick('prev')">
                <div class="tm-mp4-controls__text">{{ prevText }}</div>

                <div class="tm-mp4-controls__icon">
                    <TmIcon icon="skip_previous" />
                </div>
            </div>
            <div class="tm-mp4-controls-group" @click.stop="handleClick('replay')">
                <div class="tm-mp4-controls__text">{{ replayText }}</div>

                <div class="tm-mp4-controls__icon">
                    <TmIcon icon="replay" />
                </div>
            </div>
            <div class="tm-mp4-controls-group" @click.stop="handleClick('next')">
                <div class="tm-mp4-controls__text">{{ nextText }}</div>

                <div class="tm-mp4-controls__icon">
                    <TmIcon icon="skip_next" />
                </div>
            </div>
        </template>
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
        // 设置宽高可以避免页面布局抖动
        width: String,
        height: String,
        prevText: {
            type: String,
            default: '上一个',
        },
        replayText: {
            type: String,
            default: '重播',
        },
        nextText: {
            type: String,
            default: '下一个'
        },
    },

    data () {
        return {
            currentSrc: '',
            currentCover: '',
            media: null,
            state: 'loading', // loading, playing, pause, ended
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
        styles () {
            return {
                width: this.width,
                height: this.height,
            }
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

                const index = this.playList.findIndex(item => item.src === this.currentSrc)
                const isTheLast = index === this.playList.length - 1

                if (!this.continuous || isTheLast) {
                    endVideo()
                } else {
                    this.next()
                }
            } else {
                this.$emit('update:play', _state === 'playing')
            }

            this.state = _state
            console.log('state-change', _state)
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
        handleClick (name) {
            const handlers = {
                play: this.handlePlay,
                prev: this.prev,
                next: this.next,
                replay: () => {
                    if ((this.continuous && this.playList.length === 1) || !this.continuous) {
                        return true
                    }
                    this.init()
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

            this.$emit('click', name)
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

            const { src, cover } = item || this.playList[0]

            if (src === this.currentSrc) {
                return false
            }

            this.ready = false
            this.currentSrc = src
            this.currentCover = cover

            if (this.state === 'ended') {
                this.state = 'loading'
            }

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

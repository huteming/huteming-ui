<template>
<div class="tm-mp4">
    <div class="tm-mp4-container">
        <TmVideo
            :src="currentSrc" :cover="currentCover"
            :controls="controls" @state-change="handleStateChange" @ready="handleReady"
            @error="handleError"
            v-bind="$attrs" ref="video" />
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
import { isWeixinBrowser, linkWeixinBridge } from 'web-util/tool/src/main'

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
        // 列表是否自动开始播放，区别于 vidieo 的 autoplay
        autoplay: {
            type: Boolean,
            default: false,
        },
        // 设置宽高可以避免页面布局抖动
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
            currentPlay: false,
            currentSrc: '',
            currentCover: '',
            media: null,
            state: 'loading', // loading, playing, pause, ended
            // 是否第一次初始化，应用 autoplay
            isFirstTimeReady: true,
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

    mounted () {
        this.media = this.$refs.video
        this.currentPlay = this.play
        this.init()

        this.$watch('play', val => {
            this.currentPlay = val
        })
        this.$watch('currentPlay', val => {
            this.$emit('update:play', val)

            if (val === false) {
                return this.pauseVideo()
            }

            if (val === true) {
                return this.playVideo()
            }

            // 先初始化音频源
            const item = this.playList.find(item => item.src === val)
            if (item) {
                this.init(item)
            }
        })
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
        // 内部改变状态
        handleStateChange (_state) {
            if (_state === 'ended') {
                const endVideo = () => {
                    this.currentPlay = false
                    this.state = 'ended'
                    this.$emit('ended')
                }

                const index = this.playList.findIndex(item => item.src === this.currentSrc)
                const isTheLast = index === this.playList.length - 1

                if (!this.continuous || isTheLast) {
                    endVideo()
                } else {
                    this.next()
                }
                return
            }

            this.currentPlay = _state === 'playing'
            this.state = _state
        },
        // 手动触发改变状态
        handleClick (name) {
            const handlers = {
                play: () => (true),
                prev: this.prev,
                next: this.next,
                replay: () => {
                    if (this.continuous && this.playList.length > 1) {
                        this.init()
                    }
                    return true
                },
            }

            // 上一个，下一个 有可能失败，此时不需要开始播放
            const valid = handlers[name]()
            if (valid) {
                this.currentPlay = true
                this.state = 'playing'
            }

            this.$emit('click', name)
        },
        async handleReady () {
            this.$emit('ready')

            // 调用微信浏览器方法 自动播放
            if (this.autoplay && this.isFirstTimeReady && isWeixinBrowser()) {
                await linkWeixinBridge()
                this.playVideo()
            } else if (this.currentPlay) {
                this.playVideo()
            }

            this.isFirstTimeReady = false
        },
        handleError (err) {
            this.$emit('error', `当前地址(${this.currentSrc})播放异常(${err.message})`)
        },
        init (item) {
            if (!this.playList.length || !this.media) {
                return false
            }

            const { src, cover } = item || this.playList[0]
            const needToResetCover = cover !== this.currentCover
            const needToResetSrc = src !== this.currentSrc

            if (!needToResetCover && !needToResetSrc) return

            this.currentSrc = src
            this.currentCover = cover

            this.$emit('init', {
                src,
                cover,
            })
        },
        async playVideo () {
            const valid = await this.media.play()
            // 播放失败，事件通知
            if (!valid) {
                this.currentPlay = false
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

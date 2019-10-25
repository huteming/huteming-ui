<template>
<video ref="videoPlayer"
    class="video-js tm-video-player"
    x5-playsinline
    x-webkit-airplay
    webkit-playsinline
    playsinline>
</video>
</template>

<script>
/**
 * 实现功能
 * 1. 同步/异步 src
 */
import videojs from 'video.js'
import { linkWeixinBridge, isWeixinBrowser, isAndroid } from 'web-util/tool/src/main'
import { createButton, createContainer } from './helper/index'

export default {
    name: 'TmVideoPlayer',
    props: {
        // [{ src, cover, currentTime }]
        sources: {
            type: Array,
            required: true,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        continuous: {
            type: Boolean,
            default: false,
        },
        height: [String, Number],
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
            currentIndex: -1,

            player: null,
            buttonsStart: null,
            controlsEnd: null,
            ready: false,
            canplay: false,
        }
    },

    computed: {
        playList () {
            return this.sources.map(item => {
                const { src, cover, currentTime } = item
                return {
                    src,
                    cover,
                    currentTime,
                }
            })
        },
    },

    mounted () {
        this.setup()
        this.updateSource(0, false)

        this.$watch('playList', () => {
            this.updateSource(0, false)
        })
    },

    methods: {
        play () {
            if (!this.ready) return

            this.player.play()
        },
        pause () {
            if (!this.ready) return

            this.player.pause()
        },
        next () {
            if (this.currentIndex >= this.playList.length - 1) {
                this.$emit('error-next')
                return false
            }

            this.updateSource(this.currentIndex + 1, true)
            return true
        },
        prev () {
            if (this.currentIndex <= 0) {
                this.$emit('error-prev')
                return false
            }

            this.updateSource(this.currentIndex - 1, true)
            return true
        },
        // ----------------------- 分隔线 -------------------------
        setup () {
            const options = {
                preload: 'auto',
                muted: false,
                controls: true,
                // autoplay: this.autoplay,
                autoplay: false,
                bigPlayButton: false,
                fluid: true,
            }
            if (this.height) {
                const clientWidth = document.documentElement.clientWidth
                options.width = clientWidth
                options.height = this.height * clientWidth / 750
                options.fluid = false
            }
            this.player = videojs(this.$refs.videoPlayer, options, () => {
                console.log('video setup', this.player)
                this.initButtonsStart()
                this.initButtonsEnd()
            })
            this.player.on('canplay', () => {
                // fix 多次触发
                if (!this.canplay) {
                    const currentTime = this.playList[this.currentIndex].currentTime || 0
                    this.player.currentTime(currentTime)
                }
                this.canplay = true
            })
            this.player.on('play', () => {
                console.log('video play')
                this.player.removeClass('ready')
                this.$emit('play', this.playList[this.currentIndex], this.player)
            })
            this.player.on('pause', () => {
                console.log('video pause')
                this.$emit('pause', this.playList[this.currentIndex], this.player)
            })
            this.player.on('ended', () => {
                if (this.continuous && this.next()) return

                this.$emit('ended', this.playList[this.currentIndex], this.player)
            })
            this.player.on('error', (event) => {
                console.log('video error', event)
                const src = this.playList[this.currentIndex].src
                this.$emit('error', `视频播放异常: ${src}`)
            })
        },
        updateSource (index = 0, expectToPlay) {
            if (!this.playList.length) return

            const { src, cover } = this.playList[index]
            const needUpdateSrc = (!this.currentSrc && src) || (this.currentSrc && src && src !== this.currentSrc)

            if (!needUpdateSrc) return

            // 初始化状态
            this.ready = false
            this.canplay = false
            this.currentIndex = index

            const isM3u8 = src.split('?')[0].endsWith('m3u8')
            const type = isM3u8 ? 'application/x-mpegURL' : 'video/mp4'
            this.player.src({ type, src })
            this.player.poster(cover)

            this.player.ready(async () => {
                console.log('video ready', this.player)
                this.ready = true
                this.player.addClass('ready')
                this.$emit('ready', this.playList[index], this.player)

                // 自动播放
                // fix: 安卓自动播放会被自动暂停，导致封面失效
                if ((this.autoplay || expectToPlay) && !isAndroid()) {
                    if (isWeixinBrowser()) {
                        await linkWeixinBridge()
                    }
                    this.play()
                }
            })
        },
        initButtonsStart () {
            const self = this
            class ButtonsStart extends videojs.getComponent('Component') {
                constructor (player, options = {}) {
                    super(player, options)
                }

                createEl () {
                    const domContainer = createContainer({
                        classes: 'starts'
                    })
                    const domButton = createButton({
                        icon: 'play',
                        handleClick () {
                            self.play()
                            self.$emit('click', 'play')
                        },
                        classes: 'circle',
                    })
                    domContainer.appendChild(domButton)
                    return domContainer
                }
            }

            const myButton = new ButtonsStart(this.player)
            this.player.addChild(myButton)
            this.buttonsStart = myButton
        },
        initButtonsEnd () {
            const self = this
            class ButtonsEnd extends videojs.getComponent('Component') {
                constructor (player, options = {}) {
                    super(player, options)
                }

                createEl () {
                    const domContainer = createContainer({
                        classes: 'ends layer',
                    })
                    const domPrev = createButton({
                        icon: 'skip_previous',
                        text: self.prevText,
                        handleClick () {
                            self.prev()
                            self.$emit('click', 'prev')
                        },
                    })
                    const domReplay = createButton({
                        icon: 'replay',
                        text: self.replayText,
                        handleClick () {
                            self.$emit('click', 'replay')
                            if (self.continuous && self.playList.length > 1) {
                                self.updateSource(0, true)
                                return
                            }
                            self.player.currentTime(0)
                            self.play()
                        },
                    })
                    const domNext = createButton({
                        icon: 'skip_next',
                        text: self.nextText,
                        handleClick () {
                            self.next()
                            self.$emit('click', 'next')
                        },
                    })
                    domContainer.appendChild(domPrev)
                    domContainer.appendChild(domReplay)
                    domContainer.appendChild(domNext)
                    return domContainer
                }
            }

            const myButton = new ButtonsEnd(this.player)
            this.player.addChild(myButton)
            this.controlsEnd = myButton
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

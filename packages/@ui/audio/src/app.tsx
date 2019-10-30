/**
 * 实现功能
 * 1. 同步/异步 src
 * 2. 监听 play 属性播放/暂停
 * 3. 监听 value 属性设置播放进度
 */
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import 'video.js/dist/video-js.css'
import { linkWeixinBridge, isWeixinBrowser } from 'web-util/tool/src/main'
import { Vue, Component, Prop, Watch, Ref, Emit } from 'vue-property-decorator'
import { log } from 'web/assets/js/tool'
const PLAYBACK_RATE = [0.5, 1, 1.5, 2]

@Component
export default class TmAudio extends Vue {
    static registName = 'TmAudio'

    render () {
        return (
            <audio ref="videoPlayer" id="videoPlayer" class="video-js tm-audio"></audio>
        )
    }

    mounted () {
        this.setup()
        this.init(this.src)
    }

    beforeDestroy () {
        /* istanbul ignore else */
        if (this.player) {
            this.player.dispose()
        }
    }

    reload () {
        if (!this.ready) return

        this.currentValue = 0
        this.init(this.src)
    }

    @Emit('ready')
    async handleReady (): Promise<VideoJsPlayer> {
        log('audio ready')

        this.initCurrentTime()
        this.player.playbackRate(this.playbackRate)

        // 自动播放
        if (this.currentPlay && !this.realPlay) {
            /* istanbul ignore else */
            if (isWeixinBrowser()) {
                await linkWeixinBridge()
            }

            try {
                await this.player.play()
            } catch (err) {
                /* istanbul ignore if */
                if (process.env.NODE_ENV === 'development') {
                    console.error(err)
                }
                // 未产生交互的播放可能异常，重置播放状态
                this.currentPlay = false
            }
        }

        if (this.expectPlay) {
            this.expectPlay = false
            this.currentPlay = true
        }

        this.ready = true

        return this.player
    }

    initCurrentTime () {
        let isInited = false

        const runner = () => {
            const needInit = this.currentValue > 0 && this.player.currentTime() !== this.currentValue
            // log('audio currentTime', isInited, needInit, this.currentValue, this.player.currentTime())
            if (isInited || !needInit) return
            this.player.currentTime(this.currentValue)
            log('audio init currentTime', this.currentValue, this.player.currentTime())

            // if (this.player.currentTime() === this.currentValue) {
            //     isInited = true
            //     log('audio init currentTime', this.currentValue, this.player.currentTime())
            // }
        }

        // 两个事件在不同情况下触发顺序不一定
        // ios 音频没有就绪的时候，设置播放位置是无效的（readyState < 3）
        this.player.one('canplay', runner)
        this.player.one('play', runner)
        runner()
    }

    @Emit('play')
    handlePlay (): VideoJsPlayer {
        log('audio play')
        this.realPlay = true

        return this.player
    }

    @Emit('pause')
    handlePause (): VideoJsPlayer {
        log('audio pause')
        this.realPlay = false

        return this.player
    }

    @Emit('ended')
    handleEnded (): VideoJsPlayer {
        this.currentPlay = false
        this.currentValue = 0

        return this.player
    }

    // ！安卓 / chrome 在音频地址修改后一定会触发 timeupdate，且播放进度为 0。但时间可能在 ready 之前，也可能在 ready 之后
    handleTimeupdate () {
        // log('timeupdate before', this.realPlay, this.player.currentTime(), this.currentValue)
        // fix: 就绪之后会触发该事件, 会导致外部期望的 currentValue 被改变
        if (!this.realPlay) return

        const currentValue = this.player.currentTime()
        this.cacheValue = currentValue
        this.currentValue = currentValue
        this.$emit('timeupdate', currentValue)
    }

    @Emit('error')
    handleError (event: Event): Error {
        console.error('audio error', event)
        return new Error(`音频播放异常: ${this.src}`)
    }

    @Watch('play')
    onPlayChange (val: boolean) {
        this.currentPlay = val
    }

    // 注意：该事件为异步，仅代表期望去 播放/暂停，结果需要等待 realPlay 值
    @Watch('currentPlay')
    onCurrentPlayChange (val: boolean) {
        this.$emit('update:play', val)
        /**
         * 1、估计音频内部会保留 play 事件状态，但不会保留 pause 事件
         *    所以如果在音频未就绪的情况下执行播放/暂停，可能会导致状态不一致，需禁止
         *    在 ready 事件中根据属性执行自动播放
         * 2、暂时注释是期望用 realPlay 作为状态判断依据，此时不存在上述问题
         */
        // if (!this.ready) return

        val ? this.player.play() : this.player.pause()
    }

    @Watch('value')
    onValueChange (val: number) {
        this.currentValue = val
    }

    // 改变播放进度的来源有两个: 1、外部手动设置 2、内部音频播放
    @Emit('input')
    @Watch('currentValue')
    onCurrentValueChange (val: number): number {
        // 这里没有和音频内部时间 this.player.currentTime() 比较，是因为音频在持续播放时，内部时间总是比该事件超前
        // cacheValue 就是触发 timeupdate 事件时的进度值
        if (val !== this.cacheValue) {
            // 这里不一定成功 readyState < 3
            this.player.currentTime(val)
        }

        return val
    }

    @Watch('playbackRate')
    onPlaybackRateChange (val: number) {
        this.player.playbackRate(val)
    }

    /**
     * 重新初始化之前，会自动暂停当前播放
     */
    @Watch('src')
    init (src: string): void {
        if (!src) return
        log('audio init', src)

        this.ready = false

        const isM3u8 = src.split('?')[0].endsWith('m3u8')
        const type = isM3u8 ? 'application/x-mpegURL' : 'audio/mp3'

        const runner = () => {
            this.player.src({ type, src })
            this.player.ready(this.handleReady)
        }

        // fix: 在播放状态下改变地址，触发 timeupdate 时播放状态不一定，导致初始播放时间被改变
        // 如果在播放中，先暂停。在ready之后重新播放
        if (this.realPlay) {
            this.expectPlay = true
            this.currentPlay = false
            this.$once('pause', runner)
            return
        }

        runner()
    }

    setup (): void {
        const options: VideoJsPlayerOptions = Object.assign({}, {
            preload: 'auto',
            height: 0,
            muted: false,
            controls: true,
            autoplay: false,
            playbackRates: PLAYBACK_RATE,
            loadingSpinner: false,
            children: {},
        }, this.options)

        this.player = videojs(this.videoPlayer, options, /* istanbul ignore next */() => {
            log('audio setup')
        })

        this.player.on('play', this.handlePlay)
        this.player.on('pause', this.handlePause)
        this.player.on('ended', this.handleEnded)
        // 播放中，持续触发
        this.player.on('timeupdate', this.handleTimeupdate)
        this.player.on('error', this.handleError)
    }

    @Ref('videoPlayer')
    videoPlayer!: HTMLAudioElement

    @Prop({ type: Boolean, default: false })
    play!: boolean

    @Prop({ type: String, default: '' })
    src!: string

    // 播放进度
    @Prop({ type: Number, default: 0 })
    value!: 0

    @Prop({ type: Object })
    options?: object

    @Prop({ type: Number, default: 1 })
    playbackRate!: 1

    player!: VideoJsPlayer
    currentPlay: boolean = this.play
    /**
     * 真实的播放状态。替代 player.paused() 使用
     */
    realPlay: boolean = false
    currentValue: number = this.value
    /**
     * 为了在 value change 事件中判断是否需要更新音频进度
     */
    cacheValue: number = this.value
    /**
     * init 事件中暂存播放状态
     */
    expectPlay: boolean = false
    ready: boolean = false
}

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
        log('audio reload')
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

    @Emit('play')
    handlePlay (): VideoJsPlayer {
        log('audio play')

        return this.player
    }

    @Emit('pause')
    handlePause (): VideoJsPlayer {
        log('audio pause')

        return this.player
    }

    @Emit('ended')
    handleEnded (): VideoJsPlayer {
        this.currentPlay = false
        this.currentValue = 0

        return this.player
    }

    @Emit('error')
    handleError (event: Event): Error {
        console.error('audio error', event)
        return new Error(`音频播放异常: ${this.src}`)
    }

    // ！安卓 / chrome 在音频地址修改后一定会触发 timeupdate，且播放进度为 0。但时间可能在 ready 之前，也可能在 ready 之后
    async handleTimeupdate () {
        const nextTime = this.player.currentTime()
        const expectValue = this.expectValue

        // fix: 安卓在readyState > 3之前先触发 timeupdate，导致期望的播放进度被修改
        if (expectValue >= 0 && expectValue !== nextTime) {
            if (this.seeking) return
            this.seeking = true

            log('audio time will seek to:', expectValue)

            this.player.currentTime(expectValue)
            if (this.player.seeking()) {
                log('audio time is seeking')
                await new Promise(resolve => this.player.one('seeked', resolve))
            }

            // fix: value 和 src 同时赋值时，currentTime会跳跃失败
            // 跳跃失败，保留期望跳跃值到下次尝试
            if (this.player.currentTime() !== nextTime) {
                this.expectValue = -1
            }

            log('audio time is seek to:', expectValue, ', result is:', this.player.currentTime())
            this.seeking = false
            return
        }

        this.cacheValue = nextTime
        this.currentValue = nextTime
        this.$emit('timeupdate', nextTime)
        log('audio timeupdate:', nextTime)
    }

    @Watch('play')
    onPlayChange (val: boolean) {
        this.currentPlay = val
    }

    @Emit('update:play')
    @Watch('currentPlay')
    async onCurrentPlayChange (val: boolean): Promise<boolean> {
        try {
            if (val) {
                await this.player.play()
            } else {
                this.player.pause()
            }
        } catch (err) {
            /* istanbul ignore if */
            if (process.env.NODE_ENV === 'development') {
                console.error(err)
            }

            if (this.ready) {
                this.currentPlay = !val
            }
        }

        return val
    }

    @Watch('playbackRate')
    onPlaybackRateChange (val: number) {
        this.player.playbackRate(val)
    }

    @Emit('ready')
    async handleReady (): Promise<VideoJsPlayer> {
        this.ready = true

        // 自动播放
        if (this.currentPlay && this.player.paused()) {
            /* istanbul ignore else */
            if (isWeixinBrowser()) {
                await linkWeixinBridge()
            }

            await this.onCurrentPlayChange(true)
        }

        // ???有可能因为 audio 的异步设置不正确
        this.player.playbackRate(this.playbackRate)

        log('audio ready')
        return this.player
    }

    /**
     * 重新初始化之前，会自动暂停当前播放
     */
    @Watch('src')
    init (src: string): void {
        if (!src) return

        this.ready = false
        this.seeking = false
        this.expectValue = this.currentValue

        const isM3u8 = src.split('?')[0].endsWith('m3u8')
        const type = isM3u8 ? 'application/x-mpegURL' : 'audio/mp3'

        this.player.src({ type, src })
        this.player.ready(this.handleReady)

        log('audio init src:', src, ', currentTime:', this.expectValue, ', playbackRate:', this.playbackRate)
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

        this.player = videojs(this.videoPlayer, options)

        this.player.on('play', this.handlePlay)
        this.player.on('pause', this.handlePause)
        this.player.on('ended', this.handleEnded)
        this.player.on('error', this.handleError)
        // 播放中，持续触发
        this.player.on('timeupdate', this.handleTimeupdate)

        log('audio setup', options)
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

    /**
     * ???安卓不支持设置.m3u8格式的播放速度
     */
    @Prop({ type: Number, default: 1 })
    playbackRate!: 1

    player!: VideoJsPlayer
    currentPlay: boolean = this.play
    currentValue: number = this.value
    /**
     * 每次 init 时记录当前期望的时间，在 timeupdate 中判断并跳跃。
     * 记录发生在初始化新地址之前，所以最好在修改 src 之前修改 value
     */
    expectValue: number = -1
    /**
     * 为了在 value change 事件中判断是否需要更新音频进度
     */
    cacheValue: number = this.value
    ready: boolean = false
    seeking: boolean = false
}

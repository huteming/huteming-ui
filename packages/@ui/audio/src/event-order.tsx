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
import { AudioState } from './declare/typed'
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
    }

    beforeDestroy () {
        /* istanbul ignore else */
        if (this.player) {
            this.player.dispose()
        }
    }

    // 注意：该事件为异步，仅代表期望去 播放/暂停，结果需要等待 realPlay 值
    @Watch('play')
    async onCurrentPlayChange (val: boolean) {
        /**
         * 1、估计音频内部会保留 play 事件状态，但不会保留 pause 事件
         *    所以如果在音频未就绪的情况下执行播放/暂停，可能会导致状态不一致，需禁止
         *    在 ready 事件中根据属性执行自动播放
         * 2、暂时注释是期望用 realPlay 作为状态判断依据，此时不存在上述问题
         */
        // if (!this.ready) return

        if (val) {
            await this.player.play()
            // log('await play')
        } else {
            this.player.pause()
        }
    }

    setup (): void {
        const options: VideoJsPlayerOptions = Object.assign({}, {
            preload: 'none',
            height: 0,
            muted: false,
            controls: true,
            autoplay: false,
            playbackRates: PLAYBACK_RATE,
            loadingSpinner: false,
            children: {},
        }, this.options)

        const mockCurrentTime = 20
        let isSeted = false

        this.player = videojs(this.videoPlayer, options, /* istanbul ignore next */() => {
            log('setup')
        })

        this.player.on('waiting', () => {
            // log('waiting')
        })
        this.player.on('ready', () => log('1. ready'))
        this.player.on('loadstart', () => {
            log('2. loadstart')
            // this.player.currentTime(10)
            // log('audio is seeking:', this.player.seeking())
        })
        this.player.on('play', () => {
            log('3. play')
            // this.player.currentTime(10)
            // log('audio is seeking:', this.player.seeking())
            // this.$watch('state', () => log('watch state callback'))
            // this.state = 'ready'
        })
        this.player.one('canplaythrough', () => {
            log('4. canplay')
            // this.player.currentTime(20)
            // log('audio is seeking:', this.player.seeking())
            // this.player.one('seeked', async () => {
            //     log('audio is set time to:', this.player.currentTime())
            //     isSeted = true
            //     await this.$nextTick()
            //     this.player.play()
            // })
            // new Promise(resolve => this.player.on('seeked', resolve))
            // log('audio time is', this.player.currentTime())
        })
        this.player.on('timeupdate', () => {
            log('5. timeupdate:', this.player.currentTime(), isSeted)
            if (!isSeted) {
                // log('audio is waiting to set time, cancel timeupdate')
                // this.player.pause()
                this.player.currentTime(20)
                log('audio is seeking:', this.player.seeking())
                this.player.one('seeked', () => {
                    log('audio is set time to:', this.player.currentTime())
                })
                isSeted = true
            }
        })

        const isM3u8 = this.src.split('?')[0].endsWith('m3u8')
        const type = isM3u8 ? 'application/x-mpegURL' : 'audio/mp3'

        this.player.src({ type, src: this.src })
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

    state: AudioState = 'initial'
}

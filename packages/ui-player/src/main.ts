import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.css'
import { IEvents, IPlayer, InitOptions } from './declare/types'
import { autobind } from 'core-decorators'
import { log } from 'ui/utils/tool'
import { isIOS, isAndroid, isWeixinBrowser, linkWeixinBridge } from 'packages/ui-tool/src/main'

const defaultOptions = {
    preload: 'none',
    muted: false,
    controls: true,
    autoplay: false,
    bigPlayButton: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
}

@autobind
export default class Player implements IPlayer {
    videojs = videojs
    videoPlayer: VideoJsPlayer
    events: IEvents = {}
    private seeking: boolean = false
    private tryingInitTime: boolean = false
    private countInitTime: number = 0

    constructor (selector: string | HTMLDivElement, options: VideoJsPlayerOptions = {}) {
        options = Object.assign({}, defaultOptions, options)
        this.videoPlayer = videojs(selector, options)

        this.handleAutoplay(options)

        this.videoPlayer.ready(() => {
            this.handleCallbacks('ready')
        })
        this.videoPlayer.on('timeupdate', () => {
            log('audio timeupdate:', this.videoPlayer.currentTime())
            if (this.tryingInitTime) return
            this.handleCallbacks('timeupdate')
        })
    }

    on (event: string, fn: Function) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(fn)
    }

    off (event: string, fn: Function): void {
        if (!this.events[event]) return
        const fns = this.events[event]
        const index = fns.findIndex(item => item === fn)
        if (index > -1) {
            fns.splice(index, 1)
        }
    }

    play (): void {
        this.videoPlayer.play()
    }

    pause (): void {
        this.videoPlayer.pause()
    }

    reload (): void {
        const paused = this.videoPlayer.paused()
        this.videoPlayer.load()
        if (!paused) {
            this.play()
        }
    }

    next (): boolean {
        throw new Error('Method not implemented.')
    }

    prev (): boolean {
        throw new Error('Method not implemented.')
    }

    destroy () {
        this.videoPlayer.dispose()
    }

    setup (sources: string | videojs.Tech.SourceObject | videojs.Tech.SourceObject[], options: InitOptions = {}): void {
        this.videoPlayer.src(sources)

        // init
        const { currentTime, playbackRate, poster } = options
        if (currentTime) {
            this.tryingInitTime = true
            this.handleInitTime(currentTime)
        }
        if (playbackRate) {
            this.videoPlayer.playbackRate(playbackRate)
        }
        if (poster) {
            this.videoPlayer.poster(poster)
        }
    }

    private handleCallbacks (event: string, ...args: any[]) {
        const cbs = this.events[event]
        if (cbs && cbs.length) {
            cbs.forEach(item => item(...args))
        }
    }

    private async handleAutoplay (options: VideoJsPlayerOptions) {
        // fix: 利用微信浏览器实现自动播放
        if (options.autoplay !== false && !isAndroid() && isWeixinBrowser()) {
            await linkWeixinBridge()
            this.play()
        }
    }

    private handleInitTime (expectTime: number) {
        const self: Player = this
        const runner = async (currentTime: number): Promise<boolean> => {
            const status = await this.tryInitCurrentTime(expectTime, currentTime)
            if (status !== 0) {
                this.tryingInitTime = false
                return true
            }
            return false
        }
        /**
         * fix: 1、ios尝试在 timeupdate 中初始化时间会引起第一次播放卡顿
         *      2、android 在 canplay 中初始化时间可能会影响(过滤)本身预加载产生的 timeupdate 中初始化事件，引起第一次播放卡顿
         *      3、上述只是根据实际情况猜测。所以在 loadstart （认为可以预加载）事件中取消监听 canplay 事件
         */
        // if (isIOS()) {
        //     this.videoPlayer.one('canplay', () => {
        //         runner(0)
        //     })
        // } else {
        //     // fix: 安卓 / chrome 在音频地址修改后一定会触发 timeupdate，且播放进度为 0。但时间可能在 ready 之前，也可能在 ready 之后
        //     this.videoPlayer.on('timeupdate', async function listener () {
        //         const nextTime = self.videoPlayer.currentTime()

        //         const success = await runner(nextTime)
        //         if (success) {
        //             self.videoPlayer.off('timeupdate', listener)
        //         }
        //     })
        // }
        this.videoPlayer.one('loadeddata', () => {
            runner(0)
        })
    }

    /**
     * 尝试初始化进度
     * @param nextTime 当前播放时间，作为比较是否需要初始化
     * @returns status {Promise<Number>} -1: 未操作; 0: 失败; 1: 成功;
     */
    private async tryInitCurrentTime (expectTime: number, nextTime: number): Promise<number> {
        if (this.seeking) return 0
        this.seeking = true

        // 实际跳转值可能存在几毫秒偏差
        const validate = (expect: number, actual: number): boolean => {
            return actual >= expect - 3 && actual <= expect + 3
        }

        if (!validate(expectTime, nextTime) && this.countInitTime <= 4) {
            this.countInitTime++

            log('audio time will seek to:', expectTime, ', current is:', nextTime)

            this.videoPlayer.currentTime(expectTime)
            if (this.videoPlayer.seeking()) {
                log('audio time is seeking')
                await new Promise(resolve => this.videoPlayer.one('seeked', resolve))
            }

            this.seeking = false

            // fix: value 和 src 同时赋值时，currentTime会跳跃失败
            // 跳跃失败，保留期望跳跃值到下次尝试
            const actualTime = this.videoPlayer.currentTime()
            if (validate(expectTime, actualTime)) {
                log('audio time expect seek to:', expectTime, ', result is:', this.videoPlayer.currentTime())
                return 1
            }

            log('audio seek time is failed')
            return 0
        }

        this.seeking = false
        return -1
    }
}

<template>
<!-- 主要解决 音频 的兼容/使用习惯问题。其他业务事件，在 mp3 组件中解决 -->
<!-- 1：获取音频当前状态 -->
<!-- 2：获取就绪状态，支持预加载和自动播放（微信浏览器） -->
<!-- 3：实时获取当前播放进度 -->
<!-- 4：保留未就绪时设置的进度 -->
<audio
    ref="audio"
    :src="src"
    preload="none"
    @playing="handlePlaying"
    @pause="handlePause"
    @ended="handleEnded"
    @progress="handleDownload"
    @waiting="handleWaiting"
    @canplay="handleCanPlay"
    @timeupdate="handleTimeUpdate"
    @durationchange="handleDurationchange">
</audio>
</template>

<script>
import { isWeixinBrowser } from 'web-util/tool/src/main'

export default {
    name: 'TmAudio',

    props: {
        src: {
            type: String,
            default: '',
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        preload: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Number,
            default: 0,
        },
        // 音频总时长，这个数值和真实值可能存在偏差，但是因为真实的总时长受限于音频的分段加载
        // 所以还是用该值来做一些必要的判断
        duration: {
            type: Number,
        },
    },

    data () {
        return {
            normalizedValue: this.value,
            // 表示音频已准备就绪, 组件内部都是依赖这个状态，来判断是否允许操作
            ready: false,
            // 播放状态
            state: 'waiting', // waiting, playing, pause, ended
            isCanPlay: false,

            // 切换地址之前的状态是否是播放
            expectContinueToPlay: false,
            // 是否在 ready 之前点击播放/暂停
            expectToPlay: false,
        }
    },

    watch: {
        // 注意：切换地址会保留当前播放时间，需要外部手动修改
        src (val) {
            if (val) {
                this.ready = false
                this.isCanPlay = false
                this.expectContinueToPlay = this.state === 'playing'
                this.state = 'waiting'
                this.audio.load()

                this.tryPreload()
            }
        },
        value (val) {
            if (this.normalizedValue !== val) {
                this.updateCurrentTime(val)
            }
        },
        state (val) {
            this.$emit('state-change', val)
        },
    },

    mounted () {
        /**
         * readyState
         * 0 = HAVE_NOTHING - 没有关于音频是否就绪的信息
         * 1 = HAVE_METADATA - 关于音频就绪的元数据
         * 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
         * 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
         * 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
         */
        this.audio = this.$refs.audio

        if (this.src) {
            this.tryPreload()
        }
    },

    methods: {
        async toggle (_currentTime) {
            if (this.state === 'playing') {
                await this.pause()
                return
            }

            await this.play(_currentTime)
        },
        async play (_currentTime) {
            if (typeof _currentTime === 'number') {
                this.updateCurrentTime(_currentTime)
            }

            if (!this.ready) {
                this.expectToPlay = true
                return false
            }

            try {
                await this.audio.play()
                return true
            } catch (err) {
                // 这里的播放如果不是交互引起的，会出现异常 Uncaught (in promise) DOMException
                process.env.NODE_ENV === 'development' && console.error('audio play error: ', err)
                return false
            }
        },
        async pause () {
            if (!this.ready) {
                this.expectToPlay = false
                return
            }

            await this.audio.pause()
        },
        // 更新进度
        updateCurrentTime (_currentTime) {
            if (typeof _currentTime === 'number') {
                this.normalizedValue = _currentTime
            }
            if (this.duration && this.normalizedValue > this.duration) {
                this.normalizedValue = 0
            }
            // console.log('updateCurrentTime before --- ', 'currentTime:', this.normalizedValue, 'ready: ', this.ready)
            if (!this.ready) return

            // 注意：不设置预加载时，音频没有就绪的时候，设置播放位置是无效的（readyState < 3）
            this.audio.currentTime = this.normalizedValue
            console.log('updateCurrentTime --- ', 'currentTime:', this.audio.currentTime)
        },
        // 内部事件
        handleWaiting () {
            console.log('waiting')
            this.state = 'waiting'
        },
        handlePlaying () {
            console.log('playing')
            this.state = 'playing'
        },
        handlePause () {
            console.log('pause')
            this.state = 'pause'
        },
        handleEnded () {
            console.log('ended')
            this.state = 'ended'
        },
        // 当文件就绪可以开始播放时运行的，会多次触发
        handleCanPlay () {
            if (!this.isCanPlay) {
                console.log('canplay')
                this.updateCurrentTime()
            }
            this.isCanPlay = true
        },
        // audio 总时长改变
        handleDurationchange () {
            const { duration } = this.audio

            this.$emit('durationchange', duration)
        },
        // audio 下载中
        handleDownload () {
            const { buffered } = this.audio

            if (buffered.length <= 0) {
                return false
            }

            this.$emit('progress', buffered.end(0) || 0)
        },
        // audio 播放中
        handleTimeUpdate () {
            // 切换地址源时会触发
            // 偶尔暂停事件会触发
            // 微信浏览器中为了预加载，其中的播放事件会触发
            // 这里禁止掉，否则会更新掉外部的期望 v-model 值
            // console.log('handleTimeUpdate before --- ', 'state: ', this.state, 'ready: ', this.ready, 'currentTime: ', this.audio.currentTime)
            if (this.state !== 'playing' || !this.ready) return
            const { currentTime } = this.audio
            console.log('handleTimeUpdate --- ', 'currentTime:', currentTime)

            this.normalizedValue = currentTime
            this.$emit('input', currentTime)
            this.$emit('change', currentTime)
        },
        tryPreload () {
            console.log('tryPreload')
            // 如果不用预加载或者预播放，可以认为已经就绪
            // 不是微信浏览器，没有办法在用户交互之前加载音频，也认为已经就绪
            if ((!this.preload && !this.autoplay) || !isWeixinBrowser()) {
                this.already()
                return
            }

            // 微信浏览器，监听事件自动播放暂停，以达到预加载的目的
            const done = async () => {
                const self = this
                // 监听是因为 playing 和 pause 有可能先触发，
                // 这里必须在 对应事件 之后才认为就绪
                this.$on('state-change', function onready (_state) {
                    const expect = self.autoplay ? 'playing' : 'pause'
                    if (_state === expect) {
                        self.already()
                        self.$off('state-change', onready)
                    }
                })

                await this.audio.play()

                // 如果是要自动播放的，认为已经就绪，直接播放不暂停
                if (!this.autoplay) {
                    await this.audio.pause()
                }
            }

            if (window.WeixinJSBridge) {
                window.WeixinJSBridge.invoke('getNetworkType', {}, done)
            } else {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    window.WeixinJSBridge.invoke('getNetworkType', {}, done)
                }, false)
            }
        },
        // 音频就绪可以播放时，在下一个事件循环中触发 ready 事件
        async already () {
            if (this.ready) return
            console.log('already --- ', 'autoplay: ', this.autoplay)
            this.ready = true

            this.updateCurrentTime()
            await this.$nextTick()

            if (this.expectContinueToPlay || this.expectToPlay) {
                try {
                    await this.audio.play()
                } catch (err) {
                    // 这里的期望播放如果不是交互引起的，会出现异常 Uncaught (in promise) DOMException
                    process.env.NODE_ENV === 'development' && console.error('audio play error: ', err)
                }
            }

            this.$emit('ready')
        },
    },
}
</script>

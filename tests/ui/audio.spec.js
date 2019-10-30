import assert from 'assert'
import TmAudio, { __RewireAPI__ as RewireAPI } from 'web-ui/audio/src/app'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import { sleep } from '../helper'

describe('audio', () => {
    let mockVideojs
    let mockVideo
    let mockSrc
    let mockReady
    let mockDispose
    let mockPlay
    let mockPause
    let mockTime
    let mockBack
    let events
    let expectPaused

    beforeAll(() => {
        sinon.replace(console, 'log', sinon.fake())
        sinon.replace(console, 'error', sinon.fake())
        RewireAPI.__Rewire__('isWeixinBrowser', () => {
            return true
        })
        RewireAPI.__Rewire__('linkWeixinBridge', sinon.fake.resolves())
    })

    beforeEach(() => {
        events = {}
        mockSrc = sinon.fake()
        mockReady = sinon.fake()
        mockDispose = sinon.fake()
        mockPlay = sinon.fake()
        mockPause = sinon.fake()
        mockTime = sinon.fake.returns(20)
        mockBack = sinon.fake()
        expectPaused = true
        mockVideo = {
            on (eventName, handler) {
                const event = new Event(eventName)
                window.addEventListener(eventName, handler)
                events[eventName] = [event, handler]
            },
            src: mockSrc,
            ready (cb) {
                cb()
                mockReady()
            },
            paused () {
                return expectPaused
            },
            playbackRate: mockBack,
            dispose: mockDispose,
            play: mockPlay,
            pause: mockPause,
            currentTime: mockTime,
        }
        mockVideojs = sinon.fake.returns(mockVideo)
        RewireAPI.__Rewire__('videojs', mockVideojs)
    })

    it('初始化装载音频组件', () => {
        const wrap = mount(TmAudio, {
        })

        assert.strictEqual(mockVideojs.getCall(0).args[0], wrap.find('#videoPlayer').element)
        assert.strictEqual(wrap.vm.player, mockVideo)
    })

    it('初始化.mp3音频', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
            },
        })
        await sleep()
        const emitReady = wrap.emitted('ready')

        assert.ok(emitReady)
        assert.strictEqual(emitReady[0][0], wrap.vm.player)
        assert.deepStrictEqual(mockSrc.getCall(0).args, [{ type: 'audio/mp3', src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y' }])
    })

    it('初始化.m3u8音频', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lvisA64GE9I1anin2a3DPeab9Uza.m3u8?query',
            },
        })
        await sleep()
        const emitReady = wrap.emitted('ready')

        assert.ok(emitReady)
        assert.strictEqual(emitReady[0][0], wrap.vm.player)
        assert.deepStrictEqual(mockSrc.getCall(0).args, [{ type: 'application/x-mpegURL', src: 'http://jhsy-img.caizhu.com/lvisA64GE9I1anin2a3DPeab9Uza.m3u8?query' }])
    })

    it('初始化播放速度', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                playbackRate: 3,
            },
        })

        assert.strictEqual(mockBack.callCount, 1)
        assert.ok(mockBack.calledWithExactly(3))
    })

    it('初始化播放进度，在canplay事件触发,只触发一次', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                value: 3,
            },
        })
        await sleep()

        assert.strictEqual(mockTime.callCount, 0)

        window.dispatchEvent(events.canplay[0])

        assert.strictEqual(mockTime.callCount, 1)
        assert.ok(mockTime.calledWithExactly(3))

        window.dispatchEvent(events.canplay[0])

        assert.strictEqual(mockTime.callCount, 1)
    })

    describe('自动播放', () => {
        it('初始化时自动播放', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                    src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                    play: true,
                },
            })
            await sleep()
    
            assert.strictEqual(mockPlay.callCount, 1)
        })

        it('未产生交互自动播放失败后，重置状态', async () => {
            mockVideo.play = sinon.fake.rejects('未交互播放异常')
            const wrap = mount(TmAudio, {
                propsData: {
                    src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                    play: true,
                },
            })
            await sleep()

            const emitUpdate = wrap.emitted('update:play')

            assert.ok(emitUpdate)
            assert.strictEqual(emitUpdate[0][0], false)
            assert.strictEqual(wrap.vm.currentPlay, false)
        })
    })

    it('异步的音频地址初始化', async () => {
        const src = 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y'
        const wrap = mount(TmAudio, {
        })
        let emitReady
        await sleep()
        emitReady = wrap.emitted('ready')

        assert.ok(!emitReady)

        wrap.setProps({ src })
        await sleep()
        emitReady = wrap.emitted('ready')

        assert.ok(emitReady)
    })

    it('退出页面销毁audio控件', () => {
        const wrap = mount(TmAudio, {
        })
        wrap.destroy()

        assert.strictEqual(mockDispose.callCount, 1)
    })

    it('play状态控制 播放/暂停', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                play: false,
            },
        })
        await sleep()

        wrap.setProps({ play: true })

        assert.strictEqual(mockPlay.callCount, 1)

        wrap.setProps({ play: false })

        assert.strictEqual(mockPause.callCount, 1)
    })

    it('手动改变播放进度', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                value: 1,
            },
        })

        // 模拟手动设置进度和音频自身进度一致时忽略的情况
        wrap.setData({ cacheValue: 20 })
        wrap.setProps({ value: 20 })

        assert.ok(!mockTime.calledWithExactly(20))

        wrap.setProps({ value: 3 })

        assert.ok(mockTime.calledWithExactly(3))
    })

    it('手动改变播放速度', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                playbackRate: 1,
            },
        })

        wrap.setProps({ playbackRate: 3 })

        assert.ok(mockBack.calledWithExactly(3))
    })

    describe('reload', () => {
        it('ready之后才能重载', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                    src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                    value: 10,
                },
            })
            await sleep()
            let emitReady = wrap.emitted('ready')
    
            assert.strictEqual(mockSrc.callCount, 1)
            assert.strictEqual(emitReady.length, 1)
            assert.strictEqual(wrap.vm.currentValue, 10)
    
            wrap.vm.reload()
            await sleep()
            emitReady = wrap.emitted('ready')

            assert.strictEqual(mockSrc.callCount, 2)
            assert.strictEqual(emitReady.length, 2)
            assert.strictEqual(wrap.vm.currentValue, 0)
        })

        it('忽略ready之前的重载', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                    src: '',
                },
            })

            assert.strictEqual(wrap.vm.ready, false)

            wrap.vm.reload()

            assert.strictEqual(mockSrc.callCount, 0)
        })
    })

    describe('音频播放事件', () => {
        it('play', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                },
            })
            window.dispatchEvent(events.play[0])
            const emitPlay = wrap.emitted('play')

            assert.ok(emitPlay)
            assert.strictEqual(emitPlay[0][0], wrap.vm.player)
        })

        it('pause', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                },
            })
            window.dispatchEvent(events.pause[0])
            const emitPlay = wrap.emitted('pause')

            assert.ok(emitPlay)
            assert.strictEqual(emitPlay[0][0], wrap.vm.player)
        })

        it('ended', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                    play: true
                },
            })
            window.dispatchEvent(events.ended[0])
            const emitPlay = wrap.emitted('ended')

            assert.ok(emitPlay)
            assert.strictEqual(emitPlay[0][0], wrap.vm.player)
            assert.strictEqual(wrap.vm.currentPlay, false)
            assert.strictEqual(wrap.vm.currentValue, 0)
        })

        it('timeupdate,暂停时忽略', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                },
            })
            wrap.setData({ realPlay: false })
            window.dispatchEvent(events.timeupdate[0])
            let emitPlay = wrap.emitted('timeupdate')

            assert.ok(!emitPlay)

            wrap.setData({ realPlay: true })
            window.dispatchEvent(events.timeupdate[0])
            emitPlay = wrap.emitted('timeupdate')

            assert.ok(emitPlay)
            assert.strictEqual(emitPlay[0][0], 20)
        })

        it('error', async () => {
            const wrap = mount(TmAudio, {
                propsData: {
                    play: true
                },
            })
            window.dispatchEvent(events.error[0])
            const emitPlay = wrap.emitted('error')

            assert.ok(emitPlay)
            assert.ok(emitPlay[0][0] instanceof Error)
        })
    })

    it('播放过程中改变地址，保留播放进度', async () => {
        const wrap = mount(TmAudio, {
            propsData: {
                src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y',
                play: true,
                value: 333,
            },
        })

        assert.ok(!wrap.vm.expectPlay)
        assert.ok(wrap.vm.currentPlay)

        wrap.setData({ realPlay: true })
        wrap.setData({ src: 'http://jhsy-img.caizhu.com/lvisA64GE9I1anin2a3DPeab9Uza.m3u8?hello' })

        assert.ok(wrap.vm.expectPlay)
        assert.ok(!wrap.vm.currentPlay)

        window.dispatchEvent(events.pause[0])

        assert.ok(!wrap.vm.expectPlay)
        assert.ok(wrap.vm.currentPlay)
        assert.strictEqual(wrap.vm.currentValue, 333)
    })

    afterEach(() => {
        RewireAPI.__ResetDependency__('videojs')

        for (let eventName in events) {
            const [event, handler] = events[eventName]
            window.removeEventListener(eventName, handler)
        }
    })

    afterAll(() => {
        sinon.restore()
        RewireAPI.__ResetDependency__('isWeixinBrowser')
        RewireAPI.__ResetDependency__('linkWeixinBridge')
    })
})

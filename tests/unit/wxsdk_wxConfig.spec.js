import update, { __RewireAPI__ as RewireAPI, getApiList, register, waiting } from 'web-util/wxsdk/src/wxConfig'
import assert from 'assert'
import sinon from 'sinon'

describe('wxsdk > wxConfig', () => {
    describe('getApiList', () => {
        it('空参数', () => {
            const res = getApiList()
            assert.deepStrictEqual(res, [
                'hideAllNonBaseMenuItem',
                'closeWindow',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'showMenuItems',
                'hideMenuItems',
            ])
        })

        it('字符串参数', () => {
            const res = getApiList('location')
            assert.deepStrictEqual(res, [
                'hideAllNonBaseMenuItem',
                'closeWindow',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'showMenuItems',
                'hideMenuItems',
                'getLocation',
            ])
        })

        it('数组参数', () => {
            const res = getApiList(['image', 'other'])
            assert.deepStrictEqual(res, [
                'hideAllNonBaseMenuItem',
                'closeWindow',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'showMenuItems',
                'hideMenuItems',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getLocalImgData',
                'chooseImage',
            ])
        })
    })

    describe('register', () => {
        it('注册', async () => {
            const mockUrl = 'https://localhost'
            const AppId = 'AppId'
            const Timestamp = 'Timestamp'
            const NonceStr = 'NonceStr'
            const Signature = 'Signature'
            const mockConfig = sinon.fake()
            const mockApiList = ['hello']

            RewireAPI.__Rewire__('wxSave', () => {
                return mockUrl
            })
            RewireAPI.__Rewire__('getWxConfig', async () => {
                return {
                    data: {
                        data: { AppId, Timestamp, NonceStr, Signature },
                    },
                }
            })
            window.wx = {
                config: mockConfig,
            }

            await register('flag', mockApiList)
            assert.deepStrictEqual(mockConfig.getCall(0).args, [{
                debug: true,
                appId: AppId,
                timestamp: Timestamp,
                nonceStr: NonceStr,
                signature: Signature,
                jsApiList: mockApiList,
            }])

            RewireAPI.__ResetDependency__('wxSave')
            RewireAPI.__ResetDependency__('getWxConfig')
            window.wx = null
        })
    })

    describe('waiting', () => {
        let onError
        let onReady

        beforeAll(() => {
            window.wx = {
                error (fn) {
                    onError = fn
                },
                ready (fn) {
                    onReady = fn
                },
            }
        })
        afterAll(() => {
            window.wx = null
        })

        it('成功', done => {
            waiting(Infinity)
                .then(done)
                .catch(() => {
                    done(new Error('期望成功'))
                })
            onReady()
        })

        it('失败', done => {
            const mockMessage = 'mockMessage'
            waiting(0)
                .then(() => {
                    done(new Error('期望失败'))
                })
                .catch(err => {
                    const href = window.location.href.split('#')[0]
                    assert.strictEqual(err.message, `签名失败: ${mockMessage}。签名链接: `)
                    done()
                })
            onError({ errMsg: mockMessage })
        })
    })

    describe('update', () => {
        const mockUrl = 'https://localhost'
        let onError
        let onReady

        beforeAll(() => {
            const AppId = 'AppId'
            const Timestamp = 'Timestamp'
            const NonceStr = 'NonceStr'
            const Signature = 'Signature'

            RewireAPI.__Rewire__('wxSave', () => {
                return mockUrl
            })
            RewireAPI.__Rewire__('getWxConfig', () => {
                return Promise.resolve({
                    data: {
                        data: { AppId, Timestamp, NonceStr, Signature },
                    },
                })
            })
        })

        beforeEach(() => {
            onError = null
            onReady = null
            window.wx = {
                config: sinon.fake(),
                error (fn) {
                    !onError && (onError = fn)
                },
                ready (fn) {
                    !onReady && (onReady = fn)
                },
            }
        })

        afterAll(() => {
            RewireAPI.__ResetDependency__('wxSave')
            RewireAPI.__ResetDependency__('getWxConfig')
            window.wx = null
        })

        it('返回Promise', () => {
            const instance = update(true)
            assert.ok(instance instanceof Promise)
        })

        it('不更新实例', () => {
            const prev = update(true)
            const next = update()
            assert.strictEqual(prev, next)
        })

        it('更新实例', () => {
            const prev = update(true)
            const next = update(true)
            assert.ok(prev !== next)
        })

        it('连续更新', done => {
            update(true)
                .then(() => {
                    done(new Error('期望失败'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, `签名失败: mock error。链接过期: ${mockUrl}。最新链接: ${mockUrl}`)
                    done()
                })

            update(true)
                .then(() => {
                    done(new Error('期望不解析'))
                })
                .catch(() => {
                    done(new Error('期望不解析'))
                })

            setTimeout(() => {
                // 这是第一次 update 产生的回调函数
                onError({ errMsg: 'mock error' })
            })
        })
    })
})

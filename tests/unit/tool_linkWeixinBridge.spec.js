import assert from 'assert'
import { linkWeixinBridge } from 'web-util/tool/src/main'
import { sleep } from '../helper'
import sinon from 'sinon'

describe('tool > linkWeixinBridge', () => {
    it('return Promise', () => {
        const res = linkWeixinBridge()
        assert.ok(res instanceof Promise)
    })

    it('weixin sdk 已加载', async () => {
        const mockInvoke = sinon.fake()
        window.WeixinJSBridge = {
            invoke (key, params, resolve) {
                mockInvoke(key)
                resolve()
            },
        }
        await linkWeixinBridge()
        assert.ok(mockInvoke.calledWithExactly('getNetworkType'))

        window.WeixinJSBridge = null
    })

    it('weixin sdk 未加载', (done) => {
        const mockInvoke = sinon.fake()
        const mockEvent = new Event('WeixinJSBridgeReady')

        linkWeixinBridge()
            .then(() => {
                assert.ok(mockInvoke.calledWithExactly('getNetworkType'))
            })
            .then(done)
            .finally(() => {
                window.WeixinJSBridge = null
            })

        sleep()
            .then(() => {
                assert.ok(mockInvoke.notCalled)

                window.WeixinJSBridge = {
                    invoke (key, params, resolve) {
                        mockInvoke(key)
                        resolve()
                    },
                }

                document.dispatchEvent(mockEvent)
            })
    })
})

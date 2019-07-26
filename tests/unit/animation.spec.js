import sinon from 'sinon'
import assert from 'assert'
import { sleep } from '../helper'
import { linear, easeIn, easeOut, easeInOut, tween } from 'web-util/animation/src/main'
const mapHandler = { linear, easeIn, easeOut, easeInOut }

describe('animation', () => {
    it('默认持续时间300ms', () => {
        const originAnimation = window.requestAnimationFrame
        window.requestAnimationFrame = (fn) => {
            fn()
        }

        function handler (type) {
            const from = 0
            const to = 50
            const callback = sinon.fake()
            const count = Math.ceil(300 / 17)

            mapHandler[type](from, to, callback)

            for (let i = 1; i <= count; i++) {
                const [position, isDone] = callback.getCall(i - 1).args
                assert.strictEqual(position, tween[type](i, from, to - from, count), `第 ${i} 次回调位置错误`)
                assert.strictEqual(isDone, i === count, `第 ${i} 次完成状况错误`)
            }
        }

        void ['linear', 'easeIn', 'easeOut', 'easeInOut'].forEach(type => handler(type))
        window.requestAnimationFrame = originAnimation
    })

    it('from 非数字抛错', done => {
        const errorMessage = 'from类型错误。起始位置参数必须为数字'

        try {
            linear('a', 'a', sinon.fake())

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('to 非数字抛错', done => {
        const errorMessage = 'to类型错误。结束位置参数必须为数字'

        try {
            linear('0', 'a', sinon.fake())

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('callback 非函数抛错', done => {
        const errorMessage = 'callback 必须是函数'

        try {
            linear('0', '1', '1')

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('结束位置等于起始位置 立即执行回调函数', async () => {
        const callback = sinon.fake()
        linear(0, 0, callback)
        assert.strictEqual(callback.callCount, 1)
        assert.deepStrictEqual(callback.getCall(0).args, [0, true])
    })

    it('利用requestAnimationFrame进行动画', () => {
        const originAnimation = window.requestAnimationFrame
        const mockAnimation = sinon.fake()

        window.requestAnimationFrame = (callback) => {
            mockAnimation(callback)
        }
        linear(0, 10, sinon.fake(), 20)
        assert.strictEqual(mockAnimation.callCount, 1)

        window.requestAnimationFrame = originAnimation
    })

    it('requestAnimationFrame兼容', () => {
        const originAnimation = window.requestAnimationFrame
        const originTimeout = global.setTimeout
        const mockTimeout = sinon.fake()
        const mockFn = sinon.fake()

        window.requestAnimationFrame = null
        global.setTimeout = mockTimeout

        linear(0, 10, sinon.fake(), 10)
        global.window.requestAnimationFrame(mockFn)

        const spyCall = mockTimeout.getCall(0)
        const [arg1, arg2] = spyCall.args
        assert.strictEqual(arg1, mockFn)
        assert.strictEqual(arg2, 17)

        window.requestAnimationFrame = originAnimation
        global.setTimeout = originTimeout
    })
})

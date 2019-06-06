import sinon from 'sinon'
import assert from 'assert'
import { sleep } from '../helper'
import * as animation from 'web-util/animation/src/main'

describe('animation', () => {
    it('默认持续时间300ms', async () => {
        async function handler (type) {
            const from = 0
            const to = 5
            const callback = sinon.fake()
            const defaultDuration = 300
            const count = Math.ceil(defaultDuration / 17)

            animation[type](from, to, callback)

            await sleep(defaultDuration + 10)

            for (let i = 1; i <= count; i++) {
                const [position, isDone] = callback.getCall(i - 1).args
                assert.strictEqual(position, animation.tween[type](i, from, to - from, count), `第 ${i} 次回调位置错误`)
                assert.strictEqual(isDone, i === count, `第 ${i} 次完成状况错误`)
            }
        }

        const promises = [
            handler('linear'),
            handler('easeIn'),
            handler('easeOut'),
            handler('easeInOut'),
        ]

        await Promise.all(promises)
    })

    it('from 非数字抛错', done => {
        const errorMessage = 'from类型错误。起始位置参数必须为数字'

        try {
            animation.linear('a', 'a', sinon.fake())

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('to 非数字抛错', done => {
        const errorMessage = 'to类型错误。结束位置参数必须为数字'

        try {
            animation.linear('0', 'a', sinon.fake())

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('callback 非函数抛错', done => {
        const errorMessage = 'callback 必须是函数'

        try {
            animation.linear('0', '1', '1')

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('结束位置等于起始位置 立即返回', async () => {
        const callback = sinon.fake()

        animation.linear(0, 0, callback)

        await sleep(20)

        assert(callback.called === false)
    })

    it('利用requestAnimationFrame进行动画', () => {
        const originWindow = global.window
        const mockAnimation = sinon.fake()

        global.window = {
            requestAnimationFrame: (callback) => {
                mockAnimation(callback)
            },
        }
        animation.linear(0, 10, sinon.fake(), 20)
        assert.strictEqual(mockAnimation.callCount, 1)

        global.window = originWindow
    })

    it('requestAnimationFrame兼容', () => {
        const originWindow = global.window
        const originTimeout = global.setTimeout
        const mockTimeout = sinon.fake()
        const mockFn = sinon.fake()

        global.window = {
            requestAnimationFrame: null
        }
        global.setTimeout = mockTimeout

        animation.linear(0, 10, sinon.fake(), 10)
        global.window.requestAnimationFrame(mockFn)

        const spyCall = mockTimeout.getCall(0)
        const [arg1, arg2] = spyCall.args
        assert.strictEqual(arg1, mockFn)
        assert.strictEqual(arg2, 17)

        global.window = originWindow
        global.setTimeout = originTimeout
    })
})

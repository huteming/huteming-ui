// import animation from 'web-util/animation/index.js'
import sinon from 'sinon'
import assert from 'assert'
import { sleep } from '../helper'
let animation

describe('animation', () => {
    before(() => {
        global.window = {}
    })

    beforeEach(() => {
        animation = require('web-util/animation/index.js').default
    })

    it('多次执行回调函数', async () => {
        async function handler (type) {
            const from = 0
            const to = 5
            const callback = sinon.fake()
            const duration = 35
            const count = Math.ceil(duration / 17)

            animation[type](from, to, callback, duration)

            await sleep(duration)

            for (let i = 1; i <= count; i++) {
                assert(callback.calledWith(animation.tween[type](i, from, to - from, count), i === count), `第 ${i} 次回调位置错误`)
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
            animation.animation('', 'a', 'a', sinon.fake())

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('to 非数字抛错', done => {
        const errorMessage = 'to类型错误。结束位置参数必须为数字'

        try {
            animation.animation('', '0', 'a', 'a')

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('callback 非函数抛错', done => {
        const errorMessage = 'callback 必须是函数'

        try {
            animation.animation('', '0', '1', 'a')

            done(new Error(`Expected error "${errorMessage}" but got success`))
        } catch (err) {
            assert.strictEqual(err.message, errorMessage)
            done()
        }
    })

    it('结束位置等于起始位置 立即返回', async () => {
        const callback = sinon.fake()

        animation.animation('', 0, 0, callback)

        await sleep(20)

        assert(callback.called === false)
    })
})

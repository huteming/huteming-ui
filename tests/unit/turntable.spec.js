import TmTurntable from 'web-ui/turntable/src/app'
import assert from 'assert'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import { sleep } from '../helper'
const ranges = [
    {
        angle: 180,
        value: 1,
    },
    {
        angle: 180,
        value: 2,
    },
]
function countSteps (stopAngle) {
    return Math.floor(Math.sqrt(2 * (stopAngle + 360 * 5) / 0.03)) + 2
}

describe('turntable', () => {
    let mockTimeout
    let mockAnimation
    let async = false

    beforeEach(() => {
        mockAnimation = sinon.fake()
        mockTimeout = sinon.fake()

        sinon.replace(window, 'setTimeout', (callback, time) => {
            if (async) {
                Promise.resolve().then(callback)
            } else {
                callback()
            }
            mockTimeout(time)
        })
        sinon.replace(window, 'requestAnimationFrame', (callback) => {
            callback()
            mockAnimation()
        })
    })

    it('registName为TmTurntable', () => {
        assert.strictEqual(TmTurntable.registName, 'TmTurntable')
    })

    it('逆时针旋转', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
        })

        wrap.vm.start()
        wrap.vm.stop(2)
        const emitEnd = wrap.emitted('end')

        assert.ok(emitEnd)
        assert.strictEqual(emitEnd.length, 1)
        assert.strictEqual(emitEnd[0][0], 2)

        assert.deepStrictEqual(mockTimeout.getCall(0).args, [200])
        assert.strictEqual(mockAnimation.callCount, countSteps(270))
    })

    it('顺时针旋转', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                direction: true,
            },
        })

        wrap.vm.start()
        wrap.vm.stop(2)
        const emitEnd = wrap.emitted('end')

        assert.ok(emitEnd)
        assert.strictEqual(emitEnd.length, 1)
        assert.strictEqual(emitEnd[0][0], 2)

        assert.deepStrictEqual(mockTimeout.getCall(0).args, [200])
        assert.strictEqual(mockAnimation.callCount, countSteps(90))
    })

    it('reset还原', () => {
        sinon.replace(window, 'setInterval', (callback) => {
            callback()
        })
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
        })
        wrap.vm.start()
        const wrapContainer = wrap.find('.tm-turntable-table-container')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(-3deg);`)

        wrap.vm.reset()
        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(0deg);`)
    })

    it('initial初始化旋转角度', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 2,
            },
        })
        const wrapContainer = wrap.find('.tm-turntable-table-container')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(-270deg);`)
    })

    it('initial不存在时旋转角度为0', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 3,
            },
        })
        const wrapContainer = wrap.find('.tm-turntable-table-container')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(0deg);`)
    })

    it('响应initial改变', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 3,
            },
        })
        wrap.setProps({
            initial: 1,
        })
        const wrapContainer = wrap.find('.tm-turntable-table-container')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(-90deg);`)
    })

    it('beforeDestroy中销毁interval', () => {
        const mockInterval = sinon.fake()
        sinon.replace(window, 'clearInterval', mockInterval)
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 3,
            },
        })
        wrap.vm.timer = 12
        wrap.destroy()

        assert.ok(mockInterval.calledWithExactly(12))
    })

    it('stop没有期望值时随机产生value', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 3,
            },
        })
        const values = []
        // 产生2次随机结果
        for (let i = 0; i < 2; i++) {
            wrap.vm.start()
            wrap.vm.stop()

            const emitEnd = wrap.emitted('end')
            values.push(emitEnd[0][0])
        }
        assert.ok(values.every(item => [1, 2].includes(item)))
    })

    it('disabled不会旋转角度', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                disabled: true,
            },
        })
        wrap.vm.start()
        wrap.vm.stop()
        const wrapContainer = wrap.find('.tm-turntable-table-container')
        const emitEnd = wrap.emitted('end')

        assert.ok(!emitEnd)
        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(0deg);`)
    })

    it('执行中时忽略重复的start/stop', async () => {
        async = true
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
        })
        wrap.vm.start()
        wrap.vm.stop()
        // 执行中, 被忽略
        wrap.vm.start()
        wrap.vm.stop()

        assert.ok(wrap.vm.running)
        assert.ok(wrap.vm.isClickStop)

        await sleep()

        const emitEnd = wrap.emitted('end')

        assert.strictEqual(emitEnd.length, 1)
        assert.ok(!wrap.vm.running)
        assert.ok(!wrap.vm.isClickStop)
    })

    it('向上传递转盘指针点击事件', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
        })
        const wrapPointer = wrap.find('.tm-turntable-pointer')
        wrapPointer.trigger('click')
        const emitClick = wrap.emitted('click-pointer')

        assert.ok(emitClick)
    })

    afterEach(() => {
        sinon.restore()
    })
})

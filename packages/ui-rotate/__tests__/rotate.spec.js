import Rotate, { __RewireAPI__ as RewireAPI } from '../src/main'
import assert from 'assert'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import { sleep } from 'tests/helper'
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

describe('turntable', () => {
    let mockAnimation
    let mockClear
    let mockTranslate
    let rotate

    beforeEach(() => {
        let timer = 0
        mockAnimation = sinon.fake()
        mockClear = sinon.fake()
        mockTranslate = sinon.fake()

        rotate = new Rotate(ranges, {
            translate: mockTranslate,
        })
        rotate.calcSteps = () => {
            return (step) => {
                if (step <= 2) {
                    return 10 * step
                }
                return -1
            }
        }
        RewireAPI.__Rewire__('requestAnimationFrame', (callback) => {
            timer = setTimeout(() => {
                callback()
                mockAnimation()
            }, 5)
        })
        sinon.replace(window, 'cancelAnimationFrame', (...args) => {
            clearTimeout(timer)
            mockClear(...args)
        })
    })

    it('未添加动画函数时,打印警告', async () => {
        const mockWarn = sinon.fake()
        sinon.replace(window.console, 'warn', mockWarn)
        const rotate = new Rotate(ranges)
        rotate.reset()
        assert.ok(mockWarn.called)
    })

    it('结束时调用函数done', async () => {
        const mockDone = sinon.fake()
        rotate.done = mockDone
        rotate.stop(2)
        await sleep(50)
        assert.ok(mockDone.calledOnceWithExactly(2))
    })

    it('逆时针旋转', async () => {
        rotate.direction = false
        rotate.ranges = rotate.formatRanges(ranges.slice(), false)

        rotate.start()
        await sleep()
        rotate.stop(2)
        await sleep(50)
        assert.ok(mockTranslate.calledWithExactly(-10))
        assert.ok(mockTranslate.calledWithExactly(-20))
        assert.deepStrictEqual(rotate.ranges, [{"angle": 180, "angleStop": 90, "value": 1}, {"angle": 180, "angleStop": 270, "value": 2}])
    })

    it('顺时针旋转', async () => {
        rotate.direction = true
        rotate.ranges = rotate.formatRanges(ranges.slice(), true)

        rotate.start()
        await sleep()
        rotate.stop(2)
        await sleep(50)
        assert.ok(mockTranslate.calledWithExactly(10))
        assert.ok(mockTranslate.calledWithExactly(20))
        assert.deepStrictEqual(rotate.ranges, [{"angle": 180, "angleStop": 90, "value": 1}, {"angle": 180, "angleStop": 270, "value": 2}])
    })

    it('reset还原', async () => {
        rotate.start()
        rotate.stop(2)
        assert.strictEqual(rotate.running, true)
        assert.strictEqual(rotate.waitingToStop, true)
        
        rotate.reset()
        assert.strictEqual(rotate.running, false)
        assert.strictEqual(rotate.waitingToStop, false)
        assert.ok(mockTranslate.calledOnceWithExactly(-0))
    })

    it('initial设置还原角度', () => {
        rotate.initial = rotate.formatInitial(rotate.ranges, 2)
        rotate.direction = true
        rotate.start()
        rotate.stop(2)
        assert.strictEqual(rotate.running, true)
        assert.strictEqual(rotate.waitingToStop, true)
        
        rotate.reset()
        assert.strictEqual(rotate.running, false)
        assert.strictEqual(rotate.waitingToStop, false)
        assert.ok(mockTranslate.calledOnceWithExactly(270))
    })

    it('initial指定为角度', () => {
        rotate.initial = rotate.formatInitial(rotate.ranges, 20)
        rotate.direction = true
        rotate.start()
        rotate.stop(2)
        assert.strictEqual(rotate.running, true)
        assert.strictEqual(rotate.waitingToStop, true)

        rotate.reset()
        assert.strictEqual(rotate.running, false)
        assert.strictEqual(rotate.waitingToStop, false)
        assert.ok(mockTranslate.calledOnceWithExactly(20))
    })

    it('stop没有期望值时随机产生value', async () => {
        const mockDone = sinon.fake()
        rotate.done = mockDone
        rotate.start()
        rotate.stop()
        await sleep(50)
        const expect = mockDone.getCall(0).args[0]
        assert.ok(expect === 1 || expect === 2)
    })

    it('执行中时忽略重复的start/stop', async () => {
        rotate.running = true
        rotate.waitingToStop = true
        rotate.start()
        rotate.stop()
        await sleep(50)
        assert.ok(mockTranslate.notCalled)
    })

    // 由于之前的测试中都是模拟 calcSteps 函数，这里单独测试
    it('calcSteps', () => {
        const rotate = new Rotate(ranges)
        const fn = rotate.calcSteps(360)
        let i = 0
        const steps = []
        function getSteps () {
            const next = fn(i++)
            if (next > -1) {
                steps.push(next)
                getSteps()
                return
            }
            steps.push(next)
        }
        getSteps()

        assert.strictEqual(steps[0], 0)
        assert.ok((steps[2] - steps[1]) > (steps[10] - steps[9]))
        assert.strictEqual(steps[steps.length - 2], 360)
        assert.strictEqual(steps[steps.length - 1], -1)
    })

    afterEach(() => {
        sinon.restore()
        RewireAPI.__ResetDependency__('requestAnimationFrame')
    })
})

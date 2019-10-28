import TmTurntable, { __RewireAPI__ as RewireAPI } from 'web-ui/turntable/src/app'
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

describe('turntable', () => {
    let mockAnimation
    let mockClear

    beforeEach(() => {
        let timer = 0
        mockAnimation = sinon.fake()
        mockClear = sinon.fake()

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

    it('registName为TmTurntable', () => {
        assert.strictEqual(TmTurntable.registName, 'TmTurntable')
    })

    it('逆时针旋转', async () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
            methods: {
                calcSteps (total) {
                    return (step) => {
                        if (step <= 2) {
                            return 10 * step
                        }
                        return -1
                    }
                },
            },
        })

        wrap.vm.start()
        wrap.vm.stop(2)
        await sleep(30)
        const emitEnd = wrap.emitted('end')
        const wrapImg = wrap.find('.tm-turntable-image')

        assert.strictEqual(wrapImg.attributes('style'), 'transform: rotate(-20deg);')
        assert.ok(emitEnd)
        assert.strictEqual(emitEnd.length, 1)
        assert.strictEqual(emitEnd[0][0], 2)
    })

    it('顺时针旋转', async () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                direction: true,
            },
            methods: {
                calcSteps (total) {
                    return (step) => {
                        if (step <= 2) {
                            return 10 * step
                        }
                        return -1
                    }
                },
            },
        })

        wrap.vm.start()
        wrap.vm.stop(2)
        await sleep(30)
        const emitEnd = wrap.emitted('end')
        const wrapImg = wrap.find('.tm-turntable-image')

        assert.strictEqual(wrapImg.attributes('style'), 'transform: rotate(20deg);')
        assert.ok(emitEnd)
        assert.strictEqual(emitEnd.length, 1)
        assert.strictEqual(emitEnd[0][0], 2)
    })

    it('reset还原', async () => {
        sinon.replace(window, 'setInterval', (callback) => {
            callback()
        })
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
            methods: {
                calcSteps (total) {
                    return (step) => {
                        if (step <= 2) {
                            return 10 * step
                        }
                        return -1
                    }
                },
            },
        })
        wrap.vm.start()
        await sleep(19)
        const wrapContainer = wrap.find('.tm-turntable-image')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(-30deg);`)

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
        const wrapContainer = wrap.find('.tm-turntable-image')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(-270deg);`)
    })

    it('initial不是value且为数字,指定为角度', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 40,
            },
        })
        const wrapContainer = wrap.find('.tm-turntable-image')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(-40deg);`)
    })

    it('initial不存在时旋转角度为0', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: '3',
            },
        })
        const wrapContainer = wrap.find('.tm-turntable-image')

        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(0deg);`)
    })

    it('beforeDestroy中销毁下一帧动画', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
        })
        wrap.vm.frame = 12
        wrap.destroy()

        assert.ok(mockClear.calledWithExactly(12))
    })

    it('stop没有期望值时随机产生value', async () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
                initial: 3,
            },
            methods: {
                calcSteps (total) {
                    return (step) => {
                        if (step <= 2) {
                            return 10 * step
                        }
                        return -1
                    }
                },
            },
        })
        wrap.vm.start()
        wrap.vm.stop()
        await sleep(20)
        const emitEnd = wrap.emitted('end')

        assert.ok(emitEnd[0][0] === 1 || emitEnd[0][0] === 2)
    })

    it('disabled不会旋转角度', async () => {
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
        await sleep(20)
        const wrapContainer = wrap.find('.tm-turntable-image')
        const emitEnd = wrap.emitted('end')

        assert.ok(!emitEnd)
        assert.strictEqual(wrapContainer.attributes('style'), `transform: rotate(0deg);`)
    })

    it('执行中时忽略重复的start/stop', async () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
            methods: {
                calcSteps (total) {
                    return (step) => {
                        if (step <= 2) {
                            return 10 * step
                        }
                        return -1
                    }
                },
            },
        })
        wrap.vm.start()
        wrap.vm.stop()
        // 执行中, 被忽略
        wrap.vm.start()
        wrap.vm.stop()

        assert.ok(wrap.vm.running)
        assert.ok(wrap.vm.isClickStop)

        await sleep(20)

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

    // 由于之前的测试中都是模拟 calcSteps 函数，这里单独测试
    it('calcSteps', () => {
        const wrap = mount(TmTurntable, {
            propsData: {
                board: '',
                pointer: '',
                ranges: ranges,
            },
        })
        const fn = wrap.vm.calcSteps(360)
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

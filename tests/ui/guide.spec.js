import Guide from 'web-ui/guide/src/guide.js'
import assert from 'assert'
import { cleanDom, sleep } from '../helper'
import WorkBasic from '../components/basic'
import WorkElement from '../components/element'
import { mount, createWrapper } from '@vue/test-utils'
import sinon from 'sinon'

describe('guide', () => {
    let wrapperTarget

    beforeEach(() => {
        wrapperTarget = mount({
            template: `
                <div id="target"></div>
            `,
        }, {
            attachToDocument: true,
        })
    })

    it('create', async () => {
        const guide = new Guide([
            {
                name: 'basic',
                target: '#target',
                component: WorkBasic,
            },
            {
                name: 'element',
                target: '#target',
                component: WorkElement,
            },
        ], {
            init: 'basic',
        })
        const vm = guide.open()

        const wrapper = createWrapper(vm)
        const wrapperBasic = wrapper.find(WorkBasic)
        const wrapperElement = wrapper.find(WorkElement)
        assert.ok(wrapperBasic.exists())
        assert.ok(!wrapperElement.exists())
    })

    it('init', async () => {
        const guide = new Guide([
            {
                name: 'basic',
                target: '#target',
                component: WorkBasic,
            },
            {
                name: 'element',
                target: '#target',
                component: WorkElement,
            },
        ], {
            init: 'element',
        })
        const vm = guide.open()

        const wrapper = createWrapper(vm)
        const wrapperBasic = wrapper.find(WorkBasic)
        const wrapperElement = wrapper.find(WorkElement)
        assert.ok(!wrapperBasic.exists())
        assert.ok(wrapperElement.exists())
    })

    it('click to next', async () => {
        const guide = new Guide([
            {
                name: 'basic',
                target: '#target',
                component: WorkBasic,
            },
            {
                name: 'element',
                target: '#target',
                component: WorkElement,
            },
        ])
        const vm = guide.open()
        const wrapper = createWrapper(vm)

        wrapper.trigger('click')
        const wrapperBasic = wrapper.find(WorkBasic)
        const wrapperElement = wrapper.find(WorkElement)
        assert.ok(!wrapperBasic.exists())
        assert.ok(wrapperElement.exists())
    })

    it('events', async () => {
        let delayDone
        const mockAfter = sinon.fake()
        const mockComplete = sinon.fake()
        const guide = new Guide([
            {
                name: 'basic',
                target: '#target',
                component: WorkBasic,
            },
            {
                name: 'element',
                target: '#target',
                component: WorkElement,
                before (done) {
                    delayDone = done
                },
                after: mockAfter,
            },
        ], {
            init: 'element',
            complete: mockComplete,
        })
        const vm = guide.open()
        const wrapper = createWrapper(vm)
        let wrapperElement

        const wrapperBasic = wrapper.find(WorkBasic)
        wrapperElement = wrapper.find(WorkElement)
        assert.ok(!wrapperBasic.exists())
        assert.ok(!wrapperElement.exists())
        assert.strictEqual(mockAfter.callCount, 0)

        delayDone()
        wrapperElement = wrapper.find(WorkElement)
        assert.ok(wrapperElement.exists())
        assert.strictEqual(mockAfter.callCount, 0)
        await sleep()
        assert.strictEqual(mockAfter.callCount, 1)

        wrapper.trigger('click')
        await sleep(100)
        assert.ok(!wrapper.exists())
        assert.strictEqual(mockComplete.callCount, 1)
    })

    it('提早关闭不会触发complete', async () => {
        const mockComplete = sinon.fake()
        const guide = new Guide([
            {
                name: 'basic',
                target: '#target',
                component: WorkBasic,
            },
            {
                name: 'element',
                target: '#target',
                component: WorkElement,
            },
        ], {
            complete: mockComplete,
        })
        const vm = guide.open()
        const wrapper = createWrapper(vm)
        guide.close()

        await sleep(100)
        assert.ok(!wrapper.exists())
        assert.strictEqual(mockComplete.callCount, 0)
    })

    it('禁止重复打开/关闭', async () => {
        const guide = new Guide([
            {
                name: 'basic',
                target: '#target',
                component: WorkBasic,
            },
            {
                name: 'element',
                target: '#target',
                component: WorkElement,
            },
        ])
        const vm = guide.open()
        const vm2 = guide.open()
        const vm3 = guide.close()
        const vm4 = guide.close()

        assert.ok(vm)
        assert.strictEqual(vm2, undefined)
        assert.strictEqual(vm3, null)
        assert.strictEqual(vm4, undefined)
    })

    it('target是一个dom', async () => {
        const guide = new Guide([
            {
                name: 'basic',
                target: wrapperTarget.element,
                component: WorkBasic,
            },
            {
                name: 'element',
                target: wrapperTarget.element,
                component: WorkElement,
            },
        ])
        const vm = guide.open()

        const wrapper = createWrapper(vm)
        const wrapperBasic = wrapper.find(WorkBasic)
        const wrapperElement = wrapper.find(WorkElement)
        assert.ok(wrapperBasic.exists())
        assert.ok(!wrapperElement.exists())
    })

    it('渲染组件参数', async () => {
        const extra = 'this is a extra string'
        sinon.replace(wrapperTarget.element, 'getBoundingClientRect', () => {
            return {
                top: 100,
                left: 200,
            }
        })
        sinon.replaceGetter(wrapperTarget.element, 'offsetWidth', () => {
            return 300
        })
        sinon.replaceGetter(wrapperTarget.element, 'offsetHeight', () => {
            return 400
        })
        const guide = new Guide([
            {
                name: 'basic',
                target: wrapperTarget.element,
                component: WorkBasic,
                extra,
            },
            {
                name: 'element',
                target: wrapperTarget.element,
                component: WorkElement,
                extra,
            },
        ])
        const vm = guide.open()
        const wrapper = createWrapper(vm)
        const wrapperBasic = wrapper.find(WorkBasic)

        assert.deepStrictEqual(wrapperBasic.attributes('extra'), extra)
        assert.strictEqual(wrapperBasic.attributes('top'), '100')
        assert.strictEqual(wrapperBasic.attributes('left'), '200')
        assert.strictEqual(wrapperBasic.attributes('width'), '300')
        assert.strictEqual(wrapperBasic.attributes('height'), '400')
    })

    it('target不存在', async () => {
        const guide = new Guide([
            {
                name: 'basic',
                component: WorkBasic,
            },
            {
                name: 'element',
                component: WorkElement,
            },
        ])
        const vm = guide.open()
        const wrapper = createWrapper(vm)
        const wrapperBasic = wrapper.find(WorkBasic)

        assert.strictEqual(wrapperBasic.attributes('top'), undefined)
        assert.strictEqual(wrapperBasic.attributes('left'), undefined)
        assert.strictEqual(wrapperBasic.attributes('width'), undefined)
        assert.strictEqual(wrapperBasic.attributes('height'), undefined)
    })

    it('禁止click冒泡', async () => {
        const mockClick = sinon.fake()
        window.addEventListener('click', mockClick)
        const guide = new Guide([
            {
                name: 'basic',
                component: WorkBasic,
            },
            {
                name: 'element',
                component: WorkElement,
            },
        ])
        const vm = guide.open()
        const wrapper = createWrapper(vm)

        wrapper.trigger('click')
        assert.strictEqual(mockClick.callCount, 0)

        window.removeEventListener('click', mockClick)
    })

    it('禁止touchmove冒泡 && 禁止滚动', async () => {
        const mockPrevent = sinon.fake()
        const mockMove = sinon.fake()
        sinon.replace(Event.prototype, 'preventDefault', mockPrevent)
        window.addEventListener('touchmove', mockMove)

        const guide = new Guide([
            {
                name: 'basic',
                component: WorkBasic,
            },
            {
                name: 'element',
                component: WorkElement,
            },
        ])
        const vm = guide.open()
        const wrapper = createWrapper(vm)

        wrapper.trigger('touchmove')
        assert.strictEqual(mockMove.callCount, 0)
        assert.strictEqual(mockPrevent.callCount, 1)

        window.removeEventListener('touchmove', mockMove)
    })

    afterEach(() => {
        sinon.restore()
        cleanDom('.tm-guide')
        wrapperTarget.destroy()
    })
})

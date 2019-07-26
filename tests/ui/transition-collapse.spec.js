import TmTransitionCollapse, { __RewireAPI__ as RewireAPI } from 'web-ui/transition-collapse/src'
import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
import { sleep } from '../helper'
import sinon from 'sinon'
const mockScrollHeight = 100
const localVue = createLocalVue()
localVue.component(TmTransitionCollapse.name, TmTransitionCollapse)

describe('transition-collapse', () => {
    let mockAnimation

    beforeEach(() => {
        mockAnimation = sinon.fake()
        RewireAPI.__Rewire__('easeInOut', (...args) => {
            mockAnimation(...args)
            args[2](mockScrollHeight / 2, false)
            setTimeout(() => {
                args[2](mockScrollHeight, true)
            }, 10)
        })
    })

    it('open', async () => {
        const wrapper = mount({
            template: `
                <tm-transition-collapse>
                    <div id="container" v-show="visible"></div>
                </tm-transition-collapse>
            `,
            data () {
                return {
                    visible: false,
                }
            },
        }, {
            localVue,
            stubs: {
                transition: false,
            },
        })
        // 模拟高度
        const wrapperContainer = wrapper.find('#container')
        sinon.replaceGetter(wrapperContainer.element, 'scrollHeight', () => {
            return mockScrollHeight
        })
        wrapper.setData({ visible: true })
        const [from, to, , duration] = mockAnimation.getCall(0).args
        assert.strictEqual(from, 0)
        assert.strictEqual(to, mockScrollHeight)
        assert.strictEqual(duration, 250)
        assert.strictEqual(wrapperContainer.element.style.height, `${mockScrollHeight / 2}px`)
        await sleep()
        assert.strictEqual(wrapperContainer.element.style.height, '')
    })

    it('close', async () => {
        const wrapper = mount({
            template: `
                <tm-transition-collapse>
                    <div id="container" v-show="visible"></div>
                </tm-transition-collapse>
            `,
            data () {
                return {
                    visible: true,
                }
            },
        }, {
            localVue,
            stubs: {
                transition: false,
            },
        })
        // 模拟高度
        const wrapperContainer = wrapper.find('#container')
        sinon.replaceGetter(wrapperContainer.element, 'scrollHeight', () => {
            return mockScrollHeight
        })
        wrapper.setData({ visible: false })
        const [from, to, , duration] = mockAnimation.getCall(0).args
        assert.strictEqual(from, mockScrollHeight)
        assert.strictEqual(to, 0)
        assert.strictEqual(duration, 250)
        assert.strictEqual(wrapperContainer.element.style.height, `${mockScrollHeight / 2}px`)
        await sleep()
        assert.strictEqual(wrapperContainer.element.style.height, '')
    })

    afterEach(() => {
        sinon.restore()
        RewireAPI.__ResetDependency__('easeInOut')
    })
})

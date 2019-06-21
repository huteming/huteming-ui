import CompAnchor from '../components/anchor'
import { mount } from '@vue/test-utils'
import assert from 'assert'
import { sleep, mockProperty } from '../helper'
import { __RewireAPI__ as WxsdkRewireAPI } from 'web-ui/anchor/src/anchor'
import sinon from 'sinon'

let count = 1

describe('anchor', () => {
    beforeEach(() => {
        WxsdkRewireAPI.__Rewire__('getElementTop', () => count++)
        WxsdkRewireAPI.__Rewire__('getScrollTop', () => count++)
    })

    afterEach(() => {
        WxsdkRewireAPI.__ResetDependency__('getElementTop')
        WxsdkRewireAPI.__ResetDependency__('getScrollTop')
        sinon.restore()
    })

    it('按钮在滚动区域内', async () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })

        try {
            const wrapperBtn = wrapper.find('#btn2')
            const scrollContainer = wrapperBtn.element['@@Anchor'].self.scrollEventTarget
            wrapperBtn.trigger('click')
            await sleep(8)

            assert.strictEqual(scrollContainer.scrollTop, 3)
            assert.strictEqual(wrapper.vm.position, 3)
        } finally {
            wrapper.destroy()
        }
    })

    it('参数是字符串', async () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })

        try {
            const wrapperBtn = wrapper.find('#btn4')
            const scrollContainer = wrapperBtn.element['@@Anchor'].self.scrollEventTarget
            wrapperBtn.trigger('click')
            await sleep(400)

            assert.strictEqual(scrollContainer.scrollTop, 7)
        } finally {
            wrapper.destroy()
        }
    })

    it('选择器不存在', async () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })
        const mockWarn = sinon.fake()
        sinon.replace(console, 'warn', mockWarn)

        try {
            const wrapperBtn = wrapper.find('#btn5')
            const scrollContainer = wrapperBtn.element['@@Anchor'].self.scrollEventTarget
            wrapperBtn.trigger('click')

            assert.strictEqual(mockWarn.getCall(0).args[0], 'selector[#target2]有误。未找到指定dom')
        } finally {
            wrapper.destroy()
        }
    })
})

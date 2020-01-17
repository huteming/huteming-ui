import { mount, TransitionStub } from '@vue/test-utils'
import TmPickerAddress from '../src/main'
import assert from 'assert'
import { sleep } from 'tests/helper'
import moxios from 'moxios'
import sinon from 'sinon'

describe('picker-address', () => {
  beforeEach(() => {
    sinon.replace(console, 'log', sinon.fake())
    sinon.replace(console, 'error', sinon.fake())
    moxios.install()
    moxios.stubRequest('https://jhsycdn.jinghao.com/components/address.min.json', {
      status: 500,
    })
  })

  afterEach(() => {
    sinon.restore()
    moxios.uninstall()
  })

  it('打开选择器获取地址失败显示empty', async () => {
    const wrap = mount(TmPickerAddress, {
      propsData: {
        visible: true,
      },
      stubs: {
        TmPopup: TransitionStub,
      },
    })
    await sleep()
    const wrapEmpty = wrap.find('.tm-empty')
    const wrapPicker = wrap.find('.tm-picker')
    assert.ok(wrapEmpty.exists())
    assert.ok(!wrapPicker.exists())
  })

  it('点击确认', async () => {
    const mockValue = ['12', '01', '120101']
    const wrap = mount(TmPickerAddress, {
      propsData: {
        visible: true,
        value: mockValue,
      },
      stubs: {
        TmPopup: TransitionStub,
      },
    })
    await sleep()

    // 模拟点击
    const wrapConfirm = wrap.find('.tm-toolbar__confirm')
    wrapConfirm.trigger('click')

    const emitInput = wrap.emitted('input')
    const emitText = wrap.emitted('update:valueText')
    const emitChange = wrap.emitted('change')

    assert.ok(!wrap.isVisible())
    assert.ok(!emitInput)
    assert.ok(!emitText)
    assert.ok(!emitChange)
  })
})

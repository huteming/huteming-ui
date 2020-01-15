import { mount, TransitionStub } from '@vue/test-utils'
import TmPickerAddress from '../src/main'
import assert from 'assert'
import { sleep } from 'tests/helper'
import moxios from 'moxios'
import sinon from 'sinon'
const mockProvinces: any = [
  {
    "value": "11",
    "label": "北京市"
  },
  {
    "value": "12",
    "label": "天津市"
  },
]
const mockCities: any = [
  {
    "value": "1101",
    "label": "市辖区",
    "provinceCode": "11"
  },
  {
    "value": "1201",
    "label": "市辖区",
    "provinceCode": "12"
  },
]
const mockAreas: any = [
  {
    "value": "110101",
    "label": "东城区",
    "cityCode": "1101",
    "provinceCode": "11"
  },
  {
    "value": "120101",
    "label": "和平区",
    "cityCode": "1201",
    "provinceCode": "12"
  },
]

describe('picker-address', () => {
  beforeEach(() => {
    sinon.replace(console, 'log', sinon.fake())
    moxios.install()
    moxios.stubRequest('https://jhsycdn.jinghao.com/components/address.min.json', {
      status: 200,
      response: {
        provinces: mockProvinces,
        cities: mockCities,
        areas: mockAreas,
      },
    })
  })

  afterEach(() => {
    sinon.restore()
    moxios.uninstall()
  })

  it('打开选择器之后获取地址', async () => {
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
    assert.ok(!wrapEmpty.exists())
    assert.ok(wrapPicker.exists())
    assert.strictEqual(wrap.vm.provinceOptions, mockProvinces)
  })

  it('确认修改', async () => {
    const mockValue = ['12', '1201', '120101']
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
    // 初始值
    assert.strictEqual(wrap.vm.provinceCode, '12')
    assert.strictEqual(wrap.vm.cityCode, '1201')
    assert.strictEqual(wrap.vm.areaCode, '120101')

    // 模拟滑动
    const wrapPicker = wrap.find('.tm-picker-item')
    wrapPicker.trigger('touchstart', {
      changedTouches: [{
        pageY: 0,
      }],
    })
    wrapPicker.trigger('touchend', {
      changedTouches: [{
        pageY: 500,
      }],
    })
    // 模拟点击
    const wrapConfirm = wrap.find('.tm-toolbar-confirm')
    wrapConfirm.trigger('click')

    const emitInput = wrap.emitted('input')
    const emitText = wrap.emitted('update:valueText')
    const emitChange = wrap.emitted('change')

    assert.ok(!wrap.isVisible())
    assert.ok(emitInput)
    assert.deepStrictEqual(emitInput[0], [['11', '1101', '110101']])
    assert.ok(emitText)
    assert.deepStrictEqual(emitText[0], [['北京市', '市辖区', '东城区']])
    assert.ok(emitChange)
    assert.deepStrictEqual(emitChange[0], [['11', '1101', '110101'], ['北京市', '市辖区', '东城区']])
  })

  it('点击取消', async () => {
    const mockValue = ['12', '1201', '120101']
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

    // 模拟滑动
    const wrapPicker = wrap.find('.tm-picker-item')
    wrapPicker.trigger('touchstart', {
      changedTouches: [{
        pageY: 0,
      }],
    })
    wrapPicker.trigger('touchend', {
      changedTouches: [{
        pageY: 500,
      }],
    })
    // 模拟点击
    const wrapCancel = wrap.find('.tm-toolbar-cancel')
    wrapCancel.trigger('click')

    const emitInput = wrap.emitted('input')
    const emitText = wrap.emitted('update:valueText')
    const emitChange = wrap.emitted('change')

    assert.ok(!wrap.isVisible())
    assert.ok(!emitInput)
    assert.ok(!emitText)
    assert.ok(!emitChange)
  })

  it('初始化的地址异常重置为第一项', async () => {
    const mockValue = ['aaa', 'bbb', 'ccc']
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

    const wrapConfirm = wrap.find('.tm-toolbar-confirm')
    wrapConfirm.trigger('click')

    const emitInput = wrap.emitted('input')
    assert.deepStrictEqual(emitInput[0], [['11', '1101', '110101']])
  })

  it('多次打开不会重复获取地址', async () => {
    const wrap = mount(TmPickerAddress, {
      propsData: {
        visible: false,
      },
      stubs: {
        TmPopup: TransitionStub,
      },
    })
    const spy = sinon.spy(wrap.vm, 'initOptions')
    wrap.setProps({ visible: true })
    await sleep()
    wrap.setProps({ visible: false })
    await sleep()
    wrap.setProps({ visible: true })
    await sleep()

    assert.strictEqual(spy.callCount, 1)
  })
})

import { mount, TransitionStub, createLocalVue } from '@vue/test-utils'
import TmPickerAddress from '../src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('picker-address', () => {
  beforeEach(() => {
    sinon.replace(console, 'log', sinon.fake())
  })

  afterEach(() => {
    sinon.restore()
  })

  it('install', () => {
    const localVue = createLocalVue()
    localVue.prototype.$HUTEMING = {
      scopeComponent: 'A',
    }
    assert.ok(!localVue.component('APickerAddress'))
    localVue.use(TmPickerAddress)
    assert.ok(localVue.component('APickerAddress'))
  })

  it('初始化时不会自动加载地址', async () => {
    const wrap = mount(TmPickerAddress, {
      propsData: {
        visible: false,
      },
      stubs: {
        TmPopup: TransitionStub,
      },
    })
    // await sleep()
    const wrapEmpty = wrap.find('.tm-empty')
    const wrapPicker = wrap.find('.tm-picker')
    assert.ok(wrapEmpty.exists())
    assert.ok(!wrapPicker.exists())
  })
})

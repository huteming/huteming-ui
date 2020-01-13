import assert from 'assert'
import Loading from '../src/main'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import { Mock, sleep } from 'tests/helper'
const localVue = createLocalVue()
localVue.use(Loading)

describe('loading > component', () => {
  it('禁止click冒泡', async () => {
    const mockPrevent = sinon.fake()
    const mockClickBody = sinon.fake()
    const mock = new Mock(Event.prototype, 'stopPropagation', {
      value: mockPrevent,
    })
    window.addEventListener('click', mockClickBody)
    try {
      mock.replace()
      const wrapper = mount({
        template: `
          <div v-loading="true"></div>
        `,
      }, {
        localVue,
      })
      const root = wrapper.find('.tm-loading')
      root.trigger('click')

      assert.strictEqual(mockClickBody.callCount, 0)
      assert.strictEqual(mockPrevent.callCount, 1)
    } finally {
      mock.restore()
      window.removeEventListener('click', mockClickBody)
    }
  })

  it('禁止touchmove冒泡 && 禁止滚动', async () => {
    const mockPrevent = sinon.fake()
    const mockStop = sinon.fake()
    const mockMoveBody = sinon.fake()
    const mock1 = new Mock(Event.prototype, 'preventDefault', {
      value: mockPrevent,
    })
    const mock2 = new Mock(Event.prototype, 'stopPropagation', {
      value: mockStop,
    })
    window.addEventListener('touchmove', mockMoveBody)

    try {
      mock1.replace()
      mock2.replace()
      const wrapper = mount({
        template: `
          <div v-loading="true"></div>
        `,
      }, {
        localVue,
      })
      const root = wrapper.find('.tm-loading')
      root.trigger('touchmove')

      assert.strictEqual(mockMoveBody.callCount, 0)
      assert.strictEqual(mockPrevent.callCount, 1)
      assert.strictEqual(mockStop.callCount, 1)
      assert.ok(mockPrevent.calledBefore(mockStop))
    } finally {
      mock1.restore()
      mock2.restore()
      window.removeEventListener('touchmove', mockMoveBody)
    }
  })
})

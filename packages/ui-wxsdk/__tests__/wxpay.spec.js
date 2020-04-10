import wxPay, { __RewireAPI__ as WxsdkRewireAPI } from '../src/wxPay'
import assert from 'assert'
import sinon from 'sinon'
import { sleep } from 'tests/helper'
const FLAG_FAILURE = 'failure'
const FLAG_SUCCESS = 'success'
const resGetPayConfig = {
  b: 'a',
  j: 'e',
}

describe('wxsdk > wxPay', () => {
  let mockInvoke

  beforeEach(async () => {
    mockInvoke = sinon.fake()

    WxsdkRewireAPI.__Rewire__('getPayConfig', () => {
      return Promise.resolve({
        data: {
          data: JSON.stringify(resGetPayConfig),
        }
      })
    })

    window.WeixinJSBridge = {
      invoke (str, obj, fn) {
        mockInvoke(...arguments)
        if (global.errInvoke === FLAG_FAILURE) {
          return fn({ err_msg: 'invoke error' })
        }
        fn({ err_msg: 'get_brand_wcpay_request:ok' })
      },
    }
  })

  afterEach(() => {
      sinon.restore()
      WxsdkRewireAPI.__ResetDependency__('getPayConfig')
      global.errInvoke = null
      window.WeixinJSBridge = null
  })

  it('success', async () => {
    global.errInvoke === FLAG_SUCCESS
    await wxPay()

    const [first, second] = mockInvoke.getCall(0).args
    assert.strictEqual(first, 'getBrandWCPayRequest')
    assert.deepStrictEqual(second, resGetPayConfig)
  })

  it('监听WeixinJSBridgeReady', (done) => {
    global.errInvoke === FLAG_SUCCESS
    const _save = window.WeixinJSBridge
    window.WeixinJSBridge = undefined
    const event = document.createEvent('Event')
    event.initEvent('WeixinJSBridgeReady', true, false)

    wxPay()
      .then(() => {
        assert.ok(mockInvoke.called)
        done()
      })
    // 保证已经解析getPayConfig，正在等待触发事件
    sleep(20)
      .then(() => {
        window.WeixinJSBridge = _save
        assert.ok(mockInvoke.notCalled)
        document.dispatchEvent(event)
      })
  })

  it('invoke 异常', done => {
    global.errInvoke = FLAG_FAILURE
    wxPay()
      .then(() => {
        done(new Error('非期望异常'))
      })
      .catch(err => {
        assert.strictEqual(err.message, '支付失败: invoke error')
        done()
      })
  })

  it('debug模式', async () => {
    const mockLog = sinon.fake()
    const mockData = {
      w: 'a',
    }
    sinon.replace(console, 'log', mockLog)
    await wxPay(mockData, { debug: true })

    assert.ok(mockInvoke.notCalled)
    assert.ok(mockLog.called)
    assert.deepStrictEqual(mockLog.getCall(0).args, [mockData])
  })
})

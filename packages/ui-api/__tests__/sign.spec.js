import sign, { __RewireAPI__ as RewireAPI } from '../src/sign'
import sinon from 'sinon'
import assert from 'assert'
const host = '192.168.0.220'
const origin = `http://${host}`
const link = '/#/docs/flex?hello=lll'
const href = `${origin}${link}`
const title = 'title'

describe('sign', () => {
  let post
  let originWindow
  let originDocument

  beforeEach(() => {
    originWindow = global.window
    originDocument = global.document

    global.window = {
      location: {
        host,
        href,
        origin,
      },
    }
    global.document = {
      title,
    }

    post = sinon.fake()

    RewireAPI.__Rewire__('request', {
      post,
    })
  })

  afterEach(() => {
      sinon.restore()
      RewireAPI.__ResetDependency__('request')
      global.window = originWindow
      global.document = originDocument
  })

  it('请求地址', () => {
    sign()

    const spyCall = post.getCall(0)
    assert.strictEqual(spyCall.args[0], '/api/system/pageStat')
  })

  it('默认参数', () => {
    const originTitle = document.title
    const title = 'sdkjslf'
    document.title = title
    sign()

    const spyCall = post.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
        itemSign: window.location.href.replace(window.location.origin, ''),
        itemRemark: title,
    })
    document.title = originTitle
  })

  it('自定义参数', async () => {
    const itemSign = 'hello'
    const itemRemark = 'world'
    sign(itemSign, itemRemark)

    const spyCall = post.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
        itemSign,
        itemRemark,
    })
  })

  it('点击事件', () => {
    const itemSign = 'hello'
    const itemRemark = 'world'
    sign(itemSign, itemRemark, { type: 'click' })

    const spyCall = post.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
      itemSign: `CLICK#${itemSign}`,
      itemRemark,
    })
  })

  it('分享事件', () => {
    const itemSign = 'hello'
    const itemRemark = 'world'
    sign(itemSign, itemRemark, { type: 'share' })

    const spyCall = post.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
      itemSign: `SHARE#${itemSign}`,
      itemRemark,
    })
  })

  it('服务器环境默认参数', async () => {
    RewireAPI.__Rewire__('isStandardBrowserEnv', () => (false))
    sign()

    const spyCall = post.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
      itemSign: 'ServerSide#',
      itemRemark: 'ServerSide#',
    })
    RewireAPI.__ResetDependency__('isStandardBrowserEnv')
  })
})

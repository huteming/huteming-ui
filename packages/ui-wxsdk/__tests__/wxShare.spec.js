import wxShare, { __RewireAPI__ as WxsdkRewireAPI } from '../src/wxShare'
import assert from 'assert'
import sinon from 'sinon'
import { Mock } from 'tests/helper'

describe('wxsdk > wxShare', () => {
  let onConfig
  let onShowMenuItems
  let onShare
  let mockSign

  beforeEach(async () => {
    onConfig = sinon.fake.resolves()
    onShowMenuItems = sinon.fake()
    onShare = sinon.fake()
    mockSign = sinon.fake.resolves()

    WxsdkRewireAPI.__Rewire__('sign', mockSign)
    WxsdkRewireAPI.__Rewire__('wxConfig', onConfig)

    global.wx = {
      showMenuItems: onShowMenuItems,
      onMenuShareTimeline (options) {
        onShare(options)
        options.success()
      },
      onMenuShareAppMessage: onShare,
    }
  })

  afterEach(() => {
    sinon.restore()
    WxsdkRewireAPI.__ResetDependency__('sign')
    WxsdkRewireAPI.__ResetDependency__('wxConfig')
    global.wx = null
  })

  it('默认配置参数', async () => {
    const { link, imgUrl } = await wxShare()

    assert.strictEqual(link, window.location.href)
    assert.strictEqual(imgUrl, 'http://jhsy-img.caizhu.com/fejhsy/images/logo.png')
  })

  it('调用wx.showMenuItems', async () => {
      await wxShare()

  })

  it('微信分享', async () => {
    const options = await wxShare()

    assert.deepStrictEqual(onShowMenuItems.getCall(0).args[0], {
      menuList: [
        'menuItem:share:timeline',
        'menuItem:share:appMessage'
      ],
    })
    assert.strictEqual(onShare.callCount, 2)
    assert.ok(onShare.alwaysCalledWithExactly(options))
  })

  it('绝对路径自动补全', async () => {
    const link = '/test/test'
    const resOptions = await wxShare({
      link,
    })

    assert.strictEqual(resOptions.link, `http://localhost${link}`)
  })

  it('调用自定义统计', async () => {
    await wxShare()

    const [itemTitle, itemRemark, options] = mockSign.getCall(0).args
    assert.strictEqual(itemTitle, '')
    assert.strictEqual(itemRemark, '')
    assert.deepStrictEqual(options, { type: 'share' })
  })

  it('自定义success回调', async () => {
    const success = sinon.fake()
    await wxShare({ success })

    assert.strictEqual(success.callCount, 1)
  })

  it('添加渠道参数', async () => {
    const config = await wxShare({ channel: true, link: '/hello' })

    assert.strictEqual(config.link, 'http://localhost/hello?mainUnion=mainUnion&subUnion=subUnion')
  })

  it('地址渠道参数为空', async () => {
    const mock = new Mock(window, 'location', {
      writable: true,
      value: {
        href: 'http://test',
        origin: 'http://test',
      },
    })
    mock.replace()
    try {
      const config = await wxShare({ channel: true, link: '/hello' })

      assert.strictEqual(config.link, 'http://test/hello?mainUnion=&subUnion=')
    } finally {
      mock.restore()
    }
  })

  it('添加查询参数', async () => {
    const key1 = 'qq'
    const key2 = 'force'
    const query = [
      {
        key: 'qq',
        value: key1,
      },
      {
        key: 'mainUnion',
        value: key2,
      },
    ]
    const config = await wxShare({ query, channel: true })

    assert.strictEqual(config.link, 'http://localhost/#/hello?mainUnion=mainUnion&subUnion=subUnion&key=value&num=1&qq=qq')
  })

  it('查询参数可以强制覆盖渠道参数', async () => {
    const key2 = 'force'
    const query = [
      {
        key: 'mainUnion',
        value: key2,
        force: true,
      },
    ]

    const config = await wxShare({ query, channel: true })

    assert.strictEqual(config.link, 'http://localhost/#/hello?mainUnion=force&subUnion=subUnion&key=value&num=1')
  })
})

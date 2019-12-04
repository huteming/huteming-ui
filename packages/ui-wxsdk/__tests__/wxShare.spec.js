import { __RewireAPI__ as WxsdkRewireAPI, wxShare } from '../src/main'
import assert from 'assert'
import sinon from 'sinon'
import qs from 'qs'

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

    it('获取当前wxConfig', async () => {
        await wxShare()

        const [isUpdate] = onConfig.getCall(0).args
        assert.strictEqual(isUpdate, false)
    })

    it('调用wx.showMenuItems', async () => {
        await wxShare()

        const actual = onShowMenuItems.getCall(0).args[0]
        assert.deepStrictEqual(actual, {
            menuList: [
                'menuItem:share:timeline',
                'menuItem:share:appMessage'
            ]
        })
    })

    it('调用wx.onMenuShareTimeline && wx.onMenuShareAppMessage', async () => {
        const options = await wxShare()

        assert.strictEqual(onShare.callCount, 2)
        assert.ok(onShare.alwaysCalledWithExactly(options))
    })

    it('绝对路径自动补全', async () => {
        const link = '/test/test'
        const resOptions = await wxShare({
            link,
        })

        assert.strictEqual(resOptions.link, `${global.window.location.origin}${link}`)
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
        const resOptions = await wxShare({ channel: true, link: '/hello' })

        const { mainUnion, subUnion } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })
        assert.strictEqual(mainUnion, 'mainUnion')
        assert.strictEqual(subUnion, 'subUnion')
    })

    it('地址渠道参数为空', async () => {
        const originLocation = window.location
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: {
                href: 'http://testurl',
            },
        })
        try {
            const resOptions = await wxShare({ channel: true, link: '/hello' })

            const { mainUnion, subUnion } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })

            assert.strictEqual(mainUnion, '')
            assert.strictEqual(subUnion, '')
        } finally {
            window.location = originLocation
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
        const resOptions = await wxShare({ query, channel: true })

        const { qq, mainUnion } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })
        assert.strictEqual(qq, key1)
        assert.strictEqual(mainUnion, 'mainUnion')
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

        const resOptions = await wxShare({ query, channel: true })

        const { mainUnion } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })
        assert.strictEqual(mainUnion, key2)
    })
})

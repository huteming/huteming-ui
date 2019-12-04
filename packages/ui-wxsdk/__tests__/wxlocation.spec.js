import { __RewireAPI__ as WxsdkRewireAPI, wxLocation } from '../src/main'
import assert from 'assert'
import sinon from 'sinon'
const FLAG_FAILURE = 'failure'
const FLAG_SUCCESS = 'success'
const latitude = 'latitude'
const longitude = 'longitude'
const mockGeocoder = {
    hello: 'hello',
}

describe('wxsdk > wxLocation', () => {
    let onParseGeocoder
    let onConfig
    let onLocation

    beforeEach(async () => {
        onLocation = sinon.fake()
        onConfig = sinon.fake.resolves()
        onParseGeocoder = sinon.fake.resolves(mockGeocoder)

        WxsdkRewireAPI.__Rewire__('parseGeocoder', onParseGeocoder)
        WxsdkRewireAPI.__Rewire__('wxConfig', onConfig)

        global.wx = {
            getLocation (options) {
                onLocation(options)
                const { success, fail } = options
                if (global.__wx === FLAG_FAILURE) {
                    return fail({ errMsg: 'location' })
                }
                success({ latitude, longitude })
            },
        }
    })

    afterEach(() => {
        sinon.restore()
        global.wx = null
        global.__wx = FLAG_SUCCESS
        WxsdkRewireAPI.__ResetDependency__('parseGeocoder')
        WxsdkRewireAPI.__ResetDependency__('wxConfig')
    })

    it('获取当前wxConfig', async () => {
        await wxLocation()

        const [isUpdate] = onConfig.getCall(0).args
        assert.strictEqual(isUpdate, false)
    })

    it('调用wx.getLocation', async () => {
        await wxLocation()

        assert.ok(onLocation.called)
    })

    it('parseGeocoder接收wx.getLocation返回参数', async () => {
        await wxLocation()

        const spyCall = onParseGeocoder.getCall(0)
        assert.deepStrictEqual(spyCall.args[0], { lat: latitude, lng: longitude, type: 'wgs84ll' })
    })

    it('返回parseGeocoder的结果', async () => {
        const data = await wxLocation()

        assert.strictEqual(data, mockGeocoder)
    })

    it('wx.getLocation 异常', done => {
        global.__wx = FLAG_FAILURE
        wxLocation()
            .then(() => {
                done(new Error('非期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, '定位失败: location')
                done()
            })
    })
})

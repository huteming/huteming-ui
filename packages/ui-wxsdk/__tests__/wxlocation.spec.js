import wxLocation, { __RewireAPI__ as WxsdkRewireAPI } from '../src/wxLocation'
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

  beforeEach(() => {
    onLocation = sinon.fake()
    onConfig = sinon.fake.resolves()
    onParseGeocoder = sinon.fake.resolves(mockGeocoder)

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

    WxsdkRewireAPI.__Rewire__('parseGeocoder', onParseGeocoder)
    WxsdkRewireAPI.__Rewire__('wxConfig', onConfig)
  })

  afterEach(() => {
    sinon.restore()
    global.wx = null
    global.__wx = null
    WxsdkRewireAPI.__ResetDependency__('parseGeocoder')
    WxsdkRewireAPI.__ResetDependency__('wxConfig')
  })

  it('成功', async () => {
    global.__wx = FLAG_SUCCESS
    const data = await wxLocation()

    assert.strictEqual(data, mockGeocoder)
  })

  it('失败', done => {
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

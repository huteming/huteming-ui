import sinon from 'sinon'
import assert from 'assert'
import * as api from '../src/main'

const host = '192.168.0.220'
const origin = `http://${host}`
const link = '/#/docs/flex?hello=lll'
const href = `${origin}${link}`
const title = 'title'
let post
let jsonp
let get

describe('api', () => {
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
      get = sinon.fake()
      jsonp = sinon.fake.resolves({ result: 'success' })

      sinon.replace(
        api.request,
        'jsonp',
        jsonp
    )
      sinon.replace(
          api.request,
          'post',
          post
      )
      sinon.replace(
          api.request,
          'get',
          get
      )
  })

  afterEach(() => {
      sinon.restore()
      global.window = originWindow
      global.document = originDocument
  })

  describe('getPayConfig', () => {
      it('请求地址', async () => {
          api.getPayConfig('bbb')

          const spyCall = post.getCall(0)

          assert.strictEqual(spyCall.args[0], '/api/weixin/getPayParameters')
      })

      it('自定义参数', async () => {
          const data = {
              a: 'a',
              b: 'c',
          }
          api.getPayConfig(data)

          const spyCall = post.getCall(0)

          assert.strictEqual(spyCall.args[1], data)
      })
  })

  describe('parseGeocoder', () => {
    it('请求地址', async () => {
      const lng = 'lng'
      const lat = 'lat'
      const type = 'type'
      const options = { lng, lat, type }
      api.parseGeocoder(options)

      const spyCall = jsonp.getCall(0)

      assert.strictEqual(spyCall.args[0], 'http://api.map.baidu.com/reverse_geocoding/v3/')
    })

    it('自定义参数', async () => {
      const lng = '121.49884033194'
      const lat = '31.225696563611'
      const type = 'wgs84ll'
      const options = { lng, lat, type }
      api.parseGeocoder(options)

      const spyCall = jsonp.getCall(0)

      assert.deepStrictEqual(spyCall.args[1], {
        location: `${lat},${lng}`,
        coordtype: type,
        output: 'json',
        extensions_poi: '1',
        ak: 'MuKc2m3OXWcQF1eof8hNkSqkqCjKjMpV',
      })
    })

    it('经度参数缺失异常', async () => {
      const lng = ''
      const lat = 'lat'
      const type = 'type'
      const options = { lng, lat, type }
      const errMessage = '非期望异常'

      try {
        await api.parseGeocoder(options)
        throw new Error(errMessage)
      } catch (err) {
        assert.strictEqual(err.message, '经度参数缺失[lng]')
      }
    })

    it('纬度参数缺失异常', async () => {
      const lng = 'lng'
      const lat = ''
      const type = 'type'
      const options = { lng, lat, type }
      const errMessage = '非期望异常'

      try {
        await api.parseGeocoder(options)
        throw new Error(errMessage)
      } catch (err) {
        assert.strictEqual(err.message, '纬度参数缺失[lat]')
      }
    })

    it('坐标参数缺失异常', async () => {
      const lng = 'lng'
      const lat = 'lat'
      const type = ''
      const options = { lng, lat, type }
      const errMessage = '非期望异常'

      try {
        await api.parseGeocoder(options)
        throw new Error(errMessage)
      } catch (err) {
        assert.strictEqual(err.message, '坐标类型参数缺失[type]')
      }
    })
  })
})

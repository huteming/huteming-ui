import assert from 'assert'
import getWxConfig, { __RewireAPI__ as RewireAPI } from '../src/getWxConfig'
import sinon from 'sinon'

describe('getWxConfig', () => {
  let get

  beforeEach(() => {
    get = sinon.fake()

    RewireAPI.__Rewire__('request', {
      get,
    })
  })

  afterEach(() => {
      sinon.restore()
      RewireAPI.__ResetDependency__('request')
  })

  it('请求地址', async () => {
      getWxConfig({
          flag: 'flag',
          url: 'url'
      })

      const spyCall = get.getCall(0)

      assert.strictEqual(spyCall.args[0], '/api/user/shareParam')
  })

  it('自定义参数', async () => {
      const params = {
        flag: 'flag',
        url: 'url',
      }
      getWxConfig(params)

      const spyCall = get.getCall(0)

      assert.deepStrictEqual(spyCall.args[1], params)
  })

  it('默认参数', async () => {
    getWxConfig()

    const spyCall = get.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
      flag: 'test_tommy',
      url: 'http://localhost/',
    })
  })

  it('服务器环境默认参数', async () => {
    RewireAPI.__Rewire__('isStandardBrowserEnv', () => (false))
    getWxConfig()

    const spyCall = get.getCall(0)

    assert.deepStrictEqual(spyCall.args[1], {
      flag: 'test_tommy',
      url: '',
    })
    RewireAPI.__ResetDependency__('isStandardBrowserEnv')
  })
})
import formatOptions, { __RewireAPI__ } from '../src/getOptions'
import assert from 'assert'

describe('request > formatOptions', () => {
  it('浏览器环境默认参数', () => {
    __RewireAPI__.__Rewire__('isStandardBrowserEnv', () => (true))

    const out = formatOptions({})
    assert.deepStrictEqual(out, {
      baseURL: '//jhtest.jinghao.com',
      timeout: 8000,
      withCredentials: true,
      jhsyAccountAlias: '',
      jhsyRetry: 2,
      jhsyRetryDelay: 1000,
      jhsyRetryCount: 0,
      headers: {},
    })

    __RewireAPI__.__ResetDependency__('isStandardBrowserEnv')
  })

  it('服务端环境默认参数', () => {
    __RewireAPI__.__Rewire__('isStandardBrowserEnv', () => (false))

    const out = formatOptions({})
    assert.deepStrictEqual(out, {
      baseURL: '',
      timeout: 8000,
      withCredentials: true,
      jhsyAccountAlias: '',
      jhsyRetry: 2,
      jhsyRetryDelay: 1000,
      jhsyRetryCount: 0,
      headers: {},
    })

    __RewireAPI__.__ResetDependency__('isStandardBrowserEnv')
  })

  it('自定义参数', () => {
    const out = formatOptions({
      baseURL: 'hello',
      headers: {
        config: 'config',
      },
    })
    assert.deepStrictEqual(out, {
      baseURL: 'hello',
      timeout: 8000,
      withCredentials: true,
      jhsyAccountAlias: '',
      jhsyRetry: 2,
      jhsyRetryDelay: 1000,
      jhsyRetryCount: 0,
      headers: {
        config: 'config',
      },
    })
  })
})

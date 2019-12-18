import * as methods from '../src/main'
import assert from 'assert'

describe('request > main', () => {
  it('导出函数', () => {
    const outs = Object.keys(methods)
    assert.strictEqual(outs.length, 5)
  })
})

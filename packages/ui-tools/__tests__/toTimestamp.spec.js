import { toTimestamp } from '../src/main'
import assert from 'assert'

describe('tools > toTimestamp', () => {
    it('时间不存在, 返回第二个默认值参数', () => {
        const output = toTimestamp(null)
        assert.strictEqual(output, 0)
    })
})

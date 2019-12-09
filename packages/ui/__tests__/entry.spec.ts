import assert from 'assert'
import output from '../src/main'
import * as others from '../src/main'

describe('ui', () => {
    it('默认导出组件数组', () => {
        const comps = Object.keys(output)
        assert.strictEqual(comps.length, 23)
    })
    it('导出其他方法', () => {
        const comps = Object.keys(others)
        assert.strictEqual(comps.length, 5)
    })
})

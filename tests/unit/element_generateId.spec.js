import { generateId } from 'web-util/element/src/main'
import assert from 'assert'

describe('element > generateId', () => {
    it('多次生成不相等', () => {
        const id1 = generateId()
        const id2 = generateId()

        assert.notStrictEqual(id1, id2)
    })

    it('生成类型为数字', () => {
        const id = generateId()

        assert.strictEqual(typeof id, 'number')
    })
})

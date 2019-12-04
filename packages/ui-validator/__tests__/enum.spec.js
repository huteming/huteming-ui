import assert from 'assert'
import { enumer } from '../src/handlers'

describe('validator > handlers', () => {
    it('enumer', () => {
        const data = [
            {
                value: '1',
                options: { enum: [1, 2, 3] },
                result: false,
                msg: '不同类型',
            },
            {
                value: 1,
                options: { enum: [1, 2, 3] },
                result: true,
                msg: '相同类型',
            },
            {
                value: [1, 2],
                options: { enum: [1, 2, 3] },
                result: true,
                msg: '数组',
            },
        ]

        data.forEach(item => {
            const { value, options, result, msg } = item
            assert.strictEqual(enumer(value, options), result, msg)
        })
    })
})

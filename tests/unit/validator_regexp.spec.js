import assert from 'assert'
import { regexp } from 'web-util/validator/src/handlers'

describe('validator > handlers', () => {
    it('regexp', () => {
        const data = [
            {
                value: 'hello',
                options: { regexp: /hello/ },
                result: true,
                msg: '正则字面量',
            },
            {
                value: 'hello',
                options: { regexp: new RegExp('hello') },
                result: true,
                msg: '正则对象',
            },
        ]

        data.forEach(item => {
            const { value, options, result, msg } = item
            assert.strictEqual(regexp(value, options), result, msg)
        })
    })
})

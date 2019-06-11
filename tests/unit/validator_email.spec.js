import assert from 'assert'
import { email } from 'web-util/validator/src/handlers'

describe('validator > handlers', () => {
    it('email', () => {
        const data = [
            {
                value: '549270031@qq.com',
                options: {},
                result: true,
                msg: '正确邮箱',
            },
            {
                value: '444@qq',
                options: {},
                result: false,
                msg: '不带com后缀',
            },
            {
                value: '444',
                options: {},
                result: false,
                msg: '不带@后缀',
            },
            {
                value: 'http://444@qq.com',
                options: {},
                result: false,
                msg: '带http前缀',
            },
        ]

        data.forEach(item => {
            const { value, options, result, msg } = item
            assert.strictEqual(email(value, options), result, msg)
        })
    })
})

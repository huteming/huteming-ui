import assert from 'assert'
import { date } from '../src/handlers'

describe('validator > handlers', () => {
    it('date', () => {
        const data = [
            {
                value: new Date(),
                options: {},
                result: true,
                msg: '时间对象',
            },
            {
                value: Date.now(),
                options: {},
                result: true,
                msg: '时间戳',
            },
            {
                value: '2019-08-08',
                options: {},
                result: true,
                msg: '字符串',
            },
            {
                value: '',
                options: {},
                result: false,
                msg: '无效的字符串',
            },
        ]

        data.forEach(item => {
            const { value, options, result, msg } = item
            assert.strictEqual(date(value, options), result, msg)
        })
    })
})

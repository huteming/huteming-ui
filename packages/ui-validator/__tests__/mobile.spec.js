import assert from 'assert'
import { mobile } from '../src/handlers'

describe('validator > handlers', () => {
    it('mobile', () => {
        const data = [
            {
                value: '18888888888',
                options: {},
                result: true,
                msg: '正确手机号',
            },
            {
                value: '1888888888',
                options: {},
                result: false,
                msg: '10位',
            },
            {
                value: '11888888888',
                options: {},
                result: false,
                msg: '第二位是1',
            },
            {
                value: '12888888888',
                options: {},
                result: false,
                msg: '第二位是2',
            },
            {
                value: '13888888888',
                options: {},
                result: true,
                msg: '第二位是3',
            },
            {
                value: '14888888888',
                options: {},
                result: true,
                msg: '第二位是4',
            },
            {
                value: '15888888888',
                options: {},
                result: true,
                msg: '第二位是5',
            },
            {
                value: '16888888888',
                options: {},
                result: true,
                msg: '第二位是6',
            },
            {
                value: '17888888888',
                options: {},
                result: true,
                msg: '第二位是7',
            },
            {
                value: '18888888888',
                options: {},
                result: true,
                msg: '第二位是8',
            },
            {
                value: '19888888888',
                options: {},
                result: true,
                msg: '第二位是9',
            },
        ]

        data.forEach(item => {
            const { value, options, result, msg } = item
            assert.strictEqual(mobile(value, options), result, msg)
        })
    })
})

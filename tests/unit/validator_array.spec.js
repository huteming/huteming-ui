import assert from 'assert'
import { array } from 'web-util/validator/src/handlers'

describe('validator > handlers', () => {
    it('array', () => {
        const data = [
            // undefined
            {
                value: undefined,
                result: false,
                msg: 'undefined',
            },
            // null
            {
                value: null,
                result: false,
                msg: 'null',
            },
            // Date
            {
                value: new Date(),
                result: false,
                msg: 'date',
            },
            // number
            {
                value: 0,
                result: false,
                msg: '数字0',
            },
            {
                value: 1,
                result: false,
                msg: '数字1',
            },
            {
                // eslint-disable-next-line
                value: new Number(0),
                result: false,
                msg: '数字对象0',
            },
            {
                // eslint-disable-next-line
                value: new Number(1),
                result: false,
                msg: '数字对象1',
            },
            // string
            {
                value: '',
                result: false,
                msg: '空字符串',
            },
            {
                value: 'hello',
                result: false,
                msg: '非空字符串',
            },
            {
                value: '1',
                result: false,
                msg: '数字字符串',
            },
            {
                // eslint-disable-next-line
                value: new String(''),
                result: false,
                msg: '空字符串对象',
            },
            {
                // eslint-disable-next-line
                value: new String('hello'),
                result: false,
                msg: '非空字符串对象',
            },
            {
                // eslint-disable-next-line
                value: new String('1'),
                result: false,
                msg: '数字字符串对象',
            },
            // boolean
            {
                value: false,
                result: false,
                msg: '布尔false',
            },
            {
                value: true,
                result: false,
                msg: '布尔true',
            },
            {
                // eslint-disable-next-line
                value: new Boolean(false),
                result: false,
                msg: '布尔对象false',
            },
            {
                // eslint-disable-next-line
                value: new Boolean(true),
                result: false,
                msg: '布尔对象true',
            },
            // function
            {
                value: () => {},
                result: false,
                msg: '函数',
            },
            // obj
            {
                value: {},
                result: false,
                msg: '空对象',
            },
            {
                value: { a: 'a' },
                result: false,
                msg: '非空对象',
            },
            // array
            {
                value: [],
                result: true,
                msg: '空数组',
            },
            {
                value: [1, 2],
                result: true,
                msg: '非空数组',
            },
            {
                // eslint-disable-next-line
                value: new Array(3),
                result: true,
                msg: 'new 空数组',
            },
        ]

        data.forEach(item => {
            const { value, result, msg } = item
            assert.strictEqual(array(value), result, msg)
        })
    })
})

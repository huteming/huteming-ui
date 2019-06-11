import assert from 'assert'
import { required } from 'web-util/validator/src/handlers'

describe('validator > handlers', () => {
    it('required', () => {
        const data = [
            // undefined
            {
                value: undefined,
                result: false,
            },
            // null
            {
                value: null,
                result: false,
            },
            // Date
            {
                value: new Date(),
                result: true,
            },
            // number
            {
                value: 0,
                result: true,
            },
            {
                value: 1,
                result: true,
            },
            {
                // eslint-disable-next-line
                value: new Number(0),
                result: true,
            },
            {
                // eslint-disable-next-line
                value: new Number(1),
                result: true,
            },
            // string
            {
                value: '',
                result: false,
            },
            {
                value: '1',
                result: true,
            },
            {
                // eslint-disable-next-line
                value: new String(''),
                result: false,
            },
            {
                // eslint-disable-next-line
                value: new String('2'),
                result: true,
            },
            // boolean
            {
                value: false,
                result: true,
            },
            {
                value: true,
                result: true,
            },
            {
                // eslint-disable-next-line
                value: new Boolean(false),
                result: true,
            },
            {
                // eslint-disable-next-line
                value: new Boolean(true),
                result: true,
            },
            // function
            {
                value: () => {},
                result: true,
            },
            // obj
            {
                value: {},
                result: false,
                msg: '空对象',
            },
            {
                value: { a: 'a' },
                result: true,
                msg: '非空对象',
            },
            // array
            {
                value: [],
                result: false,
            },
            {
                value: [1, 2],
                result: true,
            },
            {
                // eslint-disable-next-line
                value: new Array(3),
                result: false,
                msg: 'new 空数组',
            },
        ]

        data.forEach(item => {
            const { value, result, msg } = item
            assert.strictEqual(required(value), result, msg)
        })
    })
})

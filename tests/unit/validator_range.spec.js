import assert from 'assert'
import { range } from 'web-util/validator/src/handlers'

describe('validator > handlers', () => {
    it('range', () => {
        const data = [
            // string
            {
                value: '123',
                options: { min: 3, max: 3, type: 'string' },
                result: true,
                msg: '字符串',
            },
            {
                value: '123',
                options: { min: 4, max: 3, type: 'string' },
                result: false,
                msg: '字符串最小长度',
            },
            {
                value: '123',
                options: { min: 3, max: 2, type: 'string' },
                result: false,
                msg: '字符串最大长度',
            },
            {
                value: '123',
                options: { max: 4, type: 'string' },
                result: true,
                msg: '字符串min不存在',
            },
            {
                value: '123',
                options: { min: 3, type: 'string' },
                result: true,
                msg: '字符串max不存在',
            },
            // number
            {
                value: 12,
                options: { min: 12, max: 12, type: 'number' },
                result: true,
                msg: '数字',
            },
            {
                value: 12,
                options: { min: 13, max: 12, type: 'number' },
                result: false,
                msg: '数字最小',
            },
            {
                value: 12,
                options: { min: 12, max: 11, type: 'number' },
                result: false,
                msg: '数字最大',
            },
            {
                value: 12,
                options: { max: 12, type: 'number' },
                result: true,
                msg: '数字min不存在',
            },
            {
                value: 12,
                options: { min: 12, type: 'number' },
                result: true,
                msg: '数字max不存在',
            },
            // number string
            {
                value: '12',
                options: { min: 12, max: 12, type: 'number' },
                result: true,
                msg: '数字字符串',
            },
            {
                value: '12',
                options: { min: 13, max: 12, type: 'number' },
                result: false,
                msg: '数字字符串最小',
            },
            {
                value: '12',
                options: { min: 12, max: 11, type: 'number' },
                result: false,
                msg: '数字字符串最大',
            },
            {
                value: '12',
                options: { max: 12, type: 'number' },
                result: true,
                msg: '数字字符串min不存在',
            },
            {
                value: '12',
                options: { min: 12, type: 'number' },
                result: true,
                msg: '数字字符串max不存在',
            },
            // array
            {
                value: ['123'],
                options: { min: 1, max: 1, type: 'array' },
                result: true,
                msg: '数组',
            },
            {
                value: ['123'],
                options: { min: 2, max: 1, type: 'array' },
                result: false,
                msg: '数组最大长度',
            },
            {
                value: ['123'],
                options: { min: 1, max: 0, type: 'array' },
                result: false,
                msg: '数组最小长度',
            },
            {
                value: ['123'],
                options: { max: 1, type: 'array' },
                result: true,
                msg: '数组min不存在',
            },
            {
                value: ['123'],
                options: { min: 1, type: 'array' },
                result: true,
                msg: '数组max不存在',
            },
        ]

        data.forEach(item => {
            const { value, options, result, msg } = item
            assert.strictEqual(range(value, options), result, msg)
        })
    })
})

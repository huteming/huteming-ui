import { camelCase } from 'web-util/element/src/main'
import assert from 'assert'

describe('element > camelCase', () => {
    it('_,-,:分割', () => {
        const data = [
            {
                value: 'a_a',
                expect: 'aA',
            },
            {
                value: 'a-b',
                expect: 'aB',
            },
            {
                value: 'a:b',
                expect: 'aB',
            },
        ]
        void data.forEach(({ value, expect }) => {
            const res = camelCase(value)
            assert.strictEqual(res, expect)
        })
    })

    it('驼峰命名', () => {
        const data = 'aB'
        const res = camelCase(data)
        assert.strictEqual(res, data)
    })

    it('moz开头', () => {
        const data = 'mozAB'
        const res = camelCase(data)
        assert.strictEqual(res, 'MozAB')
    })

    it('_,-,:开头', () => {
        const data = [
            {
                value: '_a',
                expect: 'a',
            },
            {
                value: '-a',
                expect: 'a',
            },
            {
                value: ':a',
                expect: 'a',
            },
        ]
        data.forEach(item => {
            const actual = camelCase(item.value)
            assert.strictEqual(actual, item.expect)
        })
    })
})

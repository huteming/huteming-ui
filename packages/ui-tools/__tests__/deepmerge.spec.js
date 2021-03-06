import { deepmerge } from '../src/main'
import assert from 'assert'

describe('tools > deepmerge', () => {
    it('创建新对象', () => {
        const target = {
            str: 'str',
            obj: {
                str: 'str',
            },
        }
        const source = {
            str: 'changed',
            obj: {
                str: 'changed',
            },
        }
        const output = deepmerge(target, source)

        assert.deepStrictEqual(output, {
            str: 'changed',
            obj: {
                str: 'changed'
            },
        })
        assert.deepStrictEqual(target, {
            str: 'str',
            obj: {
                str: 'str'
            },
        })
        assert.ok(output !== target)
    })

    it('不创建新对象', () => {
        const target = {
            str: 'str',
            obj: {
                str: 'str',
            },
        }
        const source = {
            str: 'changed',
            obj: {
                str: 'changed',
            },
        }
        const output = deepmerge(target, source, { clone: false })

        assert.deepStrictEqual(output, {
            str: 'changed',
            obj: {
                str: 'changed'
            },
        })
        assert.deepStrictEqual(target, {
            str: 'changed',
            obj: {
                str: 'changed'
            },
        })
        assert.ok(output === target)
    })

    it('source不是对象，则返回原始对象', () => {
        const target = {}
        const output = deepmerge(target, null, { clone: false })
        assert.strictEqual(output, target)
    })
})

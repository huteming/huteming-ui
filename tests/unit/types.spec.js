import { isHtmlElement, isString } from 'web-util/types/src'
import assert from 'assert'
const MOCK_ELEMENT_NODE = Node.ELEMENT_NODE

describe('types', () => {
    describe('isHtmlElement', () => {
        it('node不存在', () => {
            const valid = isHtmlElement(false)
            assert.strictEqual(valid, false)
        })

        it('nodeType === ELEMENT_NODE', () => {
            const node = {
                nodeType: MOCK_ELEMENT_NODE,
            }
            const valid = isHtmlElement(node)
            assert.strictEqual(valid, true)
        })

        it('nodeType !== ELEMENT_NODE', () => {
            const node = {
                nodeType: 'aaa' + MOCK_ELEMENT_NODE,
            }
            const valid = isHtmlElement(node)
            assert.strictEqual(valid, false)
        })
    })

    it('isString', () => {
        const data = [
            {
                value: undefined,
                expect: false,
            },
            {
                value: null,
                expect: false,
            },
            {
                value: '',
                expect: true,
            },
            {
                value: 123,
                expect: false,
            },
            {
                value: false,
                expect: false,
            },
            {
                value: {},
                expect: false,
            },
            {
                value: [],
                expect: false,
            },
            {
                value: new String(),
                expect: true,
            },
            {
                value: new Boolean(),
                expect: false,
            },
            {
                // eslint-disabled-nextline
                value: new Number(),
                expect: false,
            },
        ]
        data.forEach(item => {
            const valid = isString(item.value)
            assert.strictEqual(valid, item.expect, item.value)
        })
    })
})

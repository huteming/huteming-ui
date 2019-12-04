import { getStyle } from '../src/main'
import assert from 'assert'
import { Mock } from 'tests/helper'

describe('element > getStyle', () => {
    it('element 为空', () => {
        const res = getStyle(false, true)
        assert.strictEqual(res, null)
    })

    it('styleName 为空', () => {
        const res = getStyle(true, false)
        assert.strictEqual(res, null)
    })

    it('styleName 为 float', () => {
        const value = 'colorValue'
        const element = {
            style: {
                cssFloat: value,
            },
        }
        const _value = getStyle(element, 'float')
        assert.strictEqual(_value, value)
    })

    it('属性存在与style对象内', () => {
        const color = 'colorValue'
        const element = {
            style: {
                color,
            },
        }
        const value = getStyle(element, 'color')
        assert.strictEqual(value, color)
    })

    it('属性存在与computed style内', () => {
        const color = 'colorValue'
        const element = {
            style: {},
        }
        const mock = new Mock(document.defaultView, 'getComputedStyle', {
            value () {
                return {
                    color,
                }
            },
        })
        mock.replace()
        const value = getStyle(element, 'color')
        assert.strictEqual(value, color)
        mock.restore()
    })

    it('属性不存在', () => {
        const element = {
            style: {},
        }
        const mock = new Mock(document.defaultView, 'getComputedStyle', {
            value () {
                return false
            },
        })
        mock.replace()
        const value = getStyle(element, 'color')
        assert.strictEqual(value, null)
        mock.restore()
    })

    it('异常', () => {
        const color = 'lll'
        const element = {
            style: {
                color,
            },
        }
        const mock = new Mock(document.defaultView, 'getComputedStyle', {
            value () {
                throw new Error('error')
            },
        })
        mock.replace()
        const value = getStyle(element, 'color')
        assert.strictEqual(value, color)
        mock.restore()
    })
})

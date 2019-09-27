import assert from 'assert'
import * as tool from 'web-util/tool/src/main'
import { mockProperty } from '../../helper'

describe('tool > parseQuery', () => {
    mockProperty(window, 'location', {
        value: {
            href: 'https://localhost#hash?key=value&num=1'
        },
    })

    it('解析hash路由', () => {
        const _value = tool.parseQuery('key')
        assert.strictEqual(_value, 'value')
    })

    it('默认返回""', () => {
        const _value = tool.parseQuery('unvalid')
        assert.strictEqual(_value, '')
    })

    it('返回字符串', () => {
        const _value = tool.parseQuery('num')
        assert.strictEqual(_value, '1')
    })
})

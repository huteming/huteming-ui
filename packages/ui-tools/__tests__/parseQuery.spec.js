import assert from 'assert'
import * as tool from '../src/main'
import { mockProperty } from 'tests/helper'

describe('tool > parseQuery', () => {
  describe('存在查询参数', () => {
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

  describe('不存在查询参数', () => {
    mockProperty(window, 'location', {
      value: {
        href: 'https://localhost'
      },
    })

    it('解析hash路由', () => {
      const _value = tool.parseQuery('key')
      assert.strictEqual(_value, '')
    })
  })
})

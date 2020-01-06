import assert from 'assert'
import createBEM from '../src/createBEM'
import Vue from 'vue'

describe('createBEM', () => {
  let bem: any

  beforeEach(() => {
    bem = createBEM('base')
  })

  it('自定义前缀', () => {
    Vue.prototype.$HUTEMING = {
      scopeClass: 'custom',
    }
    const bem = createBEM('other')
    assert.strictEqual(bem(), 'custom-other')
    Vue.prototype.$HUTEMING = undefined
  })

  it('空参数期望返回基础字符串', () => {
    const output = bem()
    assert.strictEqual(output, 'tm-base')
  })

  it('无状态子模块', () => {
    const output = bem('element')
    assert.strictEqual(output, 'tm-base__element')
  })

  it('子模块状态为对象', () => {
    const output = bem('element', { disabled: true, active: false })
    assert.deepStrictEqual(output, ['tm-base__element', {
      'tm-base__element--disabled': true,
      'tm-base__element--active': false,
    }])
  })

  it('子模块状态为数组', () => {
    const output = bem('element', ['disabled', 'active'])
    assert.deepStrictEqual(output, ['tm-base__element', [
      'tm-base__element--disabled',
      'tm-base__element--active',
    ]])
  })

  it('没有子模块 && 状态为对象', () => {
    const output = bem('', { disabled: true, active: false })
    assert.deepStrictEqual(output, ['tm-base', {
      'tm-base--disabled': true,
      'tm-base--active': false,
    }])
  })

  it('没有子模块 && 状态为数组', () => {
    const output = bem('', ['disabled', 'active'])
    assert.deepStrictEqual(output, ['tm-base', [
      'tm-base--disabled',
      'tm-base--active',
    ]])
  })
})

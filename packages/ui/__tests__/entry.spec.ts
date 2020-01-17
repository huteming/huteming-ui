import assert from 'assert'
import output from '../src/main'
import * as others from '../src/main'
import { createLocalVue } from '@vue/test-utils'

describe('ui', () => {
    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.component('ThemeProvider'))
        localVue.use(output)
        assert.ok(localVue.component('ThemeProvider'))
    })
    it('默认导出组件数组', () => {
        const comps = Object.keys(output)
        assert.strictEqual(comps.length, 41)
    })
    it('导出其他方法', () => {
      const comps = Object.keys(others)
      assert.strictEqual(comps.length, 47)
    })

    it('版本号', () => {
        const version = output.version
        assert.strictEqual(typeof version, 'string')
    })
})

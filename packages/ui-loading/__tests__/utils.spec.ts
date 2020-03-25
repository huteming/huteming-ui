import assert from 'assert'
import { create, installScope, uninstallScope, open, close, formatConfig, update } from '../src/utils'
import { mount, createLocalVue, createWrapper } from '@vue/test-utils'
import sinon from 'sinon'
import TestBasic from 'tests/components/basic.vue'
import { Mock, sleep } from 'tests/helper'
import Vue from 'vue'
import { Root } from '../src/vars'
const SCOPE = '@@Loading'

describe('loading > utils', () => {
  describe('formatConfig', () => {
    it('没有参数', () => {
      const res = formatConfig()
      assert.deepStrictEqual(res, {
        text: '',
        loading: false,
        openAnimation: true,
        theme: {},
      })
    })

    it('参数为布尔值', () => {
      const res = formatConfig(true)
      assert.deepStrictEqual(res, {
        text: '',
        loading: true,
        openAnimation: true,
        theme: {},
      })
    })

    it('参数为对象值', () => {
      const res = formatConfig({
        text: 'a',
        loading: true,
        openAnimation: false,
        theme: {
          a: 'a',
        },
      })
      assert.deepStrictEqual(res, {
        text: 'a',
        loading: true,
        openAnimation: false,
        theme: { a: 'a' },
      })
    })
  })

  describe('create', () => {
    it('创建新的实例', () => {
      const mockTheme = {}
      const ins = create({
        loading: true,
        text: 'hello',
        openAnimation: true,
        theme: mockTheme,
      })

      assert.strictEqual(ins.visible, false)
      assert.strictEqual(ins.loading, true)
      assert.strictEqual(ins.text, 'hello')
      assert.strictEqual(ins.openAnimation, true)
      assert.strictEqual(ins.theme, mockTheme)

      // 主题
      const root = createWrapper(ins).find(Root)
      assert.strictEqual((root.vm as any).theme.loading, mockTheme)
    })

    it('不改变传递对象', () => {
      const mockOptions = {
        loading: true,
      }
      const ins = create(mockOptions)

      assert.strictEqual(Object.keys(mockOptions).length, 1)
    })
  })

  describe('update', () => {
    it('更新属性', () => {
      const mockIns: any = {}
      const res = update(mockIns, {
        loading: true,
      })

      assert.deepStrictEqual(res, {
        loading: true,
      })
    })

    it('不更新不存在的属性', () => {
      const mockIns: any = {}
      const res = update(mockIns, <any>{
        loading: true,
        other: 'a',
      })

      assert.deepStrictEqual(res, {
        loading: true,
      })
    })
  })

  describe('installScope', () => {
    it('在el上保存属性', () => {
      const mockEl = document.createElement('div')
      const ins = installScope(mockEl, {
        loading: true,
      })

      assert.strictEqual((mockEl[SCOPE] as any).instance, ins)
    })

    it('不会重复创建', () => {
      const mockEl = document.createElement('div') as any
      const mockIns = {}
      mockEl[SCOPE] = {
        instance: mockIns,
      }
      const ins = installScope(mockEl, {
        loading: true,
      })

      assert.strictEqual(mockEl[SCOPE].instance, mockIns)
    })
  })

  describe('uninstallScope', () => {
    it('删除el上绑定的实例', () => {
      const mockEl = document.createElement('div') as any
      const wrap = mount({
        template: `
          <div id="container"><TestBasic ref="content"></TestBasic></div>
        `,
        components: {
          TestBasic,
        },
      })
      const instance = wrap.vm.$refs.content
      mockEl[SCOPE] = {
        instance: wrap.vm.$refs.content,
      }
      const res = uninstallScope(mockEl)

      // 返回实例
      assert.strictEqual(res, instance)
      // 删除el上绑定的实例
      assert.strictEqual(mockEl[SCOPE], undefined)
      // 将实例从el dom中删除
      assert.strictEqual(wrap.html(), '<div id="container"></div>')
    })
  })

  describe('open', () => {
    it('添加到body底部', async () => {
      const mockEl = document.createElement('div')
      const ins = open(mockEl, {
        loading: true,
      })
      await sleep()

      const wrap = createWrapper(ins)
      assert.strictEqual(wrap.isVisible(), true)
    })

    it('打开之前已经被关闭', async () => {
      const mockEl = document.createElement('div')
      const ins = open(mockEl, {
        loading: true,
      })
      const wrap = createWrapper(ins)
      close(mockEl, {
        loading: false,
      })
      await sleep()

      assert.strictEqual(wrap.exists(), true)
      assert.strictEqual(wrap.isVisible(), false)
    })
  })

  describe('close', () => {
    it('隐藏dom', () => {
      const mockIns = create({
        loading: true,
      })
      const res = close(<any>{ [SCOPE]: { instance: mockIns } }, {
        loading: false,
      })

      assert.strictEqual(res, mockIns)
      assert.strictEqual(mockIns.loading, false)
    })

    it('不存在实例返回null', () => {
      const res = close(<any>{}, {
        loading: false,
      })

      assert.strictEqual(res, null)
    })
  })
})

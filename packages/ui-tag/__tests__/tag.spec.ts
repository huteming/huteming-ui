import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
import TmTag from '../src/main'
import { Root } from '../src/vars'

const localVue = createLocalVue()
localVue.use(TmTag)

describe('tag', () => {
  it('添加样式类', () => {
    const wrap = mount(TmTag)
    assert.strictEqual(wrap.classes().includes('tm-tag'), true)
  })

  describe('type', () => {
    void ['primary', 'success', 'danger', 'warning', 'default'].forEach(item => {
      it(item, () => {
        const wrap = mount(TmTag, {
          propsData: {
            type: item,
          },
        })
        const root = wrap.find(Root)
        assert.strictEqual((root.vm as any).type, item)
      })
    })
  })

  describe('size', () => {
    void ['md', 'sm', 'xs'].forEach(item => {
      it(item, () => {
        const wrap = mount(TmTag, {
          propsData: {
            size: item,
          },
        })
        const root = wrap.find(Root)
        assert.strictEqual((root.vm as any).size, item)
      })
    })
  })

  it('plain', () => {
    const wrap = mount(TmTag, {
      propsData: {
        plain: true,
      },
    })
    const root = wrap.find(Root)
    assert.strictEqual((root.vm as any).plain, true)
  })

  it('round', () => {
    const wrap = mount(TmTag, {
      propsData: {
        round: true,
      },
    })
    const root = wrap.find(Root)
    assert.strictEqual((root.vm as any).round, true)
  })
})

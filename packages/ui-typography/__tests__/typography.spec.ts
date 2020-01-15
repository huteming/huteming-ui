import TmTypography from '../src/main'
import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
import { Root } from '../src/work'
const localVue = createLocalVue()

describe('typography', () => {
  it('install', () => {
    assert.ok(!localVue.component('TmTypography'))
    localVue.use(TmTypography)
    assert.ok(localVue.component('TmTypography'))
  })

  it('gutterBottom', () => {
    const wrap = mount(TmTypography, {
      propsData: {
        gutterBottom: true
      },
    })
    const root = wrap.find(Root)
    assert.strictEqual((root.vm as any).gutterBottom, true)
  })

  describe('variant', () => {
    void ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'].forEach(item => {
      it(item, () => {
        const wrap = mount(TmTypography, {
          propsData: {
            variant: item,
          },
        })
        const root = wrap.find(Root)
        assert.strictEqual((root.vm as any).variant, item)
      })
    })
  })
})

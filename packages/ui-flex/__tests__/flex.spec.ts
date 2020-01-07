import TmFlex from '../src/main'
import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(TmFlex)

describe('flex', () => {
  describe('ellipsis', () => {
    it('布尔值true', () => {
        const wrap = mount({
          template: `
            <tm-flex container>
              <tm-flex ellipsis>ellipsis</tm-flex>
            </tm-flex>
          `,
        }, {
          localVue,
        })
        const child = wrap.find('.tm-flex-item')
        assert.strictEqual((child.vm as any).ellipsis, true)
    })

    it('数字等于1', () => {
      const wrap = mount({
        template: `
          <tm-flex container>
            <tm-flex :ellipsis="1">ellipsis</tm-flex>
          </tm-flex>
        `
      }, {
        localVue,
      })
      const child = wrap.find('.tm-flex-item')
      assert.strictEqual((child.vm as any).ellipsis, 1)
    })

    it('数字大于1', () => {
      const wrap = mount({
        template: `
          <tm-flex container>
            <tm-flex :ellipsis="2">ellipsis</tm-flex>
          </tm-flex>
        `
      }, {
        localVue,
      })
      const child = wrap.find('.tm-flex-item')
      assert.strictEqual((child.vm as any).ellipsis, 2)
    })
  })

  it('默认属性', () => {
    const wrapper = mount({
      template: `
        <tm-flex container ref="flex">
          <tm-flex ref="flexItem"></tm-flex>
        </tm-flex>
      `,
    }, {
      localVue,
    })
    const parent: any = wrapper.find((wrapper.vm.$refs.flex as any).styledComponents.Root).vm
    const child = (wrapper.vm.$refs.flexItem as any).$refs.root

    assert.strictEqual(parent.container, true)
    assert.strictEqual(child.container, false)
    assert.strictEqual(parent.direction, 'row')
    assert.strictEqual(parent.wrap, 'nowrap')
    assert.strictEqual(parent.justify, 'flex-start')
    assert.strictEqual(parent.align, 'stretch')
    assert.strictEqual(parent.alignContent, 'stretch')
    assert.strictEqual(parent.alignSelf, 'auto')
    assert.strictEqual(parent.order, 0)
    assert.strictEqual(parent.grow, 0)
    assert.strictEqual(parent.shrink, 1)
    assert.strictEqual(parent.basis, 'auto')
    assert.strictEqual(parent.gutter, '0px')
    assert.strictEqual(parent.ellipsis, false)
  })

  describe('wrap支持布尔类型', () => {
    it('wrap', () => {
      const wrapper = mount({
        template: `
          <tm-flex wrap container ref="flex">
            <tm-flex></tm-flex>
          </tm-flex>
        `,
      }, {
        localVue,
      })
      const parent: any = wrapper.find((wrapper.vm.$refs.flex as any).styledComponents.Root).vm
      assert.strictEqual(parent.wrap, 'wrap')
    })
    it('nowrap', () => {
      const wrapper = mount({
        template: `
          <tm-flex :wrap="false" container ref="flex">
            <tm-flex></tm-flex>
          </tm-flex>
        `,
      }, {
        localVue,
      })
      const parent: any = wrapper.find((wrapper.vm.$refs.flex as any).styledComponents.Root).vm
      assert.strictEqual(parent.wrap, 'nowrap')
    })
  })

  describe('justify', () => {
    void ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].forEach(item => {
      it(item, () => {
        const wrap = mount(TmFlex, {
          propsData: {
            justify: item,
          },
        })
        const flex = wrap.find(wrap.vm.styledComponents.Root)
        assert.strictEqual((flex.vm as any).justify, item)
      })
    })
  })

  describe('align', () => {
    void ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'].forEach(item => {
      it(item, () => {
        const wrap = mount(TmFlex, {
          propsData: {
            align: item,
          },
        })
        const flex: any = wrap.vm.$refs.root
        assert.strictEqual(flex.align, item)
      })
    })
  })

  describe('align-content', () => {
    void ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'].forEach(item => {
      it(item, () => {
        const wrap = mount(TmFlex, {
          propsData: {
            alignContent: item,
          },
        })
        const flex: any = wrap.vm.$refs.root
        assert.strictEqual(flex.alignContent, item)
      })
    })
  })

  describe('alignSelf', () => {
    void ['auto', 'flex-start', 'center', 'flex-end', 'baseline', 'stretch'].forEach(item => {
      it(item, () => {
        const wrap = mount({
          template: `
            <tm-flex container>
              <tm-flex :align-self="align" ref="flexItem">alignSelf</tm-flex>
            </tm-flex>
          `,
          data () {
            return {
              align: item,
            }
          },
        }, {
          localVue,
        })
        const child: any = (wrap.vm.$refs.flexItem as any).$refs.root
        assert.strictEqual(child.alignSelf, item)
      })
    })
  })
})

'use strict';
import TmButton from '../src/main'
import { createLocalVue, mount } from '@vue/test-utils'
import assert from 'assert'
import { Text as StyleText } from '../src/work'
const localVue = createLocalVue()
localVue.use(TmButton)

describe('button', () => {
    it('disabled还是会传递事件', () => {
        const wrap = mount(TmButton, {
            propsData: {
                disabled: true,
            },
        })
        wrap.trigger('click')
        const emitClick = wrap.emitted('click')
        assert.ok(emitClick)
    })

    describe('type', () => {
        void ['default', 'primary', 'info', 'warning', 'danger'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmButton, {
                    propsData: {
                        type: item,
                    },
                })
                const button = wrap.find('.tm-button')
                assert.strictEqual((button.vm as any).type, item)
            })
        })
    })

    describe('plain', () => {
        void ['default', 'primary', 'info', 'warning', 'danger'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmButton, {
                    propsData: {
                        type: item,
                        plain: true,
                    },
                })
                const button = wrap.find('.tm-button')
                assert.strictEqual((button.vm as any).type, item)
                assert.strictEqual((button.vm as any).plain, true)
            })
        })
    })

    describe('shape', () => {
        void ['round', 'square'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmButton, {
                    propsData: {
                        shape: item,
                    },
                })
                const button = wrap.find('.tm-button')
                assert.strictEqual((button.vm as any).shape, item)
            })
        })
    })

    describe('size', () => {
        void ['normal', 'large', 'small', 'mini'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmButton, {
                    propsData: {
                        size: item,
                    },
                })
                const button = wrap.find('.tm-button')
                assert.strictEqual((button.vm as any).size, item)
            })
        })
    })

    it('block', () => {
        const wrap = mount(TmButton, {
            propsData: {
                block: true,
            },
        })
        const button = wrap.find('.tm-button')
        assert.strictEqual((button.vm as any).block, true)
    })

    it('loading', () => {
        const wrap = mount(TmButton, {
            propsData: {
                loading: true,
            },
        })
        const icon = wrap.find('.tm-icon-loading')
        const text = wrap.find(StyleText)
        assert.strictEqual(icon.exists(), true)
        assert.strictEqual(text.exists(), false)
    })

    it('loadingText', () => {
        const wrap = mount(TmButton, {
            propsData: {
                loading: true,
                loadingText: 'hello',
            },
        })
        const icon = wrap.find('.tm-icon-loading')
        const text = wrap.find(StyleText)
        assert.strictEqual(icon.exists(), true)
        assert.strictEqual(text.exists(), true)
        assert.strictEqual(text.text(), 'hello')
    })

  it('loadingText', () => {
    const wrap = mount(TmButton, {
        propsData: {
            text: 'hello',
        },
    })
    const text = wrap.find(StyleText)
    assert.strictEqual(text.exists(), true)
    assert.strictEqual(text.text(), 'hello')
  })
})

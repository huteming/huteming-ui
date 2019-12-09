import assert from 'assert'
import TmWhiteSpace from '../src/main'
import { mount, createLocalVue } from '@vue/test-utils'

describe('wing-blank', () => {
    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.component('TmWhiteSpace'))
        localVue.use(TmWhiteSpace)
        assert.ok(localVue.component('TmWhiteSpace'))
    })

    describe('预设值', () => {
        void ['xs', 'sm', 'md', 'lg', 'xl'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmWhiteSpace, {
                    propsData: {
                        size: item,
                    },
                })
                const root = wrap.find('.tm-white')
                assert.strictEqual(root.vm.size, item)
                assert.deepStrictEqual(wrap.vm.styles, {})
            })
        })
    })

    it('自定义值', () => {
        const wrap = mount(TmWhiteSpace, {
            propsData: {
                size: '20px',
            },
        })
        assert.deepStrictEqual(wrap.vm.styles, {
            height: '20px',
        })
    })
})

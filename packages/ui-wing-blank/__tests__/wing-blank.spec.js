import assert from 'assert'
import TmWingBlank from '../src/main'
import { mount, createLocalVue } from '@vue/test-utils'

describe('wing-blank', () => {
    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.component('TmWingBlank'))
        localVue.use(TmWingBlank)
        assert.ok(localVue.component('TmWingBlank'))
    })

    describe('预设值', () => {
        void ['xs', 'sm', 'md', 'lg', 'xl'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmWingBlank, {
                    propsData: {
                        size: item,
                    },
                })
                const root = wrap.find('.tm-wing')
                assert.strictEqual(root.vm.size, item)
                assert.deepStrictEqual(wrap.vm.styles, {})
            })            
        })
    })

    it('自定义值', () => {
        const wrap = mount(TmWingBlank, {
            propsData: {
                size: '100px',
            },
        })
        assert.deepStrictEqual(wrap.vm.styles, {
            'padding-left': '100px',
            'padding-right': '100px',
        })
    })
})

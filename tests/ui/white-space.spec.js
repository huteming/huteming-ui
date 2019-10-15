import assert from 'assert'
import TmWhiteSpace from 'web-ui/white-space/src/app.vue'
import { mount } from '@vue/test-utils'

describe('wing-blank', () => {
    it('create', () => {
        const wrapper = mount(TmWhiteSpace)
        assert.deepStrictEqual(wrapper.classes(), ['tm-white', 'tm-white-md'])
        assert.strictEqual(wrapper.attributes('style'), undefined)
    })

    it('预设值', () => {
        const wrapper = mount(TmWhiteSpace, {
            propsData: {
                size: 'lg',
            },
        })
        assert.deepStrictEqual(wrapper.classes(), ['tm-white', 'tm-white-lg'])
        assert.strictEqual(wrapper.attributes('style'), undefined)
    })

    it('自定义值', () => {
        const wrapper = mount(TmWhiteSpace, {
            propsData: {
                size: '20px',
            },
        })
        assert.deepStrictEqual(wrapper.classes(), ['tm-white'])
        assert.strictEqual(wrapper.attributes('style'), 'height: 20px;')
    })
})

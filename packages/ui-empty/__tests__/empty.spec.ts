import assert from 'assert'
import TmEmpty from '../src/main'
import { createLocalVue, mount } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(TmEmpty)

describe('empty', () => {
    it('自定义样式', () => {
        const wrap = mount(TmEmpty, {
            propsData: {
                imageStyle: {
                    'font-size': '12px',
                },
                descriptionStyle: {
                    'font-size': '12px',
                },
            },
        })
        const { Container, Description } = wrap.vm.styledDoms
        const container = wrap.find(Container)
        const desc = wrap.find(Description)
        assert.strictEqual(container.attributes('style'), 'font-size: 12px;')
        assert.strictEqual(desc.attributes('style'), 'font-size: 12px;')
    })

    it('description插槽', () => {
        const wrap = mount(TmEmpty, {
            slots: {
                description: 'hello',
            },
        })
        const { Description } = wrap.vm.styledDoms
        const desc = wrap.find(Description)
        assert.strictEqual(desc.text(), 'hello')
    })

    it('description文案', () => {
        const wrap = mount(TmEmpty, {
            propsData: {
                description: 'hello',
            },
        })
        const { Description } = wrap.vm.styledDoms
        const desc = wrap.find(Description)
        assert.strictEqual(desc.text(), 'hello')
    })
})

import assert from 'assert'
import TmCell from '../src/main'
import { createLocalVue, mount } from '@vue/test-utils'
import WorkBasic from 'tests/components/basic.vue'
const localVue = createLocalVue()
localVue.use(TmCell)

describe('cell', () => {
    it('install', () => {
        assert.ok(localVue.component('TmCell'))
    })

    it('所有位置支持文本显示', () => {
        const wrap = mount(TmCell, {
            propsData: {
                header: 'header',
                body: 'body',
                footer: 'footer',
            },
        })
        const header = wrap.find({ ref: 'header' })
        const body = wrap.find({ ref: 'body' })
        const footer = wrap.find({ ref: 'footer' })

        assert.strictEqual(header.text(), 'header')
        assert.strictEqual(body.text(), 'body')
        assert.strictEqual(footer.text(), 'footer')
    })

    it('所有位置支持插槽组件', () => {
        const wrap = mount(TmCell, {
            slots: {
                header: WorkBasic,
                body: WorkBasic,
                default: WorkBasic,
            },
        })
        const header = wrap.find({ ref: 'header' })
        const body = wrap.find({ ref: 'body' })
        const footer = wrap.find({ ref: 'footer' })

        assert.ok(header.contains(WorkBasic))
        assert.ok(body.contains(WorkBasic))
        assert.ok(footer.contains(WorkBasic))
    })

    it('没有内容时不渲染位置区域', () => {
        const wrap = mount(TmCell)
        const header = wrap.find({ ref: 'header' })
        const body = wrap.find({ ref: 'body' })
        const footer = wrap.find({ ref: 'footer' })

        assert.ok(!header.exists())
        assert.ok(!body.exists())
        assert.ok(!footer.exists())
    })

    it('显示link箭头', () => {
        const wrap = mount(TmCell, {
            propsData: {
                link: true,
            },
        })
        const link = wrap.find({ ref: 'link' })

        assert.ok(link.exists())
    })
})

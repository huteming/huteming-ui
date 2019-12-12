import assert from 'assert'
import TmCard from '../src/main'
import { createLocalVue, mount } from '@vue/test-utils'
import WorkBasic from 'tests/components/basic.vue'
const localVue = createLocalVue()
localVue.use(TmCard)

describe('card', () => {
    it('create', () => {
        const wrap = mount(TmCard)
        const desc = wrap.find(wrap.vm.styledComponents.PosterDesc)
        assert.ok(!desc.exists())
    })
    it('渲染图片描述区域', () => {
        const wrap = mount(TmCard, {
            slots: {
                default: WorkBasic,
            },
        })
        const desc = wrap.find(wrap.vm.styledComponents.PosterDesc)
        assert.ok(desc.exists())
        assert.ok(desc.contains(WorkBasic))
    })
})

import assert from 'assert'
import TmRelation from './relation'
import { mount } from '@vue/test-utils'

describe('relation', () => {
    it('父组件注入子组件引用', () => {
        const wrap = mount(TmRelation)
        const parent = wrap.find({ ref: 'parent' })
        const child = wrap.find({ ref: 'child' })
        assert.strictEqual((parent.vm as any).children[0], child.vm)
    })
    it('子组件注入父组件引用', () => {
        const wrap = mount(TmRelation)
        const parent = wrap.find({ ref: 'parent' })
        const child = wrap.find({ ref: 'child' })
        assert.strictEqual((child.vm as any).parent, parent.vm)
    })
})

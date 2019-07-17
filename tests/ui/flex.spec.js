import TmFlex from 'web-ui/flex/src/flex'
import TmFlexItem from 'web-ui/flex/src/flex-item'
import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.component(TmFlex.name, TmFlex)
localVue.component(TmFlexItem.name, TmFlexItem)

describe('flex', () => {
    it('默认属性', () => {
        const wrapper = mount({
            template: `
                <tm-flex>
                    <tm-flex-item></tm-flex-item>
                </tm-flex>
            `,
        }, {
            localVue,
        })
        const wrapperFlex = wrapper.find(TmFlex)
        const wrapperItem = wrapper.find(TmFlexItem)
        assert.ok(wrapperFlex.classes('is-direction-row'))
        assert.ok(wrapperFlex.classes('is-wrap-nowrap'))
        assert.ok(wrapperFlex.classes('is-justify-start'))
        assert.ok(wrapperFlex.classes('is-align-stretch'))
        assert.ok(wrapperFlex.classes('is-content-stretch'))
        assert.strictEqual(wrapperItem.attributes('style'), 'order: 0; flex-grow: 0; flex-shrink: 0; flex-basis: auto; margin: 0px;')
        assert.ok(wrapperItem.classes('is-self-auto'))
    })

    it('wrap支持布尔类型', () => {
        const wrapper = mount({
            template: `
                <tm-flex wrap>
                    <tm-flex-item></tm-flex-item>
                </tm-flex>
            `,
        }, {
            localVue,
        })
        const wrapperFlex = wrapper.find(TmFlex)
        assert.ok(wrapperFlex.classes('is-direction-row'))
        assert.ok(wrapperFlex.classes('is-wrap-wrap'))
    })

    it('子项gutter优先', () => {
        const wrapper = mount({
            template: `
                <tm-flex gutter="8px">
                    <tm-flex-item gutter="15px"></tm-flex-item>
                </tm-flex>
            `,
        }, {
            localVue,
        })
        const wrapperItem = wrapper.find(TmFlexItem)
        assert.ok(wrapperItem.attributes('style').indexOf('margin: 15px;') > -1)
    })
})

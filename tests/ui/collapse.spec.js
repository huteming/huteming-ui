import TmCollapse from 'web-ui/collapse/src/collapse'
import TmCollapseItem from 'web-ui/collapse/src/collapse-item'
import { createLocalVue, mount } from '@vue/test-utils'
import assert from 'assert'
import { sleep } from '../helper'
const localVue = createLocalVue()
localVue.component(TmCollapse.name, TmCollapse)
localVue.component(TmCollapseItem.name, TmCollapseItem)

describe('collapse', () => {
    it('create', async () => {
        const wrapper = mount({
            template: `
                <tm-collapse v-model="active">
                    <tm-collapse-item name="1" header="title1">title1</tm-collapse-item>
                    <tm-collapse-item name="2" header="title2">title2</tm-collapse-item>
                    <tm-collapse-item name="3" header="title3">title3</tm-collapse-item>
                </tm-collapse>
            `,
            data () {
                return {
                    active: ['1'],
                }
            },
        }, {
            localVue,
        })
        const wrapper1 = wrapper.findAll('.tm-collapse-wrap').at(0)
        const wrapper2 = wrapper.findAll('.tm-collapse-wrap').at(1)
        const wrapper3 = wrapper.findAll('.tm-collapse-wrap').at(2)
        assert.ok(wrapper1.isVisible())
        assert.ok(!wrapper2.isVisible())
        assert.ok(!wrapper3.isVisible())
    })

    it('多选模式', async () => {
        const wrapper = mount({
            template: `
                <tm-collapse v-model="active">
                    <tm-collapse-item name="1" header="title1">title1</tm-collapse-item>
                    <tm-collapse-item name="2" header="title2">title2</tm-collapse-item>
                    <tm-collapse-item name="3" header="title3">title3</tm-collapse-item>
                </tm-collapse>
            `,
            data () {
                return {
                    active: [],
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find(TmCollapse)
        const wrapperHeader = wrapper.find('.tm-collapse-header')
        // open
        wrapperHeader.trigger('click')
        assert.deepStrictEqual(Object.values(wrapper.vm.active), ['1'])
        // close
        wrapperHeader.trigger('click')
        assert.deepStrictEqual(Object.values(wrapper.vm.active), [])

        const emitChange = wrapperContainer.emitted('change')
        assert.strictEqual(emitChange.length, 2)
        assert.deepStrictEqual(Object.values(emitChange[0][0]), ['1'])
        assert.strictEqual(emitChange[1][0].length, 0)
    })

    it('手风琴模式', async () => {
        const wrapper = mount({
            template: `
                <tm-collapse v-model="active" accordion>
                    <tm-collapse-item name="1" header="title1">title1</tm-collapse-item>
                    <tm-collapse-item name="2" header="title2">title2</tm-collapse-item>
                    <tm-collapse-item name="3" header="title3">title3</tm-collapse-item>
                </tm-collapse>
            `,
            data () {
                return {
                    active: '',
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find(TmCollapse)
        const wrapperHeader = wrapper.find('.tm-collapse-header')
        // open
        wrapperHeader.trigger('click')
        assert.strictEqual(wrapper.vm.active, '1')
        // close
        wrapperHeader.trigger('click')
        assert.strictEqual(wrapper.vm.active, '')

        const emitChange = wrapperContainer.emitted('change')
        assert.strictEqual(emitChange.length, 2)
        assert.deepStrictEqual(Object.values(emitChange[0]), ['1'])
        assert.deepStrictEqual(Object.values(emitChange[1]), [''])
    })

    it('默认生成不同的name', async () => {
        const wrapper = mount({
            template: `
                <tm-collapse v-model="active">
                    <tm-collapse-item header="title1">title1</tm-collapse-item>
                    <tm-collapse-item header="title2">title2</tm-collapse-item>
                    <tm-collapse-item header="title3">title3</tm-collapse-item>
                </tm-collapse>
            `,
            data () {
                return {
                    active: ['1'],
                }
            },
        }, {
            localVue,
        })
        const wrapperItem = wrapper.find(TmCollapseItem)
        assert.ok(wrapperItem.vm.name > 0)
    })

    it('disabled', async () => {
        const wrapper = mount({
            template: `
                <tm-collapse v-model="active">
                    <tm-collapse-item name="1" header="title1" disabled>title1</tm-collapse-item>
                    <tm-collapse-item name="2" header="title2">title2</tm-collapse-item>
                    <tm-collapse-item name="3" header="title3">title3</tm-collapse-item>
                </tm-collapse>
            `,
            data () {
                return {
                    active: [],
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find(TmCollapse)
        const wrapperItem = wrapper.find(TmCollapseItem)
        const wrapperHeader = wrapper.find('.tm-collapse-header')
        // open
        wrapperHeader.trigger('click')
        assert.deepStrictEqual(Object.values(wrapper.vm.active), [])

        assert.ok(!wrapperContainer.emitted('change'))
        const emitClick = wrapperItem.emitted('click')
        assert.strictEqual(emitClick.length, 1)
        assert.strictEqual(emitClick[0][0], false)
    })

    it('没有内容', async () => {
        const wrapper = mount({
            template: `
                <tm-collapse v-model="active">
                    <tm-collapse-item name="1" header="title1"></tm-collapse-item>
                    <tm-collapse-item name="2" header="title2">title2</tm-collapse-item>
                    <tm-collapse-item name="3" header="title3">title3</tm-collapse-item>
                </tm-collapse>
            `,
            data () {
                return {
                    active: ['1'],
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find(TmCollapse)
        const wrapperItem = wrapper.find(TmCollapseItem)
        const wrapperHeader = wrapper.find('.tm-collapse-header')
        // open
        wrapperHeader.trigger('click')
        assert.deepStrictEqual(Object.values(wrapper.vm.active), ['1'])

        assert.ok(!wrapperContainer.emitted('change'))
        const emitClick = wrapperItem.emitted('click')
        assert.strictEqual(emitClick.length, 1)
        assert.strictEqual(emitClick[0][0], true)
    })
})

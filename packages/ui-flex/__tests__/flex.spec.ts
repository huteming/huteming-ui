import TmFlex from '../src/main'
import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
const TmFlexItem = TmFlex.item
const localVue = createLocalVue()
localVue.use(TmFlex)
localVue.use(TmFlexItem)

describe('flex', () => {
    describe('ellipsis', () => {
        it('布尔值true', () => {
            const wrap = mount({
                template: `
                    <tm-flex>
                        <tm-flex-item ellipsis>ellipsis</tm-flex-item>
                    </tm-flex>
                `
            }, {
                localVue,
            })
            const child = wrap.find(TmFlexItem)
            const flexItem = child.find(child.vm.styledDoms.Root)
            assert.strictEqual((flexItem.vm as any).ellipsis, true)
        })

        it('数字等于1', () => {
            const wrap = mount({
                template: `
                    <tm-flex>
                        <tm-flex-item :ellipsis="1">ellipsis</tm-flex-item>
                    </tm-flex>
                `
            }, {
                localVue,
            })
            const child = wrap.find(TmFlexItem)
            const flexItem = child.find(child.vm.styledDoms.Root)
            assert.strictEqual((flexItem.vm as any).ellipsis, 1)
        })

        it('数字大于1', () => {
            const wrap = mount({
                template: `
                    <tm-flex>
                        <tm-flex-item :ellipsis="2">ellipsis</tm-flex-item>
                    </tm-flex>
                `
            }, {
                localVue,
            })
            const child = wrap.find(TmFlexItem)
            const flexItem = child.find(child.vm.styledDoms.Root)
            assert.strictEqual((flexItem.vm as any).ellipsis, 2)

            // assert.ok(wrapItem.classes('tm-ellipsis'))
            // jsdom style 好像暂不支持添加前缀样式
            // assert.ok(wrapItem.attributes('style').indexOf('-webkit-line-clamp: 2') > -1)
        })
    })

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
        // assert.ok(wrapperFlex.classes('is-direction-row'))
        // assert.ok(wrapperFlex.classes('is-wrap-nowrap'))
        // assert.ok(wrapperFlex.classes('is-justify-start'))
        // assert.ok(wrapperFlex.classes('is-align-stretch'))
        // assert.ok(wrapperFlex.classes('is-content-stretch'))
        // assert.strictEqual(wrapperItem.attributes('style'), 'order: 0; flex-grow: 0; flex-shrink: 0; flex-basis: auto; margin: 0px;')
        // assert.ok(wrapperItem.classes('is-self-auto'))
    })

    describe('wrap支持布尔类型', () => {
        it('wrap', () => {
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
            // assert.ok(wrapperFlex.classes('is-direction-row'))
            // assert.ok(wrapperFlex.classes('is-wrap-wrap'))
        })
        it('nowrap', () => {
            const wrapper = mount({
                template: `
                    <tm-flex :wrap="false">
                        <tm-flex-item></tm-flex-item>
                    </tm-flex>
                `,
            }, {
                localVue,
            })
            const wrapperFlex = wrapper.find(TmFlex)
            // assert.ok(wrapperFlex.classes('is-direction-row'))
            // assert.ok(wrapperFlex.classes('is-wrap-nowrap'))
        })
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
        // const wrapperItem = wrapper.find(TmFlexItem)
        // assert.ok(wrapperItem.attributes('style').indexOf('margin: 15px;') > -1)
    })

    describe('justify', () => {
        void ['start', 'center', 'end', 'between', 'around', 'space-between', 'space-around'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmFlex, {
                    propsData: {
                        justify: item,
                    },
                })
                const flex = wrap.find(wrap.vm.styledDoms.Root)
                const map: any = {
                    start: 'flex-start',
                    end: 'flex-end',
                    between: 'space-between',
                    around: 'space-around',
                }
                assert.strictEqual((flex.vm as any).justify, map[item] || item)
            })
        })
    })

    describe('align', () => {
        void ['start', 'center', 'end', 'baseline', 'stretch'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmFlex, {
                    propsData: {
                        align: item,
                    },
                })
                const flex = wrap.find(wrap.vm.styledDoms.Root)
                const map: any = {
                    start: 'flex-start',
                    end: 'flex-end',
                }
                assert.strictEqual((flex.vm as any).align, map[item] || item)
            })
        })
    })

    describe('align-content', () => {
        void ['start', 'end', 'center', 'between', 'around', 'stretch'].forEach(item => {
            it(item, () => {
                const wrap = mount(TmFlex, {
                    propsData: {
                        alignContent: item,
                    },
                })
                const flex = wrap.find(wrap.vm.styledDoms.Root)
                const map: any = {
                    start: 'flex-start',
                    end: 'flex-end',
                    between: 'space-between',
                    around: 'space-around',
                }
                assert.strictEqual((flex.vm as any).alignContent, map[item] || item)
            })
        })
    })

    describe('flex-item > align', () => {
        void ['auto', 'start', 'center', 'end', 'baseline', 'stretch'].forEach(item => {
            it(item, () => {
                const wrap = mount({
                    template: `
                        <tm-flex>
                            <tm-flex-item :align="align">flex-item > align</tm-flex-item>
                        </tm-flex>
                    `,
                    data () {
                        return {
                            align: item,
                        }
                    },
                }, {
                    localVue,
                })
                const child = wrap.find(TmFlexItem)
                const flexItem = child.find(child.vm.styledDoms.Root)
                const map: any = {
                    start: 'flex-start',
                    end: 'flex-end',
                }
                assert.strictEqual((flexItem.vm as any).align, map[item] || item)
            })
        })
    })
})

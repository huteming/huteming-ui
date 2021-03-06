import { mount, createLocalVue } from '@vue/test-utils'
import TmPicker from '../src/main'
import assert from 'assert'
import { sleep } from 'tests/helper'
import sinon from 'sinon'
const TmPickerItem = TmPicker.item
const localVue = createLocalVue()
localVue.use(TmPicker)
localVue.use(TmPickerItem)

describe('picker', () => {
    it('create', () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker1"></tm-picker-item>
                    <tm-picker-item :options="picker2"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker1: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    picker2: [
                        {
                            label: '4',
                            value: '4',
                        },
                        {
                            label: '5',
                            value: '5',
                        },
                    ],
                }
            },
        }, {
            localVue,
        })
        const wrapperItem = wrapper.findAll('.tm-picker-item')
        const wrapperPiece = wrapper.findAll('.tm-picker-item__container-piece')
        assert.strictEqual(wrapperItem.length, 2)
        // assert.strictEqual(wrapperPiece.length, wrapperItem.length * 18)
    })

    it('async options', async () => {
        let wrapperContainer
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        { label: '', value: '3' },
                    ],
                    value: '3',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        await sleep()
        // 有效值
        wrapper.setData({
            picker: [
                {
                    label: '1',
                    value: '1',
                },
                {
                    label: '2',
                    value: '2',
                },
                {
                    label: '3',
                    value: '3',
                },
            ],
        })
        await sleep()
        wrapperContainer = wrapper.find('.tm-picker-item__container')
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(40deg);')
        assert.strictEqual(wrapper.vm.value, '3')
        // 无效值
        wrapper.setData({
            picker: [
                {
                    label: '1',
                    value: '4',
                },
                {
                    label: '2',
                    value: '5',
                },
                {
                    label: '3',
                    value: '6',
                },
            ],
        })
        await sleep()
        wrapperContainer = wrapper.find('.tm-picker-item__container')
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(0deg);')
        assert.strictEqual(wrapper.vm.value, '4')
    })

    it('async value', async () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    value: '',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        // 有效值
        wrapper.setData({
            value: '2',
        })
        await sleep()
        // assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(20deg);')
        assert.strictEqual(wrapper.vm.value, '2')
        // 无效值
        wrapper.setData({
            value: '4',
        })
        // assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(0deg);')
        // assert.strictEqual(wrapper.vm.value, '1')
    })

    it('init empty options', () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="options" v-model="values"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    options: [],
                    values: '4',
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.findAll('.tm-picker-item__container')
        const wrapperLine = wrapper.findAll('.tm-picker-item__line')
        const wrapperEmpty = wrapper.find('.tm-empty')
        assert.ok(!wrapperContainer.exists())
        assert.ok(!wrapperLine.exists())
        assert.ok(wrapperEmpty.exists())
    })

    it('init error value', () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                    ],
                    value: '4',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(0deg);')
        assert.strictEqual(wrapper.vm.value, '1')
    })

    it('move', async () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    value: '1',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        const { handleTouchStart, handleTouchMove, handleTouchEnd } = wrapperItem.vm
        const startTime = 100
        const startY = 134
        const endTime = 500
        const endY = 100
        handleTouchStart({
            changedTouches: [{
                pageY: startY,
            }],
            timeStamp: startTime,
            preventDefault: sinon.fake(),
        })
        handleTouchMove({
            changedTouches: [{
                pageY: endTime,
            }],
            preventDefault: sinon.fake(),
        })
        handleTouchEnd({
            changedTouches: [{
                pageY: endY,
            }],
            timeStamp: endTime,
            preventDefault: sinon.fake(),
        })
        await sleep()
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(20deg); transition: transform 400ms cubic-bezier(0.19, 1, 0.22, 1);')
        assert.strictEqual(wrapper.vm.value, '2')
    })

    it('move disabled', async () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [],
                    value: '1',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const { handleTouchStart, handleTouchMove, handleTouchEnd } = wrapperItem.vm
        handleTouchStart()
        handleTouchMove()
        handleTouchEnd()
        assert.strictEqual(wrapper.vm.value, '1')
    })

    it('move fast', async () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    value: '1',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        const { handleTouchStart, handleTouchMove, handleTouchEnd } = wrapperItem.vm
        const startY = 110
        const endY = 100
        handleTouchStart({
            changedTouches: [{
                pageY: startY,
            }],
            preventDefault: sinon.fake(),
        })
        handleTouchMove({
            changedTouches: [{
                pageY: endY,
            }],
            preventDefault: sinon.fake(),
        })
        handleTouchEnd({
            changedTouches: [{
                pageY: endY,
            }],
            preventDefault: sinon.fake(),
        })
        await sleep()
        assert.strictEqual(wrapper.vm.value, '2')
    })

    it('move 上边界', async () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    value: '1',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        const { handleTouchStart, handleTouchMove, handleTouchEnd } = wrapperItem.vm
        const startTime = 100
        const startY = 100
        const endTime = 500
        const endY = 134
        handleTouchStart({
            changedTouches: [{
                pageY: startY,
            }],
            timeStamp: startTime,
            preventDefault: sinon.fake(),
        })
        handleTouchMove({
            changedTouches: [{
                pageY: endTime,
            }],
            preventDefault: sinon.fake(),
        })
        handleTouchEnd({
            changedTouches: [{
                pageY: endY,
            }],
            timeStamp: endTime,
            preventDefault: sinon.fake(),
        })
        await sleep()
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(0deg); transition: transform 400ms cubic-bezier(0.19, 1, 0.22, 1);')
        assert.strictEqual(wrapper.vm.value, '1')
    })

    it('move 下边界', async () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker" v-model="value"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    value: '1',
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        const { handleTouchStart, handleTouchMove, handleTouchEnd } = wrapperItem.vm
        const startTime = 100
        const startY = 1000
        const endTime = 500
        const endY = 0
        handleTouchStart({
            changedTouches: [{
                pageY: startY,
            }],
            timeStamp: startTime,
            preventDefault: sinon.fake(),
        })
        handleTouchMove({
            changedTouches: [{
                pageY: endTime,
            }],
            preventDefault: sinon.fake(),
        })
        handleTouchEnd({
            changedTouches: [{
                pageY: endY,
            }],
            timeStamp: endTime,
            preventDefault: sinon.fake(),
        })
        await sleep()
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(40deg); transition: transform 400ms cubic-bezier(0.19, 1, 0.22, 1);')
        assert.strictEqual(wrapper.vm.value, '3')
    })
})

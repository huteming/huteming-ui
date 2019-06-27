import { mount } from '@vue/test-utils'
import TmPickerRange from 'web-ui/picker-range/src/picker-range'
import TmPickerItem from 'web-ui/picker/src/picker-item'
import assert from 'assert'
import { sleep } from '../helper'

describe('picker-range', () => {
    let wrapper

    afterEach(() => {
        wrapper && wrapper.destroy()
    })

    it('create', async () => {
        wrapper = mount(TmPickerRange, {
            attachToDocument: true,
            propsData: {
                visible: false,
                options: [[{ label: 'a', value: 'a' }]],
            },
        })
        wrapper.setProps({ visible: true })
        // await sleep()
        const wrapperPopup = wrapper.find('.tm-popup')
        const wrapperToolbar = wrapper.find('.tm-toolbar')
        const wrapperPicker = wrapper.find('.tm-picker')
        const wrapperItem = wrapper.find('.tm-picker-item')
        assert.ok(wrapperPopup.exists())
        assert.ok(wrapperToolbar.exists())
        assert.ok(wrapperPicker.exists())
        assert.ok(wrapperItem.exists())
        assert.ok(wrapperPopup.isVisible())
        assert.strictEqual(wrapper.vm.$refs.popup.position, 'bottom')
    })

    it('async props', async () => {
        wrapper = mount(TmPickerRange, {
            propsData: {
                visible: false,
                options: [],
                value: [],
            },
            attachToDocument: true,
        })
        wrapper.setProps({
            value: ['2'],
            options: [[
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
            ]],
        })
        wrapper.setProps({
            visible: true,
        })
        const wrapperContainer = wrapper.find('.tm-picker-item__container')
        assert.strictEqual(wrapperContainer.attributes('style'), 'transform: rotateX(20deg);')
    })

    it('confirm', async () => {
        const options = [[
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
        ]]
        wrapper = mount(TmPickerRange, {
            attachToDocument: true,
            propsData: {
                visible: true,
                value: ['2'],
                options,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
        wrapperItem.setData({
            currentValue: '3',
        })
        wrapperConfirm.trigger('click')
        const emitInput = wrapper.emitted('input')
        assert.ok(emitInput)
        assert.strictEqual(emitInput[0][0][0], '3')
        assert.strictEqual(wrapper.vm.normalizedVisible, false)
        await sleep()
        const emitChange = wrapper.emitted('change')
        assert.ok(emitChange)
        assert.strictEqual(emitChange[0][0][0], '3')
        assert.strictEqual(emitChange[0][1], options)
    })

    it('cancel', async () => {
        const options = [[
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
        ]]
        wrapper = mount(TmPickerRange, {
            attachToDocument: true,
            propsData: {
                visible: true,
                value: ['2'],
                options,
            },
        })
        const wrapperItem = wrapper.find(TmPickerItem)
        const wrapperCancel = wrapper.find('.tm-toolbar-action-cancel')
        wrapperItem.setData({
            currentValue: '3',
        })
        wrapperCancel.trigger('click')
        const emitInput = wrapper.emitted('input')
        assert.ok(!emitInput)
        await sleep()
        const emitChange = wrapper.emitted('change')
        assert.ok(!emitChange)
    })
})

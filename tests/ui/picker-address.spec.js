import { mount } from '@vue/test-utils'
import TmPickerAddress from 'web-ui/picker-address/src/picker-address'
import assert from 'assert'
import { sleep } from '../helper'

describe('picker-address', () => {
    let wrapper

    afterEach(() => {
        wrapper && wrapper.destroy()
    })

    it('create', () => {
        wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: true,
            },
        })
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

    it('visible change', () => {
        const before = ['12', '1201', '120103'] // 天津市 市辖区 河西区
        const after = ['41', '4103', '410306'] // 河南省 洛阳市 吉利区
        wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: false,
            },
        })
        wrapper.setData({
            provinceCode: before[0],
            cityCode: before[1],
            areaCode: before[2],
        })
        wrapper.setProps({ value: after })
        wrapper.setProps({ visible: true })
        const emitUpdate = wrapper.emitted('update:visible')
        assert.ok(emitUpdate)
        assert.deepStrictEqual(emitUpdate[0], [true])
        assert.strictEqual(wrapper.vm.provinceCode, after[0])
        assert.strictEqual(wrapper.vm.cityCode, after[1])
        assert.strictEqual(wrapper.vm.areaCode, after[2])
    })

    it('confirm', async () => {
        const value = ['41', '4103', '410306'] // 河南省 洛阳市 吉利区
        wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: true,
            },
        })
        assert.strictEqual(wrapper.vm.normalizedVisible, true)
        wrapper.setData({
            provinceCode: value[0],
            cityCode: value[1],
            areaCode: value[2],
        })
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
        wrapperConfirm.trigger('click')

        // this.normalizedVisible = false
        assert.strictEqual(wrapper.vm.normalizedVisible, false)

        // this.$emit('input', _values)
        const emitInput = wrapper.emitted('input')
        const argsInput = emitInput[0][0]
        assert.ok(emitInput)
        assert.deepStrictEqual(argsInput, value)

        // this.$emit('update:valueText', _valueText)
        const emitUpdate = wrapper.emitted('update:valueText')
        const argsUpdate = emitUpdate[0][0]
        assert.ok(emitUpdate)
        assert.deepStrictEqual(argsUpdate, ['河南省', '洛阳市', '吉利区'])

        // this.$emit('change', _values, _valueText)
        await sleep()
        const emitChange = wrapper.emitted('change')
        const argsValue = emitChange[0][0]
        const argsText = emitChange[0][1]
        assert.ok(emitChange)
        assert.deepStrictEqual(argsValue, value)
        assert.deepStrictEqual(argsText, ['河南省', '洛阳市', '吉利区'])
    })

    it('cancel', async () => {
        const value = ['41', '4103', '410306'] // 河南省 洛阳市 吉利区
        wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: true,
            },
        })
        assert.strictEqual(wrapper.vm.normalizedVisible, true)
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-cancel')
        wrapperConfirm.trigger('click')

        assert.strictEqual(wrapper.vm.normalizedVisible, false)
        const emitInput = wrapper.emitted('input')
        assert.ok(!emitInput)
    })

    it('invalid value', () => {
        const value = ['aaa', 'bbb', 'ccc'] // 河南省 洛阳市 吉利区
        wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: false,
            },
        })
        wrapper.setProps({ value })
        wrapper.setProps({ visible: true })
        assert.strictEqual(wrapper.vm.provinceCode, '11')
        assert.strictEqual(wrapper.vm.cityCode, '1101')
        assert.strictEqual(wrapper.vm.areaCode, '110101')
    })
})

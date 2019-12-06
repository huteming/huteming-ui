import { mount, createWrapper, createLocalVue } from '@vue/test-utils'
import TmPickerAddress from '../src/main'
import assert from 'assert'
import { sleep, cleanDom } from 'tests/helper'
const localVue = createLocalVue()
localVue.use(TmPickerAddress)

describe('picker-address', () => {
    it('create', async () => {
        const wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: true,
            },
        })
        await sleep()
        const wrapperPopup = wrapper.find('.tm-popup')
        const wrapperToolbar = wrapper.find('.tm-toolbar')
        const wrapperPicker = wrapper.find('.tm-picker')
        const wrapperItem = wrapper.find('.tm-picker-item')
        assert.ok(wrapperPopup.exists())
        assert.ok(wrapperToolbar.exists())
        assert.ok(wrapperPicker.exists())
        assert.ok(wrapperItem.exists())
        assert.ok(wrapperPopup.isVisible())

        // 默认配置
        assert.strictEqual(wrapper.vm.title, '请选择区域')

        wrapper.destroy()
    })

    it('visible change', async () => {
        const before = ['12', '1201', '120103'] // 天津市 市辖区 河西区
        const after = ['41', '4103', '410306'] // 河南省 洛阳市 吉利区
        const wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: false,
                value: before,
            },
        })
        await sleep()
        try {
            wrapper.setProps({ value: after })
            wrapper.setProps({ visible: true })
            const emitUpdate = wrapper.emitted('update:visible')
            assert.ok(emitUpdate)
            assert.deepStrictEqual(emitUpdate[0], [true])
            assert.strictEqual(wrapper.vm.provinceCode, after[0])
            assert.strictEqual(wrapper.vm.cityCode, after[1])
            assert.strictEqual(wrapper.vm.areaCode, after[2])
        } finally {
            wrapper.destroy()
        }
    })

    it('confirm', async () => {
        const value = ['41', '4103', '410306'] // 河南省 洛阳市 吉利区
        const wrapper = mount({
            template: `
                <div>
                    <TmPickerAddress :visible.sync="visible" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
        }, {
            localVue,
        })
        await sleep()
        const wrapperAddress = wrapper.find(TmPickerAddress)
        wrapperAddress.setData({
            provinceCode: value[0],
            cityCode: value[1],
            areaCode: value[2],
        })
        const wrapperConfirm = wrapper.find('.tm-toolbar-confirm')
        wrapperConfirm.trigger('click')

        assert.strictEqual(wrapperAddress.vm.normalizedVisible, false)
        // assert.ok(!wrapperAddress.isVisible())

        // this.$emit('input', _values)
        const emitInput = wrapperAddress.emitted('input')
        const argsInput = emitInput[0][0]
        assert.ok(emitInput)
        assert.deepStrictEqual(argsInput, value)

        // this.$emit('update:valueText', _valueText)
        const emitUpdate = wrapperAddress.emitted('update:valueText')
        const argsUpdate = emitUpdate[0][0]
        assert.ok(emitUpdate)
        assert.deepStrictEqual(argsUpdate, ['河南省', '洛阳市', '吉利区'])

        // this.$emit('change', _values, _valueText)
        await sleep()
        const emitChange = wrapperAddress.emitted('change')
        const argsValue = emitChange[0][0]
        const argsText = emitChange[0][1]
        assert.ok(emitChange)
        assert.deepStrictEqual(argsValue, value)
        assert.deepStrictEqual(argsText, ['河南省', '洛阳市', '吉利区'])
    })

    it('cancel', async () => {
        const value = ['41', '4103', '410306'] // 河南省 洛阳市 吉利区
        const wrapper = mount({
            template: `
                <div>
                    <TmPickerAddress :visible.sync="visible" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
        }, {
            localVue,
        })
        await sleep()
        const wrapperAddress = wrapper.find(TmPickerAddress)
        const wrapperConfirm = wrapper.find('.tm-toolbar-cancel')
        wrapperConfirm.trigger('click')

        assert.strictEqual(wrapperAddress.vm.normalizedVisible, false)
        // assert.ok(!wrapperAddress.isVisible())
        const emitInput = wrapper.emitted('input')
        assert.ok(!emitInput)
    })

    it('invalid value', async () => {
        const value = ['aaa', 'bbb', 'ccc'] // 河南省 洛阳市 吉利区
        const wrapper = mount(TmPickerAddress, {
            attachToDocument: true,
            propsData: {
                visible: false,
                value: [],
            },
        })
        await sleep()
        wrapper.setProps({ value })
        wrapper.setProps({ visible: true })
        assert.strictEqual(wrapper.vm.provinceCode, '11')
        assert.strictEqual(wrapper.vm.cityCode, '1101')
        assert.strictEqual(wrapper.vm.areaCode, '110101')
        wrapper.setProps({ visible: false })
        wrapper.destroy()
    })

    afterEach(() => {
        cleanDom('tm-modal')
    })
})

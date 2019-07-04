import { mount } from '@vue/test-utils'
import TmPickerDatetime from 'web-ui/picker-datetime/src/picker-datetime'
import TmPickerItem from 'web-ui/picker/src/picker-item'
import assert from 'assert'
import { sleep, getLastDateOfMonth } from '../helper'

describe('picker-datetime', () => {
    let wrapper

    afterEach(() => {
        wrapper && wrapper.destroy()
    })

    it('create', async () => {
        wrapper = mount(TmPickerDatetime, {
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
        assert.strictEqual(wrapper.vm.$refs.popup.position, 'bottom')
    })

    it('mode datetime', () => {
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                mode: 'datetime',
            },
        })
        const wrapperItem = wrapper.findAll(TmPickerItem)
        assert.strictEqual(wrapperItem.length, 5)
        const wrapperYear = wrapperItem.at(0)
        assert.strictEqual(wrapperYear.props('options'), wrapper.vm.yearOptions)
        assert.strictEqual(wrapperYear.props('value'), wrapper.vm.yearCurrent)
        const wrapperMonth = wrapperItem.at(1)
        assert.strictEqual(wrapperMonth.props('options'), wrapper.vm.monthOptions)
        assert.strictEqual(wrapperMonth.props('value'), wrapper.vm.monthCurrent)
        const wrapperDate = wrapperItem.at(2)
        assert.strictEqual(wrapperDate.props('options'), wrapper.vm.dateOptions)
        assert.strictEqual(wrapperDate.props('value'), wrapper.vm.dateCurrent)
        const wrapperHour = wrapperItem.at(3)
        assert.strictEqual(wrapperHour.props('options'), wrapper.vm.hourOptions)
        assert.strictEqual(wrapperHour.props('value'), wrapper.vm.hourCurrent)
        const wrapperMinute = wrapperItem.at(4)
        assert.strictEqual(wrapperMinute.props('options'), wrapper.vm.minuteOptions)
        assert.strictEqual(wrapperMinute.props('value'), wrapper.vm.minuteCurrent)
    })

    it('mode date', () => {
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                mode: 'date',
            },
        })
        const wrapperItem = wrapper.findAll(TmPickerItem)
        assert.strictEqual(wrapperItem.length, 3)
    })

    it('mode time', () => {
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                mode: 'time',
            },
        })
        const wrapperItem = wrapper.findAll(TmPickerItem)
        assert.strictEqual(wrapperItem.length, 2)
    })

    it('computed current', () => {
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
        })
        const mockCurrent = new Date(2019, 5, 28, 12, 12)
        wrapper.setData({ current: mockCurrent })
        assert.strictEqual(Date.parse(wrapper.vm.current), Date.parse(mockCurrent))
    })

    it('选项无限制', () => {
        const now = new Date()
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
        })
        wrapper.setData({ current: now })
        const nowYear = now.getFullYear()
        const nowMonth = now.getMonth()
        const minYear = nowYear - 10
        const expectOptionsYear = Array.from({ length: 21 }, (value, index) => ({ label: minYear + index, value: minYear + index }))
        const expectOptionsMonth = Array.from({ length: 12 }, (value, index) => ({ label: index + 1, value: index }))
        const expectOptionsDate = Array.from({ length: getLastDateOfMonth(nowYear, nowMonth) }, (value, index) => ({ label: 1 + index, value: 1 + index }))
        const expectOptionsHour = Array.from({ length: 24 }, (value, index) => ({ label: index, value: index }))
        const expectOptionsMinute = Array.from({ length: 60 }, (value, index) => ({ label: index, value: index }))

        assert.deepStrictEqual(wrapper.vm.yearOptions, expectOptionsYear)
        assert.deepStrictEqual(wrapper.vm.monthOptions, expectOptionsMonth)
        assert.deepStrictEqual(wrapper.vm.dateOptions, expectOptionsDate)
        assert.deepStrictEqual(wrapper.vm.hourOptions, expectOptionsHour)
        assert.deepStrictEqual(wrapper.vm.minuteOptions, expectOptionsMinute)
    })

    it('选项限制最小日期', () => {
        const now = new Date()
        const nowYear = now.getFullYear()
        const nowMonth = now.getMonth()
        const minDate = new Date(2018, 5, 28, 12, 12)

        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                minDate,
            },
        })
        wrapper.setData({ current: minDate })
        const expectOptionsYear = Array.from({ length: nowYear + 10 - 2018 + 1 }, (value, index) => ({ label: 2018 + index, value: 2018 + index }))
        const expectOptionsMonth = Array.from({ length: 11 - 5 + 1 }, (value, index) => ({ label: 5 + index + 1, value: 5 + index }))
        const expectOptionsDate = Array.from({ length: getLastDateOfMonth(2018, 5) - 28 + 1 }, (value, index) => ({ label: 28 + index, value: 28 + index }))
        const expectOptionsHour = Array.from({ length: 23 - 12 + 1 }, (value, index) => ({ label: 12 + index, value: 12 + index }))
        const expectOptionsMinute = Array.from({ length: 59 - 12 + 1 }, (value, index) => ({ label: 12 + index, value: 12 + index }))

        assert.deepStrictEqual(wrapper.vm.yearOptions, expectOptionsYear)
        assert.deepStrictEqual(wrapper.vm.monthOptions, expectOptionsMonth)
        assert.deepStrictEqual(wrapper.vm.dateOptions, expectOptionsDate)
        assert.deepStrictEqual(wrapper.vm.hourOptions, expectOptionsHour)
        assert.deepStrictEqual(wrapper.vm.minuteOptions, expectOptionsMinute)
    })

    it('选项限制最大日期', () => {
        const now = new Date()
        const nowYear = now.getFullYear()
        const nowMonth = now.getMonth()
        const maxDate = new Date(2020, 5, 28, 12, 12)

        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                maxDate,
            },
        })
        wrapper.setData({ current: maxDate })
        const expectOptionsYear = Array.from({ length: 2020 - (nowYear - 10) + 1 }, (value, index) => ({ label: nowYear - 10 + index, value: nowYear - 10 + index }))
        const expectOptionsMonth = Array.from({ length: 5 - 0 + 1 }, (value, index) => ({ label: 0 + index + 1, value: 0 + index }))
        const expectOptionsDate = Array.from({ length: 28 - 1 + 1 }, (value, index) => ({ label: 1 + index, value: 1 + index }))
        const expectOptionsHour = Array.from({ length: 12 - 0 + 1 }, (value, index) => ({ label: 0 + index, value: 0 + index }))
        const expectOptionsMinute = Array.from({ length: 12 - 0 + 1 }, (value, index) => ({ label: 0 + index, value: 0 + index }))

        assert.deepStrictEqual(wrapper.vm.yearOptions, expectOptionsYear)
        assert.deepStrictEqual(wrapper.vm.monthOptions, expectOptionsMonth)
        assert.deepStrictEqual(wrapper.vm.dateOptions, expectOptionsDate)
        assert.deepStrictEqual(wrapper.vm.hourOptions, expectOptionsHour)
        assert.deepStrictEqual(wrapper.vm.minuteOptions, expectOptionsMinute)
    })

    it('visible change', () => {
        const before = new Date(2018, 5, 28, 12, 12)
        const after = new Date(2020, 5, 28, 12, 12)
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                visible: false,
                value: before,
            },
        })
        wrapper.setData({ current: before })
        assert.strictEqual(Date.parse(wrapper.vm.current), Date.parse(before))
        wrapper.setProps({ value: after })
        wrapper.setProps({ visible: true })
        const emitUpdate = wrapper.emitted('update:visible')
        assert.ok(emitUpdate)
        assert.deepStrictEqual(emitUpdate[0], [true])
        assert.strictEqual(Date.parse(wrapper.vm.current), Date.parse(after))
    })

    it('confirm', async () => {
        const value = new Date(2018, 5, 28, 12, 12)
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                visible: true,
            },
        })
        assert.strictEqual(wrapper.vm.normalizedVisible, true)
        wrapper.setData({ current: value })
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
        wrapperConfirm.trigger('click')

        const emitInput = wrapper.emitted('input')
        assert.ok(emitInput)
        assert.deepStrictEqual(Date.parse(emitInput[0]), Date.parse(value))
        assert.strictEqual(wrapper.vm.normalizedVisible, false)
        await sleep()
        const emitChange = wrapper.emitted('change')
        assert.ok(emitChange)
        assert.deepStrictEqual(Date.parse(emitChange[0]), Date.parse(value))
    })

    it('cancel', async () => {
        const value = new Date(2018, 5, 28, 12, 12)
        wrapper = mount(TmPickerDatetime, {
            attachToDocument: true,
            propsData: {
                visible: true,
            },
        })
        assert.strictEqual(wrapper.vm.normalizedVisible, true)
        wrapper.setData({ current: value })
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-cancel')
        wrapperConfirm.trigger('click')

        assert.strictEqual(wrapper.vm.normalizedVisible, false)
        const emitInput = wrapper.emitted('input')
        assert.ok(!emitInput)
    })
})

import { mount } from '@vue/test-utils'
import TmPickerDatetime from 'web-ui/picker-datetime/src/picker-datetime'
import assert from 'assert'
import { sleep } from '../helper'

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
        assert.ok(wrapperPopup.exists())
        assert.ok(wrapperToolbar.exists())
        assert.ok(wrapperPicker.exists())
        assert.ok(wrapperPopup.isVisible())
        assert.strictEqual(wrapper.vm.$refs.popup.position, 'bottom')
    })
})

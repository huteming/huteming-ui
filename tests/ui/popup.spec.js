import { mount } from '@vue/test-utils'
import TmPopup from 'web-ui/popup/src/popup'
import assert from 'assert'
import { sleep } from '../helper'

describe('popup', () => {
    let wrapper

    afterEach(() => {
        wrapper && wrapper.destroy()
    })

    it('create', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
            },
        })
        await sleep()
        assert.ok(wrapper.exists())
    })
})

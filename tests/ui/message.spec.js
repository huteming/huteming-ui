import { createWrapper } from '@vue/test-utils'
import Message from 'web-ui/message/src/message.js'
import assert from 'assert'
import { sleep } from '../helper'

describe('message', () => {
    it('create', async () => {
        const title = 'a title'
        Message.alert(title)
        await sleep()
        const vm = document.querySelector('.tm-message')
        const wrapper = createWrapper(vm)
        const wrapperTitle = wrapper.find('.tm-message-subtitle')
        assert.strictEqual(wrapperTitle.text(), title)
    })
})

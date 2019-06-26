import { createWrapper } from '@vue/test-utils'
import assert from 'assert'
import Toast from 'web-ui/toast/src/toast.js'
import { sleep } from '../helper'

describe('toast', () => {
    it('create', async () => {
        const msg = 'hello world'
        const vm = Toast(msg)
        const wrapper = createWrapper(vm)
        await sleep()
        const wrapperContent = wrapper.find('.tm-toast-content')
        assert.strictEqual(wrapperContent.text(), msg)
    })
})

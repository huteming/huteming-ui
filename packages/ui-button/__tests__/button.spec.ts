'use strict';
import TmButton from '../src/main'
import { createLocalVue, mount } from '@vue/test-utils'
import assert from 'assert'
const localVue = createLocalVue()
localVue.use(TmButton)

describe('button', () => {
    it('disabled还是会传递事件', () => {
        const wrap = mount(TmButton, {
            propsData: {
                disabled: true,
            },
        })
        wrap.trigger('click')
        const emitClick = wrap.emitted('click')
        assert.ok(emitClick)
    })
})

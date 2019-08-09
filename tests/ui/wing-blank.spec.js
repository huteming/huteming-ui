import assert from 'assert'
import TmWingBlank from 'web-ui/wing-blank/src/app'
import { mount } from '@vue/test-utils'

describe('wing-blank', () => {
    it('create', () => {
        const wrapper = mount(TmWingBlank)
        assert.ok(wrapper.classes('tm-wing'))
        assert.ok(wrapper.classes('tm-wing-md'))
    })
})

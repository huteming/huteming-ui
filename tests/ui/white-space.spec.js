import assert from 'assert'
import TmWhiteSpace from 'web-ui/white-space/src/app'
import { mount } from '@vue/test-utils'

describe('wing-blank', () => {
    it('create', () => {
        const wrapper = mount(TmWhiteSpace)
        assert.ok(wrapper.classes('tm-white'))
        assert.ok(wrapper.classes('tm-white-md'))
    })
})

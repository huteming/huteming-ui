import assert from 'assert'
import TmIcon from 'web-ui/icon/src/app.vue'
import { mount } from '@vue/test-utils'

describe('icon', () => {
    it('classes', () => {
        const icon = 'hello'
        const wrapper = mount(TmIcon, {
            propsData: {
                icon,
            },
        })
        assert.ok(wrapper.classes('tm-icon'))
        assert.ok(wrapper.classes(`tm-icon-${icon}`))
    })
})

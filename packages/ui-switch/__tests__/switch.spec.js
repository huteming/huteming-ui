import assert from 'assert'
import TmSwitch from '../src/main'
import { mount, createLocalVue } from '@vue/test-utils'
import { sleep } from 'tests/helper'
const localVue = createLocalVue()
localVue.use(TmSwitch)

describe('switch', () => {
    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.component('TmSwitch'))
        localVue.use(TmSwitch)
        assert.ok(localVue.component('TmSwitch'))
    })

    it('value change', async () => {
        const wrapper = mount(TmSwitch, {
            propsData: {
                value: false,
            },
        })
        assert.strictEqual(wrapper.vm.currentValue, false)
        wrapper.setProps({ value: true })
        await sleep()
        assert.strictEqual(wrapper.vm.currentValue, true)
    })

    it('click', () => {
        const wrapper = mount({
            template: `
                <tm-switch v-model="value" />
            `,
            data () {
                return {
                    value: false
                }
            },
        }, {
            localVue
        })
        wrapper.trigger('click')
        assert.strictEqual(wrapper.vm.value, true)
    })

    it('disabled', () => {
        const wrapper = mount({
            template: `
                <tm-switch v-model="value" disabled />
            `,
            data () {
                return {
                    value: false
                }
            },
        }, {
            localVue
        })
        wrapper.trigger('click')
        assert.strictEqual(wrapper.vm.value, false)
    })

    it('改变选中时，触发change事件', () => {
        const wrapper = mount({
            template: `
                <tm-switch v-model="value" />
            `,
            data () {
                return {
                    value: false
                }
            },
        }, {
            localVue
        })
        wrapper.trigger('click')
        const wrapSwitch = wrapper.find(TmSwitch)
        const emitChange = wrapSwitch.emitted('change')
        assert.ok(emitChange)
        assert.deepStrictEqual(emitChange[0], [true])
    })
})

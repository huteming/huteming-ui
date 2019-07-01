import TmClocker from 'web-ui/clocker/src/clocker'
import assert from 'assert'
import { mount, shallowMount } from '@vue/test-utils'
import { sleep, Mock } from '../helper'
import sinon from 'sinon'

describe('clocker', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('create', () => {
        const wrapper = shallowMount(TmClocker, {
            propsData: {
                startTime: Date.now(),
                endTime: Date.now() + (3600 + 60 + 10) * (48 + 2) * 1000,
            },
            scopedSlots: {
                default: `
                    <div>
                        <div id="total">{{ props.total }}</div>
                        <div id="days">{{ props.days }}</div>
                        <div id="hours">{{ props.hours }}</div>
                        <div id="minutes">{{ props.minutes }}</div>
                        <div id="seconds">{{ props.seconds }}</div>
                    </div>
                `,
            },
        })
        const total = wrapper.find('#total').text()
        const days = wrapper.find('#days').text()
        const hours = wrapper.find('#hours').text()
        const minutes = wrapper.find('#minutes').text()
        const seconds = wrapper.find('#seconds').text()

        wrapper.destroy()
        assert.ok(total > 0)
        assert.ok(days > 0, `total: ${total}; days: ${days}`)
        assert.ok(hours > 0, `total: ${total}; hours: ${hours}`)
        assert.ok(minutes > 0)
        assert.ok(seconds > 0)
    })

    it('format 不存在', () => {
        const wrapper = shallowMount(TmClocker, {
            propsData: {
                startTime: Date.now(),
                endTime: Date.now() + (3600 + 60 + 10) * (48 + 2) * 1000,
                format: 'hello',
            },
        })
        assert.strictEqual(wrapper.vm.whole, 'hello')
    })

    it('normalizedStartTime', () => {
        const now = new Date()
        const wrapper = shallowMount(TmClocker, {
            propsData: {
                startTime: null,
                endTime: Date.now() + (3600 + 60 + 10) * (48 + 2) * 1000,
            },
        })
        assert.ok(wrapper.vm.normalizedStartTime - now < 30)
        wrapper.setProps({ startTime: now })
        assert.strictEqual(wrapper.vm.normalizedStartTime, Date.parse(now))
        wrapper.setProps({ startTime: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` })
        assert.strictEqual(wrapper.vm.normalizedStartTime, Date.parse(now))
    })

    it('normalizedEndTime', () => {
        const end = new Date(Date.now() + (3600 + 60 + 10) * (48 + 2) * 1000)
        const wrapper = shallowMount(TmClocker, {
            propsData: {
                endTime: undefined,
            },
        })
        assert.strictEqual(wrapper.vm.normalizedEndTime, 0)
        wrapper.setProps({ endTime: end })
        assert.strictEqual(wrapper.vm.normalizedEndTime, Date.parse(end))
        wrapper.setProps({ endTime: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}` })
        assert.strictEqual(wrapper.vm.normalizedEndTime, Date.parse(end))
    })

    it('初始开始时间大于结束时间', () => {
        const now = Date.now()
        sinon.spy(window, 'clearInterval')

        const wrapper = shallowMount(TmClocker, {
            propsData: {
                startTime: now,
                endTime: now - 500,
            },
        })
        const emitEnd = wrapper.emitted('end')
        assert.ok(emitEnd)
        assert.strictEqual(wrapper.vm.timer, null)
    })

    it('event end', async () => {
        const now = Date.now()
        sinon.spy(window, 'clearInterval')

        const wrapper = shallowMount(TmClocker, {
            propsData: {
                startTime: now,
                endTime: now + 500,
            },
        })
        await sleep(1000)
        const emitEnd = wrapper.emitted('end')
        assert.ok(emitEnd)
        assert.ok(clearInterval.calledWithExactly(wrapper.vm.timer))
    })

    it('销毁时清除倒计时', async () => {
        const now = Date.now()
        sinon.spy(window, 'clearInterval')

        const wrapper = shallowMount(TmClocker, {
            propsData: {
                startTime: now,
                endTime: now + 10000,
            },
        })
        await sleep(1000)
        wrapper.destroy()
        const emitEnd = wrapper.emitted('end')
        assert.ok(!emitEnd)
        assert.ok(clearInterval.calledWithExactly(wrapper.vm.timer))
    })
})

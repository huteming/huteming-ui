import TmClocker from '../src/main'
import assert from 'assert'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { sleep, Mock } from 'tests/helper'
import sinon from 'sinon'

describe('clocker', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.component('TmClocker'))

        localVue.use(TmClocker)
        assert.ok(localVue.component('TmClocker'))
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
                        <div id="milliseconds">{{ props.milliseconds }}</div>
                        <div id="days">{{ props.days }}</div>
                        <div id="hours">{{ props.hours }}</div>
                        <div id="minutes">{{ props.minutes }}</div>
                        <div id="seconds">{{ props.seconds }}</div>
                    </div>
                `,
            },
        })
        const milliseconds = wrapper.find('#milliseconds').text()
        const days = wrapper.find('#days').text()
        const hours = wrapper.find('#hours').text()
        const minutes = wrapper.find('#minutes').text()
        const seconds = wrapper.find('#seconds').text()

        wrapper.destroy()
        assert.ok(milliseconds > 0)
        assert.ok(days > 0)
        assert.ok(hours > 0)
        assert.ok(minutes > 0)
        assert.ok(seconds > 0)
    })

    it('normalizedEndTime', () => {
        const end = new Date(Date.now() + (3600 + 60 + 10) * (48 + 2) * 1000)
        const endstamp = Date.parse(end)
        const wrapper = shallowMount(TmClocker, {
            propsData: {
                endTime: undefined,
            },
        })
        assert.strictEqual(wrapper.vm.normalizedEndTime, 0)

        wrapper.setProps({ endTime: end })
        assert.ok(wrapper.vm.normalizedEndTime > endstamp - 5000)
        assert.ok(wrapper.vm.normalizedEndTime < endstamp + 5000)

        wrapper.setProps({ endTime: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}` })
        assert.ok(wrapper.vm.normalizedEndTime > endstamp - 5000)
        assert.ok(wrapper.vm.normalizedEndTime < endstamp + 5000)
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
        assert.strictEqual(wrapper.vm.timer, 0)
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

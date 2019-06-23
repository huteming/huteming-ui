import TmClocker from 'web-ui/clocker/src/clocker'
import assert from 'assert'
import { mount } from '@vue/test-utils'

describe('clocker', () => {
    it('create', () => {
        const wrapper = mount({
            template: `
                <div>
                    <tm-clocker :state-time="start" :end-time="end">
                        <template v-slot="{ total, days, hours, minutes, seconds }">
                            <div id="total">{{ total }}</div>
                            <div id="days">{{ days }}</div>
                            <div id="hours">{{ hours }}</div>
                            <div id="minutes">{{ minutes }}</div>
                            <div id="seconds">{{ seconds }}</div>
                        </template>
                    </tm-clocker>
                </div>
            `,
            data () {
                return {
                    start: Date.now(),
                    end: Date.now() + (3600 + 60 + 10) * (48 + 2) * 1000,
                }
            },
            components: {
                TmClocker,
            },
        })
        const total = wrapper.find('#total').text()
        const days = wrapper.find('#days').text()
        const hours = wrapper.find('#hours').text()
        const minutes = wrapper.find('#minutes').text()
        const seconds = wrapper.find('#seconds').text()

        assert.ok(total > 0)
        assert.ok(days > 0, `total: ${total}; days: ${days}`)
        assert.ok(hours > 0, `total: ${total}; hours: ${hours}`)
        assert.ok(minutes > 0)
        assert.ok(seconds > 0)
    })
})

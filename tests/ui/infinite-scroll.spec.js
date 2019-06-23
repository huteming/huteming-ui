import assert from 'assert'
import InfiniteScroll, { __RewireAPI__ as RewireAPI } from 'web-ui/infinite-scroll/src/infinite-scroll'
import { mount } from '@vue/test-utils'
import { sleep } from '../helper'
const scope = '@@InfiniteScroll'

describe('infinite-scroll', () => {
    it('create', async () => {
        RewireAPI.__Rewire__('attached', (el, fn) => {
            fn()
        })

        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="load" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, { attactToDocument: true })

        try {
            const wrapperContainer = wrapper.find('#container')
            assert.strictEqual(wrapperContainer.isEmpty(), true)
    
            const events = new Event('scroll')
            wrapperContainer.element[scope].scrollEventTarget.dispatchEvent(events)
            await sleep()
            assert.strictEqual(wrapperContainer.isEmpty(), false)
        } finally {
            wrapper.destroy()
            RewireAPI.__ResetDependency__('attached')
        }
    })
})

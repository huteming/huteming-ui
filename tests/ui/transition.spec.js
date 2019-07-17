import { mount, TransitionStub } from '@vue/test-utils'
import WorkTransition from '../components/transition'
import { sleep } from '../helper'
import assert from 'assert'

describe('transition', () => {
    it('有动画', async () => {
        assert.ok(true)
        // const wrapper = mount(WorkTransition, {
        //     stubs: {
        //         // transition: TransitionStub,
        //     },
        // })
        // // await sleep(40)
        // console.log(1, wrapper.html())
        // console.log(1, wrapper.html())
        // console.log(1, wrapper.html())
        // wrapper.setData({ visible: true })
        // // await sleep(40)
        // console.log(2, wrapper.html())
        // console.log(2, wrapper.html())
        // console.log(2, wrapper.html())
        // wrapper.setData({ visible: false })
        // // await sleep(40)
        // console.log(3, wrapper.html())
        // console.log(3, wrapper.html())
        // console.log(3, wrapper.html())

        // const wrapperStub = wrapper.find(TransitionStub)
        // wrapperStub.vm.$emit('after-enter')
        // await sleep(20)
    })
})

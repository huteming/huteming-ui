import assert from 'assert'
import { createLocalVue, mount } from '@vue/test-utils'
import Loading from '../src/main'
import { sleep } from 'tests/helper'
import { LoadingComp } from '../types'
const SCOPE = '@@Loading'
const localVue = createLocalVue()
localVue.use(Loading)

describe('loading > directive', () => {
  it('初始化时没有打开动画', async () => {
    const wrap = mount({
      template: `
        <div ref="container" v-loading="true"></div>
      `,
    }, {
      localVue,
    })
    await sleep()

    const vm = (wrap.vm.$refs.container as any)[SCOPE].instance as LoadingComp
    assert.strictEqual(vm.openAnimation, false)

    // 没意义，覆盖指令 unbind 周期函数
    wrap.destroy()
  })

  it('update', async () => {
    const wrap = mount({
      template: `
        <div ref="container" v-loading="{ loading, text }"></div>
      `,
      data () {
        return {
          loading: true,
          text: '',
        }
      },
    }, {
      localVue,
    })
    await sleep()
    const vm = (wrap.vm.$refs.container as any)[SCOPE].instance as LoadingComp
    assert.strictEqual(vm.visible, true)

    wrap.setData({ loading: false })
    await sleep()
    assert.strictEqual(vm.visible, false)

    wrap.setData({ text: 'hello' })
    wrap.setData({ loading: true })
    await sleep()
    assert.strictEqual(vm.visible, true)
    assert.strictEqual(vm.text, 'hello')
  })
})

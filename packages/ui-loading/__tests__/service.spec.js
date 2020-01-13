import assert from 'assert'
import { createLocalVue, mount, TransitionStub, createWrapper } from '@vue/test-utils'
import Loading from '../src/main'
import TmLoading, { __RewireAPI__ } from '../src/loading'
import { sleep } from 'tests/helper'
const SCOPE = '@@Loading'
function replace () {
  __RewireAPI__.__Rewire__('TmTransitionFade', TransitionStub)
}
function restore () {
  __RewireAPI__.__ResetDependency__('TmTransitionFade', TransitionStub)
}
function exists (html) {
  return html.includes('tm-loading')
}

describe('loading > service', () => {
  it('open', async () => {
    replace()
    try {
      const wrap = mount({
        template: `
          <div ref="container"></div>
        `,
      })
      const el = wrap.vm.$refs.container
      Loading.open(el)
      const instance = el[SCOPE]
      await sleep()
      const wrapLoading = createWrapper(instance)
  
      assert.strictEqual(wrapLoading.isVisible(), true)
    } finally {
      restore()
    }
  })

  it('close', async () => {
    replace()
    try {
      const wrap = mount({
        template: `
          <div ref="container"></div>
        `,
      })
      const el = wrap.vm.$refs.container
      Loading.open(el, true)
      const vm = el[SCOPE].instance
      let wrapLoading
      await sleep()
  
      wrapLoading = createWrapper(vm)
      assert.strictEqual(wrapLoading.isVisible(), true)

      Loading.close(el)

      wrapLoading = createWrapper(vm)
      assert.strictEqual(wrapLoading.isVisible(), false)
    } finally {
      restore()
    }
  })

  it('destroy', async () => {
    const wrap = mount({
      template: `
        <div ref="container"></div>
      `,
    })
    const el = wrap.vm.$refs.container
    Loading.open(el, true)
    const vm = el[SCOPE].instance
    let wrapLoading
    await sleep()

    wrapLoading = createWrapper(vm)
    assert.strictEqual(wrapLoading.exists(), true)

    Loading.destroy(el)

    wrapLoading = createWrapper(vm)
    assert.strictEqual(wrapLoading.exists(), false)
  })
})

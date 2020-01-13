/**
 * 备份用
 */
import assert from 'assert'
// import { createLocalVue, mount, TransitionStub } from '@vue/test-utils'
// import Loading from '../src/main'
// import * as comp from '../src/loading'
// import { sleep } from 'tests/helper'
// import { LoadingComp } from '../types'
// const SCOPE = '@@Loading'
// function replace () {
//   (comp as any).__RewireAPI__.__Rewire__('TmTransitionFade', TransitionStub)
// }
// function restore () {
//   (comp as any).__RewireAPI__.__ResetDependency__('TmTransitionFade', TransitionStub)
// }
// function exists (html: string) {
//   return html.includes('tm-loading')
// }

describe('无意义', () => {
  it('hello', () => {
    assert.ok(true)
  })
})

// describe('loading > service', () => {
//   it('open', async () => {
//     const wrap = mount({
//       template: `
//         <div ref="container"></div>
//       `,
//     })
//     const el = wrap.vm.$refs.container as HTMLElement
//     Loading.open(el, true)
//     await sleep()

//     assert.strictEqual(exists(wrap.html()), true)
//   })

//   it('更新隐藏loading', async () => {
//     replace()
//     try {
//       const wrap = mount({
//         template: `
//           <div ref="container"></div>
//         `,
//       })
//       const el = wrap.vm.$refs.container as HTMLElement
//       Loading.open(el, true)
//       let wrapLoading
//       await sleep()
  
//       wrapLoading = wrap.find('tm-loading')
//       assert.strictEqual(wrapLoading.isVisible(), true)

//       Loading.close(el, false)

//       wrapLoading = wrap.find('tm-loading')
//       assert.strictEqual(wrapLoading.isVisible(), false)
//     } finally {
//       restore()
//     }
//   })

//   it('destroy', async () => {
//     const wrap = mount({
//       template: `
//         <div ref="container"></div>
//       `,
//     })
//     const el = wrap.vm.$refs.container as HTMLElement
//     Loading.open(el, true)
//     await sleep()

//     assert.strictEqual(exists(wrap.html()), true)

//     Loading.destroy(el)

//     assert.strictEqual(exists(wrap.html()), false)
//   })
// })

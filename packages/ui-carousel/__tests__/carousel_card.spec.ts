import { mount, shallowMount, createWrapper, createLocalVue, WrapperArray } from '@vue/test-utils'
import TmCarousel from '../src/carousel'
import TmCarouselItem from '../src/carousel-item'
import assert from 'assert'
import { sleep, cleanDom } from 'tests/helper'
import sinon from 'sinon'
import Vue from 'vue'

let random = 100
const localVue = createLocalVue()
localVue.component('TmCarousel', TmCarousel)
localVue.component('TmCarouselItem', TmCarouselItem)

async function create (params: object = {}, methods = {}) {
    const wrap = mount({
      template: `
        <tm-carousel type="card" :direction="direction">
          <tm-carousel-item v-for="item in count" :key="random + 'card' + item">{{ item }}</tm-carousel-item>
        </tm-carousel>
      `,
        data () {
          const a = Object.assign({
            count: 5,
            random,
            direction: 'horizontal',
          }, params)
          random += a.count
          return a
        },
    }, {
      localVue,
    })
    const parent = wrap.find(TmCarousel)
    const children = wrap.findAll(TmCarouselItem)
    sinon.replaceGetter(parent.vm.$el as HTMLElement, 'offsetWidth', () => {
      return 375
    })
    Object.entries(methods).forEach(([name, mock]) => (parent.vm as any)[name] = mock)
    await sleep(10)
    // fix: children多于3个，但是打印的html并不存在。暂不知道原因
    parent.vm.$children.length = (wrap.vm as any).count
    return [wrap, parent, children]
}

describe('carousel', () => {
  it('create', async () => {
    const [wrap, parent, children] = await create()

    assert.strictEqual((children as any).at(0).attributes('style'), 'transform: translateX(28.125px) scale(1); webkit-transform: translateX(28.125px) scale(1);')
    assert.strictEqual((children as any).at(1).attributes('style'), 'transform: translateX(337.90625px) scale(0.83); webkit-transform: translateX(337.90625px) scale(0.83);')
    assert.strictEqual((children as any).at(2).attributes('style'), 'transform: translateX(685.8125px) scale(0.83); webkit-transform: translateX(685.8125px) scale(0.83);')
    assert.strictEqual((children as any).at(3).attributes('style'), 'transform: translateX(-629.5625px) scale(0.83); webkit-transform: translateX(-629.5625px) scale(0.83);')
    assert.strictEqual((children as any).at(4).attributes('style'), 'transform: translateX(-281.65625px) scale(0.83); webkit-transform: translateX(-281.65625px) scale(0.83);')
  })

  it('click', async () => {
    const [wrap, parent, c] = await create()
    const children = c as WrapperArray<Vue>

    children.at(1).trigger('click')
    assert.strictEqual(children.at(0).attributes('style'), 'transform: translateX(-281.65625px) scale(0.83); webkit-transform: translateX(-281.65625px) scale(0.83);')
    assert.strictEqual(children.at(1).attributes('style'), 'transform: translateX(28.125px) scale(1); webkit-transform: translateX(28.125px) scale(1);')
    assert.strictEqual(children.at(2).attributes('style'), 'transform: translateX(337.90625px) scale(0.83); webkit-transform: translateX(337.90625px) scale(0.83);')
    assert.strictEqual(children.at(3).attributes('style'), 'transform: translateX(685.8125px) scale(0.83); webkit-transform: translateX(685.8125px) scale(0.83);')
    assert.strictEqual(children.at(4).attributes('style'), 'transform: translateX(-629.5625px) scale(0.83); webkit-transform: translateX(-629.5625px) scale(0.83);')
  })

  it('垂直方向错误提示', async () => {
    const mockWarn = sinon.fake()
    sinon.replace(console, 'warn', mockWarn)
    await create({
      direction: 'vertical',
    })
    assert.deepStrictEqual(mockWarn.getCall(0).args, ['[huteming-ui Warn][Carousel]vertical directionis not supported in card mode'])
  })

  afterEach(() => {
    sinon.restore()
    cleanDom('tm-carousel-item')
  })
})

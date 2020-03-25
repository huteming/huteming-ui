import assert from 'assert'
import TmCard from '../src/main'
import { createLocalVue, mount } from '@vue/test-utils'
import WorkBasic from 'tests/components/basic.vue'
import { Root, PosterBarRoot } from '../src/work'
const localVue = createLocalVue()
const TmCardPosterBar = TmCard.PosterBar

describe('card', () => {
    it('install', () => {
      assert.ok(!localVue.component('TmCard'))
      assert.ok(!localVue.component('TmCardPosterBar'))
      localVue.use(TmCard)
      assert.ok(localVue.component('TmCard'))
      assert.ok(localVue.component('TmCardPosterBar'))
    })

    it('card默认插槽', () => {
      const wrap = mount(TmCard, {
        slots: {
          default: WorkBasic,
        },
      })
      const desc = wrap.find(Root)
      assert.ok(desc.exists())
      assert.ok(desc.contains(WorkBasic))
    })

    it('poster-bar默认插槽', () => {
      const wrap = mount(TmCardPosterBar, {
        slots: {
          default: WorkBasic,
        },
      })
      const desc = wrap.find(PosterBarRoot)
      assert.ok(desc.exists())
      assert.ok(desc.contains(WorkBasic))
    })
})

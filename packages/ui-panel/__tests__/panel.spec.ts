import { mount, createLocalVue } from '@vue/test-utils'
import CompPanel from '../src/main'
import CompBasic from 'tests/components/basic.vue'
import assert from 'assert'
import { Title, Poster, Btn, PosterImg, Decoration, Tip } from '../src/vars'

describe('panel', () => {
    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.component('TmPanel'))
        localVue.use(CompPanel)
        assert.ok(localVue.component('TmPanel'))
    })

    it('image', () => {
        const poster = 'this is an image url'
        const wrapper = mount(CompPanel, {
            propsData: {
                poster,
            },
        })
        const wrapperImage = wrapper.find(PosterImg)

        assert.strictEqual(wrapperImage.attributes('src'), poster)
    })

    it('title', () => {
        const title = 'hhhhh'
        const wrapper = mount(CompPanel, {
            propsData: {
                title,
            },
        })
        const wrapperTitle = wrapper.find(Title)

        assert.strictEqual(wrapperTitle.text(), title)
    })

    it('tip', () => {
        const tip = 'jjjjj'
        const wrapper = mount(CompPanel, {
            propsData: {
                tip,
            },
        })
        const wrapperTip = wrapper.find(Tip)

        assert.strictEqual(wrapperTip.text(), tip)
    })

    it('decoration', () => {
        const decoration = 'jjjjj'
        const wrapper = mount(CompPanel, {
            propsData: {
                decoration,
            },
        })
        const wrapperDeco = wrapper.find(Decoration)

        assert.strictEqual(wrapperDeco.text(), decoration)
    })

    it('btn', () => {
        const btn = 'jjjjj'
        const wrapper = mount(CompPanel, {
            propsData: {
                btn,
            },
        })
        const wrapperBtn = wrapper.find(Btn)

        assert.strictEqual(wrapperBtn.text(), btn)
    })

    describe('slots', () => {
        it('poster-extra', () => {
            const wrapper = mount(CompPanel, {
              slots: {
                'poster-extra': CompBasic,
              },
            })
            const wrapperContainer = wrapper.find(Poster)
            const wrapperImg = wrapper.find(PosterImg)

            assert.ok(wrapperImg.exists())
            assert.ok(wrapperContainer.contains(CompBasic))
        })

        it('title', () => {
            const wrapper = mount(CompPanel, {
              slots: {
                title: CompBasic,
              },
            })
            const wrapperContainer = wrapper.find(Title)

            assert.ok(wrapperContainer.contains(CompBasic))
        })

        it('description', () => {
            const wrapper = mount(CompPanel, {
                slots: {
                    default: CompBasic,
                },
            })
            const root = wrapper.find('.tm-panel')

            assert.ok(root.contains(CompBasic))
        })

        it('btn', () => {
            const wrapper = mount(CompPanel, {
                slots: {
                    btn: CompBasic,
                },
            })
            const wrapperContainer = wrapper.find(Btn)

            assert.ok(wrapperContainer.contains(CompBasic))
        })
    })
})

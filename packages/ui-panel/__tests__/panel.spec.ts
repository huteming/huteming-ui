import { mount, createLocalVue } from '@vue/test-utils'
import CompPanel from '../src/main'
import CompBasic from 'tests/components/basic.vue'
import assert from 'assert'

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
        const wrapperImage = wrapper.find('.tm-panel-poster-img')

        assert.strictEqual(wrapperImage.attributes('src'), poster)
    })

    it('title', () => {
        const title = 'hhhhh'
        const wrapper = mount(CompPanel, {
            propsData: {
                title,
            },
        })
        const wrapperTitle = wrapper.find('.tm-panel-title')

        assert.strictEqual(wrapperTitle.text(), title)
    })

    it('tip', () => {
        const tip = 'jjjjj'
        const wrapper = mount(CompPanel, {
            propsData: {
                tip,
            },
        })
        const wrapperTip = wrapper.find('.tm-panel-tip')

        assert.strictEqual(wrapperTip.text(), tip)
    })

    it('decoration', () => {
        const decoration = 'jjjjj'
        const wrapper = mount(CompPanel, {
            propsData: {
                decoration,
            },
        })
        const wrapperDeco = wrapper.find('.tm-panel-decoration')

        assert.strictEqual(wrapperDeco.text(), decoration)
    })

    it('btn', () => {
        const btn = 'jjjjj'
        const wrapper = mount(CompPanel, {
            propsData: {
                btn,
            },
        })
        const wrapperBtn = wrapper.find('.tm-panel-btn')

        assert.strictEqual(wrapperBtn.text(), btn)
    })

    describe('slots', () => {
        it('poster-extra', () => {
            const wrapper = mount(CompPanel, {
                slots: {
                    'poster-extra': CompBasic,
                },
            })
            const wrapperContainer = wrapper.find('.tm-panel-poster')
            const wrapperImg = wrapper.find('.tm-panel-poster-img')

            assert.ok(wrapperImg.exists())
            assert.ok(wrapperContainer.contains(CompBasic))
        })

        it('title', () => {
            const wrapper = mount(CompPanel, {
                slots: {
                    title: CompBasic,
                },
            })
            const wrapperContainer = wrapper.find('.tm-panel-title')

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
            const wrapperContainer = wrapper.find('.tm-panel-btn')

            assert.ok(wrapperContainer.contains(CompBasic))
        })
    })
})

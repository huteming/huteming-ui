import { mount } from '@vue/test-utils'
import CompPanel from 'web-ui/panel/src/app.vue'
import CompBasic from '../components/basic.vue'
import assert from 'assert'

describe('panel', () => {
    it('image', () => {
        const image = 'this is an image url'
        const wrapper = mount(CompPanel, {
            propsData: {
                image,
            },
        })
        const wrapperImage = wrapper.find('.tm-panel-image-img')

        assert.strictEqual(wrapperImage.attributes('src'), image)
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

    it('description', () => {
        const description = 'lllll'
        const wrapper = mount(CompPanel, {
            propsData: {
                description,
            },
        })
        const wrapperDesc = wrapper.find('.tm-panel-description-text')

        assert.ok(wrapperDesc.exists())
        assert.strictEqual(wrapperDesc.text(), description)
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
        it('image-extra', () => {
            const wrapper = mount(CompPanel, {
                slots: {
                    'image-extra': CompBasic,
                },
            })
            const wrapperContainer = wrapper.find('.tm-panel-image')
            const wrapperImg = wrapper.find('.tm-panel-image-img')

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
                    description: CompBasic,
                },
            })
            const wrapperContainer = wrapper.find('.tm-panel-description-imgs')

            assert.ok(wrapperContainer.exists())
            assert.ok(wrapperContainer.contains(CompBasic))
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

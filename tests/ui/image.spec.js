import CompImage, { __RewireAPI__ as RewireAPI } from 'web-ui/image/src'
import assert from 'assert'
import { mount, shallowMount } from '@vue/test-utils'
import { IMG_SUCCESS_SRC, IMG_FAILURE_SRC } from '../constant'
import { sleep, mockImage } from '../helper'
import sinon from 'sinon'

describe('Image', () => {
    mockImage()

    afterEach(() => {
        sinon.restore()
    })

    it('create', async () => {
        const wrapper = mount(CompImage, {
            propsData: {
                src: IMG_SUCCESS_SRC,
                fit: 'fill',
            },
        })
        const wrapperHolder = wrapper.find('.tm-image__placeholder')
        const wrapperError = wrapper.find('.tm-image__error')
        let wrapperInner = wrapper.find('.tm-image__inner')

        assert.ok(wrapperHolder.exists())
        assert.ok(!wrapperError.exists())
        assert.ok(!wrapperInner.exists())

        await sleep()
        wrapperInner = wrapper.find('.tm-image__inner')
        assert.strictEqual(wrapperInner.attributes('style'), 'object-fit: fill;')
    })

    it('load failed', async () => {
        const wrapper = shallowMount(CompImage, {
            propsData: {
                src: IMG_FAILURE_SRC,
            },
        })
        await sleep()
        const wrapperError = wrapper.find('.tm-image__error')
        assert.ok(wrapperError.exists())
    })

    it('lazy load', async () => {
        let flag = false
        RewireAPI.__Rewire__('isInContainer', () => {
            flag = !flag
            return flag
        })

        const wrapper = mount({
            template: `
                <div ref="container" style="height: 200px; overflow: auto;">
                    <TmImage
                        :src="src"
                        ref="image1"
                        style="display: block; width: 200px; height: 200px;"
                        lazy />

                    <TmImage
                        :src="src"
                        ref="image2"
                        style="display: block; width: 200px; height: 200px;"
                        lazy />
                </div>
            `,
            data () {
                return {
                    src: IMG_SUCCESS_SRC,
                }
            },

            methods: {
                getState (ref, property) {
                    return this.$refs[ref][property]
                },
            },

            components: {
                TmImage: CompImage,
            },
        }, { attachToDocument: true })
        const { image1, image2 } = wrapper.vm.$refs

        try {
            await sleep()
            assert.strictEqual(image1.loading, false)
            assert.strictEqual(image2.loading, true)

            const events = new Event('scroll')
            image2._scrollContainer.dispatchEvent(events)

            await sleep()
            assert.strictEqual(image2.loading, false)
        } finally {
            wrapper.destroy()
            RewireAPI.__ResetDependency__('isInContainer')
        }
    })

    it('$attrs', async () => {
        const wrapper = mount({
            template: `
                <TmImage
                    ref="image"
                    alt="$attrs test"
                    referrerpolicy="origin"
                    :src="src" />
            `,
            data () {
                return {
                    src: IMG_SUCCESS_SRC,
                }
            },
            components: {
                TmImage: CompImage,
            },
        })

        await sleep()
        const $img = wrapper.find(CompImage).find('.tm-image__inner')
        assert.strictEqual($img.attributes('alt'), '$attrs test')
        assert.strictEqual($img.attributes('referrerpolicy'), 'origin')
    })

    it('pass event listeners', async() => {
        let isClick = false
        let isLoad = false

        const wrapper = mount({
            template: `
                <TmImage ref="image" @click="handleClick" @load="handleLoad" :src="src" />
            `,
            data() {
                return {
                    src: IMG_SUCCESS_SRC,
                }
            },
            methods: {
                handleClick (e) {
                    isClick = true
                },
                handleLoad () {
                    isLoad = true
                },
            },
            components: {
                TmImage: CompImage,
            },
        })
        await sleep()
        wrapper.find(CompImage).find('.tm-image__inner').trigger('click')
        await sleep()
        assert.strictEqual(isClick, true)
        assert.strictEqual(isLoad, true)
    })
})

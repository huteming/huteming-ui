import CompImage, { __RewireAPI__ as RewireAPI } from 'web-ui/image/src/app.vue'
import assert from 'assert'
import { mount, shallowMount, createWrapper } from '@vue/test-utils'
import { IMG_SUCCESS_SRC, IMG_FAILURE_SRC } from '../constant'
import { sleep, mockImage } from '../helper'
import sinon from 'sinon'

describe('Image', () => {
    mockImage()

    it('hold && src不为空', async () => {
        const wrapper = mount(CompImage, {
            propsData: {
                src: IMG_SUCCESS_SRC,
                hold: true,
            },
        })
        await sleep()
        const wrapperHolder = wrapper.find('.tm-image__placeholder')
        const wrapperLoading = wrapper.find('.tm-image__loading')
        const wrapperError = wrapper.find('.tm-image__error')
        const wrapperInner = wrapper.find('.tm-image__inner')

        assert.ok(!wrapperHolder.exists())
        assert.ok(!wrapperLoading.exists())
        assert.ok(!wrapperError.exists())
        assert.ok(wrapperInner.exists())
    })

    it('create', async () => {
        const wrapper = mount(CompImage, {
            propsData: {
                src: IMG_SUCCESS_SRC,
                fit: 'fill',
            },
        })
        const wrapperHolder = wrapper.find('.tm-image__placeholder')
        const wrapperLoading = wrapper.find('.tm-image__loading')
        const wrapperError = wrapper.find('.tm-image__error')
        let wrapperInner = wrapper.find('.tm-image__inner')

        assert.ok(!wrapperHolder.exists())
        assert.ok(wrapperLoading.exists())
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
            assert.strictEqual(image1.state, 'success')
            assert.strictEqual(image2.state, 'loading')

            const events = new Event('scroll')
            image2._scrollContainer.dispatchEvent(events)

            await sleep()
            assert.strictEqual(image2.state, 'success')
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

    it('pass event listeners', async () => {
        let isClick = false

        const wrapper = mount({
            template: `
                <TmImage ref="image" @click="handleClick" :src="src" />
            `,
            data () {
                return {
                    src: IMG_SUCCESS_SRC,
                }
            },
            methods: {
                handleClick (e) {
                    isClick = true
                },
            },
            components: {
                TmImage: CompImage,
            },
        })
        await sleep()
        const wrapperImage = wrapper.find('.tm-image__inner')
        wrapperImage.trigger('click')
        assert.strictEqual(isClick, true)
    })

    it('scrollContainer is String', async () => {
        let flag = false
        RewireAPI.__Rewire__('isInContainer', () => {
            flag = !flag
            return flag
        })

        const wrapper = mount({
            template: `
                <div ref="container" id="container" style="height: 200px; overflow: auto;">
                    <TmImage
                        :src="src"
                        ref="image1"
                        style="display: block; width: 200px; height: 200px;"
                        scroll-container="#container"
                        lazy />

                    <TmImage
                        :src="src"
                        ref="image2"
                        style="display: block; width: 200px; height: 200px;"
                        scroll-container="#container"
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
            assert.strictEqual(image1.state, 'success')
            assert.strictEqual(image2.state, 'loading')

            const events = new Event('scroll')
            image2._scrollContainer.dispatchEvent(events)

            await sleep()
            assert.strictEqual(image2.state, 'success')
        } finally {
            wrapper.destroy()
            RewireAPI.__ResetDependency__('isInContainer')
        }
    })

    it('scrollContainer is HTMLElement', async () => {
        let flag = false
        RewireAPI.__Rewire__('isInContainer', () => {
            flag = !flag
            return flag
        })
        RewireAPI.__Rewire__('isHtmlElement', () => {
            return true
        })
        const events = new Event('scroll')

        const wrapper = mount({
            template: `
                <div ref="container" style="height: 200px; overflow: auto;">
                    <TmImage
                        :src="src"
                        ref="image1"
                        style="display: block; width: 200px; height: 200px;"
                        :scroll-container="scrollContainer"
                        lazy />

                    <TmImage
                        :src="src"
                        ref="image2"
                        style="display: block; width: 200px; height: 200px;"
                        :scroll-container="scrollContainer"
                        lazy />
                </div>
            `,
            data () {
                return {
                    src: IMG_SUCCESS_SRC,
                    scrollContainer: window,
                }
            },

            methods: {
            },

            components: {
                TmImage: CompImage,
            },
        }, { attachToDocument: true })
        const { image1, image2 } = wrapper.vm.$refs

        try {
            await sleep()
            assert.strictEqual(image1.state, 'success')
            assert.strictEqual(image2.state, 'loading')

            window.dispatchEvent(events)

            await sleep()
            assert.strictEqual(image2.state, 'success')
        } finally {
            wrapper.destroy()
            RewireAPI.__ResetDependency__('isInContainer')
            RewireAPI.__ResetDependency__('isHtmlElement')
        }
    })

    it('scrollContainer is invalid', async () => {
        RewireAPI.__Rewire__('isInContainer', () => {
            return false
        })
        const mockLog = sinon.fake()
        sinon.replace(console, 'warn', mockLog)

        const wrapper = mount({
            template: `
                <div ref="container" style="height: 200px;">
                    <TmImage
                        :src="src"
                        ref="image1"
                        style="display: block; width: 200px; height: 200px;"
                        lazy />
                </div>
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
        const { image1 } = wrapper.vm.$refs

        try {
            await sleep()
            assert.strictEqual(image1.state, 'loading')
            assert.ok(mockLog.called)
            assert.deepStrictEqual(mockLog.getCall(0).args, ['未找到可滚动区域'])
        } finally {
            RewireAPI.__ResetDependency__('isInContainer')
        }
    })

    it('async src', async () => {
        let wrapperImage
        RewireAPI.__Rewire__('isInContainer', () => {
            return false
        })

        const wrapper = mount({
            template: `
                <div ref="container" style="height: 200px;">
                    <TmImage
                        :src="src"
                        ref="image1"
                        style="display: block; width: 200px; height: 200px;" />
                </div>
            `,
            data () {
                return {
                    src: '',
                }
            },

            components: {
                TmImage: CompImage,
            },
        })
        wrapperImage = wrapper.find('.tm-image__inner')

        assert.ok(!wrapperImage.exists())
        wrapper.setData({ src: IMG_SUCCESS_SRC })
        await sleep()
        wrapperImage = wrapper.find('.tm-image__inner')
        assert.ok(wrapperImage.exists())
    })

    it('props.hold', async () => {
        const wrapper = mount(CompImage, {
            propsData: {
                src: '',
                fit: 'fill',
                hold: true,
            },
        })
        let wrapperHolder
        let wrapperLoading
        let wrapperError
        let wrapperInner

        wrapperHolder = wrapper.find('.tm-image__placeholder')
        wrapperLoading = wrapper.find('.tm-image__loading')
        wrapperError = wrapper.find('.tm-image__error')
        wrapperInner = wrapper.find('.tm-image__inner')

        assert.ok(wrapperHolder.exists())
        assert.ok(!wrapperLoading.exists())
        assert.ok(!wrapperError.exists())
        assert.ok(!wrapperInner.exists())

        wrapper.setProps({ src: IMG_SUCCESS_SRC })
        await sleep()

        wrapperHolder = wrapper.find('.tm-image__placeholder')
        wrapperLoading = wrapper.find('.tm-image__loading')
        wrapperError = wrapper.find('.tm-image__error')
        wrapperInner = wrapper.find('.tm-image__inner')

        assert.ok(!wrapperHolder.exists())
        assert.ok(!wrapperLoading.exists())
        assert.ok(!wrapperError.exists())
        assert.ok(wrapperInner.exists())
    })

    afterEach(() => {
        sinon.restore()
    })
})

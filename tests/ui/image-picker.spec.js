import assert from 'assert'
import ImagePicker from 'web-ui/image-picker/src/main'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import imgVip from '../images/vip.png'
import { Mock } from '../helper'

const localVue = createLocalVue()
localVue.directive(ImagePicker.name, ImagePicker)

describe('image-picker', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('create', () => {
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker style="position: relative;">
                </div>
            `,
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('.tm-image-picker')
        const mockRemove = sinon.fake()
        sinon.replace(wrapper.element, 'removeChild', mockRemove)
        assert.ok(wrapper.contains('.tm-image-picker'))
        wrapper.destroy()
        assert.ok(mockRemove.calledWithExactly(wrapperInput.element))
    })

    it('定位异常提示', () => {
        const mockWarn = sinon.fake()
        sinon.replace(console, 'warn', mockWarn)
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker style="position: static;">
                </div>
            `,
        }, {
            localVue,
        })
        assert.ok(mockWarn.calledWithExactly('[@huteming/ui Warn][image-picker]元素定位异常: ', 'static'))
    })

    it('选择图片', (done) => {
        sinon.replace(console, 'error', () => {
            done(new Error('expect success'))
        })
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker="onload" style="position: relative;">
                </div>
            `,
            methods: {
                onload (dataURI) {
                    assert.ok(dataURI.startsWith('data:image/png;base64,'))
                    done()
                },
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const files = [new File([imgVip], 'vip.png', {
            type: 'image/png',
        })]
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapperInput.trigger('change')
    })

    it('多选', (done) => {
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker="{ onload, onerror, multiple: true }" style="position: relative;">
                </div>
            `,
            methods: {
                onload (dataURIs) {
                    assert.ok(Array.isArray(dataURIs))
                    assert.ok(dataURIs[0].startsWith('data:image/png;base64,'))
                    done()
                },
                onerror () {
                    done(new Error('expect success'))
                },
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const file = new File([imgVip], 'vip.png', {
            type: 'image/png',
        })
        const files = [file, file]
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapperInput.trigger('change')
    })

    it('限制最大数量', (done) => {
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker="{ onload, onerror, multiple: true, max: 1 }" style="position: relative;">
                </div>
            `,
            methods: {
                onload (dataURIs) {
                    assert.strictEqual(dataURIs.length, 1)
                    assert.ok(dataURIs[0].startsWith('data:image/png;base64,'))
                    done()
                },
                onerror () {
                    done(new Error('expect success'))
                },
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const file = new File([imgVip], 'vip.png', {
            type: 'image/png',
        })
        const files = [file, file]
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapperInput.trigger('change')
    })

    it('默认onload', (done) => {
        const mock = new Mock(FileReader.prototype, 'readAsDataURL', {
            value () {
                this.onload()
            },
        })
        mock.replace()

        sinon.replace(console, 'log', (text, dataURL) => {
            assert.strictEqual(text, 'image-picker onload: ')
            mock.restore()
            done()
        })
        sinon.replace(console, 'error', (text, message) => {
            mock.restore()
            done(new Error('expect success'))
        })
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker style="position: relative;">
                </div>
            `,
            methods: {
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const file = new File([imgVip], 'vip.png', {
            type: 'image/png',
        })
        const files = [file, file]
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapperInput.trigger('change')
    })

    it('默认onerror', (done) => {
        const errorMsg = 'an error message'
        const mock = new Mock(FileReader.prototype, 'readAsDataURL', {
            value () {
                this.onerror(new Error(errorMsg))
            },
        })
        mock.replace()

        sinon.replace(console, 'log', (text, dataURL) => {
            mock.restore()
            done(new Error('expect error'))
        })
        sinon.replace(console, 'error', (text, message) => {
            assert.strictEqual(text, 'image-picker error: ')
            assert.strictEqual(message, errorMsg)
            mock.restore()
            done()
        })
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker style="position: relative;">
                </div>
            `,
            methods: {
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const file = new File([imgVip], 'vip.png', {
            type: 'image/png',
        })
        const files = [file, file]
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapperInput.trigger('change')
    })

    it('动态更新参数max,disabled', (done) => {
        const mockLoad = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="container" v-image-picker="{ onload, onerror, multiple: true, max, disabled }" style="position: relative;">
                </div>
            `,
            data () {
                return {
                    max: 1,
                    disabled: true,
                }
            },
            methods: {
                onload (dataURIs) {
                    assert.strictEqual(mockLoad.callCount, 0)
                    mockLoad()
                    assert.strictEqual(dataURIs.length, 2)
                    assert.ok(dataURIs[0].startsWith('data:image/png;base64,'))
                    done()
                },
                onerror () {
                    done(new Error('expect success'))
                },
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const file = new File([imgVip], 'vip.png', {
            type: 'image/png',
        })
        const files = [file, file]
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapper.setData({
            max: 2,
        })
        wrapperInput.trigger('change')
        wrapper.setData({
            disabled: false,
        })
        wrapperInput.trigger('change')
    })

    it('未选中图片', () => {
        const mockLoad = sinon.fake()
        const mock = new Mock(FileReader.prototype, 'readAsDataURL', {
            value: mockLoad,
        })
        mock.replace()

        const wrapper = mount({
            template: `
                <div id="container" v-image-picker style="position: relative;">
                </div>
            `,
            methods: {
            },
        }, {
            localVue,
        })
        const wrapperInput = wrapper.find('input')
        const files = []
        files.__proto__ = Object.create(FileList.prototype)
        Object.defineProperty(wrapperInput.element, 'files', {
            value: files,
            writeable: false,
        })
        wrapperInput.trigger('change')
        assert.strictEqual(mockLoad.callCount, 0)
        mock.restore()
    })
})

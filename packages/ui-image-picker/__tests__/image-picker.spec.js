import assert from 'assert'
import ImagePicker from '../src/main'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import imgVip from 'tests/images/vip.png'
import { Mock, sleep } from 'tests/helper'
const scope = '$$ImagePicker'

const localVue = createLocalVue()
localVue.use(ImagePicker)

describe('image-picker', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('before onload 有形参', (done) => {
      const mockFiles = [new File([imgVip], 'vip.png', {
        type: 'image/png',
      })]
      mockFiles.__proto__ = Object.create(FileList.prototype)
      const mockLoad = sinon.fake()
      let callback

      const wrapper = mount({
        template: `
          <div id="container" v-image-picker="{ before, onload }" style="position: relative;">
          </div>
        `,
        methods: {
          before (cb) {
            callback = cb
          },
          onload () {
            mockLoad()
          },
        },
      }, {
        localVue,
      })

      const wrapperInput = wrapper.find('input')
      Object.defineProperty(wrapperInput.element, 'files', {
        value: mockFiles,
        writeable: false,
      })
      wrapperInput.trigger('change')

      sleep(30)
        .then(() => {
          assert.ok(mockLoad.notCalled)
          callback()
          return sleep(30)
        })
        .then(() => {
          assert.ok(mockLoad.called)
          done()
        })
    })

    it('before onload', (done) => {
      const mockFiles = [new File([imgVip], 'vip.png', {
        type: 'image/png',
      })]
      mockFiles.__proto__ = Object.create(FileList.prototype)

      const wrapper = mount({
        template: `
          <div id="container" v-image-picker="{ before }" style="position: relative;">
          </div>
        `,
        methods: {
          before () {
            done()
          },
        },
      }, {
        localVue,
      })

      const wrapperInput = wrapper.find('input')
      Object.defineProperty(wrapperInput.element, 'files', {
        value: mockFiles,
        writeable: false,
      })
      wrapperInput.trigger('change')
    })

    it('after onload', (done) => {
      const mockFiles = [new File([imgVip], 'vip.png', {
        type: 'image/png',
      })]
      mockFiles.__proto__ = Object.create(FileList.prototype)

      const wrapper = mount({
        template: `
          <div id="container" v-image-picker="{ after }" style="position: relative;">
          </div>
        `,
        methods: {
          after () {
            done()
          },
        },
      }, {
        localVue,
      })

      const wrapperInput = wrapper.find('input')
      Object.defineProperty(wrapperInput.element, 'files', {
        value: mockFiles,
        writeable: false,
      })
      wrapperInput.trigger('change')
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
      const mockFiles = [new File([imgVip], 'vip.png', {
          type: 'image/png',
      })]
      const wrapper = mount({
          template: `
              <div id="container" v-image-picker="onload" style="position: relative;">
              </div>
          `,
          methods: {
            onload (dataURI, files) {
              assert.ok(dataURI.startsWith('data:image/png;base64,'))
              assert.strictEqual(files, mockFiles[0])
              // 期望重置value
              assert.strictEqual(this.$el[scope].instance.fileValue, '')
              done()
            },
          },
      }, {
          localVue,
      })
      const wrapperInput = wrapper.find('input')
      mockFiles.__proto__ = Object.create(FileList.prototype)
      Object.defineProperty(wrapperInput.element, 'files', {
        value: mockFiles,
        writeable: false,
      })
      wrapperInput.trigger('change')
    })

    it('多选', (done) => {
      const mockFile = new File([imgVip], 'vip.png', {
          type: 'image/png',
      })
      const wrapper = mount({
          template: `
            <div id="container" v-image-picker="{ onload, onerror, multiple: true }" style="position: relative;">
            </div>
          `,
          methods: {
            onload (dataURIs, files) {
              assert.ok(Array.isArray(dataURIs))
              assert.ok(Array.isArray(files))
              assert.ok(dataURIs[0].startsWith('data:image/png;base64,'))
              assert.strictEqual(files[0], mockFile)
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
      const files = [mockFile, mockFile]
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

    it('异常处理onerror', (done) => {
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
                <div id="container" v-image-picker="{ onerror }" style="position: relative;">
                </div>
            `,
            methods: {
                onerror (error) {
                    console.error('image-picker error: ', error && error.message)
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

    it('reader.result异常', (done) => {
        const mock = new Mock(FileReader.prototype, 'readAsDataURL', {
            value () {
                sinon.replaceGetter(FileReader.prototype, 'result', () => {
                    return null
                })
                this.onload()
            },
        })
        mock.replace()

        const wrapper = mount({
            template: `
                <div id="container" v-image-picker="{ onerror, onload }" style="position: relative;">
                </div>
            `,
            methods: {
                onload () {
                    mock.restore()
                    done(new Error('expect error'))
                },
                onerror (error) {
                    assert.strictEqual(error.message, '上传图片有误')
                    mock.restore()
                    done()
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
        // disabled-eslint-nextline
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

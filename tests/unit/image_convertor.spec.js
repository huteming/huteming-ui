import Convertor, { __RewireAPI__ as RewireAPI } from 'web-util/image-convertor/src'
import assert from 'assert'
import { mockImage, mockFileReader, Mock } from '../helper'
import { IMG_BLOB, IMG_FAILURE_SRC, IMG_SUCCESS_SRC, BLOG_FAILURE, IMG_FAILURE_DATAURI } from '../constant'
import sinon from 'sinon'

describe('image-convertor > canvas', () => {
    mockImage()
    mockFileReader()

    it('value is array', async () => {
        const con = new Convertor([IMG_SUCCESS_SRC, IMG_SUCCESS_SRC])
        const [dataURI1, dataURI2] = await con.getImage()
        assert.ok(dataURI1 instanceof HTMLImageElement)
        assert.ok(dataURI2 instanceof HTMLImageElement)
    })

    it('value is invalid', (done) => {
        const mockOnerror = sinon.fake()
        const value = 'hello wolrd'
        const con = new Convertor(value, { onerror: mockOnerror })
        con.getDataURI()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.ok(err instanceof Error)
                assert.strictEqual(err.message, `value类型错误: ${value}`)
                done()
            })
    })

    it('invalid url', (done) => {
        const con = new Convertor(IMG_FAILURE_SRC)
        con.getImage()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.ok(err instanceof Error)
                assert.strictEqual(err.message, `图片渲染地址错误: ${IMG_FAILURE_SRC}`)
                done()
            })
    })

    it('invalid file', (done) => {
        RewireAPI.__Rewire__('EXIF', {
            getData (file, callback) {
                callback()
            },
            getTag () {
                return 1
            },
        })

        const con = new Convertor(BLOG_FAILURE)
        con.getDataURI()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(() => {
                done()
            })
            .finally(() => {
                RewireAPI.__ResetDependency__('EXIF')
            })
    })

    it('压缩最大宽度', async () => {
        const mockImg = new Image()
        mockImg.width = 1000
        mockImg.height = 1000
        const con = new Convertor(mockImg, { maxWidth: 500, maxHeight: 2000, compress: true })
        const canvas = await con.getCanvas()
        assert.strictEqual(canvas.width, 500)
        assert.strictEqual(canvas.height, 500)
    })

    it('压缩最大高度', async () => {
        const mockImg = new Image()
        mockImg.width = 1000
        mockImg.height = 1000
        const con = new Convertor(mockImg, { maxWidth: 2000, maxHeight: 500, compress: true })
        const canvas = await con.getCanvas()
        assert.strictEqual(canvas.width, 500)
        assert.strictEqual(canvas.height, 500)
    })

    it('旋转90°', async () => {
        const mockRotate = sinon.fake()
        const mockDraw = sinon.fake()
        const mockgetCanvas = sinon.fake()
        const mockImg = new Image()
        mockImg.width = 500
        mockImg.height = 1000

        RewireAPI.__Rewire__('EXIF', {
            getData (file, callback) {
                callback()
            },
            getTag () {
                return 6
            },
        })
        RewireAPI.__Rewire__('getCanvasObj', (...args) => {
            mockgetCanvas(...args)
            return {
                context: {
                    rotate: mockRotate,
                    drawImage: mockDraw,
                },
            }
        })
        RewireAPI.__Rewire__('dataURI2image', () => {
            return mockImg
        })

        const con = new Convertor(IMG_BLOB)
        try {
            await con.getCanvas()
            assert.deepStrictEqual(mockgetCanvas.getCall(0).args, [1000, 500])
            assert.ok(mockRotate.calledWithExactly(Math.PI / 2))
            assert.ok(mockDraw.calledWithExactly(mockImg, 0, -1000, 500, 1000))
        } finally {
            RewireAPI.__ResetDependency__('EXIF')
            RewireAPI.__ResetDependency__('getCanvasObj')
            RewireAPI.__ResetDependency__('dataURI2image')
        }
    })

    it('旋转180°', async () => {
        const mockRotate = sinon.fake()
        const mockDraw = sinon.fake()
        const mockgetCanvas = sinon.fake()
        const mockImg = new Image()
        mockImg.width = 500
        mockImg.height = 1000

        RewireAPI.__Rewire__('EXIF', {
            getData (file, callback) {
                callback()
            },
            getTag () {
                return 3
            },
        })
        RewireAPI.__Rewire__('getCanvasObj', (...args) => {
            mockgetCanvas(...args)
            return {
                context: {
                    rotate: mockRotate,
                    drawImage: mockDraw,
                },
            }
        })
        RewireAPI.__Rewire__('dataURI2image', () => {
            return mockImg
        })

        const con = new Convertor(IMG_BLOB)
        try {
            await con.getCanvas()
            assert.deepStrictEqual(mockgetCanvas.getCall(0).args, [500, 1000])
            assert.ok(mockRotate.calledWithExactly(Math.PI))
            assert.ok(mockDraw.calledWithExactly(mockImg, -500, -1000, 500, 1000))
        } finally {
            RewireAPI.__ResetDependency__('EXIF')
            RewireAPI.__ResetDependency__('getCanvasObj')
            RewireAPI.__ResetDependency__('dataURI2image')
        }
    })

    it('旋转270°', async () => {
        const mockRotate = sinon.fake()
        const mockDraw = sinon.fake()
        const mockgetCanvas = sinon.fake()
        const mockImg = new Image()
        mockImg.width = 500
        mockImg.height = 1000

        RewireAPI.__Rewire__('EXIF', {
            getData (file, callback) {
                callback()
            },
            getTag () {
                return 8
            },
        })
        RewireAPI.__Rewire__('getCanvasObj', (...args) => {
            mockgetCanvas(...args)
            return {
                context: {
                    rotate: mockRotate,
                    drawImage: mockDraw,
                },
            }
        })
        RewireAPI.__Rewire__('dataURI2image', () => {
            return mockImg
        })

        const con = new Convertor(IMG_BLOB)
        try {
            await con.getCanvas()
            assert.deepStrictEqual(mockgetCanvas.getCall(0).args, [500, 1000])
            assert.ok(mockRotate.calledWithExactly(3 * Math.PI / 2))
            assert.ok(mockDraw.calledWithExactly(mockImg, -500, 0, 500, 1000))
        } finally {
            RewireAPI.__ResetDependency__('EXIF')
            RewireAPI.__ResetDependency__('getCanvasObj')
            RewireAPI.__ResetDependency__('dataURI2image')
        }
    })

    it('image2canvas error', (done) => {
        const mockImg = new Image()
        const mockError = new Error('mock error')

        RewireAPI.__Rewire__('getCanvasObj', (...args) => {
            throw mockError
        })

        const con = new Convertor(mockImg)
        con.getCanvas()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockError)
                done()
            })
            .finally(() => {
                RewireAPI.__ResetDependency__('getCanvasObj')
            })
    })

    it('dataURI2image error', (done) => {
        const con = new Convertor(IMG_FAILURE_DATAURI)
        con.getImage()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, `图片渲染错误: ${IMG_FAILURE_DATAURI}`)
                done()
            })
    })

    it('canvas2file error', (done) => {
        const canvas = document.createElement('canvas')
        const mockError = new Error('mock error')
        sinon.replace(canvas, 'toBlob', () => {
            throw mockError
        })
        const con = new Convertor(canvas)
        con.getFile()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockError)
                done()
            })
    })

    it('canvas默认放大比例为1', async () => {
        const mockImage = new Image()
        const mockCanvas = document.createElement('canvas')
        const mockContext = mockCanvas.getContext('2d')
        const mockScale = sinon.fake()
        sinon.replace(mockContext, 'scale', mockScale)
        sinon.replace(mockCanvas, 'getContext', () => {
            return mockContext
        })
        sinon.replace(document, 'createElement', () => {
            return mockCanvas
        })
        const mock = new Mock(window, 'devicePixelRatio', {
            value: undefined,
        })
        mock.replace()

        try {
            const con = new Convertor(mockImage)
            await con.getCanvas()
            assert.deepStrictEqual(mockScale.getCall(0).args, [1, 1])
        } finally {
            mock.restore()
        }
    })

    afterEach(() => {
        sinon.restore()
    })
})

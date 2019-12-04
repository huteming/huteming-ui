import Convertor, { __RewireAPI__ as RewireAPI } from '../src/main'
import assert from 'assert'
import { mockImage, mockFileReader, Mock } from 'tests/helper'
import { IMG_FAILURE_SRC, IMG_SUCCESS_SRC, BLOG_FAILURE, IMG_SUCCESS_DATAURI } from 'tests/constant'
import sinon from 'sinon'

describe('image-convertor > canvas', () => {
    mockImage()
    mockFileReader()

    it('value is array', async () => {
        const con = new Convertor([IMG_SUCCESS_SRC, document.createElement('canvas'), IMG_SUCCESS_DATAURI])
        const [res1, res2, res3] = await con.getImage()
        assert.ok(res1 instanceof HTMLImageElement)
        assert.ok(res2 instanceof HTMLImageElement)
        assert.ok(res3 instanceof HTMLImageElement)
    })

    it('value is invalid', (done) => {
        const value = 'hello wolrd'
        const con = new Convertor(value)
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

    it('invalid blob', (done) => {
        const con = new Convertor(BLOG_FAILURE)
        con.getDataURI()
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(() => {
                done()
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

    afterEach(() => {
        sinon.restore()
    })
})

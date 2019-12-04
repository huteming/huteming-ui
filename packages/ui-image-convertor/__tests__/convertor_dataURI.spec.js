import { dataURI2blob, dataURI2canvas, dataURI2dataURI, dataURI2image } from '../src/dataURI'
import assert from 'assert'
import { mockImage } from 'tests/helper'
import { DATAURI, IMG_FAILURE_DATAURI, DATAURI_INVALID } from 'tests/constant'

describe('image-convertor > dataURI', () => {
    mockImage()

    it('to canvas', async () => {
        const canvas = await dataURI2canvas(DATAURI, {})
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to dataURI', async () => {
        const dataURI = await dataURI2dataURI(DATAURI, {})
        assert.ok(dataURI.startsWith('data:'))
    })

    it('to image', async () => {
        const image = await dataURI2image(DATAURI, {})
        assert.ok(image instanceof HTMLImageElement)
    })

    it('to blob', async () => {
        const blob = await dataURI2blob(DATAURI, {})
        assert.ok(blob instanceof Blob)
    })

    it('to image error', (done) => {
        dataURI2image(IMG_FAILURE_DATAURI, {})
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, `图片渲染错误: ${IMG_FAILURE_DATAURI}`)
                done()
            })
    })

    it('to blob error', (done) => {
        dataURI2blob(DATAURI_INVALID, {})
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, `dataURI 格式有误: ${DATAURI_INVALID}`)
                done()
            })
    })
})

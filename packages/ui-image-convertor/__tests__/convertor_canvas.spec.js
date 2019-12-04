import { canvas2blob, canvas2canvas, canvas2dataURI, canvas2image } from '../src/canvas'
import Convertor from '../src/main'
import assert from 'assert'
import { mockImage } from 'tests/helper'
import sinon from 'sinon'

describe('image-convertor > canvas', () => {
    let mockCanvas
    mockImage()

    beforeEach(() => {
        mockCanvas = document.createElement('canvas')
    })

    it('to canvas', async () => {
        const canvas = await canvas2canvas(mockCanvas, {})
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to dataURI', async () => {
        const dataURI = await canvas2dataURI(mockCanvas, {})
        assert.ok(dataURI.startsWith('data:'))
    })

    it('to image', async () => {
        const image = await canvas2image(mockCanvas, { mimeType: 'png', quality: 1 })
        assert.ok(image instanceof HTMLImageElement)
    })

    it('to blob', async () => {
        const blob = await canvas2blob(mockCanvas, {})
        assert.ok(blob instanceof Blob)
    })

    it('to blob error', (done) => {
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
})

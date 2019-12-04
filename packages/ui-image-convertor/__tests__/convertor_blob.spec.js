import { blob2blob, blob2canvas, blob2dataURI, blob2image } from '../src/blob'
import assert from 'assert'
import { mockImage } from 'tests/helper'
import { BLOB } from 'tests/constant'

describe('image-convertor > blob', () => {
    mockImage()

    it('to canvas', async () => {
        const canvas = await blob2canvas(BLOB, {})
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to dataURI', async () => {
        const dataURI = await blob2dataURI(BLOB, {})
        assert.ok(dataURI.startsWith('data:'))
    })

    it('to image', async () => {
        const image = await blob2image(BLOB, {})
        assert.ok(image instanceof HTMLImageElement)
    })

    it('to blob', async () => {
        const blob = await blob2blob(BLOB, {})
        assert.ok(blob instanceof Blob)
    })
})

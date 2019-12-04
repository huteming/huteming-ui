import { url2blob, url2canvas, url2dataURI, url2image } from '../src/url'
import assert from 'assert'
import { mockImage } from 'tests/helper'
import { IMG_SUCCESS_SRC } from 'tests/constant'

describe('image-convertor > url', () => {
    mockImage()

    it('to image', async () => {
        const image = await url2image(IMG_SUCCESS_SRC, {})
        assert.ok(image instanceof HTMLImageElement)
    })

    it('to canvas', async () => {
        const canvas = await url2canvas(IMG_SUCCESS_SRC, {})
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to blob', async () => {
        const file = await url2blob(IMG_SUCCESS_SRC, {})
        assert.ok(file instanceof Blob)
    })

    it('to dataURI', async () => {
        const dataURI = await url2dataURI(IMG_SUCCESS_SRC, {})
        assert.ok(dataURI.startsWith('data:'))
    })
})

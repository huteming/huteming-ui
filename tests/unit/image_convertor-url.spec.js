import Convertor from 'web-util/image-convertor/src'
import assert from 'assert'
import { mockImage } from '../helper'
import { IMG_SUCCESS_SRC } from '../constant'

describe('image-convertor > url', () => {
    mockImage()

    it('to image', async () => {
        const con = new Convertor(IMG_SUCCESS_SRC)
        const image = await con.getImage()
        assert.ok(image instanceof HTMLImageElement)
    })

    it('to canvas', async () => {
        const con = new Convertor(IMG_SUCCESS_SRC)
        const canvas = await con.getCanvas()
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to blob', async () => {
        const con = new Convertor(IMG_SUCCESS_SRC)
        const file = await con.getFile()
        assert.ok(file instanceof Blob)
    })

    it('to dataURI', async () => {
        const con = new Convertor(IMG_SUCCESS_SRC)
        const dataURI = await con.getDataURI()
        assert.ok(dataURI.startsWith('data:'))
    })
})

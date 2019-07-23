import Convertor, { __RewireAPI__ as RewireAPI } from 'web-util/image-convertor/src'
import assert from 'assert'
import { mockProperty } from '../helper'
import { imgURI } from '../constant'

describe('image-convertor > canvas', () => {
    const mockCanvas = document.createElement('canvas')

    mockProperty(Image.prototype, 'src', {
        set (src) {
            setTimeout(() => this.onload())
            this.setAttribute('src', src)
        },
        get () {
            return this.getAttribute('src')
        },
    })

    beforeEach(async () => {
        RewireAPI.__Rewire__('EXIF', {
            getData (file, callback) {
                callback()
            },
            getTag () {
                return 1
            },
        })
    })

    it('to canvas', async () => {
        const con = new Convertor(mockCanvas)
        const canvas = await con.getCanvas()
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to dataURI', async () => {
        const con = new Convertor(mockCanvas)
        const dataURI = await con.getDataURI()
        assert.ok(dataURI.startsWith('data:'))
    })

    it('to image', async () => {
        const con = new Convertor(mockCanvas)
        const image = await con.getImage()
        assert.ok(image instanceof HTMLImageElement)
    })

    it('to file', async () => {
        const con = new Convertor(mockCanvas)
        const blob = await con.getFile()
        assert.ok(blob instanceof Blob)
    })

    afterEach(() => {
        RewireAPI.__ResetDependency__('EXIF')
    })
})

import { image2blob, image2canvas, image2dataURI, image2image } from '../src/image'
import assert from 'assert'
import { mockImage } from 'tests/helper'
import sinon from 'sinon'

describe('image-convertor > image', () => {
    let image
    mockImage()

    beforeEach(() => {
        image = new Image()
    })

    it('to canvas', async () => {
        const canvas = await image2canvas(image, {})
        assert.ok(canvas instanceof HTMLCanvasElement)
    })

    it('to dataURI', async () => {
        const dataURI = await image2dataURI(image, {})
        assert.ok(dataURI.startsWith('data:'))
    })

    it('to image', async () => {
        const _image = await image2image(image, {})
        assert.ok(_image instanceof HTMLImageElement)
    })

    it('to blob', async () => {
        const blob = await image2blob(image, {})
        assert.ok(blob instanceof Blob)
    })

    it('to canvas error(getContext)', (done) => {
        const mockCanvas = {
            getContext () {
                return null
            }
        }
        sinon.replace(document, 'createElement', () => {
            return mockCanvas
        })

        image2canvas(image, {})
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, '获取画布上下文context失败')
                done()
            })
    })

    it('to canvas error(drawImage)', (done) => {
        const mockCanvas = {
            getContext () {
                return {
                    drawImage () {
                        throw new Error('mock error')
                    },
                }
            },
        }
        sinon.replace(document, 'createElement', () => {
            return mockCanvas
        })

        image2canvas(image, {})
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, 'mock error')
                done()
            })
    })

    afterEach(() => {
        sinon.restore()
    })
})

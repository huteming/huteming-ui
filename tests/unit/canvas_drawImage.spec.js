import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'
const img = 'http://jhsy-img.caizhu.com/FmlrYPxoVhlH4AQ8Po8eI0RiCzNY'

describe('canvas > drawImage', () => {
    it('默认配置参数', () => {
        const ins = new CanvasDraw()
        ins.ratio = 1
        const drawImage = sinon.fake()
        sinon.replace(ins.context, 'drawImage', drawImage)
        const options = ins.drawImage(img, 0, 0, 200, 200)

        assert.deepStrictEqual(options, {
            shadowColor: 'rgba(89, 87, 88, 0.79)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 2,
        })
    })

    it('context参数设置', () => {
        const ins = new CanvasDraw()
        ins.ratio = 2
        const drawImage = sinon.fake()
        sinon.replace(ins.context, 'drawImage', drawImage)
        const _shadowColor = '#aaa'
        const _shadowOffsetX = 20
        const _shadowOffsetY = 20
        const _shadowBlur = 30
        const options = {
            shadowColor: _shadowColor,
            shadowOffsetX: _shadowOffsetX,
            shadowOffsetY: _shadowOffsetY,
            shadowBlur: _shadowBlur,
        }
        ins.drawImage(img, 0, 0, 200, 200, options)
        const { shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur } = ins.context

        assert.strictEqual(shadowColor, _shadowColor)
        assert.strictEqual(shadowOffsetX, _shadowOffsetX * 2)
        assert.strictEqual(shadowOffsetY, _shadowOffsetY * 2)
        assert.strictEqual(shadowBlur, _shadowBlur * 2)
    })

    it('绘图', () => {
        const ins = new CanvasDraw()
        ins.ratio = 2
        const drawImage = sinon.fake()
        const x = 10
        const y = 10
        const width = 200
        const height = 200
        sinon.replace(ins.context, 'drawImage', drawImage)
        ins.drawImage(img, x, y, width, height)

        assert.deepStrictEqual(drawImage.getCall(0).args, [img, x * 2, y * 2, width * 2, height * 2])
    })
})

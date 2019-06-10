import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas', () => {
    describe('drawRect', () => {
        it('默认配置参数', () => {
            const canvas = new CanvasDraw()
            canvas.ratio = 1
            const options = canvas.drawRect(0, 0, 10, 10)

            assert.deepStrictEqual(options, {
                r: 0,
                lineWidth: 1,
                color: '#fff',
                type: 'fill',
            })
        })

        it('context参数设置', () => {
            const canvas = new CanvasDraw()
            canvas.ratio = 1
            const _type = 'stroke'
            const _color = '#aabbcc'
            const _lineWidth = 10
            const options = {
                type: _type,
                color: _color,
                lineWidth: _lineWidth,
            }
            canvas.drawRect(0, 0, 10, 10, options)

            const { lineWidth } = canvas.context

            assert.strictEqual(canvas.context[`${_type}Style`], _color)
            assert.strictEqual(lineWidth, _lineWidth)
        })

        it('开始绘图beginPath方法调用', () => {
            const canvas = new CanvasDraw()
            const beginPath = sinon.fake()
            sinon.replace(canvas.context, 'beginPath', beginPath)
            canvas.drawRect()

            assert.strictEqual(beginPath.callCount, 1)
        })

        it('绘图', () => {
            const canvas = new CanvasDraw()
            canvas.ratio = 2
            const moveTo = sinon.fake()
            const arcTo = sinon.fake()
            const _r = 10
            sinon.replace(canvas.context, 'moveTo', moveTo)
            sinon.replace(canvas.context, 'arcTo', arcTo)
            const options = {
                r: _r,
            }
            canvas.drawRect(0, 0, 10, 10, options)

            const x = 0 * 2
            const y = 0 * 2
            const r = _r * 2
            const width = 10 * 2
            const height = 10 * 2

            assert.deepStrictEqual(moveTo.getCall(0).args, [x + r, y])
            assert.deepStrictEqual(arcTo.getCall(0).args, [x + width, y, x + width, y + height, r])
            assert.deepStrictEqual(arcTo.getCall(1).args, [x + width, y + height, x, y + height, r])
            assert.deepStrictEqual(arcTo.getCall(2).args, [x, y + height, x, y, r])
            assert.deepStrictEqual(arcTo.getCall(3).args, [x, y, x + r, y, r])
        })

        it('闭合方法调用', () => {
            const canvas = new CanvasDraw()
            const _type = 'stroke'
            const close = sinon.fake()
            sinon.replace(canvas.context, _type, close)

            canvas.drawRect(0, 0, 10, 10, { type: _type })

            assert.strictEqual(close.callCount, 1)
        })
    })
})

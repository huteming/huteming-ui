import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('drawLine', () => {
        it('默认配置参数', () => {
            const ins = new CanvasDraw()
            const options = ins.drawLine(0, 0, 1, 1)

            assert.deepStrictEqual(options, {
                lineWidth: 1,
                color: '#000',
            })
        })

        it('context参数设置', () => {
            const ins = new CanvasDraw()
            const _color = '#aaaaaa'
            const _lineWidth = 10
            const options = {
                color: _color,
                lineWidth: _lineWidth,
            }
            ins.drawLine(0, 0, 1, 1, options)

            const { strokeStyle, lineWidth } = ins.context
            assert.strictEqual(strokeStyle, _color)
            assert.strictEqual(lineWidth, _lineWidth)
        })

        it('开始绘图beginPath方法调用', () => {
            const ins = new CanvasDraw()
            const beginPath = sinon.fake()
            sinon.replace(ins.context, 'beginPath', beginPath)
            ins.drawLine(1, 1, 2, 2)

            assert.strictEqual(beginPath.callCount, 1)
        })

        it('绘图', () => {
            const ins = new CanvasDraw()
            ins.ratio = 20
            const moveTo = sinon.fake()
            const lineTo = sinon.fake()
            sinon.replace(ins.context, 'moveTo', moveTo)
            sinon.replace(ins.context, 'lineTo', lineTo)
            ins.drawLine(0, 0, 1, 1)

            assert.deepStrictEqual(moveTo.getCall(0).args, [0, 0])
            assert.deepStrictEqual(lineTo.getCall(0).args, [20, 20])
        })

        it('闭合方法stroke方法调用', () => {
            const ins = new CanvasDraw()
            const close = sinon.fake()
            sinon.replace(ins.context, 'stroke', close)

            ins.drawLine(1, 1, 2, 2)

            assert.strictEqual(close.callCount, 1)
        })
    })
})

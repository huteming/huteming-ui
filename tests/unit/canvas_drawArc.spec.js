import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('drawArc', () => {
        it('默认配置参数', () => {
            const canvas = new CanvasDraw()
            canvas.ratio = 1
            const options = canvas.drawArc(1, 1, 1)
            assert.deepStrictEqual(options, {
                startDegrees: 0,
                endDegrees: 360,
                direction: false,
                lineWidth: 1,
                shadowColor: 'rgba(89, 87, 88, 0.79)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 2,
                color: '#fff',
                type: 'stroke',
            })
        })

        it('绘图参数配置', () => {
            const canvas = new CanvasDraw()
            const _type = 'stroke'
            const _color = '#abc'
            const _lineWidth = 10
            const _shadowColor = '#abc'
            const _shadowOffsetX = 10
            const _shadowOffsetY = 10
            const _shadowBlur = 10
            canvas.ratio = 1
            canvas.drawArc(1, 1, 1, {
                type: _type,
                color: _color,
                lineWidth: _lineWidth,
                shadowColor: _shadowColor,
                shadowOffsetX: _shadowOffsetX,
                shadowOffsetY: _shadowOffsetY,
                shadowBlur: _shadowBlur,
            })
            const { lineWidth, shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur } = canvas.context

            assert.strictEqual(canvas.context[`${_type}Style`], _color)
            assert.strictEqual(lineWidth, _lineWidth)
            assert.strictEqual(shadowColor, _shadowColor)
            assert.strictEqual(shadowOffsetX, _shadowOffsetX)
            assert.strictEqual(shadowOffsetY, _shadowOffsetY)
            assert.strictEqual(shadowBlur, _shadowBlur)
        })

        it('beginPath调用一次', () => {
            const canvas = new CanvasDraw()
            const beginPath = sinon.fake()
            sinon.replace(canvas.context, 'beginPath', beginPath)

            canvas.drawArc(1, 1, 1)
            assert.strictEqual(beginPath.callCount, 1)
        })

        it('arc调用参数', () => {
            const canvas = new CanvasDraw()
            const _x = 10
            const _y = 10
            const _r = 10
            const _ratio = 10
            const _startDegrees = 10
            const _endDegrees = 10
            const _direction = true
            const radians = Math.PI / 180
            const arc = sinon.fake()
            canvas.ratio = _ratio
            sinon.replace(canvas.context, 'arc', arc)

            canvas.drawArc(_x, _y, _r, {
                startDegrees: _startDegrees,
                endDegrees: _endDegrees,
                direction: _direction,
            })

            const [x, y, r, start, end, direction] = arc.getCall(0).args
            assert.strictEqual(x, (_x + _r) * _ratio)
            assert.strictEqual(y, (_y + _r) * _ratio)
            assert.strictEqual(r, _r * _ratio)
            assert.strictEqual(start, radians * _startDegrees)
            assert.strictEqual(end, radians * _endDegrees)
            assert.strictEqual(direction, _direction)
        })

        it('闭合方法调用一次', () => {
            const canvas = new CanvasDraw()
            const _type = 'fill'
            const close = sinon.fake()
            sinon.replace(canvas.context, _type, close)

            canvas.drawArc(1, 1, 1, { type: _type })

            assert.strictEqual(close.callCount, 1)
        })
    })
})

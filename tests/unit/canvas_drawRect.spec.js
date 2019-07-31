import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas > drawRect', () => {
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
        const _color = '#abc'
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
        const radians = Math.PI / 180
        const canvas = new CanvasDraw()
        canvas.ratio = 2
        const mockMoveTo = sinon.fake()
        const mockArc = sinon.fake()
        const mockLineTo = sinon.fake()
        const _r = 10
        sinon.replace(canvas.context, 'moveTo', mockMoveTo)
        sinon.replace(canvas.context, 'arc', mockArc)
        sinon.replace(canvas.context, 'lineTo', mockLineTo)
        const options = {
            r: _r,
        }
        canvas.drawRect(2, 2, 10, 10, options)

        const x = 2 * 2
        const y = 2 * 2
        const r = _r * 2
        const width = 10 * 2
        const height = 10 * 2

        assert.strictEqual(mockMoveTo.callCount, 1)
        assert.strictEqual(mockArc.callCount, 4)
        assert.strictEqual(mockLineTo.callCount, 4)

        assert.deepStrictEqual(mockMoveTo.getCall(0).args, [x, y + r])
        assert.deepStrictEqual(mockArc.getCall(0).args, [x + r, y + r, r, radians * 180, radians * 270, false])
        assert.deepStrictEqual(mockLineTo.getCall(0).args, [x + width - r, y])
        assert.deepStrictEqual(mockArc.getCall(1).args, [x + width - r, y + r, r, radians * 270, 0, false])
        assert.deepStrictEqual(mockLineTo.getCall(1).args, [x + width, y + height - r])
        assert.deepStrictEqual(mockArc.getCall(2).args, [x + width - r, y + height - r, r, 0, radians * 90, false])
        assert.deepStrictEqual(mockLineTo.getCall(2).args, [x + r, y + height])
        assert.deepStrictEqual(mockArc.getCall(3).args, [x + r, y + height - r, r, radians * 90, radians * 180, false])
        assert.deepStrictEqual(mockLineTo.getCall(3).args, [x, y + r])
    })

    it('圆角为正数', () => {
        const radians = Math.PI / 180
        const canvas = new CanvasDraw()
        canvas.ratio = 2
        const mockMoveTo = sinon.fake()
        const mockArc = sinon.fake()
        const mockLineTo = sinon.fake()
        const _r = '10 20 30 40'
        sinon.replace(canvas.context, 'moveTo', mockMoveTo)
        sinon.replace(canvas.context, 'arc', mockArc)
        sinon.replace(canvas.context, 'lineTo', mockLineTo)
        const options = {
            r: _r,
        }
        canvas.drawRect(1, 1, 10, 10, options)

        const x = 1 * 2
        const y = 1 * 2
        const r1 = 10 * 2
        const r2 = 20 * 2
        const r3 = 30 * 2
        const r4 = 40 * 2
        const width = 10 * 2
        const height = 10 * 2

        assert.strictEqual(mockMoveTo.callCount, 1)
        assert.strictEqual(mockArc.callCount, 4)
        assert.strictEqual(mockLineTo.callCount, 4)

        assert.deepStrictEqual(mockMoveTo.getCall(0).args, [x, y + r1])
        assert.deepStrictEqual(mockArc.getCall(0).args, [x + r1, y + r1, r1, radians * 180, radians * 270, false])
        assert.deepStrictEqual(mockLineTo.getCall(0).args, [x + width - r2, y])
        assert.deepStrictEqual(mockArc.getCall(1).args, [x + width - r2, y + r2, r2, radians * 270, 0, false])
        assert.deepStrictEqual(mockLineTo.getCall(1).args, [x + width, y + height - r3])
        assert.deepStrictEqual(mockArc.getCall(2).args, [x + width - r3, y + height - r3, r3, 0, radians * 90, false])
        assert.deepStrictEqual(mockLineTo.getCall(2).args, [x + r4, y + height])
        assert.deepStrictEqual(mockArc.getCall(3).args, [x + r4, y + height - r4, r4, radians * 90, radians * 180, false])
        assert.deepStrictEqual(mockLineTo.getCall(3).args, [x, y + r1])
    })

    it('圆角为负数', () => {
        const radians = Math.PI / 180
        const canvas = new CanvasDraw()
        canvas.ratio = 2
        const mockMoveTo = sinon.fake()
        const mockArc = sinon.fake()
        const mockLineTo = sinon.fake()
        const _r = '-10 -20 -30 -40'
        sinon.replace(canvas.context, 'moveTo', mockMoveTo)
        sinon.replace(canvas.context, 'arc', mockArc)
        sinon.replace(canvas.context, 'lineTo', mockLineTo)
        const options = {
            r: _r,
        }
        canvas.drawRect(1, 1, 10, 10, options)

        const x = 1 * 2
        const y = 1 * 2
        const r1 = 10 * 2
        const r2 = 20 * 2
        const r3 = 30 * 2
        const r4 = 40 * 2
        const width = 10 * 2
        const height = 10 * 2

        assert.strictEqual(mockMoveTo.callCount, 1)
        assert.strictEqual(mockArc.callCount, 4)
        assert.strictEqual(mockLineTo.callCount, 4)

        assert.deepStrictEqual(mockMoveTo.getCall(0).args, [x, y + r1])
        assert.deepStrictEqual(mockArc.getCall(0).args, [x, y, r1, radians * 90, 0, true])
        assert.deepStrictEqual(mockLineTo.getCall(0).args, [x + width - r2, y])
        assert.deepStrictEqual(mockArc.getCall(1).args, [x + width, y, r2, radians * 180, radians * 90, true])
        assert.deepStrictEqual(mockLineTo.getCall(1).args, [x + width, y + height - r3])
        assert.deepStrictEqual(mockArc.getCall(2).args, [x + width, y + height, r3, radians * 270, radians * 180, true])
        assert.deepStrictEqual(mockLineTo.getCall(2).args, [x + r4, y + height])
        assert.deepStrictEqual(mockArc.getCall(3).args, [x, y + height, r4, 0, radians * 270, true])
        assert.deepStrictEqual(mockLineTo.getCall(3).args, [x, y + r1])
    })

    it('圆角为空字符串', () => {
        const radians = Math.PI / 180
        const canvas = new CanvasDraw()
        canvas.ratio = 2
        const mockMoveTo = sinon.fake()
        const mockArc = sinon.fake()
        const mockLineTo = sinon.fake()
        const _r = ''
        sinon.replace(canvas.context, 'moveTo', mockMoveTo)
        sinon.replace(canvas.context, 'arc', mockArc)
        sinon.replace(canvas.context, 'lineTo', mockLineTo)
        const options = {
            r: _r,
        }
        canvas.drawRect(1, 1, 10, 10, options)

        const x = 1 * 2
        const y = 1 * 2
        const r = 0
        const width = 10 * 2
        const height = 10 * 2

        assert.strictEqual(mockMoveTo.callCount, 1)
        assert.strictEqual(mockArc.callCount, 4)
        assert.strictEqual(mockLineTo.callCount, 4)

        assert.deepStrictEqual(mockMoveTo.getCall(0).args, [x, y + r])
        assert.deepStrictEqual(mockArc.getCall(0).args, [x + r, y + r, r, radians * 180, radians * 270, false])
        assert.deepStrictEqual(mockLineTo.getCall(0).args, [x + width - r, y])
        assert.deepStrictEqual(mockArc.getCall(1).args, [x + width - r, y + r, r, radians * 270, 0, false])
        assert.deepStrictEqual(mockLineTo.getCall(1).args, [x + width, y + height - r])
        assert.deepStrictEqual(mockArc.getCall(2).args, [x + width - r, y + height - r, r, 0, radians * 90, false])
        assert.deepStrictEqual(mockLineTo.getCall(2).args, [x + r, y + height])
        assert.deepStrictEqual(mockArc.getCall(3).args, [x + r, y + height - r, r, radians * 90, radians * 180, false])
        assert.deepStrictEqual(mockLineTo.getCall(3).args, [x, y + r])
    })

    it('闭合方法调用', () => {
        const canvas = new CanvasDraw()
        const _type = 'stroke'
        const close = sinon.fake()
        const mockClosePath = sinon.fake()
        sinon.replace(canvas.context, _type, close)
        sinon.replace(canvas.context, 'closePath', mockClosePath)

        canvas.drawRect(0, 0, 10, 10, { type: _type })

        assert.strictEqual(close.callCount, 1)
        assert.strictEqual(mockClosePath.callCount, 1)
    })
})

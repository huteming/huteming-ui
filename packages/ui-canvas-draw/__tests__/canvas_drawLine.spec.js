import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from '../src/main'

describe('canvas > drawLine', () => {
    it('默认配置参数', () => {
        const ins = new CanvasDraw()
        const options = ins.drawLine(0, 0, 1, 1)

        assert.deepStrictEqual(options, {
            lineWidth: 1,
            color: '#000',
            dashed: [],
        })
    })

    it('绘图', () => {
        const ins = new CanvasDraw()
        ins.ratio = 20
        const mockBegin = sinon.fake()
        const mockDash = sinon.fake()
        const moveTo = sinon.fake()
        const lineTo = sinon.fake()
        const mockStroke = sinon.fake()
        sinon.replace(ins.context, 'beginPath', mockBegin)
        sinon.replace(ins.context, 'setLineDash', mockDash)
        sinon.replace(ins.context, 'moveTo', moveTo)
        sinon.replace(ins.context, 'lineTo', lineTo)
        sinon.replace(ins.context, 'stroke', mockStroke)
        ins.drawLine(1, 1, 2, 2, {
            color: 'rgba(255, 255, 255, 0)',
            lineWidth: 3,
            dashed: [1, 2],
        })

        assert.strictEqual(ins.context.strokeStyle, 'rgba(255, 255, 255, 0)')
        assert.strictEqual(ins.context.lineWidth, 3)
        assert.strictEqual(mockBegin.callCount, 1)
        assert.deepStrictEqual(mockDash.getCall(0).args, [[1, 2]])
        assert.deepStrictEqual(moveTo.getCall(0).args, [1 * 20, 1 * 20])
        assert.deepStrictEqual(lineTo.getCall(0).args, [2 * 20, 2 * 20])
        assert.strictEqual(mockStroke.callCount, 1)
    })

    afterEach(() => {
        sinon.restore()
    })
})

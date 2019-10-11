import assert from 'assert'
import sinon from 'sinon'
import { formatOptions, setContextConfig, drawArc } from 'web-util/canvas-draw/src/drawArc'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas > drawArc', () => {
    describe('formatOptions', () => {
        it('默认配置', () => {
            const mockSelf = {
                ratio: 1,
            }
            const options = formatOptions.call(mockSelf, 1, 1, 1)
            assert.deepStrictEqual(options, {
                startDegrees: 0,
                endDegrees: 360,
                direction: false,
                lineWidth: 1,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                color: '#fff',
                fillColor: '#fff',
                strokeColor: '#fff',
                type: ['stroke'],
                x: 2,
                y: 2,
                r: 1,
            })
        })

        it('type为字符串', () => {
            const mockSelf = {
                ratio: 1,
            }
            const options = formatOptions.call(mockSelf, 1, 1, 1, {
                type: 'fill',
            })
            assert.deepStrictEqual(options, {
                startDegrees: 0,
                endDegrees: 360,
                direction: false,
                lineWidth: 1,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                color: '#fff',
                fillColor: '#fff',
                strokeColor: '#fff',
                type: ['fill'],
                x: 2,
                y: 2,
                r: 1,
            })
        })

        it('type排序', () => {
            const mockSelf = {
                ratio: 1,
            }
            const options = formatOptions.call(mockSelf, 1, 1, 1, {
                type: ['fill', 'stroke', 'closePath']
            })
            assert.deepStrictEqual(options, {
                startDegrees: 0,
                endDegrees: 360,
                direction: false,
                lineWidth: 1,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                color: '#fff',
                fillColor: '#fff',
                strokeColor: '#fff',
                type: ['closePath', 'stroke', 'fill'],
                x: 2,
                y: 2,
                r: 1,
            })
        })
    })

    it('setContextConfig', () => {
        const mockContext = {}
        const mockSelf = {
            ratio: 1,
            context: mockContext,
        }
        const config = formatOptions.call(mockSelf, 1, 1, 1)
        setContextConfig.call(mockSelf, config)

        assert.strictEqual(mockContext.fillStyle, config.fillColor)
        assert.strictEqual(mockContext.strokeStyle, config.strokeColor)
        assert.strictEqual(mockContext.lineWidth, config.lineWidth)
        assert.strictEqual(mockContext.shadowColor, config.shadowColor)
        assert.strictEqual(mockContext.shadowOffsetX, config.shadowOffsetX)
        assert.strictEqual(mockContext.shadowOffsetY, config.shadowOffsetY)
        assert.strictEqual(mockContext.shadowBlur, config.shadowBlur)
    })

    it('drawArc', () => {
        const mockBeginPath = sinon.fake()
        const mockWarn = sinon.fake()
        const mockArc = sinon.fake()
        const mockFill = sinon.fake()
        const mockSelf = {
            ratio: 1,
            context: {
                beginPath: mockBeginPath,
                arc: mockArc,
                fill: mockFill,
            },
        }
        const radians = Math.PI / 180
        sinon.replace(console, 'warn', mockWarn)
        const config = formatOptions.call(mockSelf, 1, 1, 1, {
            type: ['fill', 'other']
        })
        drawArc.call(mockSelf, config)

        assert.strictEqual(mockBeginPath.callCount, 1)
        assert.deepStrictEqual(mockArc.getCall(0).args, [config.x, config.y, config.r, radians * config.startDegrees, radians * config.endDegrees, config.direction])
        assert.strictEqual(mockWarn.callCount, 1)
        assert.strictEqual(mockFill.callCount, 1)
    })

    it('draw返回配置对象', () => {
        const mockSelf = {
            context: {
                beginPath () {},
                stroke () {},
                arc () {},
            },
            ratio: 2,
        }
        const options = formatOptions.call(mockSelf, 1, 1, 1)
        const ins = new CanvasDraw()
        ins.ratio = mockSelf.ratio
        ins.context = mockSelf.context
        const config = ins.drawArc(1, 1, 1)

        assert.deepStrictEqual(config, options)
    })

    afterEach(() => {
        sinon.restore()
    })
})

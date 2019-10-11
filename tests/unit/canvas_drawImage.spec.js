import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'
import { formatOptions, drawImage, setContextConfig } from 'web-util/canvas-draw/src/drawImage'

describe('canvas > drawImage', () => {
    describe('formatOptions', () => {
        it('默认配置', () => {
            const mockSelf = {
                ratio: 1,
            }
            const config = formatOptions.call(mockSelf, 0, 0, 200, 200)
    
            assert.deepStrictEqual(config, {
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                x: 0,
                y: 0,
                width: 200,
                height: 200,
            })
        })
    })

    it('setContextConfig', () => {
        const mockContext = {}
        const mockSelf = {
            ratio: 1,
            context: mockContext,
        }
        const config = formatOptions.call(mockSelf, 0, 0, 200, 200)
        setContextConfig.call(mockSelf, config)

        assert.strictEqual(mockContext.shadowColor, config.shadowColor)
        assert.strictEqual(mockContext.shadowOffsetX, config.shadowOffsetX)
        assert.strictEqual(mockContext.shadowOffsetY, config.shadowOffsetY)
        assert.strictEqual(mockContext.shadowBlur, config.shadowBlur)
    })

    it('绘图', () => {
        const mockDrawImage = sinon.fake()
        const mockContext = {
            drawImage: mockDrawImage,
        }
        const mockSelf = {
            ratio: 1,
            context: mockContext,
        }
        const mockImage = {}
        const config = formatOptions.call(mockSelf, 0, 0, 200, 200)
        drawImage.call(mockSelf, mockImage,config)

        assert.deepStrictEqual(mockDrawImage.getCall(0).args, [mockImage, config.x, config.y, config.width, config.height])
    })

    it('drawImage返回配置对象', () => {
        const mockContext = {
            drawImage () {},
        }
        const mockSelf = {
            ratio: 1,
            context: mockContext,
        }
        const mockImage = {}
        const config = formatOptions.call(mockSelf, 0, 0, 200, 200)
        const ins = new CanvasDraw()
        ins.ratio = mockSelf.ratio
        ins.context = mockSelf.context
        const options = ins.drawImage(mockImage, 0, 0, 200, 200)

        assert.deepStrictEqual(options, config)
    })
})

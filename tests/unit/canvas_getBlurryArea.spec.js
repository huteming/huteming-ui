import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw, { __RewireAPI__ as RewireAPI } from 'web-util/canvas-draw/src/main'

describe('canvas > getBlurryArea', () => {
    it('绘图', () => {
        const mockData = { width: 100, height: 100 }
        const mockCanvas = document.createElement('canvas')
        const mockContext = mockCanvas.getContext('2d')
        const mockGetImageData = sinon.fake.returns(mockData)
        const mockGetCanvas = sinon.fake.returns({ canvas: mockCanvas, context: mockContext })
        const mockBlur = sinon.fake()
        const mockPutImageData = sinon.fake()
        sinon.replace(mockContext, 'putImageData', mockPutImageData)
        RewireAPI.__Rewire__('getCanvasObject', mockGetCanvas)
        RewireAPI.__Rewire__('imageDataRGBA', mockBlur)

        const ins = new CanvasDraw()
        ins.ratio = 20
        ins.context = {
            getImageData: mockGetImageData,
        }
        ins.scale = 10
        const res = ins.getBlurryArea(40, 2, 3, 4, 5)

        assert.strictEqual(res, mockCanvas)
        assert.deepStrictEqual(mockGetCanvas.getCall(1).args, [4, 5, 750])
        assert.deepStrictEqual(mockGetImageData.getCall(0).args, [2 * 10 * 20, 3 * 10 * 20, 4 * 10 * 20, 5 * 10 * 20])
        assert.deepStrictEqual(mockBlur.getCall(0).args, [mockData, 0, 0, 100, 100, 40])
        assert.deepStrictEqual(mockPutImageData.getCall(0).args, [mockData, 0, 0])

        RewireAPI.__ResetDependency__('getCanvasObject')
        RewireAPI.__ResetDependency__('imageDataRGBA')
    })

    afterEach(() => {
        sinon.restore()
    })
})

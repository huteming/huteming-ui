import assert from 'assert'
import sinon from 'sinon'
import getBlurryArea, { __RewireAPI__ as RewireAPI } from 'web-util/canvas-draw/src/getBlurryArea'

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
        RewireAPI.__Rewire__('createCanvas', mockGetCanvas)
        RewireAPI.__Rewire__('imageDataRGBA', mockBlur)

        const res = getBlurryArea.call({
            ratio: 20,
            context: { getImageData: mockGetImageData },
            _options: { designWidth: 750 },
            scale: 10,
        }, 40, 2, 3, 4, 5)

        assert.strictEqual(res, mockCanvas)
        assert.deepStrictEqual(mockGetCanvas.getCall(0).args, [4, 5, 750])
        assert.deepStrictEqual(mockGetImageData.getCall(0).args, [2 * 10 * 20, 3 * 10 * 20, 4 * 10 * 20, 5 * 10 * 20])
        assert.deepStrictEqual(mockBlur.getCall(0).args, [mockData, 0, 0, 100, 100, 40])
        assert.deepStrictEqual(mockPutImageData.getCall(0).args, [mockData, 0, 0])

        RewireAPI.__ResetDependency__('createCanvas')
        RewireAPI.__ResetDependency__('imageDataRGBA')
    })

    afterEach(() => {
        sinon.restore()
    })
})

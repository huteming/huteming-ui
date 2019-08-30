import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('是一个构造函数', () => {
        const canvas = new CanvasDraw()
        assert.ok(canvas instanceof CanvasDraw)
    })

    describe('callback', () => {
        it('自定义异常处理', () => {
            const mockLog = sinon.fake()
            const mockHandler = sinon.fake()
            const mockError = new Error('非期望异常')
            sinon.replace(console, 'error', mockLog)
            const canvas = new CanvasDraw()
            canvas.add(() => {
                throw mockError
            })
            canvas.onerror(mockHandler)
            canvas.done()

            assert.strictEqual(mockLog.callCount, 0)
            assert.ok(mockHandler.calledWithExactly(mockError))
        })

        it('默认的异常处理', () => {
            const mockLog = sinon.fake()
            const mockFn = sinon.fake()
            const mockError = new Error('非期望异常')
            sinon.replace(console, 'error', mockLog)
            sinon.replace(console, 'log', mockFn)
            const canvas = new CanvasDraw()
            canvas.add(() => {
                throw mockError
            })
            canvas.add(mockFn)
            canvas.done()

            assert.ok(mockLog.calledWithExactly(mockError))
            assert.strictEqual(mockFn.callCount, 1)
        })

        it('callback在done中执行', () => {
            const mockCallback = sinon.fake()
            const canvas = new CanvasDraw()
            canvas.add(mockCallback)

            assert.strictEqual(mockCallback.callCount, 0)
        })

        it('第一个参数对象', () => {
            const mockCallback = sinon.fake()
            const canvas = new CanvasDraw()
            const self = {
                context: canvas.context,
                ratio: canvas.ratio,
                canvas: canvas.canvas,
                canvasWidth: canvas.canvasWidth,
                canvasHeight: canvas.canvasHeight,
                scale: canvas.scale,
                scaleBySystem: canvas.scaleBySystem,
            }

            canvas.add(mockCallback)
            canvas.done()

            assert.deepStrictEqual(mockCallback.getCall(0).args, [self])
        })

        it('callback执行save、restore', () => {
            const canvas = new CanvasDraw()
            const mockSave = sinon.fake()
            const mockRestore = sinon.fake()
            const mockCallback = sinon.fake()
            sinon.replace(canvas.context, 'save', mockSave)
            sinon.replace(canvas.context, 'restore', mockRestore)

            canvas.add(mockCallback)
            canvas.done()

            assert.ok(mockSave.calledBefore(mockCallback))
            assert.ok(mockRestore.calledAfter(mockCallback))
        })

        it('每次callback都会执行save、restore', () => {
            const canvas = new CanvasDraw()
            const mockSave = sinon.fake()
            const mockRestore = sinon.fake()
            const mockCallback = sinon.fake()
            sinon.replace(canvas.context, 'save', mockSave)
            sinon.replace(canvas.context, 'restore', mockRestore)

            canvas.add(mockCallback)
            canvas.add(mockCallback)
            canvas.done()

            assert.strictEqual(mockSave.callCount, 2)
            assert.strictEqual(mockCallback.callCount, 2)
            assert.strictEqual(mockRestore.callCount, 2)
        })
    })

    describe('done', () => {
        it('第一个参数为图片类型', () => {
            const canvas = new CanvasDraw()
            const toDataURL = sinon.fake()
            const imgType = 'imgType'
            sinon.replace(canvas.canvas, 'toDataURL', toDataURL)
            canvas.done(imgType)
            const [type, ratio] = toDataURL.getCall(0).args
            assert.strictEqual(type, `image/${imgType}`)
            assert.strictEqual(ratio, 1.0)
        })

        it('png为默认图片类型', () => {
            const canvas = new CanvasDraw()
            const toDataURL = sinon.fake()
            sinon.replace(canvas.canvas, 'toDataURL', toDataURL)
            canvas.done()
            const [type] = toDataURL.getCall(0).args
            assert.strictEqual(type, `image/png`)
        })
    })
})

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
        it('自定义this', () => {
            const canvas = new CanvasDraw()
            const self = {
                context: canvas.context,
                ratio: canvas.ratio,
                canvas: canvas.canvas,
                width: canvas.canvasWidth,
                height: canvas.canvasHeight
            }
            function callback () {
                assert.deepStrictEqual(this, self)
            }
            canvas.add(callback)
        })

        it('第一个参数 === this', () => {
            const canvas = new CanvasDraw()
            function callback (arg) {
                assert.strictEqual(arg, this)
            }
            canvas.add(callback)
        })

        it('callback之前执行save', () => {
            const canvas = new CanvasDraw()
            const save = sinon.fake()
            sinon.replace(canvas.context, 'save', save)

            function callback () {
                assert.strictEqual(save.callCount, 1)
            }
            canvas.add(callback)
        })

        it('callback之后执行restore', () => {
            const canvas = new CanvasDraw()
            const restore = sinon.fake()
            sinon.replace(canvas.context, 'restore', restore)
            function callback () {
                assert.strictEqual(restore.callCount, 0)
            }
            canvas.add(callback)
            assert.strictEqual(restore.callCount, 1)
        })
    })

    describe('done',  () => {
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

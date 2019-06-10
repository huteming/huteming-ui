import assert from 'assert'
import sinon from 'sinon'
import { getCanvasObject } from 'web-util/canvas-draw/src/main'

describe('canvas', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('getCanvasObject', () => {
        it('返回对象属性', () => {
            const obj = getCanvasObject(10, 10, 10)
            const keys = Object.keys(obj)
            assert.deepStrictEqual(keys, ['context', 'canvas', 'canvasWidth', 'canvasHeight', 'ratio'])
        })

        it('自适应屏幕大小', () => {
            const sandbox = sinon.createSandbox()
            sandbox.replaceGetter(document.documentElement, 'clientWidth', function () {
                return 100
            })

            const { canvasWidth, canvasHeight, ratio } = getCanvasObject(20, 20, 40)
            assert.strictEqual(canvasWidth, 20 * (100 / 40))
            assert.strictEqual(canvasHeight, 20 * (100 / 40))
            assert.strictEqual(ratio, 100 / 40)
        })

        it('设置canvas宽高', () => {
            const _origin = document.createElement
            const originRatio = window.devicePixelRatio
            const sandbox = sinon.createSandbox()
            sandbox.replaceGetter(document.documentElement, 'clientWidth', function () {
                return 100
            })
            window.devicePixelRatio = 0.6

            const res = {
                width: 0,
                height: 0,
                getContext () {
                    return {
                        webkitBackingStorePixelRatio: 1,
                        scale: sinon.fake(),
                    }
                },
            }
            document.createElement = function () {
                return res
            }

            getCanvasObject(30, 31, 30)
            assert.strictEqual(res.width, 30 * (100 / 30) * (0.6 / 1))
            assert.strictEqual(res.height, 31 * (100 / 30) * (0.6 / 1))

            document.createElement = _origin
            window.devicePixelRatio = originRatio
        })

        it('缩放context', () => {
            const _origin = document.createElement
            const originRatio = window.devicePixelRatio
            window.devicePixelRatio = 0.6
            const scale = sinon.fake()

            const res = {
                width: 0,
                height: 0,
                getContext () {
                    return {
                        webkitBackingStorePixelRatio: 2,
                        scale,
                    }
                },
            }
            document.createElement = function () {
                return res
            }

            getCanvasObject(30, 31, 30)
            const [x, y] = scale.getCall(0).args
            assert.strictEqual(x, 0.6 / 2)
            assert.strictEqual(y, 0.6 / 2)

            document.createElement = _origin
            window.devicePixelRatio = originRatio
        })

        it('window.devicePixelRatio默认设为1', () => {
            const _origin = document.createElement
            const originRatio = window.devicePixelRatio
            window.devicePixelRatio = null
            const scale = sinon.fake()

            const res = {
                width: 0,
                height: 0,
                getContext () {
                    return {
                        webkitBackingStorePixelRatio: 2,
                        scale,
                    }
                },
            }
            document.createElement = function () {
                return res
            }

            getCanvasObject(30, 31, 30)
            const [x, y] = scale.getCall(0).args
            assert.strictEqual(x, 1 / 2)
            assert.strictEqual(y, 1 / 2)

            document.createElement = _origin
            window.devicePixelRatio = originRatio
        })
    })
})

import assert from 'assert'
import sinon from 'sinon'
import { loadImages, __RewireAPI__ as Rewire } from 'web-util/tool/src/main'
import { imgURI, IMG_FAILURE_SRC, IMG_SUCCESS_SRC } from '../constant'
import { mockImage } from '../helper'
const IMG_SUFFIX = 'tommy'

describe('tool > loadImages', () => {
    mockImage()

    it('base64位字符串', async () => {
        const img = await loadImages(imgURI)
        const src = img.getAttribute('src')

        assert.strictEqual(src, imgURI)
    })

    it('设置跨域属性', async () => {
        const img = await loadImages(IMG_SUCCESS_SRC)
        assert.strictEqual(img.getAttribute('crossOrigin'), 'anonymous')
    })

    it('添加时间戳查询参数', async () => {
        const img = await loadImages(IMG_SUCCESS_SRC)
        const src = img.getAttribute('src')
        assert.strictEqual(src, `${IMG_SUCCESS_SRC}?timestamp=${IMG_SUFFIX}`)
    })

    it('默认使用缓存', async () => {
        const img1 = await loadImages(IMG_SUCCESS_SRC)
        const src1 = img1.getAttribute('src')

        const img2 = await loadImages(IMG_SUCCESS_SRC)
        const src2 = img2.getAttribute('src')

        assert.strictEqual(src1, src2)
    })

    it('使用缓存', async () => {
        const img1 = await loadImages(IMG_SUCCESS_SRC, true)
        const src1 = img1.getAttribute('src')

        const img2 = await loadImages(IMG_SUCCESS_SRC, true)
        const src2 = img2.getAttribute('src')

        assert.strictEqual(src1, src2)
    })

    it('禁止缓存', async () => {
        const img1 = await loadImages(IMG_SUCCESS_SRC, false)
        const src1 = img1.getAttribute('src')

        const img2 = await loadImages(IMG_SUCCESS_SRC, false)
        const src2 = img2.getAttribute('src')

        assert.ok(src1 !== src2)
    })

    it('查询参数分隔符', async () => {
        const img = await loadImages(IMG_SUCCESS_SRC + '?hello=hello', false)
        const src = img.getAttribute('src')
        assert.ok(src.startsWith(`${IMG_SUCCESS_SRC}?hello=hello&timestamp=`))
    })

    it('加载一张图片', async () => {
        const img = await loadImages(IMG_SUCCESS_SRC)
        assert.ok(img instanceof HTMLImageElement)
    })

    it('加载多张图片', async () => {
        const [img1, img2] = await loadImages([IMG_SUCCESS_SRC, IMG_SUCCESS_SRC])
        assert.ok(img1 instanceof HTMLImageElement)
        assert.ok(img2 instanceof HTMLImageElement)
    })

    it('异常处理', done => {
        const mockSleep = sinon.fake.resolves()
        Rewire.__Rewire__('sleep', mockSleep)
        loadImages(IMG_FAILURE_SRC)
            .then(() => {
                done(new Error('非期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, `图片加载失败: ${IMG_FAILURE_SRC}?timestamp=${IMG_SUFFIX}`)
                // 延迟重发
                assert.strictEqual(mockSleep.callCount, 1)
                assert.deepStrictEqual(mockSleep.getCall(0).args, [1000])
                done()
            })
            .finally(() => {
                Rewire.__ResetDependency__('sleep')
            })
    })

    it('重发请求成功', done => {
        const mockDom = 'dom'
        const mockSleep = sinon.fake.resolves()
        Rewire.__Rewire__('sleep', mockSleep)
        loadImages(IMG_FAILURE_SRC)
            .then(res => {
                assert.strictEqual(res, mockDom)
                done()
            })
            .catch(done)
            .finally(() => {
                Rewire.__ResetDependency__('sleep')
                Rewire.__ResetDependency__('loadImageSingle')
            })

        // 模拟第二次请求成功
        Rewire.__Rewire__('loadImageSingle', sinon.fake.resolves(mockDom))
    })

    afterEach(() => {
        sinon.restore()
    })
})

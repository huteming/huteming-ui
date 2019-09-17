import assert from 'assert'
import sinon from 'sinon'
import * as tool from 'web-util/tool/src/main'
import { imgURI } from '../constant'
const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'
const IMG_SUFFIX = 'tommy'

describe('tool', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('isAndroid', () => {
        it('移动端', () => {
            sinon.replaceGetter(window.navigator, 'userAgent', () => {
                return 'Mozilla/5.0 (Linux; Android 6.0.1; vivo Y55 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126'
            })
            assert.strictEqual(tool.isAndroid(), true)
        })

        it('终端', () => {
            sinon.replaceGetter(window.navigator, 'userAgent', () => {
                return 'Mozilla/5.0 (Linux; Adr 6.0.1; vivo Y55 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126'
            })
            assert.strictEqual(tool.isAndroid(), true)
        })
    })

    it('isWeixinBrowser', () => {
        sinon.replaceGetter(window.navigator, 'userAgent', () => {
            return 'AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 MicroMessenger/7.0.4.1420(0x2700043B)'
        })
        assert.strictEqual(tool.isWeixinBrowser(), true)
    })

    describe('tofilled', () => {
        it('null to ""', () => {
            assert.strictEqual(tool.tofilled(null, 3), '')
        })

        it('undefined to ""', () => {
            assert.strictEqual(tool.tofilled(undefined, 3), '')
        })

        it('boolean to ""', () => {
            assert.strictEqual(tool.tofilled(false, 3), '')
        })

        it('number to success', () => {
            assert.strictEqual(tool.tofilled(0, 4), '0000')
            assert.strictEqual(tool.tofilled(1, 4), '0001')
            assert.strictEqual(tool.tofilled(1.11, 3), '001.11')
            assert.strictEqual(tool.tofilled(111.11, 2), '111.11')
        })

        it('number string to success', () => {
            assert.strictEqual(tool.tofilled('0', 4), '0000')
            assert.strictEqual(tool.tofilled('1', 4), '0001')
            assert.strictEqual(tool.tofilled('1.11', 3), '001.11')
            assert.strictEqual(tool.tofilled('111.11', 2), '111.11')
        })

        it('not number string to ""', () => {
            assert.strictEqual(tool.tofilled('', 3), '')
            assert.strictEqual(tool.tofilled('aa', 4), '')
        })

        it('"" to ""', () => {
            assert.strictEqual(tool.tofilled('', 3), '')
            assert.strictEqual(tool.tofilled('aa', 4), '')
        })

        it('object to ""', () => {
            assert.strictEqual(tool.tofilled({}, 3), '')
        })

        it('array to ""', () => {
            assert.strictEqual(tool.tofilled([], 3), '')
        })

        it('默认不填充位数', () => {
            assert.strictEqual(tool.tofilled(1), '1')
        })

        it('保留小数点后位数', () => {
            assert.strictEqual(tool.tofilled('1.00', 2), '01.00')
        })

        it('返回字符串类型', () => {
            const res = tool.tofilled(111)
            assert.strictEqual(typeof res, 'string')
        })
    })

    describe('tofixed', () => {
        it('null to ""', () => {
            assert.strictEqual(tool.tofixed(null, 3), '')
        })

        it('undefined to ""', () => {
            assert.strictEqual(tool.tofixed(undefined, 3), '')
        })

        it('boolean to ""', () => {
            assert.strictEqual(tool.tofixed(false, 3), '')
        })

        it('number to success', () => {
            assert.strictEqual(tool.tofixed(0, 4), '0.0000')
            assert.strictEqual(tool.tofixed(1, 4), '1.0000')
            assert.strictEqual(tool.tofixed(1.11, 3), '1.110')
            assert.strictEqual(tool.tofixed(1.126, 2), '1.13')
        })

        it('number string to success', () => {
            assert.strictEqual(tool.tofixed('0', 4), '0.0000')
            assert.strictEqual(tool.tofixed('1', 4), '1.0000')
            assert.strictEqual(tool.tofixed('1.11', 3), '1.110')
            assert.strictEqual(tool.tofixed('1.126', 2), '1.13')
        })

        it('not number string to ""', () => {
            assert.strictEqual(tool.tofixed('', 3), '')
            assert.strictEqual(tool.tofixed('aa', 4), '')
        })

        it('"" to ""', () => {
            assert.strictEqual(tool.tofixed('', 3), '')
            assert.strictEqual(tool.tofixed('aa', 4), '')
        })

        it('object to ""', () => {
            assert.strictEqual(tool.tofixed({}, 3), '')
        })

        it('array to ""', () => {
            assert.strictEqual(tool.tofixed([], 3), '')
        })

        it('默认保留2位', () => {
            assert.strictEqual(tool.tofixed(1), '1.00')
        })

        it('保留小数点前位数', () => {
            assert.strictEqual(tool.tofixed('01', 2), '01.00')
        })

        it('返回字符串类型', () => {
            const res = tool.tofixed(111)
            assert.strictEqual(typeof res, 'string')
        })

        it('返回数字类型', () => {
            const res = tool.tofixed(111, '2', true)
            assert.strictEqual(typeof res, 'number')
        })
    })

    describe('loadImages', () => {
        beforeAll(() => {
            Object.defineProperty(global.Image.prototype, 'src', {
                set (src) {
                    if (src.indexOf(LOAD_FAILURE_SRC) > -1) {
                        setTimeout(() => this.onerror(new Error('mocked error')))
                    } else if (src.indexOf(LOAD_SUCCESS_SRC) > -1 || src === imgURI) {
                        setTimeout(() => this.onload())
                    }
                    this.setAttribute('src', src)
                },
                get () {
                    return this.getAttribute('src')
                },
            })
        })

        it('base64位字符串', async () => {
            const img = await tool.loadImages(imgURI)
            const src = img.getAttribute('src')

            assert.strictEqual(src, imgURI)
        })

        it('设置跨域属性', async () => {
            const img = await tool.loadImages(LOAD_SUCCESS_SRC)
            assert.strictEqual(img.getAttribute('crossOrigin'), 'anonymous')
        })

        it('添加时间戳查询参数', async () => {
            const img = await tool.loadImages(LOAD_SUCCESS_SRC)
            const src = img.getAttribute('src')
            assert.strictEqual(src, `${LOAD_SUCCESS_SRC}?timestamp=${IMG_SUFFIX}`)
        })

        it('默认使用缓存', async () => {
            const img1 = await tool.loadImages(LOAD_SUCCESS_SRC)
            const src1 = img1.getAttribute('src')

            const img2 = await tool.loadImages(LOAD_SUCCESS_SRC)
            const src2 = img2.getAttribute('src')

            assert.strictEqual(src1, src2)
        })

        it('使用缓存', async () => {
            const img1 = await tool.loadImages(LOAD_SUCCESS_SRC, true)
            const src1 = img1.getAttribute('src')

            const img2 = await tool.loadImages(LOAD_SUCCESS_SRC, true)
            const src2 = img2.getAttribute('src')

            assert.strictEqual(src1, src2)
        })

        it('禁止缓存', async () => {
            const img1 = await tool.loadImages(LOAD_SUCCESS_SRC, false)
            const src1 = img1.getAttribute('src')

            const img2 = await tool.loadImages(LOAD_SUCCESS_SRC, false)
            const src2 = img2.getAttribute('src')

            assert.ok(src1 !== src2)
        })

        it('查询参数分隔符', async () => {
            const img = await tool.loadImages(LOAD_SUCCESS_SRC + '?hello=hello', false)
            const src = img.getAttribute('src')
            assert.ok(src.startsWith(`${LOAD_SUCCESS_SRC}?hello=hello&timestamp=`))
        })

        it('加载一张图片', async () => {
            const img = await tool.loadImages(LOAD_SUCCESS_SRC)
            assert.ok(img instanceof HTMLImageElement)
        })

        it('加载多张图片', async () => {
            const [img1, img2] = await tool.loadImages([LOAD_SUCCESS_SRC, LOAD_SUCCESS_SRC])
            assert.ok(img1 instanceof HTMLImageElement)
            assert.ok(img2 instanceof HTMLImageElement)
        })

        it('异常处理', done => {
            tool.loadImages(LOAD_FAILURE_SRC)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, `渲染地址错误;实际:${LOAD_FAILURE_SRC}?timestamp=${IMG_SUFFIX}`)
                    done()
                })
        })
    })

    describe('jsonToForm', () => {
        it('返回FormData', () => {
            const before = {
                hello: 'hello',
            }
            const after = tool.jsonToForm(before)
            assert.ok(after instanceof FormData)
            assert.strictEqual(after.get('hello'), 'hello')
        })
    })

    describe('parseQuery', () => {
        it('解析hash路由', () => {
            const _value = tool.parseQuery('key')
            assert.strictEqual(_value, 'value')
        })

        it('默认返回""', () => {
            const _value = tool.parseQuery('unvalid')
            assert.strictEqual(_value, '')
        })

        it('返回字符串', () => {
            const _value = tool.parseQuery('num')
            assert.strictEqual(_value, '1')
        })
    })
})

import assert from 'assert'
import sinon from 'sinon'
import * as tool from '../src/main'
import CompBasic from 'tests/components/basic.vue'
import Vue from 'vue'

describe('tool', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('isVNode', () => {
        const ins = new Vue()
        const h = ins.$createElement
        const vnode = h(CompBasic)
        assert.ok(tool.isVNode(vnode))
    })

    it('isComponent', () => {
        assert.ok(tool.isComponent(CompBasic))
    })

    it('firstToUppercase', () => {
        assert.strictEqual(tool.firstToUppercase('hello'), 'Hello')
    })

    it('isWKWebview', () => {
        const mockValue = 'hhh'
        window.__wxjs_is_wkwebview = mockValue
        assert.strictEqual(tool.isWKWebview(), !!mockValue)
    })

    it('sleep', async () => {
        const spy = sinon.spy(global, 'setTimeout')
        tool.sleep(10)
        assert.strictEqual(spy.getCall(0).args[1], 10)
    })

    it('isIOS', () => {
        sinon.replaceGetter(window.navigator, 'userAgent', () => {
            return 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/6.7.4(0x1607042c) NetType/4G Language/zh_CN'
        })
        assert.strictEqual(tool.isIOS(), true)
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

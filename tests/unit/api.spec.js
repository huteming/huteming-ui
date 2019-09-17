import sinon from 'sinon'
import assert from 'assert'
import * as api from 'web-util/api/src/main'

const originHref = window.location.href
const host = '192.168.0.220'
const origin = `http://${host}`
const link = '/#/docs/flex?hello=lll'
const href = `${origin}${link}`
const title = 'title'
let post
let jsonp
let find

describe('api', () => {
    let originWindow
    let originDocument

    beforeEach(() => {
        originWindow = global.window
        originDocument = global.document

        global.window = {
            location: {
                host,
                href,
                origin,
            },
        }
        global.document = {
            title,
        }

        post = sinon.fake()
        find = sinon.fake()
        jsonp = sinon.fake.resolves({ result: 'success' })

        sinon.replace(
            api.request,
            'jsonp',
            jsonp
        )
        sinon.replace(
            api.request,
            'post',
            post
        )
        sinon.replace(
            api.request,
            'find',
            find
        )
    })

    afterEach(() => {
        sinon.restore()
        global.window = originWindow
        global.document = originDocument
    })

    describe('sign', () => {
        it('请求地址', () => {
            api.sign()

            const spyCall = post.getCall(0)
            assert.strictEqual(spyCall.args[0], '/api/system/pageStat')
        })

        it('默认参数', () => {
            const originTitle = document.title
            const title = 'sdkjslf'
            document.title = title
            api.sign()

            const spyCall = post.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], {
                itemSign: window.location.href.replace(window.location.origin, ''),
                itemRemark: title,
            })
            document.title = originTitle
        })

        it('自定义参数', async () => {
            const itemSign = 'hello'
            const itemRemark = 'world'
            api.sign(itemSign, itemRemark)

            const spyCall = post.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], {
                itemSign,
                itemRemark,
            })
        })

        it('点击事件', () => {
            const itemSign = 'hello'
            const itemRemark = 'world'
            api.sign(itemSign, itemRemark, { type: 'click' })

            const spyCall = post.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], {
                itemSign: `CLICK#${itemSign}`,
                itemRemark,
            })
        })

        it('分享事件', () => {
            const itemSign = 'hello'
            const itemRemark = 'world'
            api.sign(itemSign, itemRemark, { type: 'share' })

            const spyCall = post.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], {
                itemSign: `SHARE#${itemSign}`,
                itemRemark,
            })
        })
    })

    describe('getPayConfig', () => {
        it('请求地址', async () => {
            api.getPayConfig('bbb')

            const spyCall = post.getCall(0)

            assert.strictEqual(spyCall.args[0], '/api/weixin/getPayParameters')
        })

        it('自定义参数', async () => {
            const data = {
                a: 'a',
                b: 'c',
            }
            api.getPayConfig(data)

            const spyCall = post.getCall(0)

            assert.strictEqual(spyCall.args[1], data)
        })
    })

    describe('getWxConfig', () => {
        it('请求地址', async () => {
            api.getWxConfig({
                flag: 'flag',
                url: 'url'
            })

            const spyCall = find.getCall(0)

            assert.strictEqual(spyCall.args[0], '/api/user/shareParam')
        })

        it('自定义参数', async () => {
            const params = {
                flag: 'flag',
                url: 'url',
            }
            api.getWxConfig(params)

            const spyCall = find.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], params)
        })

        it('默认参数', async () => {
            api.getWxConfig()

            const spyCall = find.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], {
                flag: 'test_tommy',
                url: originHref.split('#')[0],
            })
        })
    })

    describe('parseGeocoder', () => {
        it('请求地址', async () => {
            const lng = 'lng'
            const lat = 'lat'
            const type = 'type'
            const options = { lng, lat, type }
            api.parseGeocoder(options)

            const spyCall = jsonp.getCall(0)

            assert.strictEqual(spyCall.args[0], 'https://api.map.baidu.com/geocoder/v2/')
        })

        it('自定义参数', () => {
            const lng = 'lng'
            const lat = 'lat'
            const type = 'type'
            const options = { lng, lat, type }

            api.parseGeocoder(options)

            const spyCall = jsonp.getCall(0)

            assert.deepStrictEqual(spyCall.args[1], {
                location: `${lat},${lng}`,
                coordtype: type,
                output: 'json',
                pois: '1',
                ak: 'xoXvW1BdjKimErNQYg7IXseGd36gzplp',
            })
        })

        it('经度参数缺失异常', async () => {
            const lng = ''
            const lat = 'lat'
            const type = 'type'
            const options = { lng, lat, type }
            const errMessage = '非期望异常'

            try {
                await api.parseGeocoder(options)
                throw new Error(errMessage)
            } catch (err) {
                assert.strictEqual(err.message, '经度参数缺失[lng]')
            }
        })

        it('纬度参数缺失异常', async () => {
            const lng = 'lng'
            const lat = ''
            const type = 'type'
            const options = { lng, lat, type }
            const errMessage = '非期望异常'

            try {
                await api.parseGeocoder(options)
                throw new Error(errMessage)
            } catch (err) {
                assert.strictEqual(err.message, '纬度参数缺失[lat]')
            }
        })

        it('坐标参数缺失异常', async () => {
            const lng = 'lng'
            const lat = 'lat'
            const type = ''
            const options = { lng, lat, type }
            const errMessage = '非期望异常'

            try {
                await api.parseGeocoder(options)
                throw new Error(errMessage)
            } catch (err) {
                assert.strictEqual(err.message, '坐标类型参数缺失[type]')
            }
        })
    })
})

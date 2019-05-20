import sinon from 'sinon'
import assert from 'assert'

const href = 'http://127.0.0.1/#/docs/flex?hello=lll'
const origin = 'http://127.0.0.1'
let api = null

describe('api', () => {
    before(() => {
        // eslint-disable-next-line
        global.window = {
            location: {
                href,
                origin,
            },
        }

        api = require('web-util/api/index').default

        sinon.replace(
            api.request,
            'jsonp',
            sinon.fake.returns(new Promise(resolve => resolve({ result: 'result' })))
        )
        sinon.replace(
            api.request,
            'post',
            sinon.fake.returns(new Promise(resolve => resolve({ result: 'result' })))
        )
    })

    after(function () {
        sinon.restore()
    })

    describe('sign', () => {
        before(() => {
            global.location = {
                pathname: 'pathname',
                search: 'search',
            }

            global.document = {
                title: 'title',
            }
        })

        it('default', async () => {
            await api.sign()

            const data = {
                itemSign: href.replace(origin, ''),
                itemRemark: document.title
            }

            assert(api.request.post.calledWithMatch('api/system/pageStat', data))
        })

        it('normal', async () => {
            const itemSign = 'hello'
            const itemRemark = 'world'
            await api.sign(itemSign, itemRemark, { type: 'share' })

            const data = {
                itemSign: `SHARE#${itemSign}`,
                itemRemark,
            }

            assert(api.request.post.calledWithMatch('api/system/pageStat', data))
        })
    })

    describe('getPayConfig', () => {
        it('normal', async () => {
            const params = 'this is random string'
            await api.getPayConfig(params)

            assert(api.request.post.calledWithMatch('/api/weixin/getPayParameters', params))
        })
    })

    describe('getWxConfig', () => {
        it('normal', async () => {
            const params = {
                flag: 'flag',
                url: 'url',
            }
            await api.getWxConfig(params)

            assert(api.request.post.calledWithMatch('/api/user/shareParam', params))
        })

        it('必填参数 flag', async () => {
            try {
                await api.getWxConfig()
                throw new Error('expect error but got success')
            } catch (err) {
                assert.strictEqual(err.message, '参数缺失[flag]', 'flag缺失文案错误')
            }
        })

        it('必填参数 url', async () => {
            try {
                await api.getWxConfig({ flag: 'flag' })
                throw new Error('expect error but got success')
            } catch (err) {
                assert.strictEqual(err.message, '参数缺失[url]', 'url缺失文案错误')
            }
        })
    })

    describe('parseGeocoder', () => {
        it('normal', async () => {
            const lng = 'lng'
            const lat = 'lat'
            const type = 'type'
            const options = { lng, lat, type }

            const res = await api.parseGeocoder(options)

            assert(api.request.jsonp.calledWithMatch('https://api.map.baidu.com/geocoder/v2/', {
                location: `${lat},${lng}`,
                coordtype: type,
                output: 'json',
                pois: '1',
                ak: 'xoXvW1BdjKimErNQYg7IXseGd36gzplp',
            }))

            assert(res === 'result')
        })
    })
})

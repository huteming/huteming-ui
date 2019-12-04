import wxSave from '../src/wxSave'
import assert from 'assert'

describe('wxsdk > wxSave', () => {
    it('安卓 + url = href', () => {
        window.__wxjs_is_wkwebview = false
        wxSave('http://localhost/hello')

        const url = wxSave()
        assert.strictEqual(url, window.location.href.split('#')[0])

        window.__wxjs_is_wkwebview = undefined
    })

    it('ios + (empty url) = href', () => {
        global.window.__wxjs_is_wkwebview = true
        wxSave('')

        const url = wxSave()
        assert.strictEqual(url, global.window.location.href.split('#')[0])

        global.window.__wxjs_is_wkwebview = undefined
    })

    it('ios + (unEmpty url) = href', () => {
        global.window.__wxjs_is_wkwebview = true
        const _url = 'http://localhost/hello'
        wxSave(_url)

        const url = wxSave()
        assert.strictEqual(url, _url)

        global.window.__wxjs_is_wkwebview = undefined
    })
})

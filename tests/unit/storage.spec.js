import Storage from 'web-util/storage/src/main'
import sinon from 'sinon'
import assert from 'assert'
import { mockWindowProperty } from '../helper'

const prefix = 'prefix'
const key = 'key'
const value = { hello: 'world' }

describe('storage', () => {
    let originLocalStorage
    let originSessionStorage
    let instance
    let setItem
    let getItem
    let removeItem
    let clear

    beforeEach(() => {
        instance = new Storage(prefix)
        setItem = sinon.fake()
        getItem = sinon.fake.returns(JSON.stringify(value))
        removeItem = sinon.fake()
        clear = sinon.fake()

        originLocalStorage = window.localStorage
        originSessionStorage = window.sessionStorage

        // window.localStorage = {
        //     setItem,
        //     getItem,
        //     removeItem,
        //     clear,
        // }
        // window.sessionStorage = {
        //     setItem,
        //     getItem,
        //     removeItem,
        // }
    })

    afterEach(() => {
        window.localStorage = originLocalStorage
        window.sessionStorage = originSessionStorage
    })

    describe('构造函数默认参数', () => {
        it('prefix = ""', () => {
            const ins = new Storage()
            const namespace = ins._getKey(key)

            assert.strictEqual(namespace, `_${key}`)
        })
    })

    describe('getLocal', () => {
        mockWindowProperty('localStorage', {
            getItem: sinon.fake.returns(JSON.stringify(value)),
        })

        it('instance', () => {
            const res = instance.getLocal(key)

            assert(window.localStorage.getItem.calledWithExactly(`${prefix}_${key}`))
            assert.deepStrictEqual(res, value)
        })

        it('static', () => {
            const res = Storage.getLocal(key)

            assert(window.localStorage.getItem.calledWithExactly(key))
            assert.deepStrictEqual(res, value)
        })
    })

    describe('setLocal', () => {
        mockWindowProperty('localStorage', {
            setItem: sinon.fake(),
        })

        it('instance', () => {
            instance.setLocal(key, value)

            assert(window.localStorage.setItem.calledWithExactly(`${prefix}_${key}`, JSON.stringify(value)))
        })

        it('static', () => {
            Storage.setLocal(key, value)

            assert(window.localStorage.setItem.calledWithExactly(key, JSON.stringify(value)))
        })

        it('value不是对象', () => {
            const str = 'value'
            Storage.setLocal(key, str)
            const [_key, _value] = window.localStorage.setItem.getCall(2).args

            assert.strictEqual(_key, key)
            assert.strictEqual(_value, str)
        })
    })

    describe('removeLocal', () => {
        mockWindowProperty('localStorage', {
            removeItem: sinon.fake(),
        })

        it('instance', () => {
            instance.removeLocal(key)

            assert(window.localStorage.removeItem.calledWithExactly(`${prefix}_${key}`))
        })

        it('static', () => {
            Storage.removeLocal(key)

            assert(window.localStorage.removeItem.calledWithExactly(key))
        })
    })

    describe('clearLocal', () => {
        mockWindowProperty('localStorage', {
            clear: sinon.fake(),
        })

        it('instance', () => {
            instance.clearLocal()

            assert.strictEqual(window.localStorage.clear.callCount, 1)
        })

        it('static', () => {
            Storage.clearLocal()

            assert.strictEqual(window.localStorage.clear.callCount, 2)
        })
    })

    describe('getSession', () => {
        mockWindowProperty('sessionStorage', {
            getItem: sinon.fake.returns(JSON.stringify(value)),
        })

        it('instance', () => {
            const res = instance.getSession(key)

            assert(window.sessionStorage.getItem.calledWithExactly(`${prefix}_${key}`))
            assert.deepStrictEqual(res, value)
        })

        it('static', () => {
            const res = Storage.getSession(key)

            assert(window.sessionStorage.getItem.calledWithExactly(key))
            assert.deepStrictEqual(res, value)
        })
    })

    describe('setSession', () => {
        mockWindowProperty('sessionStorage', {
            setItem: sinon.fake(),
        })

        it('instance', () => {
            instance.setSession(key, value)

            assert(window.sessionStorage.setItem.calledWithExactly(`${prefix}_${key}`, JSON.stringify(value)))
        })

        it('static', () => {
            Storage.setSession(key, value)

            assert(window.sessionStorage.setItem.calledWithExactly(key, JSON.stringify(value)))
        })

        it('value不是对象', () => {
            const str = 'value'
            Storage.setSession(key, str)
            const [_key, _value] = window.sessionStorage.setItem.getCall(2).args

            assert.strictEqual(_key, key)
            assert.strictEqual(_value, str)
        })
    })

    describe('removeSession', () => {
        mockWindowProperty('sessionStorage', {
            removeItem: sinon.fake(),
        })

        it('instance', () => {
            instance.removeSession(key)

            assert(window.sessionStorage.removeItem.calledWithExactly(`${prefix}_${key}`))
        })

        it('static', () => {
            Storage.removeSession(key)

            assert(window.sessionStorage.removeItem.calledWithExactly(key))
        })
    })

    describe('clearSession', () => {
        mockWindowProperty('sessionStorage', {
            clear: sinon.fake(),
        })

        it('instance', () => {
            instance.clearSession()

            assert.strictEqual(window.sessionStorage.clear.callCount, 1)
        })

        it('static', () => {
            Storage.clearSession()

            assert.strictEqual(window.sessionStorage.clear.callCount, 2)
        })
    })
})

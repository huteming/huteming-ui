import Storage from '../src/main'
import sinon from 'sinon'
import assert from 'assert'
import { mockProperty } from 'tests/helper'

const prefix = 'prefix'
const key = 'key'
const value = { hello: 'world' }

describe('storage', () => {
    const instance = new Storage(prefix)

    describe('构造函数默认参数', () => {
        it('prefix = ""', () => {
            const ins = new Storage()
            const namespace = ins._getKey(key)

            assert.strictEqual(namespace, `_${key}`)
        })
    })

    describe('getLocal', () => {
        mockProperty(window, 'localStorage', {
            value: {
                getItem: sinon.fake.returns(JSON.stringify(value)),
            },
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
        mockProperty(window, 'localStorage', {
            value: {
                setItem: sinon.fake(),
            }
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
        mockProperty(window, 'localStorage', {
            value: {
                removeItem: sinon.fake(),
            }
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
        mockProperty(window, 'localStorage', {
            value: {
                clear: sinon.fake(),
            }
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
        mockProperty(window, 'sessionStorage', {
            value: {
                getItem: sinon.fake.returns(JSON.stringify(value)),
            }
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
        mockProperty(window, 'sessionStorage', {
            value: {
                setItem: sinon.fake(),
            }
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
        mockProperty(window, 'sessionStorage', {
            value: {
                removeItem: sinon.fake(),
            }
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
        mockProperty(window, 'sessionStorage', {
            value: {
                clear: sinon.fake(),
            }
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

import Storage from 'web-util/storage/index.js'
import sinon from 'sinon'
import assert from 'assert'

const prefix = 'prefix'
const key = 'key'
const value = { hello: 'world' }
let instance
let setItem
let getItem
let removeItem
let clear

describe('storage', () => {
    before(() => {
    })

    beforeEach(() => {
        instance = new Storage(prefix)
        setItem = sinon.fake()
        getItem = sinon.fake.returns(JSON.stringify(value))
        removeItem = sinon.fake()
        clear = sinon.fake()

        // eslint-disable-next-line
        global.window = {
            localStorage: {
                setItem,
                getItem,
                removeItem,
                clear,
            },
            sessionStorage: {
                setItem,
                getItem,
                removeItem,
                clear,
            },
        }
    })

    describe('构造函数默认参数', () => {
        it('prefix = ""', () => {
            const ins = new Storage()

            ins.getLocal(key)

            assert(getItem.calledWith(`_${key}`))
        })
    })

    describe('getLocal', () => {
        it('instance', () => {
            const res = instance.getLocal(key)

            assert(getItem.calledWith(`${prefix}_${key}`))
            assert.deepStrictEqual(res, value)
        })

        it('static', () => {
            const res = Storage.getLocal(key)

            assert(getItem.calledWith(key))
            assert.deepStrictEqual(res, value)
        })
    })

    describe('setLocal', () => {
        it('instance', () => {
            instance.setLocal(key, value)

            assert(setItem.calledWith(`${prefix}_${key}`, JSON.stringify(value)))
        })

        it('static', () => {
            Storage.setLocal(key, value)

            assert(setItem.calledWith(key, JSON.stringify(value)))
        })
    })

    describe('removeLocal', () => {
        it('instance', () => {
            instance.removeLocal(key)

            assert(removeItem.calledWith(`${prefix}_${key}`))
        })

        it('static', () => {
            Storage.removeLocal(key)

            assert(removeItem.calledWith(key))
        })
    })

    describe('clearLocal', () => {
        it('instance', () => {
            instance.clearLocal()

            assert(clear.calledWith())
        })

        it('static', () => {
            Storage.clearLocal()

            assert(clear.calledWith())
        })
    })

    describe('getSession', () => {
        it('instance', () => {
            const res = instance.getSession(key)

            assert(getItem.calledWith(`${prefix}_${key}`))
            assert.deepStrictEqual(res, value)
        })

        it('static', () => {
            const res = Storage.getSession(key)

            assert(getItem.calledWith(key))
            assert.deepStrictEqual(res, value)
        })
    })

    describe('setSession', () => {
        it('instance', () => {
            instance.setSession(key, value)

            assert(setItem.calledWith(`${prefix}_${key}`, JSON.stringify(value)))
        })

        it('static', () => {
            Storage.setSession(key, value)

            assert(setItem.calledWith(key, JSON.stringify(value)))
        })
    })

    describe('removeSession', () => {
        it('instance', () => {
            instance.removeSession(key)

            assert(removeItem.calledWith(`${prefix}_${key}`))
        })

        it('static', () => {
            Storage.removeSession(key)

            assert(removeItem.calledWith(key))
        })
    })

    describe('clearSession', () => {
        it('instance', () => {
            instance.clearSession()

            assert(clear.calledWith())
        })

        it('static', () => {
            Storage.clearSession()

            assert(clear.calledWith())
        })
    })
})

import Storage from 'web-util/storage/src/main'
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
    let originWindow
    beforeEach(() => {
        instance = new Storage(prefix)
        setItem = sinon.fake()
        getItem = sinon.fake.returns(JSON.stringify(value))
        removeItem = sinon.fake()
        clear = sinon.fake()

        originWindow = global.window
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

    afterEach(() => {
        global.window = originWindow
    })

    describe('构造函数默认参数', () => {
        it('prefix = ""', () => {
            const ins = new Storage()

            ins.getLocal(key)

            assert(getItem.calledWithExactly(`_${key}`))
        })
    })

    describe('getLocal', () => {
        it('instance', () => {
            const res = instance.getLocal(key)

            assert(getItem.calledWithExactly(`${prefix}_${key}`))
            assert.deepStrictEqual(res, value)
        })

        it('static', () => {
            const res = Storage.getLocal(key)

            assert(getItem.calledWithExactly(key))
            assert.deepStrictEqual(res, value)
        })
    })

    describe('setLocal', () => {
        it('instance', () => {
            instance.setLocal(key, value)

            assert(setItem.calledWithExactly(`${prefix}_${key}`, JSON.stringify(value)))
        })

        it('static', () => {
            Storage.setLocal(key, value)

            assert(setItem.calledWithExactly(key, JSON.stringify(value)))
        })
    })

    describe('removeLocal', () => {
        it('instance', () => {
            instance.removeLocal(key)

            assert(removeItem.calledWithExactly(`${prefix}_${key}`))
        })

        it('static', () => {
            Storage.removeLocal(key)

            assert(removeItem.calledWithExactly(key))
        })
    })

    describe('clearLocal', () => {
        it('instance', () => {
            instance.clearLocal()

            assert(clear.calledWithExactly())
        })

        it('static', () => {
            Storage.clearLocal()

            assert(clear.calledWithExactly())
        })
    })

    describe('getSession', () => {
        it('instance', () => {
            const res = instance.getSession(key)

            assert(getItem.calledWithExactly(`${prefix}_${key}`))
            assert.deepStrictEqual(res, value)
        })

        it('static', () => {
            const res = Storage.getSession(key)

            assert(getItem.calledWithExactly(key))
            assert.deepStrictEqual(res, value)
        })
    })

    describe('setSession', () => {
        it('instance', () => {
            instance.setSession(key, value)

            assert(setItem.calledWithExactly(`${prefix}_${key}`, JSON.stringify(value)))
        })

        it('static', () => {
            Storage.setSession(key, value)

            assert(setItem.calledWithExactly(key, JSON.stringify(value)))
        })
    })

    describe('removeSession', () => {
        it('instance', () => {
            instance.removeSession(key)

            assert(removeItem.calledWithExactly(`${prefix}_${key}`))
        })

        it('static', () => {
            Storage.removeSession(key)

            assert(removeItem.calledWithExactly(key))
        })
    })

    describe('clearSession', () => {
        it('instance', () => {
            instance.clearSession()

            assert(clear.calledWithExactly())
        })

        it('static', () => {
            Storage.clearSession()

            assert(clear.calledWithExactly())
        })
    })
})

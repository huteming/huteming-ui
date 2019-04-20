export default class Storage {
    constructor (namespace = '') {
        this._namespace = namespace

        this.getLocal = this._getHandler(getLocal)
        this.setLocal = this._getHandler(setLocal)
        this.removeLocal = this._getHandler(removeLocal)
        this.clearLocal = clearLocal

        this.getSession = this._getHandler(getSession)
        this.setSession = this._getHandler(setSession)
        this.removeSession = this._getHandler(removeSession)
        this.clearSession = clearSession
    }

    static getLocal = getLocal
    static setLocal = setLocal
    static removeLocal = removeLocal
    static clearLocal = clearLocal

    static getSession = getSession
    static setSession = setSession
    static removeSession = removeSession
    static clearSession = clearSession

    _getKey (key) {
        return `${this._namespace}_${key}`
    }

    _getHandler (fn) {
        return (...args) => {
            args[0] = this._getKey(args[0])
            return fn(...args)
        }
    }
}

// localStorage
function getLocal (key) {
    let value = window.localStorage.getItem(key)

    try {
        value = JSON.parse(value)
    } catch (err) {
        // console.log(err)
    }

    return value
}

function setLocal (key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }

    window.localStorage.setItem(key, value)
}

function removeLocal (key) {
    window.localStorage.removeItem(key)
}

function clearLocal () {
    window.localStorage.clear()
}

// sessionStorage
function getSession (key) {
    let value = window.sessionStorage.getItem(key)

    try {
        value = JSON.parse(value)
    } catch (err) {
        // console.log(err)
    }

    return value
}

function setSession (key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }

    window.sessionStorage.setItem(key, value)
}

function removeSession (key) {
    window.sessionStorage.removeItem(key)
}

function clearSession () {
    window.sessionStorage.clear()
}

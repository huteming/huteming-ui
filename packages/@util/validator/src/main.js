const mapHandler = {
    required (value) {
        if (value === undefined || value === null) {
            return false
        }
        if (Array.isArray(value) && !value.length) {
            return false
        }
        if (typeof value === 'string' && !value) {
            return false
        }
        return true
    },

    email (value) {
        return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
    },

    mobile (value) {
        return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)
    },

    number (value) {
        return typeof value === 'number'
    },

    equal (value, equalValue) {
        return value === equalValue
    },

    length (value, ...args) {
        const [min, max] = getRangeValue(...args)
        const length = (typeof value === 'number' || value) && value.toString().length

        if (typeof length !== 'number') {
            return false
        }

        return length >= min && length <= max
    },

    range (value, ...args) {
        const [min, max] = getRangeValue(...args)
        value = Number(value)

        if (isNaN(value)) {
            return false
        }

        return value >= min && value <= max
    },
}

export default class Validator {
    constructor () {
        this._validators = []

        this.add = this.add.bind(this)
        this.done = this.done.bind(this)
    }

    add (value, type, errorMessage, ...args) {
        const _handler = mapHandler[type]

        if (typeof _handler !== 'function') {
            throw new Error(`验证方法类型错误, 可选值为: ${Object.keys(mapHandler)}`)
        }

        this._validators.push(() => {
            const isValid = _handler(value, ...args)
            return !isValid ? errorMessage : ''
        })
    }

    done () {
        for (let i = 0; i < this._validators.length; i++) {
            const _handler = this._validators[i]
            const message = _handler()
            if (message) {
                return message
            }
        }

        return ''
    }
}

function getRangeValue (...args) {
    let [min, max] = args

    if (typeof min !== 'number') {
        min = -Infinity
    }

    if (typeof max !== 'number') {
        max = Infinity
    }

    return [min, max]
}

import * as mapHandler from './handlers'

export default class Validator {
    constructor () {
        this._validators = []

        this.add = this.add.bind(this)
        this.done = this.done.bind(this)
    }

    add (value, errorMessage, options = {}) {
        options.type = options.type || 'string'
        const _handler = mapHandler[options.type]

        if (typeof _handler !== 'function') {
            throw new Error(`type类型错误`)
        }

        this._validators.push(() => {
            // 不再type中定义规则的，需要单独写方法验证
            // required
            // 如果不存在，直接返回，不再进行其他判断
            const isExist = mapHandler.required(value, options)
            if (!isExist) {
                if (options.required) {
                    return errorMessage
                }
                return ''
            }

            // range
            const isRange = (() => {
                if (!options.min && !options.max) {
                    return true
                }
                return mapHandler.range(value, options)
            })()
            if (!isRange) {
                return errorMessage
            }

            // enum
            const isEnum = (() => {
                if (!options.enum) {
                    return true
                }
                return mapHandler.enumer(value, options)
            })()
            if (!isEnum) {
                return errorMessage
            }

            return _handler(value, options) ? '' : errorMessage
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

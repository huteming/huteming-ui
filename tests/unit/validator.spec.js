import Validator from 'web-util/validator/src/main'
import assert from 'assert'

describe('validator', () => {
    let v = null

    beforeEach(() => {
        v = new Validator()
    })

    describe('type', () => {
        it('type异常提示', done => {
            try {
                v.add('', 'hel', { type: 'hello' })
                done(new Error('非期望异常'))
            } catch (err) {
                assert.strictEqual(err.message, 'type类型错误')
                done()
            }
        })

        it('type默认为string', () => {
            v.add('', 'hel')
            v.add(1, '数字')
            const msg = v.done()
            assert.strictEqual(msg, '数字')
        })
    })

    describe('string', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'string', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非字符串', () => {
            v.add(123, 'hel', { type: 'string', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 字符串', () => {
            v.add('123', 'hel', { type: 'string', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'string', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非字符串', () => {
            v.add(123, 'hel', { type: 'string', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 字符串', () => {
            v.add('123', 'hel', { type: 'string', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('number', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'number', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非数字', () => {
            v.add('aaa', 'hel', { type: 'number', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 数字', () => {
            v.add(123, 'hel', { type: 'number', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 字符串数字', () => {
            v.add('123', 'hel', { type: 'number', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'number', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非数字', () => {
            v.add('aa', 'hel', { type: 'number', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 数字', () => {
            v.add(123, 'hel', { type: 'number', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && no-empty && 字符串数字', () => {
            v.add('123', 'hel', { type: 'number', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('boolean', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'boolean', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非布尔', () => {
            v.add('aaa', 'hel', { type: 'boolean', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 布尔', () => {
            v.add(false, 'hel', { type: 'boolean', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'boolean', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非布尔', () => {
            v.add('aa', 'hel', { type: 'boolean', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 布尔', () => {
            v.add(true, 'hel', { type: 'boolean', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('regexp', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'regexp', required: false, regexp: /.js/ })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 字符串', () => {
            v.add('aaa', 'hel', { type: 'regexp', required: false, regexp: 'aaa' })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 正则', () => {
            v.add('aaa', 'hel', { type: 'regexp', required: false, regexp: /.js/ })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'regexp', required: true, regexp: /.js/ })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 正则', () => {
            v.add('.js', 'hel', { type: 'regexp', required: true, regexp: /.js/ })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && no-empty && 字符串', () => {
            v.add('.js', 'hel', { type: 'regexp', required: true, regexp: '.js' })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('array', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'array', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非数组', () => {
            v.add('aaa', 'hel', { type: 'array', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 空数组', () => {
            v.add([], 'hel', { type: 'array', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非空数组', () => {
            v.add([1], 'hel', { type: 'array', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'array', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非数组', () => {
            v.add('aa', 'hel', { type: 'array', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 空数组', () => {
            v.add([], 'hel', { type: 'array', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非空数组', () => {
            v.add([1], 'hel', { type: 'array', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('enum', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'array', required: false, enum: ['hello'] })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && error-type', () => {
            v.add('hello', 'hel', { type: 'array', required: false, enum: ['hello'] })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && success-type && error-enum', () => {
            v.add(['hel'], 'hel', { type: 'array', required: false, enum: ['hello'] })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && success-type && array-enum', () => {
            v.add(['hello'], 'hel', { type: 'array', required: false, enum: ['hello'] })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && success-type && no-array-enum', () => {
            v.add('hello', 'hel', { type: 'string', required: false, enum: ['hello'] })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('date', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'date', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非日期', () => {
            v.add('123', 'hel', { type: 'date', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 日期', () => {
            v.add(new Date(), 'hel', { type: 'date', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'date', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非日期', () => {
            v.add('123', 'hel', { type: 'date', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 日期', () => {
            v.add(new Date(), 'hel', { type: 'date', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('email', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'email', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非邮箱', () => {
            v.add('549270031@qq', 'hel', { type: 'email', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 邮箱', () => {
            v.add('549270031@qq.com', 'hel', { type: 'email', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'email', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非邮箱', () => {
            v.add('549270031@qq', 'hel', { type: 'email', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 邮箱', () => {
            v.add('549270031@qq.com', 'hel', { type: 'email', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('mobile', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'mobile', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && 非手机', () => {
            v.add('1877777777', 'hel', { type: 'mobile', required: false })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && 手机', () => {
            v.add('18777777777', 'hel', { type: 'mobile', required: false })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('必填 && empty', () => {
            v.add(null, 'hel', { type: 'mobile', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 非手机', () => {
            v.add('187777777', 'hel', { type: 'mobile', required: true })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('必填 && no-empty && 手机', () => {
            v.add('18777777777', 'hel', { type: 'mobile', required: true })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })

    describe('range', () => {
        it('非必填 && empty', () => {
            v.add(null, 'hel', { type: 'array', required: false, min: 1, max: 5 })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('非必填 && no-empty && error-type', () => {
            v.add('hello', 'hel', { type: 'array', required: false, min: 1, max: 5 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('非必填 && no-empty && success-type && error-range', () => {
            v.add(['hel', 'a', 'b'], 'hel', { type: 'array', required: false, min: 1, max: 2 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('array && error-min', () => {
            v.add(['hello', 'a'], 'hel', { type: 'array', required: true, min: 3, max: 3 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('array && error-max', () => {
            v.add(['hello', 'a', 'b'], 'hel', { type: 'array', required: true, min: 1, max: 2 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('array && success-min-max', () => {
            v.add(['hello', 'a'], 'hel', { type: 'array', required: true, min: 1, max: 3 })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('string && error-min', () => {
            v.add('aa', 'hel', { type: 'string', required: true, min: 3, max: 3 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('string && error-max', () => {
            v.add('aaa', 'hel', { type: 'string', required: true, min: 1, max: 2 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('string && success-min-max', () => {
            v.add('aa', 'hel', { type: 'string', required: true, min: 1, max: 3 })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('number && error-min', () => {
            v.add(2, 'hel', { type: 'number', required: true, min: 3, max: 3 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('number && error-max', () => {
            v.add(3, 'hel', { type: 'number', required: true, min: 1, max: 2 })
            const msg = v.done()
            assert.strictEqual(msg, 'hel')
        })

        it('number && success-min-max', () => {
            v.add(2, 'hel', { type: 'number', required: true, min: 1, max: 3 })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })

        it('string-number && 字符串异常 + 数字正常', () => {
            v.add('20', 'hel', { type: 'number', required: true, min: 10 })
            const msg = v.done()
            assert.strictEqual(msg, '')
        })
    })
})

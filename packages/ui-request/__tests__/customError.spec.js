import assert from 'assert'
import CustomError from '../src/customError'

describe('request > custom_error', () => {
    it('继承自Error', () => {
        const error = new CustomError('err')

        assert.ok(error instanceof Error)
    })

    it('message添加前缀', () => {
        const msg = 'message'
        const error = new CustomError(msg)

        assert.strictEqual(error.message, `nonHandleError:${msg}`)
    })

    it('添加flag属性', () => {
        const flag = 1
        const error = new CustomError('hello', '', flag)

        assert.strictEqual(error.flag, flag)
    })

    it('flag默认为0', () => {
        const error = new CustomError('he')

        assert.strictEqual(error.flag, 0)
    })

    it('添加msg属性', () => {
        const error = new CustomError('hello', 'world')

        assert.strictEqual(error.msg, 'world')
    })
})

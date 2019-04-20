import Validator from 'web-util/validator/index.js'
import assert from 'assert'

describe('validator', () => {
    let v = null

    beforeEach(() => {
        v = new Validator()
    })

    describe('required', () => {
        describe('undefined', () => {
            it('expect error', () => {
                v.add(undefined, 'required', 'hello')
                assert(v.done() === 'hello')
            })
        })

        describe('null', () => {
            it('expect error', () => {
                v.add(null, 'required', 'hello')
                assert(v.done() === 'hello')
            })
        })

        describe('string', () => {
            it('空字符串 失败', () => {
                v.add('', 'required', 'hello')
                assert(v.done() === 'hello')
            })

            it('非空字符串 成功', () => {
                v.add('hello', 'required', 'hello')
                assert(v.done() === '')
            })
        })

        describe('number', () => {
            it('所有数字 成功', () => {
                v.add(0, 'required', 'hello')
                v.add(1, 'required', 'hello')
                v.add(2, 'required', 'hello')

                assert(v.done() === '')
            })
        })

        describe('boolean', () => {
            it('布尔值 成功', () => {
                v.add(false, 'required', 'hello')
                v.add(true, 'required', 'hello')

                assert(v.done() === '')
            })
        })

        describe('array', () => {
            it('空数组 失败', () => {
                v.add([], 'required', 'hello')

                assert(v.done() === 'hello')
            })

            it('非空数组 成功', () => {
                v.add([1], 'required', 'hello')

                assert(v.done() === '')
            })
        })
    })

    describe('email', () => {
        it('错误地址 失败', () => {
            v.add('hello', 'email', 'hello')

            assert(v.done() === 'hello')
        })

        it('邮箱地址 成功', () => {
            v.add('549270031@qq.com', 'email', 'hello')

            assert(v.done() === '')
        })
    })

    describe('mobile', () => {
        it('非11位错误号码 失败', () => {
            v.add('1111111111', 'mobile', 'hello')

            assert(v.done() === 'hello')
        })

        it('11位号码 成功', () => {
            v.add('18755555555', 'mobile', 'hello')

            assert(v.done() === '')
        })
    })

    describe('number', () => {
        it('布尔值 失败', () => {
            v.add(false, 'number', 'hello')

            assert(v.done() === 'hello')
        })

        it('非数字字符串 失败', () => {
            v.add('aaa', 'number', 'hello')

            assert(v.done() === 'hello')
        })

        it('数字字符串 成功', () => {
            v.add('1', 'number', 'hello')

            assert(v.done() === 'hello')
        })

        it('数字 成功', () => {
            v.add(1, 'number', 'hello')

            assert(v.done() === '')
        })
    })

    describe('equal', () => {
        it('不同类型 失败', () => {
            v.add('', 'equal', 'hello', 1)

            assert(v.done() === 'hello')
        })

        it('相同类型不同数据 失败', () => {
            v.add('', 'equal', 'hello', '1')

            assert(v.done() === 'hello')
        })

        it('相同类型相同数据 成功', () => {
            v.add('1', 'equal', 'hello', '1')

            assert(v.done() === '')
        })
    })

    describe('length', () => {
        it('value不存在 失败', () => {
            v.add('', 'length', 'hello', 1)

            assert(v.done(), 'hello')
        })
        it('转换成 string 后再比较', () => {
            v.add('1', 'length', 'hello', 1, 1)
            v.add(12, 'length', 'hello', 2, 2)

            assert(v.done() === '')
        })
    })

    describe('range', () => {
        it('不能转为数字 失败', () => {
            v.add('aa', 'range', 'hello', 1)

            assert(v.done(), 'hello')
        })
        it('转换成 number 后再比较', () => {
            v.add('1', 'range', 'hello', 0, 2)

            assert.strictEqual(v.done(), '')
        })

        it('相等验证成功', () => {
            v.add('1', 'range', 'hello', 1, 1)

            assert(v.done() === '')
        })
    })
})

import assert from 'assert'
import tool from 'web-util/tool/index.js'

describe('tool', () => {
    describe('tofilled', () => {
        it('double类型', () => {
            assert.strictEqual(tool.tofilled(1.11, 3), '001.11', 'double类型不匹配')
        })

        it('int类型', () => {
            assert.strictEqual(tool.tofilled(1, 4), '0001', 'int类型不匹配')
        })

        it('默认不填充位数', () => {
            assert.strictEqual(tool.tofilled(1), '1')
        })

        it('返回字符串类型', () => {
            const res = tool.tofilled(111)
            assert.strictEqual(typeof res, 'string')
        })

        it('value不存在错误提示', () => {
            try {
                tool.tofilled()
            } catch (err) {
                assert.strictEqual(err.message, 'value不能为空')
            }
        })

        it('value不是数字错误提示', () => {
            try {
                tool.tofilled('aa')
            } catch (err) {
                assert.strictEqual(err.message, `value必须可转为number类型,实际为 aa`)
            }
        })
    })

    describe('tofixed', () => {
        it('double类型', () => {
            assert.strictEqual(tool.tofixed(1.11, 3), '1.110', 'double类型不匹配')
        })

        it('int类型', () => {
            assert.strictEqual(tool.tofixed(1, 4), '1.0000', 'int类型不匹配')
        })

        it('默认保留2位', () => {
            assert.strictEqual(tool.tofixed(1), '1.00')
        })

        it('返回字符串类型', () => {
            const res = tool.tofixed(111)
            assert.strictEqual(typeof res, 'string')
        })

        it('返回数字类型', () => {
            const res = tool.tofixed(111, '2', true)
            assert.strictEqual(typeof res, 'number')
        })

        it('value不存在错误提示', () => {
            try {
                tool.tofixed()
            } catch (err) {
                assert.strictEqual(err.message, 'value不能为空')
            }
        })

        it('value不是数字错误提示', () => {
            try {
                tool.tofixed('aa')
            } catch (err) {
                assert.strictEqual(err.message, 'value必须可转为number类型,实际为 aa')
            }
        })
    })
})

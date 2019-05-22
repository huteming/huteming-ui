import assert from 'assert'
import tool from 'web-util/tool/index.js'

describe('tool', () => {
    describe('tofilled', () => {
        it('null to ""', () => {
            assert.strictEqual(tool.tofilled(null, 3), '')
        })

        it('undefined to ""', () => {
            assert.strictEqual(tool.tofilled(undefined, 3), '')
        })

        it('boolean to ""', () => {
            assert.strictEqual(tool.tofilled(false, 3), '')
        })

        it('number to success', () => {
            assert.strictEqual(tool.tofilled(0, 4), '0000')
            assert.strictEqual(tool.tofilled(1, 4), '0001')
            assert.strictEqual(tool.tofilled(1.11, 3), '001.11')
            assert.strictEqual(tool.tofilled(111.11, 2), '111.11')
        })

        it('number string to success', () => {
            assert.strictEqual(tool.tofilled('0', 4), '0000')
            assert.strictEqual(tool.tofilled('1', 4), '0001')
            assert.strictEqual(tool.tofilled('1.11', 3), '001.11')
            assert.strictEqual(tool.tofilled('111.11', 2), '111.11')
        })

        it('not number string to ""', () => {
            assert.strictEqual(tool.tofilled('', 3), '')
            assert.strictEqual(tool.tofilled('aa', 4), '')
        })

        it('"" to ""', () => {
            assert.strictEqual(tool.tofilled('', 3), '')
            assert.strictEqual(tool.tofilled('aa', 4), '')
        })

        it('object to ""', () => {
            assert.strictEqual(tool.tofilled({}, 3), '')
        })

        it('array to ""', () => {
            assert.strictEqual(tool.tofilled([], 3), '')
        })

        it('默认不填充位数', () => {
            assert.strictEqual(tool.tofilled(1), '1')
        })

        it('保留小数点后位数', () => {
            assert.strictEqual(tool.tofilled('1.00', 2), '01.00')
        })

        it('返回字符串类型', () => {
            const res = tool.tofilled(111)
            assert.strictEqual(typeof res, 'string')
        })
    })

    describe('tofixed', () => {
        it('null to ""', () => {
            assert.strictEqual(tool.tofixed(null, 3), '')
        })

        it('undefined to ""', () => {
            assert.strictEqual(tool.tofixed(undefined, 3), '')
        })

        it('boolean to ""', () => {
            assert.strictEqual(tool.tofixed(false, 3), '')
        })

        it('number to success', () => {
            assert.strictEqual(tool.tofixed(0, 4), '0.0000')
            assert.strictEqual(tool.tofixed(1, 4), '1.0000')
            assert.strictEqual(tool.tofixed(1.11, 3), '1.110')
            assert.strictEqual(tool.tofixed(1.126, 2), '1.13')
        })

        it('number string to success', () => {
            assert.strictEqual(tool.tofixed('0', 4), '0.0000')
            assert.strictEqual(tool.tofixed('1', 4), '1.0000')
            assert.strictEqual(tool.tofixed('1.11', 3), '1.110')
            assert.strictEqual(tool.tofixed('1.126', 2), '1.13')
        })

        it('not number string to ""', () => {
            assert.strictEqual(tool.tofixed('', 3), '')
            assert.strictEqual(tool.tofixed('aa', 4), '')
        })

        it('"" to ""', () => {
            assert.strictEqual(tool.tofixed('', 3), '')
            assert.strictEqual(tool.tofixed('aa', 4), '')
        })

        it('object to ""', () => {
            assert.strictEqual(tool.tofixed({}, 3), '')
        })

        it('array to ""', () => {
            assert.strictEqual(tool.tofixed([], 3), '')
        })

        it('默认保留2位', () => {
            assert.strictEqual(tool.tofixed(1), '1.00')
        })

        it('保留小数点前位数', () => {
            assert.strictEqual(tool.tofixed('01', 2), '01.00')
        })

        it('返回字符串类型', () => {
            const res = tool.tofixed(111)
            assert.strictEqual(typeof res, 'string')
        })

        it('返回数字类型', () => {
            const res = tool.tofixed(111, '2', true)
            assert.strictEqual(typeof res, 'number')
        })
    })
})

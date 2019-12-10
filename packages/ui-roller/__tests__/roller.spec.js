import Roller from '../src/main'
import assert from 'assert'

describe('roller', () => {
    const res = {}
    const count = 100000

    beforeAll(() => {
        const roller = new Roller()

        roller.add(1, 1)
        roller.add(2, 2)
        roller.add(3, 3)
        roller.add(4, 4)

        for (let i = 0; i < count; i++) {
            const value = roller.done()

            if (!res[value]) {
                res[value] = 0
            }
            res[value]++
        }
    })

    it('概率分布', () => {
        const value1 = res['1']
        const value2 = res['2']
        const value3 = res['3']
        const value4 = res['4']

        assert(Math.round(value2 / value1) === 2)
        assert(Math.round(value3 / value1) === 3)
        assert(Math.round(value4 / value1) === 4)
    })

    it('结果总和', () => {
        const num = Object.values(res).reduce((prev, next) => prev + next)

        assert(num === count)
    })

    it('rate非数字异常提示', done => {
        try {
            const roller = new Roller()
            roller.add('1', 'a')
            done(new Error('非期望异常'))
        } catch (err) {
            assert.strictEqual(err.message, '所占区间比例rate必须可转为数字;实际:a')
            done()
        }
    })

    it('rate不大于0异常提示', done => {
        try {
            const roller = new Roller()
            roller.add('1', -1)
            done(new Error('非期望异常'))
        } catch (err) {
            assert.strictEqual(err.message, '所占区间比例rate必须大于0;实际-1')
            done()
        }
    })
})

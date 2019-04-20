export default class Roller {
    constructor () {
        this._ranges = []

        this.add = this.add.bind(this)
        this.done = this.done.bind(this)
    }

    /**
     * @param {Any} value 内部不关心该数据，会在获取随机数后返回给外部
     * @param {Number} rate 占据区间, 任意数字
     */
    add (value, rate) {
        rate = Number(rate)

        if (isNaN(rate)) {
            throw new Error('rate must be a Number')
        }

        if (rate <= 0) {
            throw new Error('require rate>0')
        }

        this._ranges.push({ value, rate })
    }

    done () {
        const random = Math.random()
        let start = 0

        const totalRate = this._ranges.reduce((prev, next) => ({ rate: prev.rate + next.rate })).rate
        const ranges = this._ranges.slice()

        while (ranges.length) {
            const { value, rate } = ranges.shift() // 取出第一个商品
            const end = start + rate / totalRate // 计算区间的结束
            if (random >= start && random < end) { // 如果随机数在这个区间内，说明抽中了该商品，终止循环
                return value
            }
            start = end // 当前区间的结束，作为下一个区间的开始
        }

        return null
    }
}

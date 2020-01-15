export default class Roller {
  _ranges: any

  constructor () {
    this._ranges = []

    this.add = this.add.bind(this)
    this.done = this.done.bind(this)
  }

  /**
   * @param {Any} value 内部不关心该数据，会在获取随机数后返回给外部
   * @param {Number} rate 占据比例, 任意数字
   */
  add (value: any, rate: any) {
    const _rate = Number(rate)

    if (isNaN(_rate)) {
      throw new Error(`所占区间比例rate必须可转为数字;实际:${rate}`)
    }

    if (_rate <= 0) {
      throw new Error(`所占区间比例rate必须大于0;实际${rate}`)
    }

    this._ranges.push({ value, rate: _rate })
  }

  done () {
    const random = Math.random()
    let start = 0

    const totalRate = this._ranges.reduce((prev: any, next: any) => ({ rate: prev.rate + next.rate })).rate
    const ranges = this._ranges.slice()

    while (ranges.length) {
      const { value, rate } = ranges.shift() // 取出第一个商品
      const end = start + rate / totalRate // 计算区间的结束
      if (random >= start && random < end) { // 如果随机数在这个区间内，说明抽中了该商品，终止循环
        return value
      }
      start = end // 当前区间的结束，作为下一个区间的开始
    }
  }
}

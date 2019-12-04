import { RotateOptions, Translate, RangeOptions, RangeConfig } from '../types'
import Roller from '@huteming/ui-roller/src/main'

/* istanbul ignore next */
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
// 预设点击结束后多转圈数
const STOP_CIRCLES_MORE = 5

export default class Rotate {
    private running = false
    private waitingToStop = false
    private translate: Translate
    private angleCount = 0 // 旋转角度, 一直为正数累加
    private frame = 0 // 定时器
    private ranges: RangeConfig[] = [] // 顺时针排列
    private done: Function | undefined
    private initial = 0
    private direction = false

    constructor (ranges: RangeOptions[], { translate = () => window.console.warn('未添加旋转动画'), done, initial, direction = false }: RotateOptions = {}) {
        this.translate = translate
        this.direction = direction
        this.done = done
        this.ranges = this.formatRanges(ranges, direction)
        this.initial = this.formatInitial(this.ranges, initial)
    }

    start (): void {
        if (this.running) return
        this.running = true

        const step = this.calcSteps(360 * (STOP_CIRCLES_MORE + 1))
        const count = step(1) - step(0)

        const runner = () => {
            this.angleCount += count
            this.translate(this.direction ? this.angleCount : -this.angleCount)
            this.frame = requestAnimationFrame(runner)
        }
        this.frame = requestAnimationFrame(runner)
    }

    stop (expect: any): void {
        if (this.waitingToStop) return
        this.waitingToStop = true
        cancelAnimationFrame(this.frame)

        const angleStop = this.expectToStop(expect)
        const step = this.calcSteps(360 * STOP_CIRCLES_MORE + angleStop)
        let i = 1

        const runner = () => {
            const next = step(i++)

            if (next > -1) {
                this.frame = requestAnimationFrame(() => {
                    this.angleCount = next
                    this.translate(this.direction ? next : -next)
                    runner()
                })
                return
            }

            this.running = false
            this.waitingToStop = false
            const item = this.ranges.find(item => item.angleStop === angleStop)

            if (typeof this.done === 'function') {
                this.done(item && item.value)
            }
        }

        runner()
    }

    reset () {
        cancelAnimationFrame(this.frame)

        this.running = false
        this.waitingToStop = false
        this.translate(this.direction ? this.initial : -this.initial)
    }

    private calcSteps (angleTotal: number): (step: number) => number {
        const angleOver = this.angleCount % 360
        angleTotal -= angleOver

        const a = 0.03
        const t = Math.sqrt(2 * angleTotal / a)
        const v = a * t

        /**
         * 返回 -1 代表无效
         */
        return (step: number) => {
            if (step < t) {
                return (2 * v * step - a * step * step) / 2 + angleOver
            } else if (step < t + 1) {
                return angleTotal + angleOver
            }

            return -1
        }
    }

    private expectToStop (expect?: any): number {
        if (expect) {
            const item = this.ranges.find(item => item.value === expect)

            /* istanbul ignore else */
            if (item) {
                return item.angleStop
            }
        }

        const roller = new Roller()

        this.ranges.forEach(({ angle, angleStop }) => {
            roller.add(angleStop, angle)
        })

        return roller.done()
    }

    private formatRanges (ranges: RangeOptions[], direction: boolean): RangeConfig[] {
        let prev = 0
        const _ranges = ranges.slice()

        if (direction) {
            ranges.reverse()
        }

        return _ranges.map(({ value, angle }) => {
            const angleStop = prev + angle / 2
            prev += angle

            return { value, angle, angleStop }
        })
    }

    private formatInitial (ranges: RangeConfig[], initial: any): number {
        const item = ranges.find(item => item.value === initial)

        if (item) {
            return item.angleStop
        }

        if (typeof initial === 'number') {
            return initial
        }

        return 0
    }
}

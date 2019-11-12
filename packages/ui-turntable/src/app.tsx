import Roller from 'packages/ui-roller/src/main'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
/* istanbul ignore next */
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
// 预设点击结束后多转圈数
const STOP_CIRCLES_MORE = 5

@Component
export default class Turntable extends Vue {
    static registName = 'TmTurntable'

    render () {
        const {
            handlePointerClick,
            stylePointer, styleBoard,
            board, pointer,
        } = this

        return (
            <div class="tm-turntable">
                <div class="tm-turntable-board" style={ styleBoard }>
                    <img class="tm-turntable-image" src={ board } ref="table" />
                </div>
                <div class="tm-turntable-pointer" style={ stylePointer } on-click={ handlePointerClick }>
                    <img class="tm-turntable-image" src={ pointer } />
                    { this.$slots.default }
                </div>
            </div>
        )
    }

    mounted () {
        // 初始化位置
        this.reset()
    }

    beforeDestroy () {
        cancelAnimationFrame(this.frame)
    }

    get normalizedRanges (): { value: any, angle: number, angleStop: number }[] {
        let prev = 0
        const ranges = this.ranges.slice()

        if (this.direction) {
            ranges.reverse()
        }

        return ranges.map(({ value, angle }) => {
            const angleStop = prev + angle / 2
            prev += angle

            return { value, angle, angleStop }
        })
    }

    get angleInitial (): number {
        const { normalizedRanges, initial } = this
        const item = normalizedRanges.find(item => item.value === initial)

        if (item) {
            return item.angleStop
        }

        if (typeof initial === 'number') {
            return initial
        }

        return 0
    }

    start (): void {
        if (this.running || this.disabled) return
        this.running = true

        const step = this.calcSteps(360 * (STOP_CIRCLES_MORE + 1))
        const count = step(1)

        const runner = () => {
            this.angleCount += count
            this.translate(this.angleCount)
            this.frame = requestAnimationFrame(runner)
        }
        this.frame = requestAnimationFrame(runner)
    }

    stop (expect: any): void {
        if (this.isClickStop || this.disabled) return
        this.isClickStop = true
        cancelAnimationFrame(this.frame)

        const angleStop = this.expectToStop(expect)
        const step = this.calcSteps(360 * STOP_CIRCLES_MORE + angleStop)
        let i = 0

        const runner = () => {
            const next = step(i++)

            if (next > -1) {
                this.frame = requestAnimationFrame(() => {
                    this.translate(next)
                    runner()
                })
                return
            }

            this.running = false
            this.isClickStop = false
            const item = this.normalizedRanges.find(item => item.angleStop === angleStop)

            this.$emit('end', item && item.value)
        }

        runner()
    }

    reset () {
        cancelAnimationFrame(this.frame)

        this.running = false
        this.isClickStop = false
        this.translate(this.angleInitial)
    }

    handlePointerClick () {
        this.$emit('click-pointer')
    }

    expectToStop (expect?: any): number {
        if (expect) {
            const item = this.normalizedRanges.find(item => item.value === expect)

            /* istanbul ignore else */
            if (item) {
                return item.angleStop
            }
        }

        const roller = new Roller()

        this.normalizedRanges.forEach(({ angle, angleStop }) => {
            roller.add(angleStop, angle)
        })

        return roller.done()
    }

    calcSteps (angleTotal: number): (step: number) => number {
        const a = 0.03
        const t = Math.sqrt(2 * angleTotal / a)
        const v = a * t

        return (step: number) => {
            if (step < t) {
                return (2 * v * step - a * step * step) / 2
            } else if (step < t + 1) {
                return angleTotal
            }

            return -1
        }
    }

    translate (angleNew: number): void {
        const { direction } = this
        this.angleCount = angleNew

        if (!direction) {
            angleNew = -angleNew
        }

        this.table.style.transform = `rotate(${angleNew}deg)`
    }

    @Ref('table')
    table!: HTMLElement

    // 转盘底图
    @Prop({ type: String, required: true })
    board!: string

    @Prop({ type: Object })
    styleBoard?: object

    // 指针图片
    @Prop({ type: String, required: true })
    pointer!: string

    @Prop({ type: Object })
    stylePointer?: object

    /**
     * options 的数组对象
     * 注意: 角度 angle 应该是顺时针排列
     * @param {Number} angle 占据转盘角度
     * @param {Any} value 组建内并不关心该数据，会在停止后返回给外部
     */
    @Prop({ type: Array, required: true })
    ranges!: { angle: number, value: any }[]

    /**
     * 转盘旋转方向，true: 顺时针; false: 逆时针
     */
    @Prop({ type: Boolean, default: false })
    direction!: boolean

    /**
     * 初始值, 对应 ranges 中的 value
     */
    @Prop()
    initial?: any

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    // 旋转中
    running = false
    // 点击过停止
    isClickStop = false
    // 定时器
    frame = 0
    // 旋转角度, 一直为正数累加, 方向在 translate 中判断
    angleCount = 0
}

import Roller from 'web-util/roller/src/main'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

@Component
export default class Turntable extends Vue {
    static registName = 'TmTurntable'

    render () {
        const {
            handlePointerClick,
            stylePointer, styleBoard, styleTable,
            board, pointer,
        } = this

        return (
            <div class="tm-turntable">
                <div class="tm-turntable-board" style={ styleBoard }>
                    <img class="tm-turntable-image" style={ styleTable } src={ board } ref="table" />
                </div>
                <div class="tm-turntable-pointer" style={ stylePointer } on-click={ handlePointerClick }>
                    <img class="tm-turntable-image" src={ pointer } />
                    { this.$slots.default }
                </div>
            </div>
        )
    }

    beforeDestroy () {
        clearInterval(this.timer)
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

    get getRoller (): Function {
        const roller = new Roller()

        this.normalizedRanges.forEach(({ value, angle, angleStop }) => {
            roller.add({ value, angleStop }, angle)
        })

        return roller.done
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

    get styleTable (): object {
        const { direction, angleMove, angleInitial } = this
        let _angle = angleMove > 0 ? angleMove : angleInitial

        if (!direction) {
            _angle = -_angle
        }

        return {
            transform: `rotate(${_angle}deg)`,
        }
    }

    start (): void {
        if (this.running || this.disabled) return
        this.running = true

        this.timer = setInterval(() => {
            requestAnimationFrame(() => {
                this.angleMove += 3
                this.table.style.transform = `rotate(${this.angleMove}deg)`
                // this.angleMove += 3
            })
        }, 1)
    }

    stop (expect: any): void {
        if (this.isClickStop || this.disabled) return
        this.isClickStop = true
        clearInterval(this.timer)

        this.handleRotate(expect)
    }

    reset () {
        clearInterval(this.timer)

        this.angleMove = this.angleInitial
        this.running = false
        this.isClickStop = false
    }

    handlePointerClick () {
        this.$emit('click-pointer')
    }

    handleRotate (expect: any) {
        const { steps, value } = this.getSteps(expect)
        const totalStep = steps.length
        let currentStep = -1

        const logic = () => {
            currentStep++

            if (currentStep < totalStep) {
                requestAnimationFrame(() => {
                    this.angleMove = steps[currentStep]

                    logic()
                })
                return
            }

            setTimeout(() => {
                this.running = false
                this.isClickStop = false

                this.$emit('end', value)
            }, 200)
        }

        logic()
    }

    getSteps (expect: any) {
        const { angleStop, value } = (() => {
            let res = null

            if (expect) {
                res = this.normalizedRanges.find(item => item.value === expect)
            }

            return res || this.getRoller()
        })()
        const totalDeg = 360 * 5 + angleStop
        const steps = []

        const a = 0.03
        const t = Math.sqrt(2 * totalDeg / a)
        const v = a * t

        for (let i = 0; i < t; i++) {
            steps.push((2 * v * i - a * i * i) / 2)
        }
        steps.push(totalDeg)

        return { steps, value }
    }

    // 旋转中
    running = false
    // 点击过停止
    isClickStop = false
    // 定时器
    timer = 0
    // 旋转角度
    angleMove = 0
}

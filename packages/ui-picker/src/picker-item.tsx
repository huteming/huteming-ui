import TmEmpty from '@huteming/ui-empty/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import { PickerOptions, PickerItemProps } from '../types'
import * as tsx from 'vue-tsx-support'
const ITEM_HEIGHT = 34

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', () => `
            position: relative;
            width: 100%;
            height: 220px;
            text-align: center;
            overflow: hidden;
            background: #fff;
            box-sizing: border-box;
        `),
        Container: styled('div', () => `
            position: absolute;
            top: 93px;
            width: 100%;
            height: 34px;
            transform-style: preserve-3d;
            z-index: 1;
        `),
        Piece: styled('div', { hidden: Boolean }, (props: StyleProps) => css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-size: 16px;
            line-height: 34px;
            backface-visibility: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            visibility: ${props.hidden && 'hidden'};
        `),
        Line: styled('div', { position: String }, (props: StyleProps) => css`
            position: absolute;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, .5);
            box-sizing: border-box;
            z-index: 2;

            ${props.position === 'top' && `
                top: 0;
                height: 93px;
                border-bottom: 1px solid #2c97f1;
            `}

            ${props.position === 'bottom' && `
                top: 127px;
                bottom: 0;
                border-top: 1px solid #2c97f1;
            `}
        `),
    }
}

class PickerItem extends tsx.Component<PickerItemProps> {
    render () {
        const { Root, Container, Piece, Line } = this.styledDoms
        const DomContent = (
            <template>
                <Line position="top"></Line>
                <Line position="bottom"></Line>

                <Container class="tm-picker-item__container" style={ this.styleContainer }>
                    {
                        ...this.renderOptions.map((item, index) => {
                            return (
                                <Piece
                                    clsss="tm-picker-item__container-piece"
                                    key={ index }
                                    hidden={ item.hidden }
                                    style={ item.style }>
                                    { item.label }
                                </Piece>
                            )
                        })
                    }
                </Container>
            </template>
        )
        const custom = {
            attrs: this.$attrs,
        }
        const DomEmpty = (
            <TmEmpty { ...custom }>{ this.$slots.default }</TmEmpty>
        )
        return (
            <Root class="tm-picker-item"
                on-touchstart={ this.handleTouchStart }
                on-touchmove={ this.handleTouchMove }
                on-touchend={ this.handleTouchEnd }>
                { !this.disabled ? DomContent : DomEmpty }
            </Root>
        )
    }

    /**
     * 选项列表，{ label, value } 结构的键值对数组
     */
    @Prop({ type: Array, required: true })
    options!: PickerOptions[]

    @Prop({})
    value: any

    currentValue = ''
    startY = 0
    currentMoveY = 0
    startTime = 0
    duration = 0

    get disabled () {
        return !(this.options && this.options.length)
    }

    get currentIndex () {
        return this.options.findIndex(item => item.value === this.currentValue)
    }
    set currentIndex (val: number) {
        this.currentValue = this.options[val].value
    }

    get prevMoveY () {
        return this.currentIndex * ITEM_HEIGHT
    }
    set prevMoveY (val) {
        this.currentIndex = Math.round(val / ITEM_HEIGHT)
    }

    /**
     * 根据当前值计算滑过的角度
     * 向上为正，向下为负
     */
    get moveDeg () {
        return (Math.round(this.prevMoveY / ITEM_HEIGHT) + this.currentMoveY / ITEM_HEIGHT) * 20
    }

    /**
     * 取值范围
     */
    get range () {
        const moveItem = Math.round(this.moveDeg / 20)
        const start = -9 + moveItem
        return {
            start,
            end: start + 18
        }
    }

    get renderOptions () {
        const { start, end } = this.range
        const length = this.options.length
        const data = []

        for (let i = start; i < end; i++) {
            const index = i % length
            const normalizedIndex = index >= 0 ? index : index + length
            const isHidden = i < 0 || i > length - 1

            const styles = {
                transform: `rotateX(${-20 * i % 360}deg) translateZ(90px)`
            }

            const item = Object.assign({ hidden: isHidden, style: styles, index: i }, this.options[normalizedIndex])
            data.push(item)
        }

        return data
    }

    get styleContainer () {
        return {
            transform: `rotateX(${this.moveDeg}deg)`,
            transition: this.duration > 0 ? `transform ${this.duration}ms cubic-bezier(0.19, 1, 0.22, 1)` : ''
        }
    }

    @Watch('value')
    onValue (val: any) {
        this.currentValue = this.getValidValue(val)
    }

    @Watch('options')
    onOptions () {
        this.currentValue = this.getValidValue(this.currentValue)
    }

    @Watch('currentValue')
    onCurrentValue (val: any, oldVal: any) {
        this.$emit('input', val)
        this.$emit('change', val, oldVal)
    }

    mounted () {
        this.currentValue = this.getValidValue(this.value)
    }

    handleTouchStart (event: TouchEvent) {
        if (this.disabled) return
        event.preventDefault()

        const finger = event.changedTouches[0]

        this.duration = 0
        this.startY = finger.pageY
        this.startTime = event.timeStamp || Date.now()
    }
    handleTouchMove (event: TouchEvent) {
        if (this.disabled) return
        event.preventDefault()

        const finger = event.changedTouches[0]

        this.currentMoveY = this.dealEdge(this.startY - finger.pageY)
    }
    handleTouchEnd (event: TouchEvent) {
        if (this.disabled) return
        event.preventDefault()

        const finger = event.changedTouches[0]

        let move = this.startY - finger.pageY
        let duration = event.timeStamp || Date.now() - this.startTime

        if (duration <= 300) {
            move = move * 1.8
            duration = 1000 + duration * 1.8
        }

        this.duration = duration
        this.prevMoveY = this.prevMoveY + this.dealEdge(move)
        this.currentMoveY = 0
    }
    /**
     * 处理边界
     */
    dealEdge (move: number) {
        const topDistance = this.currentIndex * ITEM_HEIGHT
        const maxIndex = this.options.length - 1
        const bottomDistance = (maxIndex - this.currentIndex) * ITEM_HEIGHT

        if (move > 0 && move > bottomDistance) {
            return bottomDistance
        }
        if (move < 0 && -move > topDistance) {
            return -topDistance
        }
        return move
    }
    getValidValue (value: any) {
        const index = this.options.findIndex(item => item.value === value)

        if (index === -1 && !this.disabled) {
            return this.options[0].value
        }

        return value
    }
}

export default withStyles(styles)(PickerItem, {
    name: 'TmPickerItem',
    inheritAttrs: false,
})

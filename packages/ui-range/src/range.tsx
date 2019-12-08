import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { StyleProps } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', () => `
            display: flex;
            align-items: center;
        `),
        Content: styled('div', { disabled: Boolean }, (props: StyleProps) => `
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            opacity: ${props.disabled && '.5'};
        `),
        Progress: styled('div', () => `
            margin-right: -7px;
            padding-right: 7px;
            background: #2A73FD;
            border-radius: 2px 0 0 2px;
            box-sizing: content-box;
            z-index: 1;
        `),
        Finger: styled('div', () => `
            flex: 0 0 auto;
            z-index: 2;
            margin: -20px;
            padding: 20px;
        `),
        Thumb: styled('div', () => `
            width: 10px;
            height: 10px;
            background: #2A73FD;
            box-sizing: border-box;
            border-radius: 50%;
            cursor: move;
        `),
        Runway: styled('div', () => `
            flex: 1;
            margin-left: -7px;
            background: rgba(247, 247, 247, 1);
            border-radius: 0 2px 2px 0;
            box-sizing: content-box;
            z-index: 1;
        `),
        Min: styled('div', () => `
            margin-right: 4px;
        `),
        Max: styled('div', () => `
            margin-left: 4px;
        `),
    }
}

class Range extends Vue {
    render () {
        const { Root, Content, Progress, Finger, Thumb, Runway, Min, Max } = this.styledDoms
        const { styleProgress } = this
        const DomStart = (() => {
            if (this.$slots.start) {
                return <div class="tm-range-start">
                    { this.$slots.start }
                </div>
            }
        })()
        return (
            <Root class="tm-range">
                { DomStart }
                { this.showValue && <Min class="tm-range-min">{ this.min }</Min> }

                <Content class="tm-range-content" disabled={ this.disabled } ref="content">
                    <Progress class="tm-range-progress" style={ styleProgress }></Progress>

                    <Finger class="tm-range-finger"
                        on-touchstart={ this.handleTouchstart }
                        on-touchmove={ this.handleTouchmove }
                        on-touchend={ this.handleTouchend }>
                        <Thumb class="tm-range-finger-thumb" ref="thumb"></Thumb>
                    </Finger>

                    <Runway class="tm-range-runway" style={ this.styleRunWay }></Runway>
                </Content>

                { this.showValue && <Max class="tm-range-max">{ this.max }</Max> }

                {
                    this.$slots.end && <div class="tm-range-end">
                        { this.$slots.end }
                    </div>
                }
            </Root>
        )
    }

    @Prop({ type: Number, default: 0 })
    value!: number

    @Prop({ type: Number, default: 0 })
    min!: number

    @Prop({ type: Number, default: 100 })
    max!: number

    @Prop({ type: Number, default: 1 })
    step!: number

    @Prop({ type: Boolean, default: false })
    showValue!: boolean

    @Prop({ type: Number, default: 4 })
    barHeight!: number

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    startX = 0
    startY = 0
    startValue = 0
    widthProgress = 0
    normalizedValue = this.value
    direction = ''

    get rate () {
        return Math.min((this.normalizedValue - this.min) / (this.max - this.min), 1)
    }
    get stepCount () {
        return Math.ceil((this.max - this.min) / this.step)
    }
    get styleProgress () {
        return {
            height: `${this.barHeight}px`,
            width: `${this.rate * this.widthProgress}px`,
        }
    }
    get styleRunWay () {
        return {
            height: `${this.barHeight}px`,
        }
    }

    @Watch('value')
    onValue (val: number) {
        this.normalizedValue = val
    }
    @Watch('normalizedValue')
    onNormalizedValue (val: number) {
        this.$emit('input', val)
    }

    mounted () {
        this.widthProgress = (this.$refs.content as HTMLElement).offsetWidth - (this.$refs.thumb as HTMLElement).offsetWidth
    }

    handleTouchstart (event: TouchEvent) {
        if (this.disabled) return

        const finger = event.changedTouches[0]

        this.startX = finger.pageX
        this.startY = finger.pageY
        this.startValue = this.normalizedValue

        this.$emit('moving', true)
    }
    handleTouchmove (event: TouchEvent) {
        if (this.disabled) return

        const finger = event.changedTouches[0]
        const moveX = finger.pageX - this.startX
        const moveY = finger.pageY - this.startY

        // 未处理滑动方向
        if (this.direction === '') {
            // 滑动幅度太小，不处理
            if (Math.abs(moveX) < 4 && Math.abs(moveY) < 4) {
                return
            }

            if (Math.abs(moveY) > 4) {
                this.direction = 'vertical'
            } else {
                this.direction = 'across'
            }
        }

        // 滑动方向与配置方向不一致
        if (this.direction === 'vertical') {
            return
        }

        event.cancelable && event.preventDefault()

        const stepMove = Math.round(moveX / (this.widthProgress / this.stepCount))
        let newValue = stepMove * this.step + this.startValue

        if (newValue < this.min) {
            newValue = this.min
        } else if (newValue > this.max) {
            newValue = this.max
        }

        this.normalizedValue = newValue
    }
    handleTouchend (event: TouchEvent) {
        const direction = this.direction
        this.direction = ''
        if (this.disabled || direction !== 'across') return

        this.$emit('moving', false)
        this.$emit('change', this.normalizedValue)
    }
}

export default withStyles(styles)(Range, { name: 'TmRange' })

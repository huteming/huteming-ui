import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { Root, Content, Progress, Finger, Thumb, Runway, Min, Max } from './vars'
const bem = createBEM('range')

@DescribedComponent({
  name: 'TmRange',
})
export default class Range extends Vue {
  render () {
    const DomStart = (() => {
      if (this.$slots.start) {
        return <div class={ bem('start') }>
          { this.$slots.start }
        </div>
      }
    })()
    return (
      <Root class={ bem() }>
        { DomStart }
        { this.showValue && <Min class={ bem('min') }>{ this.min }</Min> }

        <Content class={ bem('content') } disabled={ this.disabled } ref="content">
          <Progress class={ bem('progress') } style={ this.styleProgress }></Progress>

          <Finger class={ bem('finger') }
            on-touchstart={ this.handleTouchstart }
            on-touchmove={ this.handleTouchmove }
            on-touchend={ this.handleTouchend }
          >
            <Thumb class={ bem('thumb') } ref="thumb"></Thumb>
          </Finger>

          <Runway class={ bem('runway') } style={ this.styleRunWay }></Runway>
        </Content>

        { this.showValue && <Max class={ bem('max') }>{ this.max }</Max> }

        {
          this.$slots.end && <div class={ bem('end') }>
            { this.$slots.end }
          </div>
        }
      </Root>
    )
  }

  mounted () {
    const contentComp = this.$refs.content as Vue
    const contentDom = contentComp.$el as HTMLElement
    const thumbComp = this.$refs.thumb as Vue
    const thumbDom = thumbComp.$el as HTMLElement
    this.widthProgress = contentDom.offsetWidth - thumbDom.offsetWidth
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

  handleTouchstart (event: TouchEvent) {
    if (this.disabled) return

    const finger = event.changedTouches[0]

    this.startX = finger.pageX
    this.startY = finger.pageY
    this.startValue = this.normalizedValue

    this.$emit('moving', this.normalizedValue, true)
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
    this.$emit('moving', newValue, true)
  }
  handleTouchend (event: TouchEvent) {
    const direction = this.direction
    this.direction = ''
    if (this.disabled || direction !== 'across') return

    this.$emit('moving', this.normalizedValue, false)
    this.$emit('change', this.normalizedValue)
  }
}

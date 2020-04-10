import TmEmpty from 'packages/ui-empty/src/main'
import { Prop, Watch } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { PickerOptions, PickerItemProps } from '../types'
import * as tsx from 'vue-tsx-support'
import { ItemRoot, ItemContainer, Piece, Line } from './work'
const bem = createBEM('picker-item')
const ITEM_HEIGHT = 34

@DescribedComponent({
  name: 'TmPickerItem',
  inheritAttrs: false,
})
export default class PickerItem extends tsx.Component<PickerItemProps> {
  render () {
    const DomContent = (
      <ItemContainer class={ bem('container') } style={ this.styleContainer }>
        {
          ...this.renderOptions.map((item, index) => {
            return (
              <Piece
                class={ bem('piece') }
                key={ index }
                hidden={ item.hidden }
                style={ item.style }>
                { item.label }
              </Piece>
            )
          })
        }
      </ItemContainer>
    )
    const custom = {
      attrs: this.$attrs,
    }
    const DomEmpty = (
      <TmEmpty { ...custom }>{ this.$slots.default }</TmEmpty>
    )
    return (
      <ItemRoot class={ bem() }
        on-touchstart={ this.handleTouchStart }
        on-touchmove={ this.handleTouchMove }
        on-touchend={ this.handleTouchEnd }>
        { !this.disabled ? DomContent : DomEmpty }
        { !this.disabled && <Line position="top"></Line> }
        { !this.disabled && <Line position="bottom"></Line> }
      </ItemRoot>
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
      end: start + 18,
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
        transform: `rotateX(${-20 * i % 360}deg) translateZ(90px)`,
      }

      const item = Object.assign({ hidden: isHidden, style: styles, index: i }, this.options[normalizedIndex])
      data.push(item)
    }

    return data
  }

  get styleContainer () {
    return {
      transform: `rotateX(${this.moveDeg}deg)`,
      transition: this.duration > 0 ? `transform ${this.duration}ms cubic-bezier(0.19, 1, 0.22, 1)` : '',
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
    let duration = (event.timeStamp || Date.now()) - this.startTime

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

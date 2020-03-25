import { Prop, Watch, Mixins } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { CarouselItem, CarouselType } from '../types'
import { ParentMixin } from 'mixins/relation'
import { Root } from './work'
const bem = createBEM('carousel')

@DescribedComponent({
  name: 'Carousel',
})
export default class Carousel extends Mixins(ParentMixin('carousel')) {
  $el!: HTMLDivElement
  children!: CarouselItem[]

  render () {
    return (
      <Root class={ bem() } style={ this.styles } on-touchstart={ this.handleTouchstart } on-touchmove={ this.handleTouchmove } on-touchend={ this.handleTouchend }>
        { this.$slots.default }
      </Root>
    )
  }

  get styles () {
    return {
      height: this.height,
    }
  }

  @Watch('initial')
  onInitialChange (val: number | string) {
    /* istanbul ignore else */
    if (this.children.length > 0) {
      this.setActiveItem(val)
      this.startTimer()
    }
  }

  @Watch('autoplay')
  onAutoplayChange (val: boolean) {
    val ? this.startTimer() : this.pauseTimer()
  }

  @Watch('children')
  async onItemsChange (val: CarouselItem[]) {
    if (val.length > 0) {
      await this.$nextTick()
      this.setActiveItem(this.initial)
      this.startTimer()
    }
  }

  @Watch('currentIndex')
  onCurrentIndexChange (val: number, oldVal: number) {
    this.updateItemsPosition(val, oldVal)

    this.$emit('change', val, oldVal)
  }

  beforeDestroy () {
    this.pauseTimer()
  }

  // 指定活跃item
  setActiveItem (index: number | string) {
    if (!this.children.length) {
      return false
    }

    let _index = index

    if (typeof _index === 'string') {
      const filteredItems = this.children.filter((item: CarouselItem) => item.name === _index)
      if (filteredItems.length > 0) {
        _index = this.children.indexOf(filteredItems[0])
      }
    }

    _index = Number(_index)
    if (isNaN(_index) || _index !== Math.floor(_index)) {
      console.warn('[@huteming/ui Warn][Carousel]index is invalid: ', index)
      return false
    }

    const total = this.children.length

    if (_index < 0) {
      this.currentIndex = this.loop ? _index + total : 0
    } else if (_index >= total) {
      this.currentIndex = this.loop ? _index % total : total - 1
    } else {
      this.currentIndex = _index
    }

    return true
  }

  // 改变子元素位置
  updateItemsPosition (activeIndex: number, oldIndex: number) {
    this.children.forEach((item, index) => {
      item.translateItem(index, activeIndex, oldIndex)
    })
  }

  prev () {
    return this.setActiveItem(this.currentIndex - 1)
  }
  next () {
    return this.setActiveItem(this.currentIndex + 1)
  }
  /**
   * @argument {Boolean} direction true: 回滚到右边/下边; false: 回滚到左边/上边
   */
  moveItemsPosition (activeIndex: number, move: number, direction: boolean = false) {
    this.children.forEach((item, index) => item.moveItem(index, activeIndex, move, direction))
  }

  playSlides () {
    const total = this.children.length

    // 提前判断是否还有下一张，没有的话，则停止计时
    if (!this.loop && this.currentIndex === total - 2) {
      this.pauseTimer()
    }

    if (this.currentIndex < total - 1) {
      this.currentIndex++
      return true
    }

    if (this.loop) {
      this.currentIndex = 0
      return true
    }
    return false
  }

  pauseTimer () {
    clearInterval(this.timer)
    this.timer = 0
  }

  startTimer () {
    if (this.interval <= 0 || !this.autoplay || this.timer) {
      return false
    }

    this.timer = setInterval(this.playSlides, this.interval)
  }
  // 手势
  handleTouchstart (event: TouchEvent) {
    if (this.disabledTouch) {
      return false
    }

    const finger = event.changedTouches[0]
    this.restart = this.timer !== null
    this.pauseTimer()

    this.startX = finger.pageX
    this.startY = finger.pageY
  }
  handleTouchmove (event: TouchEvent) {
    if (this.disabledTouch) {
      return false
    }

    const finger = event.changedTouches[0]
    const moveX = finger.pageX - this.startX
    const moveY = finger.pageY - this.startY

    if (!this.moveDirection) {
      // 滑动幅度太小，不处理
      if (Math.abs(moveX) < 4 && Math.abs(moveY) < 4) {
        return false
      }

      this.moveDirection = Math.abs(moveX) / Math.abs(moveY) > 1 ? 'horizontal' : 'vertical'
    }
    const move = this.moveDirection === 'horizontal' ? moveX : moveY

    this.needRespond = (() => {
      if (this.moveDirection !== this.direction) {
        return false
      }
      if (move > 0 && !this.loop && this.currentIndex === 0) {
        return false
      }
      if (move < 0 && !this.loop && this.currentIndex === this.children.length - 1) {
        return false
      }
      return true
    })()

    if (!this.needRespond) {
      return false
    }
    event.cancelable && event.preventDefault()

    this.moveItemsPosition(this.currentIndex, move)
    this.move = move
  }
  handleTouchend (event: TouchEvent) {
    const distance = this.$el[this.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth']
    this.moveDirection = ''

    if (this.disabledTouch || !this.needRespond) {
      return false
    }

    const changeThreshold = this.touchThreshold || distance / 4
    if (this.move < -changeThreshold) {
      this.next()
    } else if (this.move > changeThreshold) {
      this.prev()
    } else {
      this.moveItemsPosition(this.currentIndex, 0, this.move < 0)
    }

    /* istanbul ignore else */
    if (this.restart) {
      this.startTimer()
    }
  }

  @Prop({ type: String, default: '' })
  type!: CarouselType

  @Prop({ type: String, default: '' })
  height!: string

  @Prop({ type: [Number, String], default: 0 })
  initial!: number | string

  @Prop({ type: Boolean, default: true })
  loop!: boolean

  @Prop({ type: Boolean, default: false })
  autoplay!: boolean

  @Prop({ type: Number, default: 3000 })
  interval!: number

  // 走马灯展示的方向
  @Prop({
    type: String,
    default: 'horizontal',
    validator (val) {
      return ['horizontal', 'vertical'].indexOf(val) > -1
    },
  })
  direction!: string

  @Prop({ type: Boolean, default: false })
  disabledTouch!: boolean

  @Prop({ type: Number, default: 0 })
  touchThreshold!: number

  currentIndex = -1
  timer = 0

  // 在 touchstart 时标记是否需要重新启动定时器
  restart = false
  startX = 0
  startY = 0
  move = 0
  moveDirection = '' // '', vertical, horizontal
  needRespond = false
}

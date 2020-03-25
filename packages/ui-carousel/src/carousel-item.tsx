import { autoprefixer } from '@huteming/ui-element/src/main'
import { Prop, Mixins } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { Carousel } from '../types'
import { ChildrenMixin } from 'mixins/relation'
import { CARD_SCALE, CARD_WIDTH_PERCENT, CARD_STAY_PX, ItemRoot } from './work'
const bem = createBEM('carousel-item')

@DescribedComponent({
  name: 'CarouselItem',
})
export default class CarouselItem extends Mixins(ChildrenMixin('carousel')) {
  parent!: Carousel

  render () {
    return (
      <ItemRoot
        class={ bem() }
        in-stage={ this.inStage }
        type={ this.parent.type }
        animation={ this.animation }
        style={ this.styles }
        onClick={ this.handleItemClick }
        v-show={ this.ready }>
        { this.$slots.default }
      </ItemRoot>
    )
  }

  @Prop({ type: String, default: '' })
  name!: string

  animation = false
  translate = 0
  move = 0
  ready = false
  scale = 1
  inStage = false

  get parentDirection () {
    return this.parent.direction
  }

  get styles () {
    const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX'
    const _style = {
      transform: `${translateType}(${this.translate + this.move}px) scale(${this.scale})`,
    }

    return autoprefixer(_style)
  }

  handleItemClick () {
    const parent = this.parent
    /* istanbul ignore else */
    if (parent && parent.type === 'card') {
      const index = parent.children.indexOf(this)
      parent.setActiveItem(index)
    }
  }

  processIndex (index: number, activeIndex: number, length: number) {
    if (activeIndex === 0 && index === length - 1) {
      return -1
    } else if (activeIndex === length - 1 && index === 0) {
      return length
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2
    }
    return index
  }

  calcCardTranslate (index: number, activeIndex: number) {
    const parentWidth = this.parent.$el.offsetWidth
    const cardWidth = parentWidth * CARD_WIDTH_PERCENT
    const spaceByScale = cardWidth * (1 - CARD_SCALE) / 2
    const diff = index - activeIndex

    if (diff === 0) {
      return (parentWidth - cardWidth) / 2
    }
    if (diff === -1) {
      return -spaceByScale - (cardWidth - spaceByScale * 2) + CARD_STAY_PX
    }
    if (diff === 1) {
      return -spaceByScale + parentWidth - CARD_STAY_PX
    }
    if (diff < 0) {
      return -spaceByScale - (cardWidth - spaceByScale * 2) - (parentWidth - spaceByScale - CARD_STAY_PX)
    }
    return -spaceByScale + parentWidth + (parentWidth - spaceByScale - CARD_STAY_PX)
  }

  calcTranslate (index: number, activeIndex: number) {
    const distance = this.parent.$el[this.parentDirection === 'vertical' ? 'offsetHeight' : 'offsetWidth']
    return distance * (index - activeIndex)
  }

  translateItem (index: number, activeIndex: number, oldIndex: number) {
    const parentType = this.parent.type
    const length = this.parent.children.length

    if (oldIndex !== -1) {
      this.animation = index === activeIndex || index === oldIndex
    }

    if (index !== activeIndex && length > 2 && this.parent.loop) {
      index = this.processIndex(index, activeIndex, length)
    }

    if (parentType === 'card') {
      if (this.parentDirection === 'vertical') {
        console.warn('[huteming-ui Warn][Carousel]vertical directionis not supported in card mode')
      }
      this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
      this.translate = this.calcCardTranslate(index, activeIndex)
      this.scale = index === activeIndex ? 1 : CARD_SCALE
    } else {
      this.translate = this.calcTranslate(index, activeIndex)
    }

    this.move = 0
    this.ready = true
  }

  /**
   * @argument {Boolean} direction true: 回滚到右边/下边; false: 回滚到左边/上边
   */
  moveItem (index: number, activeIndex: number, move: number, direction: boolean) {
    const total = this.parent.children.length
    const loop = this.parent.loop
    const self = index === activeIndex

    this.animation = (() => {
      if (move !== 0) {
        return false
      }
      if (direction) {
        if (loop && activeIndex === total - 1) {
          return self || index === 0
        }
        return self || index === activeIndex + 1
      }
      if (loop && activeIndex === 0) {
        return self || index === total - 1
      }
      return self || index === activeIndex - 1
    })()

    this.move = move
  }
}

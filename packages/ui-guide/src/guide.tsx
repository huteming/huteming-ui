import { isHtmlElement, isString } from 'packages/ui-types/src/main'
import { Vue } from 'vue-property-decorator'
import { GuideProcess } from '../types'
import { Root, Container, Line } from './vars'
import { DescribedComponent } from 'packages/ui-styles/src/main'
const PADDING_TOP = 5
const PADDING_LEFT = 5

@DescribedComponent({
  name: 'TmGuide',
})
export default class Guide extends Vue {
  visible = false
  // { name, component, target, extra, before, after }
  process: GuideProcess[] = []
  // 初始渲染，对应 process 中的 name 值
  init = ''
  activeIndex = -1

  render () {
    const ratio = document.documentElement.clientWidth / 750
    const current = this.process[this.activeIndex]
    if (!current) return
    const { component: ActiveComponent, extra, target, width: expectWidth, height: expectHeight } = current
    const { top, left, width, height } = (() => {
      let _target: HTMLElement | null = null

      if (isHtmlElement(target)) {
        _target = target as HTMLElement
      } else if (isString(target)) {
        _target = document.querySelector(target as string)
      }

      if (!_target) {
        // 这里不抛错，是因为在创建实例时，activeIndex 总是不存在，在 open 中才会根据 init 修改 activeIndex
        // throw new Error(`未找到目标dom: ${target}`)
        return {
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        }
      }

      let { top, left } = _target.getBoundingClientRect()
      top -= PADDING_TOP
      left -= PADDING_LEFT
      let width = _target.offsetWidth + PADDING_LEFT * 2
      let height = _target.offsetHeight + PADDING_TOP * 2

      if (typeof expectWidth === 'number') {
        const _expectWidth = expectWidth * ratio
        left = left + (width - _expectWidth) / 2
        width = _expectWidth
      }

      if (typeof expectHeight === 'number') {
        const _expectHeight = expectHeight * ratio
        top = top + (height - _expectHeight) / 2
        height = _expectHeight
      }

      return { top, left, width, height }
    })()
    const styles = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    }

    return (
      <transition name="fade" on-after-leave={ this.handleAfterLeave }>
        <Root class="tm-guide" on-click={ this.handleClick } v-show={ this.visible } on-touchmove={ this.handleTouchmove }>
          <Container class="tm-guide-container" style={ styles }>
            <Line class="tm-guide-line"></Line>
          </Container>
          <ActiveComponent top={ top } left={ left } width={ width } height={ height } extra={ extra } />
        </Root>
      </transition>
    )
  }

  handleTouchmove (event: Event) {
    event.stopPropagation()
    event.preventDefault()
  }
  handleClick (event: Event) {
    event.stopPropagation()

    this.setActiveItem(this.activeIndex + 1)
  }
  handleAfterLeave () {
    const activeName = this.process[this.activeIndex].name
    const isComplete = this.activeIndex === this.process.length - 1

    this.$emit('closed', activeName, isComplete)
    this.destroyElement()
  }
  setActiveItem (index: number) {
    if (index >= this.process.length) {
      this.close()
      return
    }

    const { before, after } = this.process[index]

    const done = () => {
      if (typeof after === 'function') {
        this.$nextTick(after)
      }
      this.activeIndex = index
    }

    if (typeof before === 'function') {
      before(done)
    } else {
      done()
    }
  }
  open () {
    const indexDefault = this.process.findIndex(item => item.name === this.init)
    this.setActiveItem(indexDefault > -1 ? indexDefault : 0)
    this.visible = true
  }
  close () {
    const activeName = this.process[this.activeIndex].name
    const isComplete = this.activeIndex === this.process.length - 1

    this.visible = false
    this.$emit('close', activeName, isComplete)
  }
  destroyElement () {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}

import { Vue } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { ModalOptions } from '../types'
import TransitionFade from '@huteming/ui-transition-fade/src/main'
import { Container } from './work'
const bem = createBEM('modal')

@DescribedComponent({
  name: 'TmModal',
})
export default class TmModal extends Vue {
  render () {
    const {
      handleBeforeEnter, handleAfterEnter, handleBeforeLeave, handleAfterLeave, handleClick, handleTouchmove,
      visible,
    } = this

    return (
      <TransitionFade
        on-before-enter={ handleBeforeEnter }
        on-after-enter={ handleAfterEnter }
        on-before-leave={ handleBeforeLeave }
        on-after-leave={ handleAfterLeave }>
        <Container class={ bem() } v-show={ visible } on-click={ handleClick } on-touchmove={ handleTouchmove }></Container>
      </TransitionFade>
    )
  }

  show (options: ModalOptions) {
    this.setData(options)
    this.visible = true
  }
  hide (options: ModalOptions) {
    this.setData(options)
    this.visible = false
  }
  setData (data: object) {
    for (let key in data) {
      (this as any)[key] = (data as any)[key]
    }
  }

  handleClick (event: Event) {
    event.stopPropagation()
    /* istanbul ignore else */
    if (typeof this.click === 'function') {
      this.click()
    }
  }

  handleTouchmove (event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }

  disabledScroll () {
    /* istanbul ignore else */
    if (document.scrollingElement) {
      this.scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add('tm-disabled-scroll')
      document.body.style.top = -this.scrollTop + 'px'
    }
  }

  restoreScroll () {
    /* istanbul ignore else */
    if (document.scrollingElement) {
      document.body.classList.remove('tm-disabled-scroll')
      document.scrollingElement.scrollTop = this.scrollTop
      document.body.style.top = ''
    }
  }

  /**
   * 动画钩子
   */
  handleBeforeEnter () {
    /* istanbul ignore else */
    if (typeof this.beforeEnter === 'function') {
      this.beforeEnter()
    }
  }
  handleAfterEnter () {
    this.disabledScroll()
    /* istanbul ignore else */
    if (typeof this.afterEnter === 'function') {
      this.afterEnter()
    }
  }
  handleBeforeLeave () {
    this.restoreScroll()
    /* istanbul ignore else */
    if (typeof this.beforeLeave === 'function') {
      this.beforeLeave()
    }
  }
  handleAfterLeave () {
    if (this.leaveToDestroy) {
      this.destroy()
    }

    /* istanbul ignore else */
    if (typeof this.afterLeave === 'function') {
      this.afterLeave()
    }
  }
  destroy () {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }

  visible = false
  leaveToDestroy: boolean = true
  scrollTop = 0

  click?: Function
  beforeEnter?: Function
  afterEnter?: Function
  beforeLeave?: Function
  afterLeave?: Function
}

/**
 * 注意点
 * 1、根组件不能定义高度height，否则动画过程不能准确获取高度
 */
import { easeInOut } from 'packages/ui-animation/src/main'
import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue } from 'vue-property-decorator'

class TransitionCollapse extends Vue {
  render () {
    return (
      <transition css={ false } name="collapse"
        on-before-enter={ this.beforeEnter }
        on-enter={ this.enter }
        on-after-enter={ this.afterEnter }
        on-before-leave={ this.beforeLeave }
        on-leave={ this.leave }
        on-after-leave={ this.afterLeave }>
        { this.$slots.default }
      </transition>
    )
  }

  beforeEnter (el: HTMLDivElement) {
    el.dataset.oldOverflow = el.style.overflow || ''

    el.style.overflow = 'hidden'
    el.style.height = '0'
  }

  enter (el: HTMLDivElement, done: Function) {
    easeInOut(0, el.scrollHeight, (position: number, finished: boolean) => {
      el.style.height = position + 'px'
      if (finished) {
        done()
      }
    }, 250)
  }

  afterEnter (el: HTMLDivElement) {
    el.style.overflow = el.dataset.oldOverflow as string
    el.style.height = ''
  }

  beforeLeave (el: HTMLDivElement) {
    el.dataset.oldOverflow = el.style.overflow as string

    el.style.overflow = 'hidden'
    el.style.height = el.scrollHeight + 'px'
  }

  leave (el: HTMLDivElement, done: Function) {
    easeInOut(el.scrollHeight, 0, (position: number, finished: boolean) => {
      el.style.height = position + 'px'
      if (finished) {
        done()
      }
    }, 250)
  }

  afterLeave (el: HTMLDivElement) {
    el.style.overflow = el.dataset.oldOverflow as string
    el.style.height = ''
  }
}

export default withStyles()(TransitionCollapse, { name: 'TmTransitionCollapse' })

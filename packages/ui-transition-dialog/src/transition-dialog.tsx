/**
 * 注意点
 * 1、根组件不能定义高度height，否则动画过程不能准确获取高度
 */
import { easeOut } from 'packages/ui-animation/src/main'
import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue } from 'vue-property-decorator'

class TransitionDialog extends Vue {
    render () {
        return (
            <transition css={ false }
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

    beforeEnter (el: HTMLElement) {
        const scrollHeight = el.scrollHeight
        const screenHeight = document.documentElement.clientHeight
        el.style.transform = `translateY(-${scrollHeight / 2 + screenHeight / 2}px)`
    }

    enter (el: HTMLElement, done: Function) {
        const scrollHeight = el.scrollHeight
        const screenHeight = document.documentElement.clientHeight

        easeOut(-scrollHeight / 2 - screenHeight / 2, 0, (position: number, finished: boolean) => {
            el.style.transform = `translateY(-${position}px)`
            if (finished) {
                done()
            }
        }, 250)
    }

    afterEnter (el: HTMLElement) {
        el.style.transform = ''
    }

    beforeLeave (el: HTMLDivElement) {
        el.style.opacity = '1'
    }

    leave (el: HTMLDivElement, done: Function) {
        easeOut(1, 0, (opacity: number, finished: boolean) => {
            el.style.opacity = opacity.toString()
            if (finished) {
                done()
            }
        }, 75)
    }

    afterLeave (el: HTMLDivElement) {
        el.style.opacity = ''
        this.$emit('after-leave')
    }
}

export default withStyles()(TransitionDialog, { name: 'TmTransitionDialog' })

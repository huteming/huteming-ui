<script>
/**
 * 注意点
 * 1、根组件不能定义高度height，否则动画过程不能准确获取高度
 */
import { easeInOut } from 'web-util/animation/src/main'

export default {
    name: 'TmTransitionCollapse',
    functional: true,
    render (h, { children }) {
        const data = {
            props: {
                name: 'collapse',
                css: false,
            },
            on: {
                beforeEnter (el) {
                    el.dataset.oldOverflow = el.style.overflow

                    el.style.overflow = 'hidden'
                    el.style.height = 0
                },

                enter (el, done) {
                    easeInOut(0, el.scrollHeight, (position, finished) => {
                        el.style.height = position + 'px'
                        if (finished) {
                            done()
                        }
                    }, 250)
                },

                afterEnter (el) {
                    el.style.overflow = el.dataset.oldOverflow
                    el.style.height = ''
                },

                beforeLeave (el) {
                    el.dataset.oldOverflow = el.style.overflow

                    el.style.overflow = 'hidden'
                    el.style.height = el.scrollHeight + 'px'
                },

                leave (el, done) {
                    easeInOut(el.scrollHeight, 0, (position, finished) => {
                        el.style.height = position + 'px'
                        if (finished) {
                            done()
                        }
                    }, 250)
                },

                afterLeave (el) {
                    el.style.overflow = el.dataset.oldOverflow
                    el.style.height = ''
                },
            },
        }

        return h('transition-group', data, children)
    }
}
</script>

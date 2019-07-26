<script>
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
                    el.style.height = ''
                },

                beforeLeave (el) {
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
                    el.style.height = ''
                },
            },
        }

        return h('transition', data, children)
    }
}
</script>

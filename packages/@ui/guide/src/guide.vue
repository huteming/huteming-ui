<script>
import { isHtmlElement, isString } from 'web-util/types/src'
const PADDING_TOP = 5
const PADDING_LEFT = 5

export default {
    name: 'TmGuide',

    data () {
        return {
            visible: false,
            // { name, component, target, extra, before, after }
            process: [],
            // 初始渲染，对应 process 中的 name 值
            init: '',
            activeIndex: -1,
        }
    },

    render (h) {
        const { visible, handleClick, handleAfterLeave, handleTouchmove } = this
        const { component: ActiveComponent, extra, target } = this.process[this.activeIndex] || {}
        const { top, left, width, height } = (() => {
            let _target = null

            if (isHtmlElement(target)) {
                _target = target
            } else if (isString(target)) {
                _target = document.querySelector(target)
            }

            if (!_target) {
                // 这里不抛错，是因为在创建实例时，activeIndex 总是不存在，在 open 中才会根据 init 修改 activeIndex
                // throw new Error(`未找到目标dom: ${target}`)
                return {}
            }

            const { top, left } = _target.getBoundingClientRect()
            const width = _target.offsetWidth
            const height = _target.offsetHeight

            return { top, left, width, height }
        })()
        const styles = {
            top: `${top - PADDING_TOP}px`,
            left: `${left - PADDING_LEFT}px`,
            width: `${width + PADDING_LEFT * 2}px`,
            height: `${height + PADDING_TOP * 2}px`,
        }

        return (
            <transition name="fade" onAfterLeave={ handleAfterLeave }>
                <div class="tm-guide" onclick={ handleClick } v-show={ visible } ontouchmove={ handleTouchmove }>
                    <div class="tm-guide-container" style={ styles }>
                        <div class="tm-guide-line"></div>
                    </div>
                    <ActiveComponent top={ top } left={ left } width={ width } height={ height } extra={ extra } />
                </div>
            </transition>
        )
    },

    methods: {
        handleTouchmove (event) {
            event.stopPropagation()
            event.preventDefault()
        },
        handleClick (event) {
            event.stopPropagation()

            this.setActiveItem(this.activeIndex + 1)
        },
        handleAfterLeave () {
            const activeName = this.process[this.activeIndex].name
            const isComplete = this.activeIndex === this.process.length - 1

            this.$emit('closed', activeName, isComplete)
            this.destroyElement()
        },
        setActiveItem (index) {
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
        },
        open () {
            const indexDefault = this.process.findIndex(item => item.name === this.init)
            this.setActiveItem(indexDefault > -1 ? indexDefault : 0)
            this.visible = true
        },
        close () {
            const activeName = this.process[this.activeIndex].name
            const isComplete = this.activeIndex === this.process.length - 1

            this.visible = false
            this.$emit('close', activeName, isComplete)
        },
        destroyElement () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    },
}
</script>

import { easeOut } from 'web-util/animation/src/main'
import { attached, getScrollContainer, getScrollTop, getElementTop } from 'web-util/element/src/main'
const ELEMENT_ATTR_NAME = '@@Anchor'

const defaults = {
    selector: '',
    container: '',
    top: 0,
    duration: 300,
    done: null,
}

export default {
    name: 'Anchor',

    inserted (el: any, binding: any, vnode: any) {
        if (typeof binding.value === 'string') {
            binding.value = {
                selector: binding.value
            }
        }
        const options = Object.assign({}, defaults, binding.value)
        const { selector, container } = options

        // 获取 self 对象，作为 this 在各函数中共享数据
        const self = {
            el,
            vm: vnode.context,
            binding,
            options,

            scrollEventTarget: null,
            clickEventTarget: null,
        }

        // 主要执行操作
        const handlerClick = handleClick.bind(self)

        // 更新生命周期共享数据
        el[ELEMENT_ATTR_NAME] = {
            handlerClick,
            self,
        }

        attached(el, () => {
            self.clickEventTarget = document.querySelector(selector)
            self.scrollEventTarget = container ? document.querySelector(container) : getScrollContainer(el)
            el.addEventListener('click', handlerClick)
        })
    },

    unbind (el: any) {
        const { handlerClick } = el[ELEMENT_ATTR_NAME]

        el.removeEventListener('click', handlerClick)
    },
}

/**
 * 响应点击事件
 */
function handleClick (this: any) {
    if (!this.clickEventTarget) {
        console.warn(`selector[${this.options.selector}]有误。未找到指定dom`)
        return
    }

    const top = this.options.top * document.body.clientWidth / 750
    // 滚动条当前滚动位置
    const _from = getScrollTop(this.scrollEventTarget)
    // 结束位置
    const _to = getElementTop(this.clickEventTarget) - getElementTop(this.scrollEventTarget) + getScrollTop(this.scrollEventTarget) - top

    easeOut(_from, _to, (position: any, isFinish: any) => {
        this.scrollEventTarget.scrollTop = position

        if (isFinish && typeof this.options.done === 'function') {
            this.options.done(_to)
        }
    }, this.options.duration)
}

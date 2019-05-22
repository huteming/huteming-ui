import 'intersection-observer'
import { easeOut } from 'web-util/animation/src/main'
import { attached, getScrollEventTarget, getScrollTop } from 'web-util/element/src/main'
const ELEMENT_ATTR_NAME = '@@Anchor'

const defaults = {
    selector: '',
    container: '',
    observe: null,
    top: 0,
}

export default {
    name: 'Anchor',

    inserted (el, binding, vnode) {
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

            io: null,
            lastVisible: false,
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
            self.scrollEventTarget = container ? document.querySelector(container) : getScrollEventTarget(el)
            el.addEventListener('click', handlerClick)
            tryObserve.call(self)
        })
    },

    unbind (el) {
        const { handlerClick, self: { io } } = el[ELEMENT_ATTR_NAME]

        el.addEventListener('click', handlerClick)

        if (io) {
            io.disconnect()
        }
    },
}

/**
 * 响应点击事件
 */
function handleClick () {
    if (!this.clickEventTarget) {
        console.warn(`selector[${this.options.selector}]有误。未找到指定dom`)
        return
    }

    // 结束位置
    const top = this.options.top * document.body.clientWidth / 750
    const _to = getElementTop(this.clickEventTarget) - getElementTop(this.scrollEventTarget) + getScrollTop(this.scrollEventTarget) - top
    // 滚动条当前滚动位置
    const _from = getScrollTop(this.scrollEventTarget)

    easeOut(_from, _to, position => {
        this.scrollEventTarget.scrollTop = position
    })
}

function tryObserve () {
    const { options: { observe }, clickEventTarget, scrollEventTarget, el } = this
    if (!clickEventTarget || typeof observe !== 'function' || this.io) {
        return false
    }

    const optionsIO = {
        threshold: [0, 1],
    }
    if (scrollEventTarget !== window) {
        optionsIO.root = scrollEventTarget
    }

    const io = new IntersectionObserver(entries => {
        const visible = entries[0].intersectionRatio >= 1

        if (visible !== this.lastVisible) {
            observe(visible, el)
            this.lastVisible = visible
        }
    }, optionsIO)

    io.observe(clickEventTarget)

    this.io = io
}

function getElementTop (element) {
    if (element === window) {
        return getScrollTop(window)
    }

    return element.getBoundingClientRect().top + getScrollTop(window)
}

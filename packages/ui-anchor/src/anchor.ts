import { easeOut } from 'packages/ui-animation/src/main'
import { getScrollContainer, getScrollTop, getElementTop, scrollY } from 'packages/ui-element/src/main'
import { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { AnchorConfig, AnchorSelf } from '../types'
const ATTR = '@@Anchor'

const defaults = {
    selector: '', // 锚点目标选择器
    container: '',
    top: 0,
    duration: 300,
    done: null,
}

export default {
    registName: 'anchor',

    inserted (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        let value = binding.value
        if (typeof value === 'string') {
            value = {
                selector: value,
            }
        }
        const config: AnchorConfig = Object.assign({}, defaults, value)

        // 获取 self 对象，作为 this 在各函数中共享数据
        const self: AnchorSelf = {
            el,
            vm: vnode.context,
            config,

            scrollEventTarget: null,
            clickEventTarget: null,
        }

        // 主要执行操作
        const _handleClick = handleClick.bind(self)

        // 更新生命周期共享数据
        el[ATTR] = {
            handleClick: _handleClick,
            self,
        }

        el.addEventListener('click', _handleClick)
    },

    unbind (el: HTMLElement) {
        /* istanbul ignore next */
        const { handleClick = '' } = el[ATTR] || {}

        /* istanbul ignore next */
        if (handleClick) {
            el.removeEventListener('click', handleClick)
        }
        delete el[ATTR]
    },
}

/**
 * 响应点击事件
 */
function handleClick (this: AnchorSelf): void {
    const { el, config } = this
    const { selector, container, top, done, duration } = config

    if (!this.clickEventTarget) {
        this.clickEventTarget = document.querySelector(selector)
        this.scrollEventTarget = container ? document.querySelector(container) : getScrollContainer(el)
    }

    if (!this.clickEventTarget) {
        console.warn(`[@huteming/ui Warn][Carousel]selector is invalid: `, selector)
        return
    }

    const _top = top * document.body.clientWidth / 750
    // 滚动条当前滚动位置
    const _from = getScrollTop(this.scrollEventTarget)
    // 结束位置
    const _to = getElementTop(this.clickEventTarget) - getElementTop(this.scrollEventTarget) + getScrollTop(this.scrollEventTarget) - _top

    easeOut(_from, _to, (position: number, isFinish: boolean) => {
        scrollY(this.scrollEventTarget, position)

        if (isFinish && typeof done === 'function') {
            done(_to)
        }
    }, duration)
}

import { getScrollContainer } from 'web-util/element/src/main'
const ELEMENT_ATTR_NAME = '@@SmartScroll'
const defaults = {
    disabled: false,
}

export default {
    name: 'SmartScroll',

    bind (el) {
        el[ELEMENT_ATTR_NAME] = {
            event: {}
        }
    },

    inserted (el, binding) {
        if (typeof binding.value === 'boolean') {
            binding.value = {
                disabled: binding.value
            }
        }
        const options = Object.assign({}, defaults, binding.value)

        const self = {
            el,
            options,

            scrollable: null,
            startY: 0
        }
        const handlerTouchstart = handleTouchstart.bind(self)
        const handlerTouchmove = handleTouchmove.bind(self)
        const handlerTouchend = handleTouchend.bind(self)

        el.addEventListener('touchstart', handlerTouchstart)
        el.addEventListener('touchmove', handlerTouchmove)
        el.addEventListener('touchend', handlerTouchend)

        el[ELEMENT_ATTR_NAME].event = {
            handlerTouchstart,
            handlerTouchmove,
            handlerTouchend
        }
    },

    unbind (el) {
        const { handlerTouchstart, handlerTouchmove, handlerTouchend } = el[ELEMENT_ATTR_NAME].event
        el.removeEventListener('touchstart', handlerTouchstart)
        el.removeEventListener('touchmove', handlerTouchmove)
        el.removeEventListener('touchend', handlerTouchend)
    }
}

function handleTouchstart (event) {
    if (this.options.disabled) {
        return false
    }
    const finger = event.changedTouches[0]

    // 垂直位置标记
    this.startY = finger.pageY
    // 获取可滚动元素
    this.scrollable = getScrollContainer(event.target, false, this.el)
}

function handleTouchmove (event) {
    if (this.options.disabled) {
        return false
    }
    if (!this.scrollable) {
        return event.cancelable && event.preventDefault()
    }
    const finger = event.changedTouches[0]
    const maxscroll = this.scrollable.scrollHeight - this.scrollable.clientHeight
    // 当前的滚动高度
    const scrollTop = this.scrollable.scrollTop
    // 滑动距离。向下为正，向上为负
    const moveY = finger.pageY - this.startY

    // 如果不足于滚动，则禁止触发整个窗体元素的滚动
    if (maxscroll <= 0) {
        return event.cancelable && event.preventDefault()
    }

    // 上边缘检测
    if (moveY > 0 && scrollTop === 0) {
        return event.cancelable && event.preventDefault()
    }

    // 下边缘检测
    if (moveY < 0 && scrollTop + 1 >= maxscroll) {
        return event.cancelable && event.preventDefault()
    }
}

function handleTouchend (event) {
    if (this.options.disabled) {
        return false
    }
}

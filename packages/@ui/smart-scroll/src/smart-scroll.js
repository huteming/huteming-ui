import { getScrollContainer } from 'web-util/element/src/main'
const ELEMENT_ATTR_NAME = '@@SmartScroll'
const defaults = {
    // callback (moveY) {},
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
            console.log(1)
            console.log(1)
            console.log(1)
            binding.value = {
                disabled: binding.value
            }
        }
        if (typeof binding.value === 'function') {
            binding.value = {
                callback: binding.value
            }
        }
        const options = Object.assign({}, defaults, binding.value)

        const self = {
            el,
            options,

            scrollable: null,
            startX: 0,
            startY: 0,
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
        console.log(2)
        console.log(2)
        console.log(2)
        return false
    }
    const finger = event.changedTouches[0]

    // 位置标记
    this.startX = finger.pageX
    this.startY = finger.pageY
    // 获取可滚动父元素
    this.scrollable = getScrollContainer(event.target, false, this.el)
}

function handleTouchmove (event) {
    if (this.options.disabled) {
        console.log(3)
        console.log(3)
        console.log(3)
        return false
    }
    const finger = event.changedTouches[0]
    const moveX = finger.pageX - this.startX
    const moveY = finger.pageY - this.startY

    if (!this.scrollable) {
        return preventMove.call(this, event, { moveX, moveY })
    }

    const maxscroll = this.scrollable.scrollHeight - this.scrollable.clientHeight
    // 当前的滚动高度
    const scrollTop = this.scrollable.scrollTop

    // 如果不足于滚动，则禁止触发整个窗体元素的滚动
    if (maxscroll <= 0) {
        return preventMove.call(this, event, { moveX, moveY })
    }

    // 上边缘检测
    if (moveY > 0 && scrollTop === 0) {
        return preventMove.call(this, event, { moveX, moveY })
    }

    // 下边缘检测
    if (moveY < 0 && scrollTop + 1 >= maxscroll) {
        return preventMove.call(this, event, { moveX, moveY })
    }
}

function handleTouchend (event) {
    if (this.options.disabled) {
        console.log(4)
        console.log(4)
        console.log(4)
        return false
    }
}

function preventMove (event, payload) {
    if (event.cancelable) {
        event.preventDefault()
    } else {
        console.log(5)
        console.log(5)
        console.log(5)
    }
    if (typeof this.options.callback === 'function') {
        console.log(6)
        console.log(6)
        console.log(6)
        this.options.callback(payload)
    }
}

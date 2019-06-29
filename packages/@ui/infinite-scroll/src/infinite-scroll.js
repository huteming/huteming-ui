import { attached, getScrollTop, getScrollContainer, getElementTop } from 'web-util/element/src/main'
const CTX = '@@InfiniteScroll'
const defaults = {
    callback: null,
    distance: 50,
    timeout: 1000,
    disabled: false,
}

export default {
    name: 'InfiniteScroll',

    bind (el, binding, vnode) {
        if (typeof binding.value === 'function') {
            binding.value = {
                callback: binding.value
            }
        }
        const { immediate } = binding.modifiers

        const options = Object.assign({}, defaults, binding.value, { immediate })

        el[CTX] = {
            binded: false,
            loading: false,

            el,
            vm: vnode.context,
            options,

            scrollEventTarget: null,
            scrollListener: null,
        }

        const self = el[CTX]

        attached(el, doBind.bind(self))
    },

    update (el, binding) {
        if (!(binding.value instanceof Object)) {
            return false
        }

        const { disabled } = binding.value

        el[CTX].options.disabled = disabled
    },

    unbind (el) {
        if (el[CTX] && el[CTX].scrollEventTarget) {
            el[CTX].scrollEventTarget.removeEventListener('scroll', el[CTX].scrollListener)
        }
    },
}

function doBind () {
    if (this.binded) return
    this.binded = true

    const directive = this

    directive.scrollEventTarget = getScrollContainer(directive.el)
    directive.beforeScrollTop = getScrollTop(directive.scrollEventTarget)
    directive.scrollListener = throttle(checkReachBottom.bind(directive), 200)
    directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener)

    if (directive.options.immediate) {
        checkReachBottom.call(directive)
    }

    directive.vm.$on('infinite-scroll', function () {
        checkReachBottom.call(directive)
    })
}

/**
 * 判断是否滑动到底部
 */
function checkReachBottom () {
    if (this.options.disabled || this.loading) return

    const viewportScrollTop = getScrollTop(this.scrollEventTarget)
    const viewportBottom = viewportScrollTop + getVisibleHeight(this.scrollEventTarget) + this.options.distance
    const isSlideDown = viewportScrollTop >= this.beforeScrollTop
    this.beforeScrollTop = viewportScrollTop

    if (!isSlideDown) {
        return false
    }

    let shouldTrigger = false

    if (this.scrollEventTarget === this.el) {
        shouldTrigger = viewportBottom >= this.scrollEventTarget.scrollHeight
    } else {
        const elementBottom = getElementTop(this.el) - getElementTop(this.scrollEventTarget) + this.el.offsetHeight + viewportScrollTop

        shouldTrigger = viewportBottom >= elementBottom
    }

    if (shouldTrigger && typeof this.options.callback === 'function') {
        this.loading = true

        this.options.callback(() => {
            this.loading = false
        })
    }
}

/**
 * 获取元素可见高度
 */
function getVisibleHeight (element) {
    if (element === window) {
        return document.documentElement.clientHeight
    }

    return element.clientHeight
}

/**
 * 节流函数
 */
function throttle (fn, delay) {
    let now
    let lastExec
    let timer
    let context
    let args

    const execute = function () {
        fn.apply(context, args)
        lastExec = now
    }

    return function () {
        context = this
        args = arguments

        now = Date.now()

        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        if (lastExec) {
            const diff = delay - (now - lastExec)
            if (diff < 0) {
                execute()
            } else {
                timer = setTimeout(() => {
                    execute()
                }, diff)
            }
        } else {
            execute()
        }
    }
}

/**
 * 设置滚动条位置，兼容原生scrollTo
 * @param {*Node} element
 * @param {Number} x x轴方向
 * @param {Number} y y轴方向
 */
export function scrollX (element, x) {
    if (element === window) {
        document.body.scrollLeft = x
        document.documentElement.scrollLeft = x
        return true
    }
    element.scrollLeft = x
}

export function scrollY (element, x) {
    if (element === window) {
        document.body.scrollTop = x
        document.documentElement.scrollTop = x
        return true
    }
    element.scrollTop = x
}

export function scrollTo (element, x, y) {
    scrollX(element, x)
    scrollY(element, y)
}

/**
 * 获取需要绑定事件的元素
 */
export function getScrollEventTarget (element) {
    let currentNode = element

    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        if (isYScrollable(currentNode)) {
            return currentNode
        }
        currentNode = currentNode.parentNode
    }

    return window
}

/**
 * 获取滚动条位置
 * @param {Element} element 可滚动dom
 */
export function getScrollTop (element) {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop, document.body.scrollTop)
    }

    return element.scrollTop
}

/**
 * 检测 element 是否已插入文档
 * @param {Element} element 待插入文档的dom
 * @param {Function} handler 回调函数
 */
export function attached (element, handler) {
    if (isAttached(element)) {
        handler()
        return true
    }

    // let bindTryCount = 0
    tryBind()

    function tryBind () {
        // if (bindTryCount > 10) return

        // bindTryCount++
        if (isAttached(element)) {
            handler()
        } else {
            setTimeout(tryBind, 100)
        }
    }
}

function isAttached (element) {
    let currentNode = element.parentNode

    while (currentNode) {
        if (currentNode.tagName === 'HTML') {
            return true
        }
        if (currentNode.nodeType === 11) {
            return false
        }
        currentNode = currentNode.parentNode
    }

    return false
}

export function isYScrollable (element) {
    const { overflow, overflowY } = window.getComputedStyle(element)
    const inOverflow = overflow === 'scroll' || overflow === 'auto'
    const inOverflowY = overflowY === 'scroll' || overflowY === 'auto'

    if (inOverflow || inOverflowY) {
        return true
    }
    return false
}

export function isXScrollable (element) {
    const { overflow, overflowX } = window.getComputedStyle(element)
    const inOverflow = overflow === 'scroll' || overflow === 'auto'
    const inOverflowX = overflowX === 'scroll' || overflowX === 'auto'

    if (inOverflow || inOverflowX) {
        return true
    }
    return false
}

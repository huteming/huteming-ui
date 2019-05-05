/**
 * 获取需要绑定事件的元素
 */
export function getScrollEventTarget (element) {
    let currentNode = element

    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        const overflowY = getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
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

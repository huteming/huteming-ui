/**
 * 设置滚动条位置，兼容原生scrollTo
 * @param {*Node} element
 * @param {Number} x x轴方向
 * @param {Number} y y轴方向
 */
export function scrollX (element, x) {
    if (element === window) {
        document.body && (document.body.scrollLeft = x)
        document.documentElement && (document.documentElement.scrollLeft = x)
        return true
    }
    element.scrollLeft = x
}

export function scrollY (element, x) {
    if (element === window) {
        document.body && (document.body.scrollTop = x)
        document.documentElement && (document.documentElement.scrollTop = x)
        return true
    }
    element.scrollTop = x
}

export function scrollTo (element, x, y) {
    scrollX(element, x)
    scrollY(element, y)
}

/**
 * 获取X轴滚动条位置
 * @param {Element} element 可滚动dom
 */
export function getScrollLeft (element) {
    if (element === window) {
        return Math.max(window.pageXOffset || 0, document.documentElement.scrollLeft, document.body.scrollLeft)
    }

    return element.scrollLeft
}

/**
 * 获取Y轴滚动条位置
 * @param {Element} element 可滚动dom
 */
export function getScrollTop (element) {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop, document.body.scrollTop)
    }

    return element.scrollTop
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
 * 检测 element 是否已插入文档
 * @param {Element} element 待插入文档的dom
 * @param {Function} success 成功回调函数
 * @param {Function} fail 失败回调函数
 */
const optionsAttached = {
    timeout: 100,
    maxCount: 10,
}
export function attached (element, success, fail, options = {}) {
    // 第三个参数允许传配置对象，此时失败回调取对象中的fail属性
    if (typeof fail === 'object') {
        options = fail
        fail = options.fail
    }

    const { timeout, maxCount } = Object.assign({}, optionsAttached, options)
    let tryCount = 0

    if (isAttached(element)) {
        success(tryCount)
        return true
    }

    function tryBind () {
        tryCount++

        if (tryCount > maxCount) {
            if (typeof fail === 'function') {
                fail(tryCount)
            }
            return false
        }

        if (isAttached(element)) {
            success(tryCount)
            return true
        }

        setTimeout(tryBind, timeout)
    }

    setTimeout(tryBind, timeout)
}

function isAttached (element) {
    element = typeof element === 'string' ? document.querySelector(element) : element

    if (!element) {
        return false
    }

    let currentNode = element.parentNode

    while (currentNode) {
        if (currentNode.tagName === 'HTML') {
            return true
        }
        // DocumentFragment
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

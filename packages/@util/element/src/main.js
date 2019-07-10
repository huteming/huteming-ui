const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

/**
 * 检测是否在容器内可视
 */
export function isInContainer (element, container) {
    if (!element || !container) return false

    const elRect = element.getBoundingClientRect()
    let containerRect

    if ([window, document, document.documentElement].includes(container)) {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0
        }
    } else {
        containerRect = container.getBoundingClientRect()
    }

    return elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top &&
        elRect.right > containerRect.left &&
        elRect.left < containerRect.right
}

/**
 * 监听事件
 */
export function on (element, event, handler) {
    if (element && event && handler) {
        element.addEventListener(event, handler, false)
    }
}

/**
 * 移除监听
 */
export function off (element, event, handler) {
    if (element && event) {
        element.removeEventListener(event, handler, false)
    }
}

/**
 * 添加样式前缀，一般在自定义 style 时使用
 */
export function autoprefixer (style) {
    if (typeof style !== 'object') {
        return style
    }

    const rules = ['transform', 'transition', 'animation']
    const prefixes = ['ms-', 'webkit-']

    rules.forEach(rule => {
        const value = style[rule]
        if (rule && value) {
            prefixes.forEach(prefix => {
                style[prefix + rule] = value
            })
        }
    })

    return style
}

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
 * 获取dom距离屏幕上端的位置
 */
export function getElementTop (element) {
    if (element === window) {
        return getScrollTop(window)
    }

    return element.getBoundingClientRect().top + getScrollTop(window)
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

/**
 * 转换为驼峰命名
 */
export function camelCase (name) {
    return name
        .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter
        })
        .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export function getStyle (element, styleName) {
    if (!element || !styleName) return null

    styleName = camelCase(styleName)
    if (styleName === 'float') {
        styleName = 'cssFloat'
    }

    try {
        const computed = document.defaultView.getComputedStyle(element)
        return element.style[styleName] || computed ? computed[styleName] : null
    } catch (e) {
        return element.style[styleName]
    }
}

/**
 * 检测是否支持滚动
 */
export function isScroll (element, vertical) {
    let styleName

    if (vertical === null || vertical === undefined) {
        styleName = 'overflow'
    } else if (vertical) {
        styleName = 'overflow-y'
    } else {
        styleName = 'overflow-x'
    }
    const overflow = getStyle(element, styleName)

    return /(scroll|auto)/.test(overflow)
}

/**
 * 最近一个 overflow 值为 auto 或 scroll 的父元素
 * @argument {HTMLElement} element
 * @argument {Boolean} vertical 是否限制为垂直方向
 * @argument {HTMLElement} container 限制顶层容器，默认是window
 */
export function getScrollContainer (element, vertical, container) {
    let parent = element

    while (parent) {
        if (container && parent === container) {
            return container
        }
        if ([window, document, document.documentElement].includes(parent)) {
            return window
        }
        if (isScroll(parent, vertical)) {
            return parent
        }
        parent = parent.parentNode
    }

    return parent
}

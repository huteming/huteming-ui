import './compatible'

/*
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
*/
export const tween = {
    linear (t, b, c, d) {
        return c * t / d + b
    },
    easeIn (t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOut (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOut (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b
        }

        return -c / 2 * ((--t) * (t - 2) - 1) + b
    },
}

/**
 * 通用动画函数
 * @param {*Number} from 开始位置
 * @param {*Number} to 结束位置
 * @param {*Function} callback 变化的位置回调, 支持两个参数, value和isEnding, 表示当前的位置值（数值）以及是否动画结束了（布尔值）
 * @param {*Number} duration 总持续时间毫秒数
 */
export function animation (type, from, to, callback, duration = 300) {
    from = Number(from)
    to = Number(to)

    if (isNaN(from)) {
        throw new Error('from类型错误。起始位置参数必须为数字')
    }

    if (isNaN(to)) {
        throw new Error('to类型错误。结束位置参数必须为数字')
    }

    if (typeof callback !== 'function') {
        throw new Error('callback 必须是函数')
    }

    if (from === to) {
        return false
    }

    let t = 0
    let b = from
    let c = to - from
    let d = Math.ceil(duration / 17)

    function step () {
        // 时间递增
        t++

        // 当前的运动位置
        const value = tween[type](t, b, c, d)

        // 运动已到位
        if (t >= d) {
            callback(value, true)
            return
        }

        callback(value, false)
        window.requestAnimationFrame(step)
    }

    step()
}

export function linear (...args) {
    animation('linear', ...args)
}

export function easeIn (...args) {
    animation('easeIn', ...args)
}

export function easeOut (...args) {
    animation('easeOut', ...args)
}

export function easeInOut (...args) {
    animation('easeInOut', ...args)
}

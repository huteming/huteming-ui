import { Draw } from './declare/abstract'
import { DrawArcOption, DrawArcConfig } from './declare/drawArc'
import { ArcTypes } from './declare/enum'

const defaults = {
    startDegrees: 0, // 开始角度
    endDegrees: 360, // 结束角度
    direction: false, // 方向。false: 顺时针, true: 逆时针
    lineWidth: 1,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    color: '#fff', // 画笔颜色
    fillColor: '', // 默认值为 color
    strokeColor: '', // 默认值为 color
    type: [ArcTypes.Stroke], // 闭合方式
}
/**
 * 绘画圆弧
 * @argument {*Number} x 左上角 x 坐标
 * @argument {*Number} y 左上角 y 坐标
 * @argument {*Number} r 半径
 * @argument {Object} options 配置
 *
 * @returns {Object} options
 */
export default function (this: Draw, x: number, y: number, r: number, options: DrawArcOption = {}): DrawArcConfig {
    const config = formatOptions.call(this, x, y, r, options)
    setContextConfig.call(this, config)

    drawArc.call(this, config)

    return config
}

export function formatOptions (this: Draw, x: number, y: number, r: number, options: DrawArcOption): DrawArcConfig {
    const { ratio } = this
    const _x = (x + r) * ratio
    const _y = (y + r) * ratio
    const _r = r * ratio

    const config = Object.assign({ x: _x, y: _y, r: _r }, defaults, options)

    config.shadowOffsetX *= ratio
    config.shadowOffsetY *= ratio
    config.shadowBlur *= ratio

    config.fillColor = config.fillColor || config.color
    config.strokeColor = config.strokeColor || config.color

    if (typeof config.type === 'string') {
        config.type = [config.type]
    }
    if (config.type.length > 1) {
        const _type = config.type.slice()
        // 排序 => [closePath, stroke, fill]
        _type.sort((prev, next) => {
            if (next === 'closePath') {
                return 1
            }
            if (prev !== 'closePath' && next === 'stroke') {
                return 1
            }
            return -1
        })
        config.type = _type
    }

    return config
}

export function setContextConfig (this: Draw, config: DrawArcConfig): void {
    const { context } = this
    const { fillColor, strokeColor, shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur, lineWidth } = config

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineWidth
    context.shadowColor = shadowColor
    context.shadowOffsetX = shadowOffsetX
    context.shadowOffsetY = shadowOffsetY
    context.shadowBlur = shadowBlur
}

export function drawArc (this: Draw, config: DrawArcConfig): void {
    const { context } = this
    const radians = Math.PI / 180
    const {
        x,
        y,
        r,
        startDegrees,
        endDegrees,
        direction,
        type,
    } = config

    context.beginPath()
    context.arc(x, y, r, radians * startDegrees, radians * endDegrees, direction)
    type.forEach((item: ArcTypes) => {
        if (typeof context[item] !== 'function') {
            console.warn(`CanvasRenderingContext2D 上不存在该方法: ${item}`)
            return
        }
        context[item]()
    })
}

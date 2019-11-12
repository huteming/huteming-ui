import { Draw } from './declare/abstract'
import { DrawImageOption, DrawImageConfig } from './declare/drawImage'

const defaults = {
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
}
/**
 * @argument {*Image} image 图片对象
 * @argument {*Number} x 图片左上角 x 坐标
 * @argument {*Number} y 图片左上角 y 坐标
 * @argument {*Number} width 绘制宽度
 * @argument {*Number} height 绘制高度
 * @argument {Object} options
 *
 * @returns {Object} options
 */
export default function (this: Draw, image: HTMLCanvasElement | HTMLImageElement, x: number, y: number, width: number, height: number, options: DrawImageOption = {}): DrawImageConfig {
    const config = formatOptions.call(this, x, y, width, height, options)
    setContextConfig.call(this, config)
    drawImage.call(this, image, config)

    return config
}

export function formatOptions (this: Draw, x: number, y: number, width: number, height: number, options: DrawImageOption): DrawImageConfig {
    const { ratio } = this

    const _x = x * ratio
    const _y = y * ratio
    const _width = width * ratio
    const _height = height * ratio

    const config = Object.assign({
        x: _x,
        y: _y,
        width: _width,
        height: _height,
    }, defaults, options)

    config.shadowOffsetX *= ratio
    config.shadowOffsetY *= ratio
    config.shadowBlur *= ratio

    return config
}

export function setContextConfig (this: Draw, config: DrawImageConfig): void {
    const { context } = this
    const { shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur } = config

    context.shadowColor = shadowColor
    context.shadowOffsetX = shadowOffsetX
    context.shadowOffsetY = shadowOffsetY
    context.shadowBlur = shadowBlur
}

export function drawImage (this: Draw, image: HTMLCanvasElement | HTMLImageElement, config: DrawImageConfig): void {
    const { context } = this
    const { x, y, width, height } = config

    context.drawImage(image, x, y, width, height)
}

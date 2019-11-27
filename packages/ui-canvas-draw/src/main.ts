import drawArc from './drawArc'
import drawText from './drawText'
import drawRect from './drawRect'
import drawLine from './drawLine'
import drawImage from './drawImage'
import getBlurryArea from './getBlurryArea'
import createCanvas from './createCanvas'
import getSystemRatio from './getSystemRatio'
import { ImageTypes } from '../types/enum'
import { DrawArcOption, DrawArcConfig } from '../types/drawArc'
import { DrawImageOption, DrawImageConfig } from '../types/drawImage'
import { DrawTextOption, DrawTextConfig } from '../types/drawText'
import { CanvasOption, CanvasConfig, DrawRectOption, DrawRectConfig, DrawLineOption, DrawLineConfig } from '../types'

const defaultCanvas = {
    designWidth: 750,
}

/**
 * @argument {*Number} width 设计稿上画布宽度
 * @argument {*Number} height 设计稿上画布高度
 *
 * @argument {Number} designWidth 设计稿标准宽度
 */
export default class CanvasDraw {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    ratio: number // 屏幕实际宽度 / 设计稿宽度
    scale: number // canvas放大比例
    scaleBySystem: number // 微信浏览器文字大小放大比例
    canvasWidth: number // 经过放大后的画布宽度
    canvasHeight: number // 经过放大后的画布高度

    private callbacks: Function[] = [] // 绘图函数
    private errorHandler: Function = console.error // 异常处理
    options: CanvasConfig

    constructor (width: number, height: number, options: CanvasOption) {
        const _options: CanvasConfig = Object.assign({}, defaultCanvas, options)
        const { designWidth } = _options
        const { context, canvas, canvasWidth, canvasHeight, ratio, scale } = createCanvas(width, height, designWidth)

        this.options = _options

        this.context = context
        this.ratio = ratio
        this.canvas = canvas
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.scale = scale
        this.scaleBySystem = getSystemRatio()
    }

    drawText (this: CanvasDraw, text: string, x: number, y: number, options: DrawTextOption): DrawTextConfig {
        return drawText.call(this, text, x, y, options)
    }

    drawImage (this: CanvasDraw, image: HTMLImageElement | HTMLCanvasElement, x: number, y: number, width: number, height: number, options: DrawImageOption): DrawImageConfig {
        return drawImage.call(this, image, x, y, width, height, options)
    }

    drawArc (this: CanvasDraw, x: number, y: number, r: number, options: DrawArcOption): DrawArcConfig {
        return drawArc.call(this, x, y, r, options)
    }

    drawRect (this: CanvasDraw, x: number, y: number, width: number, height: number, options: DrawRectOption): DrawRectConfig {
        return drawRect.call(this, x, y, width, height, options)
    }

    drawLine (this: CanvasDraw, startX: number, startY: number, endX: number, endY: number, options: DrawLineOption): DrawLineConfig {
        return drawLine.call(this, startX, startY, endX, endY, options)
    }

    getBlurryArea (this: CanvasDraw, radius: number, x: number, y: number, width: number, height: number): HTMLCanvasElement {
        return getBlurryArea.call(this, radius, x, y, width, height)
    }

    add (callback: (instance?: CanvasDraw) => void): CanvasDraw {
        if (typeof callback !== 'function') {
            return this
        }
        this.callbacks.push(callback)
        return this
    }

    onerror (callback: Function): void {
        this.errorHandler = callback
    }

    done (type = ImageTypes.PNG): string {
        this.callbacks.forEach(handler => {
            try {
                this.context.save()
                handler(this)
            } catch (err) {
                this.errorHandler(err)
            } finally {
                this.context.restore()
            }
        })
        const dataURL = this.canvas.toDataURL(`image/${type}`, 1.0)

        return dataURL
    }
}

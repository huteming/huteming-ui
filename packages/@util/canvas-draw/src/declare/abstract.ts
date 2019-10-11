import createCanvas from '../createCanvas'
import getSystemRatio from '../getSystemRatio'
import {
    CanvasConfig, DrawRectOption, DrawRectConfig,
    DrawLineOption, DrawLineConfig, CanvasOption
} from './types'
import { ImageTypes } from './enum'
import { DrawArcOption, DrawArcConfig } from './drawArc'
import { DrawImageOption, DrawImageConfig } from './drawImage'
import { DrawTextOption, DrawTextConfig } from './drawText'

const defaultCanvas = {
    designWidth: 750,
}
/**
 * @argument {*Number} width 设计稿上画布宽度
 * @argument {*Number} height 设计稿上画布高度
 *
 * @argument {Number} designWidth 设计稿标准宽度
 */
export abstract class Draw {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    ratio: number // 屏幕实际宽度 / 设计稿宽度
    scale: number // canvas放大比例
    scaleBySystem: number // 微信浏览器文字大小放大比例
    canvasWidth: number // 经过放大后的画布宽度
    canvasHeight: number // 经过放大后的画布高度

    _callbacks: Function[] // 绘图函数
    _options: CanvasConfig
    _onerror: Function // 异常处理

    abstract add(callback: (instance?: Draw) => void): Draw
    abstract onerror(callback: Function): void
    abstract done(type: ImageTypes): string

    constructor (width: number, height: number, options: CanvasOption) {
        const _options: CanvasConfig = Object.assign({}, defaultCanvas, options)
        const { designWidth } = _options
        const { context, canvas, canvasWidth, canvasHeight, ratio, scale } = createCanvas(width, height, designWidth)

        this._callbacks = []
        this._options = _options
        this._onerror = console.error

        this.context = context
        this.ratio = ratio
        this.canvas = canvas
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.scale = scale
        this.scaleBySystem = getSystemRatio()
    }
}

export interface Render {
    drawText(this: Draw, text: string, x: number, y: number, options: DrawTextOption): DrawTextConfig
    drawArc(this: Draw, x: number, y: number, r: number, options: DrawArcOption): DrawArcConfig
    drawRect(this: Draw, x: number, y: number, width: number, height: number, options: DrawRectOption): DrawRectConfig
    drawLine(this: Draw, startX: number, startY: number, endX: number, endY: number, options: DrawLineOption): DrawLineConfig
    drawImage(this: Draw, image: HTMLImageElement | HTMLCanvasElement, x: number, y: number, width: number, height: number, options: DrawImageOption): DrawImageConfig
    getBlurryArea(this: Draw, radius: number, x: number, y: number, width: number, height: number): HTMLCanvasElement
}

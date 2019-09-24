import log from 'web/assets/js/log'
import { imageDataRGBA } from 'stackblur-canvas'
import drawText from './drawText'

const defaultCanvas = {
    designWidth: 750,
}
/**
 * @argument {*Number} width 设计稿上画布宽度
 * @argument {*Number} height 设计稿上画布高度
 *
 * @argument {Number} designWidth 设计稿标准宽度
 */
export default class Canvas {
    _onerror: any
    _callbacks: any
    _options: any
    context: any
    ratio: any
    canvas: any
    canvasWidth: any
    canvasHeight: any
    scale: any
    scaleBySystem: any
    drawArc: any
    drawRect: any
    drawText: any
    drawLine: any
    drawImage: any
    getBlurryArea: any

    constructor (width = 750, height = 1206, optionsCanvas = {}) {
        const _options = Object.assign({}, defaultCanvas, optionsCanvas)
        const { designWidth } = _options
        const { context, canvas, canvasWidth, canvasHeight, ratio, scale } = getCanvasObject(width, height, designWidth)
        const scaleBySystem = getSystemRatio()

        this._onerror = console.error // 异常处理
        this._callbacks = [] // 绘图函数
        this._options = _options

        this.context = context
        this.ratio = ratio
        this.canvas = canvas
        this.canvasWidth = canvasWidth // 画布宽度
        this.canvasHeight = canvasHeight // 画布高度
        this.scale = scale
        this.scaleBySystem = scaleBySystem // 微信浏览器文字大小放大比例

        this.add = this.add.bind(this)
        this.done = this.done.bind(this)

        this.drawArc = drawArc.bind(this)
        this.drawRect = drawRect.bind(this)
        this.drawText = drawText.bind(this)
        this.drawLine = drawLine.bind(this)
        this.drawImage = drawImage.bind(this)
        this.getBlurryArea = getBlurryArea.bind(this)
    }

    add (callback: any) {
        const self = {
            context: this.context,
            ratio: this.ratio,
            canvas: this.canvas,
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
            scale: this.scale,
            scaleBySystem: this.scaleBySystem,
        }

        this._callbacks.push(() => {
            log('------------- start -------------')
            this.context.save()

            try {
                callback(self)
            } catch (err) {
                this._onerror(err)
            }

            this.context.restore()
            log('------------- end -------------')
        })
    }

    onerror (callback: any) {
        this._onerror = callback
    }

    done (type = 'png') {
        this._callbacks.forEach((fn: any) => fn())
        const dataURL = this.canvas.toDataURL(`image/${type}`, 1.0)
        log('------------- done -------------')

        return dataURL
    }
}

// helpers -------------------------------------------------------

/**
 * 获取 canvas 对象
 * @argument {Number} width 设计稿上画布宽度
 * @argument {Number} height 设计稿上画布高度
 *
 * @returns {Object} context, canvas, canvasWidth, canvasHeight, ratio
 */
export function getCanvasObject (width: any, height: any, designWidth: any) {
    const canvas = document.createElement('canvas')
    const context: any = canvas.getContext('2d')

    const ratio = document.documentElement.clientWidth / designWidth
    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
                                   context.mozBackingStorePixelRatio ||
                                   context.msBackingStorePixelRatio ||
                                   context.oBackingStorePixelRatio ||
                                   context.backingStorePixelRatio || 1

    const scale = devicePixelRatio / backingStorePixelRatio

    canvas.width = width * ratio * scale
    canvas.height = height * ratio * scale

    context.scale(scale, scale)

    return {
        context,
        canvas,
        canvasWidth: width * ratio,
        canvasHeight: height * ratio,
        ratio,
        scale,
    }
}

// 微信浏览器调整字体大小适配比例
function getSystemRatio () {
    const $dom = document.createElement('div')
    // fixbug: 在safari10以下 报错attempted to assign to readonly property
    // $dom.style = 'font-size: 10px;'
    $dom.style.fontSize = '10px'
    document.body.appendChild($dom)
    const scaledFontSize = parseInt(window.getComputedStyle($dom, null).getPropertyValue('font-size')) // 计算出放大后的字体
    document.body.removeChild($dom)
    const ratioSystem = scaledFontSize / 10 // 计算原字体和放大后字体的比例

    return ratioSystem
}

/**
 * 创建一个新的模糊的canvas
 * @param {*Number} radius 模糊程度 the radius of the blur
 * @param {*Number} x 截取区域的左上角 x 坐标
 * @param {*Number} y 截取区域的左上角 y 坐标
 * @param {*Number} width 截取区域的宽度
 * @param {*Number} height 截取区域的高度
 */
function getBlurryArea (this: any, radius: any, x: any, y: any, width: any, height: any) {
    const { ratio, context, _options, scale } = this
    const { designWidth } = _options

    const _x = x * ratio * scale
    const _y = y * ratio * scale
    const _width = width * ratio * scale
    const _height = height * ratio * scale

    // 创建相同尺寸参数的 canvas
    const { canvas: _canvas, context: _context } = getCanvasObject(width, height, designWidth)
    // 获取需要模糊处理区域图像数据
    const data = context.getImageData(_x, _y, _width, _height)
    // 模糊处理
    imageDataRGBA(data, 0, 0, data.width, data.height, radius)
    // 将模糊的图像数据再渲染到画布上面
    _context.putImageData(data, 0, 0)

    return _canvas
}

const defaultArc = {
    startDegrees: 0, // 开始角度
    endDegrees: 360, // 结束角度
    direction: false, // 方向。false: 顺时针, true: 逆时针
    lineWidth: 1,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    color: '#fff', // 画笔颜色
    type: 'stroke', // 闭合方式
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
function drawArc (this: any, x: any, y: any, r: any, options: any = {}) {
    log(`draw arc *** x:${x} *** y: ${y} *** r: ${r}`)
    const { context, ratio } = this
    const radians = Math.PI / 180
    options = Object.assign({}, defaultArc, options)

    x = (x + r) * ratio
    y = (y + r) * ratio
    r *= ratio
    options.shadowOffsetX *= ratio
    options.shadowOffsetY *= ratio
    options.shadowBlur *= ratio

    const {
        startDegrees,
        endDegrees,
        direction,
        color,
        shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur,
        type,
        lineWidth
    } = options

    context[`${type}Style`] = color
    context.lineWidth = lineWidth
    context.shadowColor = shadowColor
    context.shadowOffsetX = shadowOffsetX
    context.shadowOffsetY = shadowOffsetY
    context.shadowBlur = shadowBlur

    context.beginPath()
    context.arc(x, y, r, radians * startDegrees, radians * endDegrees, direction)
    context[type]()

    return options
}

const defaultRect = {
    r: 0, // 圆角半径
    lineWidth: 1,
    color: '#fff',
    type: 'fill',
}
/**
 * @argument {*Number} x 矩形左上角 x 坐标
 * @argument {*Number} y 矩形左上角 y 坐标
 * @argument {*Number} width 绘制宽度
 * @argument {*Number} height 绘制高度
 * @argument {Object} options
 *
 * @returns {Object} options
 */
function drawRect (this: any, x: any, y: any, width: any, height: any, options: any = {}) {
    log(`draw rect *** x: ${x} *** y: ${y} *** width: ${width} *** height: ${height}`)
    const { context, ratio } = this
    const radians = Math.PI / 180
    options = Object.assign({}, defaultRect, options)

    let { type, color, r, lineWidth } = options
    let r1: any = 0
    let r2: any = 0
    let r3: any = 0
    let r4: any = 0
    // 当r是字符串时，认为是四个圆角用空格分离，顺序 左上、右上、右下、左下
    // 格式: '1 2 3 4'
    if (typeof r === 'string') {
        [r1, r2 = 0, r3 = 0, r4 = 0] = r.split(' ')
        r1 = r1 || 0
    } else {
        r1 = r2 = r3 = r4 = r
    }

    x *= ratio
    y *= ratio
    width *= ratio
    height *= ratio
    r1 *= ratio
    r2 *= ratio
    r3 *= ratio
    r4 *= ratio

    context[`${type}Style`] = color
    context.lineWidth = lineWidth

    context.beginPath()
    context.moveTo(x, y + Math.abs(r1))

    // 左上圆角
    if (r1 >= 0) {
        context.arc(x + r1, y + r1, r1, radians * 180, radians * 270, false)
    } else {
        context.arc(x, y, Math.abs(r1), radians * 90, 0, true)
    }

    // 矩形上边线
    context.lineTo(x + width - Math.abs(r2), y)

    // 右上圆角
    if (r2 >= 0) {
        context.arc(x + width - r2, y + r2, r2, radians * 270, 0, false)
    } else {
        context.arc(x + width, y, Math.abs(r2), radians * 180, radians * 90, true)
    }

    // 矩形右边线
    context.lineTo(x + width, y + height - Math.abs(r3))

    // 右下圆角
    if (r3 >= 0) {
        context.arc(x + width - r3, y + height - r3, r3, 0, radians * 90, false)
    } else {
        context.arc(x + width, y + height, Math.abs(r3), radians * 270, radians * 180, true)
    }

    // 矩形下边线
    context.lineTo(x + Math.abs(r4), y + height)

    // 左下圆角
    if (r4 >= 0) {
        context.arc(x + r4, y + height - r4, r4, radians * 90, radians * 180, false)
    } else {
        context.arc(x, y + height, Math.abs(r4), 0, radians * 270, true)
    }

    // 矩形左边线
    context.lineTo(x, y + Math.abs(r1))

    context.closePath()

    context[type]()

    return options
}

const defaultLine = {
    dashed: [], // 虚线
    lineWidth: 1, // 画笔宽度
    color: '#000',
}
/**
 * @argument {*Number} startX 线条开始 x 坐标
 * @argument {*Number} startY 线条开始 y 坐标
 * @argument {*Number} endX 线条结束 y 坐标
 * @argument {*Number} endY 线条结束 y 坐标
 * @argument {Object} options
 *
 * @returns {Object} options
 */
function drawLine (this: any, startX: any, startY: any, endX: any, endY: any, options: any = {}) {
    log(`draw line *** (${startX}, ${startY}) *** (${endX}, ${endY})`)
    const { context, ratio } = this
    options = Object.assign({}, defaultLine, options)

    const { color, lineWidth, dashed } = options

    startX *= ratio
    startY *= ratio
    endX *= ratio
    endY *= ratio

    context.strokeStyle = color
    context.lineWidth = lineWidth

    context.beginPath()
    context.setLineDash(dashed)
    context.moveTo(startX, startY)
    context.lineTo(endX, endY)
    context.stroke()

    return options
}

const defaultImage = {
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
function drawImage (this: any, image: any, x: any, y: any, width: any, height: any, options: any = {}) {
    log(`draw image *** x: ${x} *** y: ${y} *** width: ${width} *** height: ${height} *** ${image.src}`)
    const { context, ratio } = this
    options = Object.assign({}, defaultImage, options)

    x *= ratio
    y *= ratio
    width *= ratio
    height *= ratio
    options.shadowOffsetX *= ratio
    options.shadowOffsetY *= ratio
    options.shadowBlur *= ratio

    const { shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur } = options

    context.shadowColor = shadowColor
    context.shadowOffsetX = shadowOffsetX
    context.shadowOffsetY = shadowOffsetY
    context.shadowBlur = shadowBlur

    context.drawImage(image, x, y, width, height)

    return options
}

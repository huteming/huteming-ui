import log from 'web/assets/js/log'
import { imageDataRGBA } from 'stackblur-canvas'

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
    constructor (width = 750, height = 1206, optionsCanvas = {}) {
        const _options = Object.assign({}, defaultCanvas, optionsCanvas)
        const { designWidth } = _options
        const { context, canvas, canvasWidth, canvasHeight, ratio, scale } = getCanvasObject(width, height, designWidth)

        this._onerror = console.error // 异常处理
        this._callbacks = [] // 绘图函数
        this._options = _options

        this.context = context
        this.ratio = ratio
        this.canvas = canvas
        this.canvasWidth = canvasWidth // 画布宽度
        this.canvasHeight = canvasHeight // 画布高度
        this.scale = scale

        this.add = this.add.bind(this)
        this.done = this.done.bind(this)

        this.drawArc = drawArc.bind(this)
        this.drawRect = drawRect.bind(this)
        this.drawText = drawText.bind(this)
        this.drawLine = drawLine.bind(this)
        this.drawImage = drawImage.bind(this)
        this.getBlurryArea = getBlurryArea.bind(this)
    }

    add (callback) {
        const self = {
            context: this.context,
            ratio: this.ratio,
            canvas: this.canvas,
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
            scale: this.scale,
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

    onerror (callback) {
        this._onerror = callback
    }

    done (type = 'png') {
        this._callbacks.forEach(fn => fn())
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
export function getCanvasObject (width, height, designWidth) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

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

/**
 * 创建一个新的模糊的canvas
 * @param {*Number} radius 模糊程度 the radius of the blur
 * @param {*Number} x 截取区域的左上角 x 坐标
 * @param {*Number} y 截取区域的左上角 y 坐标
 * @param {*Number} width 截取区域的宽度
 * @param {*Number} height 截取区域的高度
 */
function getBlurryArea (radius, x, y, width, height) {
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
function drawArc (x, y, r, options = {}) {
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
function drawRect (x, y, width, height, options = {}) {
    log(`draw rect *** x: ${x} *** y: ${y} *** width: ${width} *** height: ${height}`)
    const { context, ratio } = this
    const radians = Math.PI / 180
    options = Object.assign({}, defaultRect, options)

    let { type, color, r, lineWidth } = options
    let r1 = 0
    let r2 = 0
    let r3 = 0
    let r4 = 0
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

const defaultText = {
    prefix: '', // 前缀
    suffix: '', // 后缀
    fix: '.... ', // 过长省略时添加字符串
    maxWidth: Infinity, // 最长宽度，会在末尾加上 fix 字符串，一般搭配前缀 后缀使用
    style: 'normal', // 字体的风格 normal, italic, oblique
    variant: 'normal', // 字体变体 normal, small-caps
    weight: 'normal', // 字体的粗细 bold bolder lighter 100 200 300 400 500 600 700 800 900
    size: 24, // 字号
    lineHeight: 0, // 行高 （若不存在，则在运行时会重置为 size）
    align: 'start', // 对齐方式 start, end, center, left, right
    baseline: 'top', // 文本基线, alphabetic, top, hanging, middle, ideographic, bottom
    letterSpacing: 0,
    lineWidth: 1, // 画笔宽度
    wrap: false, // 是否换行
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    color: '#000',
    type: 'fill',
    underline: null,
}
/**
 * @argument {*String} text 文本
 * @argument {*Number} x x 坐标
 * @argument {*Number} y y 坐标
 * @argument {Object} options
 *
 * @returns {Object} options
 */
function drawText (text, x, y, options = {}) {
    log(`draw text *** text: ${text} *** x: ${x} *** y: ${y}`)
    const { context, ratio } = this
    options = Object.assign({}, defaultText, options)

    x *= ratio
    y *= ratio
    options.maxWidth *= ratio
    options.size *= ratio
    options.lineHeight = (options.lineHeight * ratio) || options.size
    options.letterSpacing = options.letterSpacing * ratio
    options.shadowOffsetX *= ratio
    options.shadowOffsetY *= ratio
    options.shadowBlur *= ratio

    let {
        prefix, suffix, fix, letterSpacing, wrap, maxWidth,
        style, variant, weight, size, color, align,
        shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur,
        lineHeight, lineWidth, baseline, type, underline,
    } = options

    context.font = `${style} ${variant} ${weight} ${size}px / ${lineHeight}px arial`
    context.lineWidth = lineWidth
    context[`${type}Style`] = color
    context.shadowColor = shadowColor
    context.shadowOffsetX = shadowOffsetX
    context.shadowOffsetY = shadowOffsetY
    context.shadowBlur = shadowBlur
    context.textBaseline = baseline

    const prefixArray = stringToArray(prefix)
    const suffixArray = stringToArray(suffix)
    const textArray = stringToArray(text)

    if (!wrap) {
        const prefixWidth = getArrayTextWidth.call(this, prefixArray, letterSpacing, true)
        const suffixWidth = getArrayTextWidth.call(this, suffixArray, letterSpacing, true)
        const textWidth = getArrayTextWidth.call(this, textArray, letterSpacing)
        // console.log(prefixWidth, suffixWidth, textWidth, context.measureText(fix).width, maxWidth)

        if (prefixWidth + suffixWidth + textWidth > maxWidth) {
            const residueWidth = maxWidth - prefixWidth - suffixWidth - context.measureText(fix).width

            for (let i = textArray.length - 1; i >= 0; i--) {
                textArray.pop()

                if (getArrayTextWidth.call(this, textArray, letterSpacing) <= residueWidth) {
                    const last = textArray[textArray.length - 1]
                    textArray[textArray.length - 1] = `${last}${fix}`
                    break
                }
            }
        }
    }

    text = [].concat(prefixArray, textArray, suffixArray)
    const actualWidth = Math.min(maxWidth, getArrayTextWidth.call(this, text, letterSpacing, false))
    // 临时修改为文本左对齐
    context.textAlign = 'left'

    // 根据水平对齐方式确定第一个字符的坐标
    if (align === 'center') {
        x = x - actualWidth / 2
    } else if (align === 'right') {
        x = x - actualWidth
    }

    let actualX = x
    let actualY = y
    let _expectMaxWidth = 0
    let _actualMaxWidth = 0
    let _totalLine = 1 // 总共占行
    // 开始逐字绘制
    text.forEach((letter) => {
        const letterWidth = context.measureText(letter).width

        // 另起一行画
        if (actualX + letterWidth > maxWidth + x) {
            _expectMaxWidth = 0
            _totalLine++
            actualX = x
            actualY = actualY + lineHeight
        }
        // 当前行画

        context[`${type}Text`](letter, actualX, actualY)
        if (underline) {
            context.fillRect(actualX - 4, actualY + size + 1, letterWidth + 8, 1)
        }

        // 最大宽度累加
        _expectMaxWidth += (letterSpacing + letterWidth)
        // x轴位置累加
        actualX += (letterWidth + letterSpacing)

        // 记录实际最大宽度
        _actualMaxWidth = Math.max(_actualMaxWidth, _expectMaxWidth)
    })

    // 最大宽度应该减去最后的字体间距
    options.actualMaxWidth = (_actualMaxWidth - letterSpacing) / ratio

    // 记录实际最大高度
    options.actualMaxHeight = (_totalLine * size + (_totalLine - 1) * (lineHeight - size) / 2) / ratio

    // 对齐方式还原
    context.textAlign = align

    return options
}

function stringToArray (string) {
    string = string.toString()
    let start = -1
    let end = -1
    const res = []

    string.split('').forEach((letter, index) => {
        if (/[0-9a-zA-Z]/.test(letter)) {
            if (start > -1) {
                end = index + 1
            } else {
                start = index
                end = index + 1
            }
        } else {
            if (start > -1) {
                res.push(string.substring(start, end))
                start = -1
            }
            res.push(letter)
        }
    })

    if (start > -1) {
        res.push(string.substring(start, end))
    }

    return res
}

export function getArrayTextWidth (array, letterSpacing, fix = false) {
    const { context } = this
    const length = array.length
    let width = 0

    array.forEach((letter, index) => {
        width += (index === length - 1 ? 0 : letterSpacing)
        width += context.measureText(letter).width
    })

    if (fix && length > 1) {
        width += letterSpacing
    }

    return width
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
function drawLine (startX, startY, endX, endY, options = {}) {
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
function drawImage (image, x, y, width, height, options = {}) {
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

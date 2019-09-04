const defaults = {
    fix: '.... ', // 过长省略时添加字符串
    maxWidth: Infinity, // 最长宽度，会在末尾加上 fix 字符串，一般搭配前缀 后缀使用
    style: 'normal', // 字体的风格 normal, italic, oblique
    variant: 'normal', // 字体变体 normal, small-caps
    weight: 'normal', // 字体的粗细 bold bolder lighter 100 200 300 400 500 600 700 800 900
    size: 24, // 字号
    lineHeight: 0, // 行高 （若不存在，则在运行时会重置为 size * 1.5）
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
    underline: {},
}
const defaultUnderline = {
    left: 10,
    right: 10,
    bottom: 6,
    dashed: [],
    lineWidth: 1,
}

// 格式化系数
export function getOptions (x, y, options = {}) {
    const { ratio } = this
    options = {
        x,
        y,
        ...defaults,
        ...options,
    }
    options.underline = {
        ...defaultUnderline,
        ...options.underline,
    }

    options.x *= ratio
    options.y *= ratio
    options.maxWidth *= ratio
    options.size *= ratio
    options.lineHeight = (options.lineHeight * ratio) || options.size * 1.5
    options.letterSpacing = options.letterSpacing * ratio
    options.shadowOffsetX *= ratio
    options.shadowOffsetY *= ratio
    options.shadowBlur *= ratio

    options.underline.left *= ratio
    options.underline.right *= ratio
    options.underline.bottom *= ratio

    return options
}

// 设置上下文参数
export function setContextOptions (options) {
    const { context, scaleBySystem } = this

    const {
        style, variant, weight, size, color,
        shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur,
        lineHeight, lineWidth, baseline, type,
    } = options

    // size / scaleBySystem 这段解决微信浏览器用户字体放大的问题
    context.font = `${style} ${variant} ${weight} ${size / scaleBySystem}px/${lineHeight}px arial`
    context.lineWidth = lineWidth
    context[`${type}Style`] = color
    context.shadowColor = shadowColor
    context.shadowOffsetX = shadowOffsetX
    context.shadowOffsetY = shadowOffsetY
    context.shadowBlur = shadowBlur
    context.textBaseline = baseline
}

// 计算文本的总宽度
export function calcTextWidth (textArray, options) {
    const { context } = this
    const { letterSpacing, underline: underlineOptions } = options
    const { left, right } = underlineOptions
    const length = textArray.length
    let width = 0

    textArray.forEach((item, index) => {
        const { letter, underline } = item
        const prev = textArray[index - 1]
        const next = textArray[index + 1]
        const isFirst = !prev // 首字母
        const isLast = !next // 尾字母
        const notInPrev = isFirst || (prev && !prev.underline) // 上一个没有下划线
        const notInNext = isLast || (next && !next.underline) // 下一个没有下划线
        const inCurrent = !!underline

        // 字体间距
        if (index > 0 && index < length - 1) {
            width += letterSpacing
        }
        // 字体宽度
        width += context.measureText(letter).width

        if (inCurrent && notInPrev) {
            if (isFirst) {
                width += left
            } else {
                width += left * 2
            }
        }

        if (inCurrent && notInNext) {
            if (isLast) {
                width += right
            } else {
                width += right * 2
            }
        }
    })

    return width
}

// 解析添加下划线属性
// [{ letter }] => [{ letter, underline }]
export function parseUnderline (text) {
    const parse = (item) => {
        const { letter } = item
        const regUnderline = /(.*)<underline>(.*)<\/underline>(.*)/
        const result = letter.match(regUnderline)
        const res = []

        if (!result) {
            if (letter) {
                res.push({ ...item, letter, underline: false })
            }
            return res
        }

        const [, matchBefore, matchUnderline, matchAfter] = result
        if (matchAfter) {
            res.unshift({ ...item, letter: matchAfter, underline: false })
        }
        if (matchUnderline) {
            res.unshift({ ...item, letter: matchUnderline, underline: true })
        }
        res.unshift(...parse({ ...item, letter: matchBefore }))

        return res
    }

    // console.log('before parseUnderline', text)
    const res = []
    text.forEach(item => res.push(...parse(item)))
    // console.log('after parseUnderline', res)
    return res
}

// 合并作为一个字符绘制的类型。如 相连数字该作为一个整体，不换行
// [{ letter }] => [{ letter }]
export function parseType (text) {
    const parse = (item) => {
        const { letter } = item
        let start = -1
        let end = -1
        const res = []

        letter.split('').forEach((char, index) => {
            if (/[0-9a-zA-Z]/.test(char)) {
                if (start > -1) {
                    end = index + 1
                } else {
                    start = index
                    end = index + 1
                }
            } else {
                if (start > -1) {
                    res.push({
                        ...item,
                        letter: letter.substring(start, end),
                    })
                    start = -1
                }
                res.push({
                    ...item,
                    letter: char,
                })
            }
        })

        if (start > -1) {
            res.push({
                ...item,
                letter: letter.substring(start, end),
            })
        }

        return res
    }

    // console.log('before parseType', text)
    const res = []
    text.forEach(item => res.push(...parse(item)))
    // console.log('after parseType', res)

    return res
}

// todo: 拆解逻辑
// 解析添加坐标属性
// [{ letter }] => [{ letter, letterWidth, x, y }]
export function parsePosition (textArray, options) {
    const { context } = this
    const { x, y, maxWidth, wrap, fix, lineHeight, underline: underlineOption, letterSpacing, align, size } = options
    const fixWidth = context.measureText(fix).width
    const letters = []
    const underlines = []

    const actualX = (() => {
        const textWidth = calcTextWidth.call(this, textArray, options)
        const actualWidth = Math.min(maxWidth, textWidth)
        // 根据水平对齐方式确定第一个字符的坐标
        switch (align) {
        case 'center':
            return x - actualWidth / 2
        case 'right':
            return x - actualWidth
        default:
            return x
        }
    })()
    let renderX = actualX
    let renderY = y

    for (let i = 0; i < textArray.length; i++) {
        const item = textArray[i]
        const { letter, underline } = item
        const letterWidth = context.measureText(letter).width
        const prev = letters[i - 1]
        const next = textArray[i + 1]

        // 计算文案的坐标
        // 另起一行画
        const _maxWidth = wrap ? maxWidth + x : maxWidth + x - fixWidth
        if (renderX + letterWidth > _maxWidth) {
            if (!wrap) {
                letters.push({
                    ...prev,
                    letter: fix,
                    letterWidth: fixWidth,
                    x: renderX,
                    y: renderY,
                })
                break
            }
            renderX = actualX
            renderY = renderY + lineHeight
        }

        const isFirst = !prev // 首字母
        const isLast = !next // 尾字母
        const notInPrev = isFirst || (prev && !prev.underline) // 上一个没有下划线
        const notInNext = isLast || (next && !next.underline) // 下一个没有下划线
        const newline = prev && prev.y !== renderY // 相比于上一个，是新的行
        const inCurrent = !!underline

        // 第一个下划线字符，actualX 应该加上下划线宽出文字的左间距
        if (inCurrent && notInPrev) {
            const space = (() => {
                // 不是段落首字母，多加一段 left 作为上一个字符和下划线的距离
                if (!isFirst && !newline) {
                    return underlineOption.left * 2
                }
                return underlineOption.left
            })()

            renderX += space
        }

        letters.push({
            ...item,
            letterWidth,
            x: renderX,
            y: renderY,
        })

        // 计算下划线的坐标
        const signEnd = (char, x, y) => {
            // 因为一定是按顺序确定点，所以这里一定是确定了最近一条线的终点
            const line = underlines[underlines.length - 1]
            line.endLetter = char
            line.endX = x
            line.endY = y
        }
        const signStart = (char, x, y) => {
            underlines.push({
                startLetter: char,
                startX: x,
                startY: y,
            })
        }

        // 下划线首字母 标记开始
        if (inCurrent && notInPrev) {
            signStart(letter, renderX - underlineOption.left, renderY + size + underlineOption.bottom)
        }

        // 新的一行 标记结束/标记开始
        if (inCurrent && newline && !notInPrev) {
            // 注意顺序，因为标记结束是取最后一个
            signEnd(prev.letter, prev.x + prev.letterWidth, prev.y + size + underlineOption.bottom)
            signStart(letter, renderX, renderY + size + underlineOption.bottom)
        }

        // 下划线尾字母 标记结束
        if (inCurrent && notInNext) {
            signEnd(letter, renderX + letterWidth + underlineOption.right, renderY + size + underlineOption.bottom)
        }

        // x轴位置累加
        renderX += (letterWidth + letterSpacing)

        // 最后一个下划线字符，累加下划线宽出文字的右间距
        if (underline && (!next || !next.underline)) {
            renderX += (underlineOption.right * 2)
        }
    }

    return [letters, underlines]
}

export function drawText (textArray, options) {
    const { context } = this
    const { type } = options

    textArray.forEach(item => {
        const { x, y, letter } = item
        context[`${type}Text`](letter, x, y)
    })
}

export function drawUnderlines (lines, options) {
    const { context } = this
    const { underline: { lineWidth, dashed } } = options
    context.save()

    context.lineWidth = lineWidth

    lines.forEach(item => {
        const { startX, startY, endX, endY } = item
        context.beginPath()
        context.setLineDash(dashed)
        context.moveTo(startX, startY)
        context.lineTo(endX, endY)
        context.stroke()
    })

    context.restore()
}

/**
 * @argument {*String} text 文本
 * @argument {*Number} x x 坐标
 * @argument {*Number} y y 坐标
 * @argument {Object} options
 *
 * @returns {Object} options
 */
export default function (text, _x, _y, options) {
    options = getOptions.call(this, _x, _y, options)
    setContextOptions.call(this, options)

    // 示例: 'hello<underline>underline</underline>12345world'
    // => [{ text: 'hello<underline>underline</underline>12345world' }]
    const _text = [{ letter: text.toString() }]
    // => [{ letter: 'hello', underline: false }, { letter: 'underline', underline: true }, { letter: '12345world', underline: false }]
    const _underlined = parseUnderline(_text)
    // => [{ letter: 'h', underline: false }, ..., { letter: 'u', underline: true }, ..., { letter: '12345', underline: false }, { letter: 'w', underline: false }, ...]
    const _typed = parseType(_underlined)
    const [renderTexts, renderUnderlines] = parsePosition.call(this, _typed, options)

    drawText.call(this, renderTexts, options)
    drawUnderlines.call(this, renderUnderlines, options)

    return options
}

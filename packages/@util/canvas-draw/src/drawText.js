const defaults = {
    prefix: '', // 前缀
    suffix: '', // 后缀
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
    underline: {
        left: 10,
        right: 10,
        bottom: 6,
        dashed: [],
        lineWidth: 1,
    },
}

// 格式化系数
export function getOptions (x, y, options) {
    const { ratio } = this
    options = Object.assign({ x, y }, defaults, options)

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

// 解析添加下划线属性
export function parseUnderline (text) {
    // console.log('before parseUnderline', text)
    const parse = (item) => {
        const { letter } = item
        const regUnderline = /(.*)<underline>(.*)<\/underline>(.*)/
        const result = letter.match(regUnderline)
        const res = []

        if (!result) {
            res.push({ ...item, letter, underline: false })
            return res
        }

        const [, matchBefore, matchUnderline, matchAfter] = result
        res.unshift({ ...item, letter: matchAfter, underline: false })
        res.unshift({ ...item, letter: matchUnderline, underline: true })
        res.unshift(...parse({ ...item, letter: matchBefore }))

        return res
    }

    const res = []
    text.forEach(item => res.push(...parse(item)))
    // console.log('after parseUnderline', res)
    return res
}

// 合并作为一个字符绘制的类型。如 相连数字该作为一个整体，不换行
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

// 将文本转换为数组对象格式 [{ letter, underline }]
export function toArray (text) {
    // 示例: 'hello<underline>underline</underline>12345world'
    // => [{ text: 'hello<underline>underline</underline>12345world' }]
    const _text = [{ letter: text.toString() }]
    // => [{ letter: 'hello', underline: false }, { letter: 'underline', underline: true }, { letter: '12345world', underline: false }]
    const _underlined = parseUnderline(_text)
    // => [{ letter: 'h', underline: false }, ..., { letter: 'u', underline: true }, ..., { letter: '12345', underline: false }, { letter: 'w', underline: false }, ...]
    const _typed = parseType(_underlined)

    return _typed
}

// 计算文本的总宽度
export function calcTextWidth (text, fix, options) {
    const { context } = this
    const { letterSpacing, underline: underlineOptions } = options
    const { left, right } = underlineOptions
    const length = text.length
    let width = 0

    text.forEach((item, index) => {
        const { letter, underline } = item
        // 字体间距
        if (index > 0 && index < length - 1) {
            width += letterSpacing
        }
        // 宽出字体左边的下划线宽度
        if (underline) {
            width += left
        }
        // 字体宽度
        width += context.measureText(letter).width

        if (index === length - 1) {
            // 宽出字体右边的下划线宽度
            if (underline) {
                width += right
            }

            // 补一个字体间距
            if (fix) {
                width += letterSpacing
            }
        }
    })

    return width
}

// 获取待渲染文本
// 可能会因为 maxWidth, prefix, suffix 等属性 截取/补充 文本
export function confirmRenderText (prefixArray, textArray, suffixArray, options) {
    const { context } = this
    const { wrap, fix, maxWidth } = options
    const renderText = textArray.concat()

    if (!wrap) {
        const prefixWidth = calcTextWidth.call(this, prefixArray, true, options)
        const suffixWidth = calcTextWidth.call(this, suffixArray, true, options)
        const textWidth = calcTextWidth.call(this, renderText, false, options)

        if (prefixWidth + suffixWidth + textWidth > maxWidth) {
            const residueWidth = maxWidth - prefixWidth - suffixWidth - context.measureText(fix).width

            for (let i = renderText.length - 1; i >= 0; i--) {
                renderText.pop()

                if (calcTextWidth.call(this, renderText, false, options) <= residueWidth) {
                    const last = renderText[renderText.length - 1]
                    renderText[renderText.length - 1] = {
                        ...last,
                        letter: `${last.letter}${fix}`,
                    }
                    break
                }
            }
        }
    }

    return [...prefixArray, ...renderText, ...suffixArray]
}

// 确定文字渲染坐标
export function confirmRenderPosition (totalText, options) {
    const { context } = this
    const { x, y, lineHeight, maxWidth, underline: underlineOption, align, letterSpacing } = options

    // 确定各个文字坐标
    let actualX = x
    let actualY = y
    const renderText = []
    const actualWidth = Math.min(maxWidth, calcTextWidth.call(this, totalText, false, options))

    // 根据水平对齐方式确定第一个字符的坐标
    if (align === 'center') {
        actualX = actualX - actualWidth / 2
    } else if (align === 'right') {
        actualX = actualX - actualWidth
    }

    totalText.forEach((item, index) => {
        const { letter, underline } = item
        const letterWidth = context.measureText(letter).width

        // 另起一行画
        if (actualX + letterWidth > maxWidth + x) {
            actualX = x
            actualY = actualY + lineHeight
        }

        // 首字母 + 上一个没有下划线，actualX 应该加上下划线宽出文字的左间距
        if (underline) {
            const prev = renderText[index - 1]

            if (!prev || !prev.underline) {
                let space = underlineOption.left
                // 上一个没有下划线 + 在同一行，多加一段 left 作为上一个字符和下划线的距离
                if (prev && !prev.underline && prev.y === actualY) {
                    space = underlineOption.left * 2
                }

                actualX += space
            }
        }

        renderText.push({
            ...item,
            letterWidth,
            x: actualX,
            y: actualY,
        })

        // x轴位置累加
        actualX += (letterWidth + letterSpacing)

        // 如果是最后一个或者下一个没有下划线，累加下划线宽出文字的右间距
        if (underline) {
            const next = totalText[index + 1]

            if (!next || !next.underline) {
                actualX += (underlineOption.right * 2)
            }
        }
    })

    return renderText
}

// 确定下划线
export function confirmRenderUnderlines (text, options) {
    const { underline: underlineOption, size } = options
    const res = []

    text.forEach((item, index) => {
        const { letter, x, y, underline, letterWidth } = item

        if (underline) {
            const prev = text[index - 1]
            // 首字母 + 上一个没有下划线 + 换行 需要标记下划线起始坐标
            if (!prev || !prev.underline || prev.y !== y) {
                let startX = x - underlineOption.left
                if (prev && prev.underline) {
                    startX = x
                }

                res.push({
                    startLetter: letter,
                    startX: startX,
                    startY: y + size + underlineOption.bottom,
                })
            }

            const next = text[index + 1]
            // 末字母 + 下一个没有下划线 + 换行 需要标记下环线结束坐标
            if (!next || !next.underline || next.y !== y) {
                // 因为一定是按顺序确定点，所以这里一定是确定了最近一条线的终点
                let endX = x + letterWidth + underlineOption.right
                if (next && next.underline) {
                    endX = x + letterWidth
                }
                const line = res[res.length - 1]
                line.endLetter = letter
                line.endX = endX
                line.endY = y + size + underlineOption.bottom
            }
        }
    })

    return res
}

export function drawText (text, options) {
    const { context } = this
    const { type } = options

    text.forEach(item => {
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
    const { prefix, suffix } = options

    const prefixArray = toArray(prefix)
    const suffixArray = toArray(suffix)
    const textArray = toArray(text)

    const renderText = confirmRenderText.call(this, prefixArray, textArray, suffixArray, options)
    // console.log(renderText)
    const renderTextWithPosition = confirmRenderPosition.call(this, renderText, options)
    // console.log(renderTextWithPosition)
    const renderUnderlines = confirmRenderUnderlines.call(this, renderTextWithPosition, options)
    // console.log(renderUnderlines)

    drawText.call(this, renderTextWithPosition, options)
    drawUnderlines.call(this, renderUnderlines, options)

    return options
}

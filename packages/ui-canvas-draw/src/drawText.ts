import { DrawTextOption, DrawTextConfig, Letter, Underline, Through, LetterRender, UnderlineRender, ThroughRender } from '../types/drawText'
import { LineTypes } from '../types/enum'
import CanvasDraw from './main'

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
  wrap: 0, // 换行次数，不包括第一行。true => Infinity; false => 0
  shadowColor: '',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
  color: '#000',
  type: LineTypes.FillText,
  underline: {
    left: 10,
    right: 10,
    bottom: 6,
    dashed: [],
    lineWidth: 1,
  },
}

/**
 * @argument {*String} text 文本
 * @argument {*Number} x x 坐标
 * @argument {*Number} y y 坐标
 * @argument {Object} options
 *
 * @returns {Object} options
 */
export default function (this: CanvasDraw, text: string, _x: number, _y: number, options: DrawTextOption = {}): DrawTextConfig {
  const config: DrawTextConfig = getConfig.call(this, _x, _y, options)
  setContextOptions.call(this, config)

  // 示例: 'hello<underline>underline</underline>12345中文'
  const _text = [{ letter: text.toString() }]
  const _underlined = parseUnderline(_text)
  const _throughed = parseThrough(_underlined)
  const _typed = parseType(_throughed)
  // => [{ letter: 'hello', underline: false }, ..., { letter: '12345', underline: false }, { letter: '中', underline: false }, ...]

  const renderTexts = getRenderText.call(this, _typed, config)
  const renderUnderlines = getRenderUnderlines.call(this, renderTexts, config)
  const renderThroughes = getRenderThroughes.call(this, renderTexts, config)

  drawText.call(this, renderTexts, config)
  drawUnderlines.call(this, renderUnderlines, config)
  drawThrough.call(this, renderThroughes, config)

  const optionWithStatistic = addStatistic.call(this, renderTexts, config)

  return optionWithStatistic
}

// 格式化系数
export function getConfig (this: CanvasDraw, x: number, y: number, options: DrawTextOption = {}): DrawTextConfig {
  const { ratio } = this
  const configUnderline = Object.assign({}, defaults.underline, options.underline)

  configUnderline.left *= ratio
  configUnderline.right *= ratio
  configUnderline.bottom *= ratio

  const config: DrawTextConfig = Object.assign({ x, y, actualMaxWidth: 0, actualMaxHeight: 0 }, defaults, options, { underline: configUnderline })

  config.x *= ratio
  config.y *= ratio
  config.maxWidth *= ratio
  config.size *= ratio
  config.lineHeight = (config.lineHeight * ratio) || config.size * 1.5
  config.letterSpacing = config.letterSpacing * ratio
  config.shadowOffsetX *= ratio
  config.shadowOffsetY *= ratio
  config.shadowBlur *= ratio

  if (typeof config.wrap === 'boolean') {
    config.wrap = config.wrap === true ? Infinity : 0
  }

  // 低版本兼容
  if ((config.type as string) === 'fill') {
    config.type = LineTypes.FillText
  } else if ((config.type as string) === 'stroke') {
    config.type = LineTypes.StrokeText
  }

  return config
}

// 设置上下文参数
export function setContextOptions (this: CanvasDraw, config: DrawTextConfig): void {
  const { context, scaleBySystem } = this
  const {
    style, variant, weight, size, color,
    shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur,
    lineHeight, lineWidth, baseline,
  } = config

  // size / scaleBySystem 这段解决微信浏览器用户字体放大的问题
  context.font = `${style} ${variant} ${weight} ${size / scaleBySystem}px/${lineHeight}px arial`
  context.lineWidth = lineWidth
  context.fillStyle = color
  context.strokeStyle = color
  context.shadowColor = shadowColor
  context.shadowOffsetX = shadowOffsetX
  context.shadowOffsetY = shadowOffsetY
  context.shadowBlur = shadowBlur
  context.textBaseline = baseline
}

// 计算文本的总宽度
export function calcTextWidth (this: CanvasDraw, textArray: Letter[], config: DrawTextConfig): number {
  const { context } = this
  const { letterSpacing, underline: underlineOptions } = config
  const { left, right } = underlineOptions
  const length = textArray.length
  let width = 0

  textArray.forEach((item: Letter, index: number) => {
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
export function parseUnderline (textArray: Letter[]): Underline[] {
  const parse = (item: Letter): Underline[] => {
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

  const res: Underline[] = []
  textArray.forEach((item: Letter) => res.push(...parse(item)))
  return res
}

// 解析添加删除线属性
// [{ letter }] => [{ letter, through }]
export function parseThrough (textArray: Letter[]): Through[] {
  const parse = (item: Letter): Through[] => {
    const { letter } = item
    const regThrough = /(.*)<through>(.*)<\/through>(.*)/
    const result = letter.match(regThrough)
    const res = []

    if (!result) {
      if (letter) {
        res.push({ ...item, letter, through: false })
      }
      return res
    }

    const [, matchBefore, matchThrough, matchAfter] = result
    if (matchAfter) {
      res.unshift({ ...item, letter: matchAfter, through: false })
    }
    if (matchThrough) {
      res.unshift({ ...item, letter: matchThrough, through: true })
    }
    res.unshift(...parse({ ...item, letter: matchBefore }))

    return res
  }

  const res: Through[] = []
  textArray.forEach((item: Letter) => res.push(...parse(item)))
  return res
}

// 合并作为一个字符绘制的类型。如 相连数字该作为一个整体，不换行
// [{ letter }] => [{ letter }]
export function parseType (textArray: Letter[]): Letter[] {
  const parse = (item: Letter) => {
    const { letter } = item
    let start = -1
    let end = -1
    const res = []

    letter.split('').forEach((char: string, index: number) => {
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

  const res: Letter[] = []
  textArray.forEach((item: Letter) => res.push(...parse(item)))

  return res
}

// 解析添加坐标属性
// [{ letter }] => [{ letter, letterWidth, x, y }]
export function getRenderText (this: CanvasDraw, textArray: Letter[], config: DrawTextConfig): LetterRender[] {
  const { context } = this
  const { x, y, maxWidth, wrap, fix, lineHeight, underline: underlineOption, letterSpacing, align } = config
  const fixWidth: number = context.measureText(fix).width
  const letters: LetterRender[] = []

  const actualX: number = (() => {
    const textWidth = calcTextWidth.call(this, textArray, config)
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
  let renderX: number = actualX
  let renderY: number = y
  let countWrap: number = 0

  for (let i = 0; i < textArray.length; i++) {
    const item = textArray[i]
    const { letter, underline } = item
    const letterWidth = context.measureText(letter).width
    const prev: LetterRender = letters[i - 1]
    const next: Letter = textArray[i + 1]
    const _maxWidth = countWrap < wrap ? maxWidth + x : maxWidth + x - fixWidth

    // 另起一行画
    if (renderX + letterWidth > _maxWidth) {
      if (countWrap >= wrap) {
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
      countWrap++
    }

    const isFirst = !prev // 首字母
    const isLast = !next // 尾字母
    const notInPrev = isFirst || (prev && !prev.underline) // 上一个没有下划线
    const notInNext = isLast || (next && !next.underline) // 下一个没有下划线
    const newline = prev && prev.y !== renderY // 相比于上一个，是新的行
    const inCurrent = !!underline

    // 第一个下划线字符, 应该加上下划线宽出文字的左间距
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

    // x轴位置累加
    renderX += (letterWidth + letterSpacing)

    // 最后一个下划线字符, 累加下划线宽出文字的右间距
    if (inCurrent && notInNext) {
      renderX += (underlineOption.right * 2)
    }
  }

  return letters
}

// 获取待渲染下划线数组
export function getRenderUnderlines (this: CanvasDraw, textArray: LetterRender[], config: DrawTextConfig): UnderlineRender[] {
  const { underline: underlineOption, size } = config
  const underlines: UnderlineRender[] = []

  const signStart = (char: string, x: number, y: number) => {
    underlines.push({
      startLetter: char,
      endLetter: '',
      startX: x,
      startY: y,
      endX: 0,
      endY: 0,
    })
  }
  const signEnd = (char: string, x: number, y: number) => {
    // 因为一定是按顺序确定点，所以这里一定是确定了最近一条线的终点
    const line = underlines[underlines.length - 1]
    line.endLetter = char
    line.endX = x
    line.endY = y
  }

  textArray.forEach((current: LetterRender, index: number) => {
    const inCurrent = !!current.underline
    if (!inCurrent) return

    const prev: LetterRender | undefined = textArray[index - 1]
    const next: LetterRender | undefined = textArray[index + 1]
    const isFirst = !prev // 首字母
    const isLast = !next // 尾字母
    const notInPrev = isFirst || (prev && !prev.underline) // 上一个没有下划线
    const notInNext = isLast || (next && !next.underline) // 下一个没有下划线
    const newline = prev && prev.y !== current.y // 相比于上一个，是新的行
    // 注意顺序, 因为三个 if 判断是可能同时触发多个的

    // 下划线首字母 标记开始
    if (notInPrev) {
      signStart(current.letter, current.x - underlineOption.left, current.y + size + underlineOption.bottom)
    }

    // 新的一行 标记结束/标记开始
    if (newline && !notInPrev) {
      // 注意顺序，因为标记结束是取最后一个
      signEnd(prev.letter, prev.x + prev.letterWidth, prev.y + size + underlineOption.bottom)
      signStart(current.letter, current.x, current.y + size + underlineOption.bottom)
    }

    // 下划线尾字母 标记结束
    if (notInNext) {
      signEnd(current.letter, current.x + current.letterWidth + underlineOption.right, current.y + size + underlineOption.bottom)
    }
  })

  return underlines
}

// 获取待渲染删除线数组
export function getRenderThroughes (this: CanvasDraw, textArray: LetterRender[], config: DrawTextConfig): ThroughRender[] {
  const { size } = config
  const throughes: ThroughRender[] = []
  const throughStart = (char: string, x: number, y: number) => {
    throughes.push({
      startLetter: char,
      endLetter: '',
      startX: x,
      startY: y,
      endX: 0,
      endY: 0,
    })
  }
  const throughEnd = (char: string, x: number, y: number) => {
    // 因为一定是按顺序确定点，所以这里一定是确定了最近一条线的终点
    const line = throughes[throughes.length - 1]
    line.endLetter = char
    line.endX = x
    line.endY = y
  }

  textArray.forEach((current: LetterRender, index: number) => {
    const inCurrent = !!current.through
    if (!inCurrent) return

    const prev: LetterRender | undefined = textArray[index - 1]
    const next: Letter | undefined = textArray[index + 1]
    const isFirst = !prev // 首字母
    const isLast = !next // 尾字母
    const notInPrev = isFirst || (prev && !prev.through) // 上一个没有删除线
    const notInNext = isLast || (next && !next.through) // 下一个没有下划线
    const newline = prev && prev.y !== current.y // 相比于上一个，是新的行
    // 注意顺序, 因为三个 if 判断是可能同时触发多个的

    // 删除线首字母 标记开始
    if (notInPrev) {
      throughStart(current.letter, current.x, current.y + size * 2 / 3)
    }

    // 新的一行 标记结束/标记开始
    if (newline && !notInPrev) {
      // 注意顺序，因为标记结束是取最后一个
      throughEnd(prev.letter, prev.x + prev.letterWidth, prev.y + size * 2 / 3)
      throughStart(current.letter, current.x, current.y + size * 2 / 3)
    }

    // 删除线尾字母 标记结束
    if (notInNext) {
      throughEnd(current.letter, current.x + current.letterWidth, current.y + size * 2 / 3)
    }
  })

  return throughes
}

export function drawText (this: CanvasDraw, textArray: LetterRender[], config: DrawTextConfig): void {
  const { context } = this
  const { type } = config

  textArray.forEach((item: LetterRender) => {
    const { x, y, letter } = item
    context[type](letter, x, y)
  })
}

export function drawUnderlines (this: CanvasDraw, lines: UnderlineRender[], config: DrawTextConfig): void {
  const { context } = this
  const { underline: { lineWidth, dashed } } = config
  context.save()

  context.lineWidth = lineWidth

  lines.forEach((item: UnderlineRender) => {
    const { startX, startY, endX, endY } = item
    context.beginPath()
    context.setLineDash(dashed)
    context.moveTo(startX, startY)
    context.lineTo(endX, endY)
    context.stroke()
  })

  context.restore()
}

export function drawThrough (this: CanvasDraw, lines: ThroughRender[], config: DrawTextConfig): void {
  const { context } = this
  context.save()

  lines.forEach((item: ThroughRender) => {
    const { startX, startY, endX, endY } = item
    context.beginPath()
    context.moveTo(startX, startY)
    context.lineTo(endX, endY)
    context.stroke()
  })

  context.restore()
}

export function addStatistic (this: CanvasDraw, textArray: LetterRender[], config: DrawTextConfig): DrawTextConfig {
  const { ratio } = this
  const { x, y, size } = config
  let minX = x
  let maxX = x
  let minY = y
  let maxY = y

  textArray.forEach((item: LetterRender, index: number) => {
    minX = Math.min(minX, item.x)
    maxX = Math.max(maxX, item.x)
    minY = Math.min(minY, item.y)
    maxY = Math.max(maxY, item.y)

    if (index === textArray.length - 1) {
      maxX += item.letterWidth
      maxY += size
    }
  })

  const newConfig: DrawTextConfig = {
    ...config,
    actualMaxWidth: (maxX - minX) / ratio,
    actualMaxHeight: (maxY - minY) / ratio,
  }

  return newConfig
}

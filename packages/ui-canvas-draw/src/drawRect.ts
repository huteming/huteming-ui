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
export default function drawRect (this: any, x: any, y: any, width: any, height: any, options: any = {}) {
  // log(`draw rect *** x: ${x} *** y: ${y} *** width: ${width} *** height: ${height}`)
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

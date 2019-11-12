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
export default function drawLine (this: any, startX: any, startY: any, endX: any, endY: any, options: any = {}) {
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

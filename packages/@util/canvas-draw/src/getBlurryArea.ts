import { imageDataRGBA } from 'stackblur-canvas'
import createCanvas from './createCanvas'

/**
 * 创建一个新的模糊的canvas
 * @param {*Number} radius 模糊程度 the radius of the blur
 * @param {*Number} x 截取区域的左上角 x 坐标
 * @param {*Number} y 截取区域的左上角 y 坐标
 * @param {*Number} width 截取区域的宽度
 * @param {*Number} height 截取区域的高度
 */
export default function getBlurryArea (this: any, radius: any, x: any, y: any, width: any, height: any) {
    const { ratio, context, _options, scale } = this
    const { designWidth } = _options

    const _x = x * ratio * scale
    const _y = y * ratio * scale
    const _width = width * ratio * scale
    const _height = height * ratio * scale

    // 创建相同尺寸参数的 canvas
    const { canvas: _canvas, context: _context } = createCanvas(width, height, designWidth)
    // 获取需要模糊处理区域图像数据
    const data = context.getImageData(_x, _y, _width, _height)
    // 模糊处理
    imageDataRGBA(data, 0, 0, data.width, data.height, radius)
    // 将模糊的图像数据再渲染到画布上面
    _context.putImageData(data, 0, 0)

    return _canvas
}

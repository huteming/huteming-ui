import { ConvertorConfig } from '../types'
import { canvas2dataURI, canvas2blob } from './canvas'

export function image2canvas (image: any, options: ConvertorConfig): Promise<HTMLCanvasElement> {
    // 最大尺寸限制
    const { maxWidth, maxHeight, compress } = options

    return new Promise((resolve, reject) => {
        try {
            // 图片原始尺寸
            const originWidth = image.width
            const originHeight = image.height
            // 目标尺寸
            let targetWidth = originWidth
            let targetHeight = originHeight
            // 图片尺寸超过限制
            if (compress && (originWidth > maxWidth || originHeight > maxHeight)) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                } else {
                    targetHeight = maxHeight
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                }
            }

            const canvas = document.createElement('canvas')
            canvas.width = targetWidth
            canvas.height = targetHeight
            const context = canvas.getContext('2d')
            if (!context) {
                return reject(new Error('获取画布上下文context失败'))
            }
            context.drawImage(image, 0, 0, targetWidth, targetHeight)

            resolve(canvas)
        } catch (err) {
            reject(err)
        }
    })
}

export async function image2dataURI (image: HTMLImageElement, options: ConvertorConfig) {
    const canvas = await image2canvas(image, options)
    return canvas2dataURI(canvas, options)
}

export async function image2blob (image: HTMLImageElement, options: ConvertorConfig) {
    const canvas = await image2canvas(image, options)
    return canvas2blob(canvas, options)
}

export function image2image (image: HTMLImageElement, config: ConvertorConfig) {
    return Promise.resolve(image)
}

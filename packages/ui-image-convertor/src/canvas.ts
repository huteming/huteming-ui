import { ConvertorConfig } from '../types'
import { dataURI2image } from './dataURI'

export async function canvas2image (canvas: HTMLCanvasElement, options: ConvertorConfig) {
    const dataURI = await canvas2dataURI(canvas, options)
    return dataURI2image(dataURI, options)
}

export function canvas2dataURI (canvas: HTMLCanvasElement, options: ConvertorConfig) {
    const { mimeType, quality } = options

    return Promise.resolve(canvas.toDataURL(mimeType, quality))
}

export function canvas2blob (canvas: HTMLCanvasElement, options: ConvertorConfig) {
    const { mimeType, quality } = options

    return new Promise((resolve, reject) => {
        try {
            canvas.toBlob((blob: Blob) => {
                resolve(blob)
            }, `image/${mimeType}`, quality)
        } catch (err) {
            reject(err)
        }
    })
}

export function canvas2canvas (canvas: HTMLCanvasElement, options: ConvertorConfig) {
    return Promise.resolve(canvas)
}

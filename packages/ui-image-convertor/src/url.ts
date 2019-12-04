import { ConvertorConfig } from '../types'
import { image2canvas, image2blob, image2dataURI } from './image'

export function url2image (url: string, options: ConvertorConfig): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')

        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject(new Error(`图片渲染地址错误: ${url}`))
        }

        img.src = url
    })
}

export async function url2canvas (url: string, options: ConvertorConfig) {
    const image = await url2image(url, options)
    const canvas = await image2canvas(image, options)
    return canvas
}

export async function url2blob (url: string, options: ConvertorConfig) {
    const image = await url2image(url, options)
    return image2blob(image, options)
}

export async function url2dataURI (url: string, options: ConvertorConfig) {
    const image = await url2image(url, options)
    return image2dataURI(image, options)
}

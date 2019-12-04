import { ConvertorConfig } from '../types'
import { image2canvas } from './image'

export function dataURI2image (dataURI: string, options: ConvertorConfig): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')

        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject(new Error(`图片渲染错误: ${dataURI}`))
        }

        img.src = dataURI
    })
}

export async function dataURI2canvas (dataURI: string, options: ConvertorConfig) {
    const image = await dataURI2image(dataURI, options)
    return image2canvas(image, options)
}

export function dataURI2blob (dataURI: string, options: ConvertorConfig) {
    const arr = dataURI.split(',')
    const match = arr[0].match(/:(.*?);/)
    if (!match) {
        return Promise.reject(new Error(`dataURI 格式有误: ${dataURI}`))
    }
    const type = match[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return Promise.resolve(new Blob([u8arr], { type }))
}

export function dataURI2dataURI (dataURI: any, config: ConvertorConfig) {
    return Promise.resolve(dataURI)
}

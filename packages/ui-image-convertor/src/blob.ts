import { ConvertorConfig } from '../types'
import { dataURI2image } from './dataURI'
import { image2canvas } from './image'

export async function blob2canvas (blob: Blob, options: ConvertorConfig) {
    const dataURI = await blob2dataURI(blob, options)
    const image = await dataURI2image(dataURI, options)
    const canvas = await image2canvas(image, options)
    return canvas
}

export function blob2dataURI (blob: Blob, options: ConvertorConfig): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
        const reader = new FileReader()

        reader.onload = function () {
            resolve(reader.result)
        }

        reader.onerror = function (error) {
            reject(error)
        }

        reader.readAsDataURL(blob)
    })
}

export async function blob2image (blob: Blob, options: ConvertorConfig): Promise<HTMLImageElement> {
    const dataURI = await blob2dataURI(blob, options)
    const image = await dataURI2image(dataURI, options)
    return image
}

export function blob2blob (blob: Blob, config: ConvertorConfig) {
    return Promise.resolve(blob)
}

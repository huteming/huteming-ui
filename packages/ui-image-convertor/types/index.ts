export interface ConvertorOptions {
    compress?: boolean
    maxWidth?: number
    maxHeight?: number
    mimeType?: string
    quality?: number
}

export interface ConvertorConfig {
    compress: boolean
    maxWidth: number
    maxHeight: number
    mimeType: string
    quality: number
}

export type ConvertorValue = Blob | HTMLCanvasElement | string | HTMLImageElement | File
export type ConvertorFrom = 'image' | 'dataURI' | 'blob' | 'canvas' | 'url'
export type ConvertorTo = 'image' | 'dataURI' | 'blob' | 'canvas'

export enum ConvertorHandler {
    image2image = 'image2image',
    image2dataURI = 'image2dataURI',
    image2blob = 'image2blob',
    image2canvas = 'image2canvas',

    dataURI2image = 'dataURI2image',
    dataURI2dataURI = 'dataURI2dataURI',
    dataURI2blob = 'dataURI2blob',
    dataURI2canvas = 'dataURI2canvas',

    blob2image = 'blob2image',
    blob2dataURI = 'blob2dataURI',
    blob2blob = 'blob2blob',
    blob2canvas = 'blob2canvas',

    canvas2image = 'canvas2image',
    canvas2dataURI = 'canvas2dataURI',
    canvas2blob = 'canvas2blob',
    canvas2canvas = 'canvas2canvas',

    url2image = 'url2image',
    url2dataURI = 'url2dataURI',
    url2blob = 'url2blob',
    url2canvas = 'url2canvas',
}
export type ConvertorMap = {
    [key in ConvertorHandler]: Function
}

import { ConvertorOptions, ConvertorValue, ConvertorConfig, ConvertorTo, ConvertorFrom, ConvertorHandler, ConvertorMap } from '../types'
import * as handleBlob from './blob'
import * as handleCanvas from './canvas'
import * as handleDataURI from './dataURI'
import * as handleImage from './image'
import * as handleUrl from './url'

const optionsDefault: ConvertorConfig = {
    compress: false,
    maxWidth: 1100,
    maxHeight: 1100,
    mimeType: 'png',
    quality: 1.0,
}

const methodsConvert: ConvertorMap = {
    ...handleBlob,
    ...handleCanvas,
    ...handleDataURI,
    ...handleImage,
    ...handleUrl,
}

export default class Convertor {
    private values: ConvertorValue | ConvertorValue[]
    private config: ConvertorConfig
    getImage: any
    getDataURI: any
    getFile: any
    getCanvas: any

    constructor (values: ConvertorValue | ConvertorValue[], optionsCommon: ConvertorOptions = {}) {
        this.values = values
        this.config = Object.assign({}, optionsDefault, optionsCommon)

        this.getImage = this.getResult('image').bind(this)
        this.getDataURI = this.getResult('dataURI').bind(this)
        this.getFile = this.getResult('blob').bind(this)
        this.getCanvas = this.getResult('canvas').bind(this)
    }

    private getResult (to: ConvertorTo) {
        return function (this: Convertor, options: ConvertorOptions = {}) {
            const config = Object.assign({}, this.config, options)

            if (Array.isArray(this.values)) {
                const promises = this.values.map(value => {
                    return this.getHandler(value, to, config)(value, config)
                })
                return Promise.all(promises)
            }

            return this.getHandler(this.values, to, config)(this.values, config)
        }
    }

    private getHandler (value: ConvertorValue, to: ConvertorTo, config: ConvertorConfig) {
        let from: ConvertorFrom

        if (value instanceof HTMLImageElement) {
            from = 'image'
        } else if (value instanceof HTMLCanvasElement) {
            from = 'canvas'
        } else if (typeof value === 'string') {
            if (/^data:/i.test(value)) {
                from = 'dataURI'
            } else if (value.startsWith('http')) {
                from = 'url'
            }
        } else {
            from = 'blob'
        }

        const name = Object.keys(methodsConvert)
            .filter(item => item.startsWith(from) && item.endsWith(to))
            .shift()

        if (!name) {
            return () => {
                return Promise.reject(new Error(`value类型错误: ${value}`))
            }
        }

        return methodsConvert[(name as ConvertorHandler)]
    }
}

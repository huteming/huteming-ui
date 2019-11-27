import { LineTypes, ArcTypes } from './enum'

export interface DrawArcOption {
    startDegrees?: number,
    endDegrees?: number,
    direction?: boolean,
    lineWidth?: number,
    shadowColor?: string,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    shadowBlur?: number,
    color?: string,
    fillColor?: string,
    strokeColor?: string,
    type?: ArcTypes | ArcTypes[],
}

export interface DrawArcConfig {
    startDegrees: number,
    endDegrees: number,
    direction: boolean,
    lineWidth: number,
    shadowColor: string,
    shadowOffsetX: number,
    shadowOffsetY: number,
    shadowBlur: number,
    fillColor: string,
    strokeColor: string,
    type: ArcTypes[],
    // 附加属性
    x: number
    y: number
    r: number
}

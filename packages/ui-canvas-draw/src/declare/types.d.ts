import { LineTypes } from './enum'

export interface CanvasOption {
    designWidth?: number
}

export interface CanvasConfig {
    designWidth: number
}

export interface DrawRectOption {
    r: number | string,
    lineWidth: number,
    color: string,
    type: string,
}

export interface DrawRectConfig {
    r: number | string,
    lineWidth: number,
    color: string,
    type: string,
}

export interface DrawLineOption {
    dashed: number[]
    lineWidth: number
    color: string,
}

export interface DrawLineConfig {
    dashed: number[]
    lineWidth: number
    color: string,
}

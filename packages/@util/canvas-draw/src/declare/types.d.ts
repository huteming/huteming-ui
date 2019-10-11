import { LineTypes } from './enum'

export interface CanvasOption {
    designWidth?: number
}

export interface CanvasConfig {
    designWidth: number
}

// drawText
export interface Letter {
    letter: string
    underline?: boolean
    through?: boolean
}

export interface Underline extends Letter {
    underline: boolean
}

export interface Through extends Letter {
    through: boolean
}

export interface LetterRender extends Letter {
    x: number
    y: number
    letterWidth: number
}

export interface UnderlineRender {
    startLetter: string
    endLetter: string
    startX: number
    startY: number
    endX: number
    endY: number
}

export interface ThroughRender {
    startLetter: string
    endLetter: string
    startX: number
    startY: number
    endX: number
    endY: number
}

export interface DrawTextOption {
    fix?: string,
    maxWidth?: number,
    style?: string,
    variant?: string,
    weight?: string,
    size?: number,
    lineHeight?: number,
    align?: string,
    baseline?: CanvasTextBaseline,
    letterSpacing?: number,
    lineWidth?: number,
    wrap?: number,
    shadowColor?: string,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    shadowBlur?: number,
    color?: string,
    type?: LineTypes,
    underline?: DrawUnderlineOption,
}

export interface DrawUnderlineOption {
    left: number,
    right: number,
    bottom: number,
    dashed: number[],
    lineWidth: number,
}

export interface DrawTextConfig {
    fix: string,
    maxWidth: number,
    style: string,
    variant: string,
    weight: string,
    size: number,
    lineHeight: number,
    align: string,
    baseline: CanvasTextBaseline,
    letterSpacing: number,
    lineWidth: number,
    wrap: number,
    shadowColor: string,
    shadowOffsetX: number,
    shadowOffsetY: number,
    shadowBlur: number,
    color: string,
    type: LineTypes,
    underline: DrawUnderlineConfig,
    // 附加属性
    x: number
    y: number
    actualMaxWidth: number
    actualMaxHeight: number
}

export interface DrawUnderlineConfig {
    left: number,
    right: number,
    bottom: number,
    dashed: number[],
    lineWidth: number,
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

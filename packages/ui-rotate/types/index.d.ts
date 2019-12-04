export interface RotateOptions {
    translate?: Translate
    done?: Function
    initial?: any
    direction?: boolean
}

export interface Translate {
    (angle?: number): void
}

export interface RangeOptions {
    angle: number
    value: any
}

export interface RangeConfig {
    angle: number
    value: any
    angleStop: number
}

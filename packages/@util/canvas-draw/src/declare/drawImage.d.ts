export interface DrawImageOption {
    shadowColor?: string,
    shadowOffsetX?: number
    shadowOffsetY?: number
    shadowBlur?: number
}

export interface DrawImageConfig {
    shadowColor: string,
    shadowOffsetX: number
    shadowOffsetY: number
    shadowBlur: number
    // 附加属性
    x: number
    y: number
    width: number
    height: number
}

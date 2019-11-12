import Vue from 'vue'

export interface AnchorSelf {
    el: HTMLElement
    vm?: Vue
    config: AnchorConfig

    scrollEventTarget: HTMLElement | null
    clickEventTarget: HTMLElement | null
}

export interface AnchorOptions {
    selector?: string
    container?: string
    top?: number
    duration?: number
    done?: Function
}

export interface AnchorConfig {
    selector: string
    container: string
    top: number
    duration: number
    done?: Function
}

export interface AnchorAttr {
    handleClick: (this: AnchorSelf) => void
    self: AnchorSelf
}

import { Theme } from '../../types'

type Direction = 'top' | 'right' | 'bottom' | 'left' | 'all'
interface HairlineConfig {
    radius: number
    top: number | string
    right: number | string
    bottom: number | string
    left: number | string
}

const scaleHairlineCommon = (color: string, top: number | string, right: number | string, bottom: number | string, left: number | string) => {
    if (typeof top === 'number') {
        top = `${top}px`
    }
    if (typeof right === 'number') {
        right = `${right}px`
    }
    if (typeof bottom === 'number') {
        bottom = `${bottom}px`
    }
    if (typeof left === 'number') {
        left = `${left}px`
    }
    return `
        content: ' ';
        position: absolute;
        background-color: ${color};
        display: block;
        z-index: 1;
        top: ${top};
        right: ${right};
        bottom: ${bottom};
        left: ${left};
    `
}

const hairlineTop = (theme: Theme, color: string, config: HairlineConfig) => {
    if (theme.dpr <= 1) {
        return `border-top: 1px solid ${color};`
    }

    const { right, left } = config

    return `
        border-top: none;

        &::before {
            ${scaleHairlineCommon(color, 0, right, 'auto', left)};
            height: 1px;
            transform-origin: 50% 50%;
            transform: scaleY(${1 / theme.dpr});
        }
    `
}

const hairlineTopRemove = () => {
    return `
        border-top: none;
        &::before {
            display: none !important;
        }
    `
}

const hairlineRight = (theme: Theme, color: string, config: HairlineConfig) => {
    if (theme.dpr <= 1) {
        return `border-right: 1px solid ${color};`
    }

    const { top, bottom } = config

    return `
        border-right: none;

        &::after {
            ${scaleHairlineCommon(color, top, 0, bottom, 'auto')};
            width: 1px;
            transform-origin: 100% 50%;
            transform: scaleX(${1 / theme.dpr});
        }
    `
}

const hairlineRightRemove = () => {
    return `
        border-right: none;
        &:after {
            display: none !important;
        }
    `
}

const hairlineBottom = (theme: Theme, color: string, config: HairlineConfig) => {
    if (theme.dpr <= 1) {
        return `border-bottom: 1px solid ${color};`
    }

    const { right, left } = config

    return `
        border-bottom: none;
        &::after {
            ${scaleHairlineCommon(color, 'auto', right, 0, left)};
            height: 1px;
            transform-origin: 50% 100%;
            transform: scaleY(${1 / theme.dpr});
        }
    `
}

const hairlineBottomRemove = () => {
    return `
        border-bottom: 0;
        &:after {
            display: none !important;
        }
    `
}

const hairlineLeft = (theme: Theme, color: string, config: HairlineConfig) => {
    if (theme.dpr <= 1) {
        return `border-left: 1px solid ${color};`
    }

    const { top, bottom } = config

    return `
        border-left: none;
        &::before {
            ${scaleHairlineCommon(color, top, 'auto', bottom, 0)};
            width: 1px;
            transform-origin: 100% 50%;
            transform: scaleY(${1 / theme.dpr});
        }
    `
}

const hairlineLeftRemove = () => {
    return `
        border-left: 0;
        &:before {
            display: none !important;
        }
    `
}

const hairlineAll = (theme: Theme, color: string, config: HairlineConfig) => {
    if (theme.dpr <= 1) {
        return `
            border: 1px solid ${color};
            border-radius: ${config.radius}px;
        `
    }

    return `
        border: none;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 200%;
            height: 200%;
            border: 1PX solid ${color};
            border-radius: ${config.radius * theme.dpr}px;
            transform-origin: 0 0;
            transform: scale(${1 / theme.dpr});
            box-sizing: border-box;
            pointer-events: none;
        }
    `
}

const hairlineAllRemove = () => {
    return `
        border: 0;
        &:before {
            display: none !important;
        }
    `
}

const defaults = {
    radius: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
}
export const hairline = (theme: Theme, direction: Direction, color: string = 'rgba(235, 235, 235, 1)', options = {}) => {
    const handlers = {
        top: hairlineTop,
        right: hairlineRight,
        bottom: hairlineBottom,
        left: hairlineLeft,
        all: hairlineAll,
    }
    const config = Object.assign({}, defaults, options)
    return handlers[direction](theme, color, config)
}

export const hairlineRemove = (direction: Direction) => {
    const handlers = {
        top: hairlineTopRemove,
        right: hairlineRightRemove,
        bottom: hairlineBottomRemove,
        left: hairlineLeftRemove,
        all: hairlineAllRemove,
    }
    return handlers[direction]()
}

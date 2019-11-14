import { css } from 'vue-styled-components'
import { Theme } from '../../types'

const scaleHairlineCommon = (color: string, top: string | number, right: string | number, bottom: string | number, left: string | number) => {
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

const hairlineTop = (theme: Theme, color: string) => {
    if (theme.dpr <= 1) {
        return css`border-top: 1px solid ${color};`
    }

    return css`
        border-top: none;

        &::before {
            ${scaleHairlineCommon(color, 0, 'auto', 'auto', 0)};
            width: 100%;
            height: 1px;
            transform-origin: 50% 50%;
            transform: scaleY(${1 / theme.dpr});
        }
    `
}

const hairlineTopRemove = () => {
    return css`
        border-top: none;
        &::before {
            display: none !important;
        }
    `
}

const hairlineRight = (theme: Theme, color: string) => {
    if (theme.dpr <= 1) {
        return css`border-right: 1px solid ${color};`
    }

    return css`
        border-right: none;

        &::after {
            ${scaleHairlineCommon(color, 0, 0, 'auto', 'auto')};
            width: 1px;
            height: 100%;
            transform-origin: 100% 50%;
            transform: scaleX(${1 / theme.dpr});
        }
    `
}

const hairlineRightRemove = () => {
    return css`
        border-right: none;
        &:after {
            display: none !important;
        }
    `
}

const hairlineBottom = (theme: Theme, color: string) => {
    if (theme.dpr <= 1) {
        return css`border-bottom: 1px solid ${color};`
    }

    return css`
        border-bottom: none;
        &::after {
            ${scaleHairlineCommon(color, 'auto', 'auto', 0, 0)};
            width: 100%;
            height: 1PX;
            transform-origin: 50% 100%;
            transform: scaleY(${1 / theme.dpr});
        }
    `
}

const hairlineBottomRemove = () => {
    return css`
        border-bottom: 0;
        &:after {
            display: none !important;
        }
    `
}

const hairlineLeft = (theme: Theme, color: string) => {
    if (theme.dpr <= 1) {
        return css`border-left: 1px solid ${color};`
    }

    return css`
        border-left: none;
        &::before {
            ${scaleHairlineCommon(color, 0, 'auto', 'auto', 0)};
            width: 1PX;
            height: 100%;
            transform-origin: 100% 50%;
            transform: scaleY(${1 / theme.dpr});
        }
    `
}

const hairlineLeftRemove = () => {
    return css`
        border-left: 0;
        &:before {
            display: none !important;
        }
    `
}

const hairlineAll = (theme: Theme, color: string, radius: number) => {
    if (theme.dpr <= 1) {
        return css`
            border: 1px solid ${color};
            border-radius: ${radius};
        `
    }

    return css`
        border: none;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 200%;
            height: 200%;
            border: 1PX solid ${color};
            border-radius: ${radius * theme.dpr};
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

type Direction = 'top' | 'right' | 'bottom' | 'left' | 'all'
export const hairline = (theme: Theme, direction: Direction, color: string = 'rgba(235, 235, 235, 1)', radius: number = 0) => {
    const handlers = {
        top: hairlineTop,
        right: hairlineRight,
        bottom: hairlineBottom,
        left: hairlineLeft,
        all: hairlineAll,
    }
    return handlers[direction](theme, color, radius)
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

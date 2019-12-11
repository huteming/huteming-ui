export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'middle'

export interface PopupProps {
    value: boolean
    position: PopupPosition
}

export interface PopupEvents {
    onInput: (val?: boolean) => void
}

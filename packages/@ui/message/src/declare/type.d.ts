import Vue from 'vue'

export interface Done {
    (): void
}

export type ActionType = 'confirm' | 'cancel'

export type MessageType = 'alert' | 'confirm' | 'prompt'

export interface MessageResponse {
    action: ActionType
    inputValue: string
    vm: MessageComp
}

export interface BeforeClose {
    (done: Done, res: MessageResponse): void
}

export interface BeforeConfirm {
    (done: Done, res: MessageResponse): void
}

export interface BeforeCancel {
    (done: Done, res: MessageResponse): void
}

export interface MessageComp extends Vue {
    show (): void
}

export interface MessageOptions {
    title?: string
    message?: string | object

    confirmButtonText?: string
    confirmButtonHighlight?: boolean

    showCancelButton?: boolean
    cancelButtonText?: string
    cancelButtonHighlight?: boolean

    showInput?: boolean
    inputType?: string
    inputValue?: string
    inputPlaceholder?: string

    closeOnClickModal?: boolean

    beforeClose?: BeforeClose | null
    beforeConfirm?: BeforeConfirm | null
    beforeCancel?: BeforeCancel | null
}

export interface MessageConfig {
    title: string
    message: string | object

    confirmButtonText: string
    confirmButtonHighlight: boolean

    showCancelButton: boolean
    cancelButtonText: string
    cancelButtonHighlight: boolean

    showInput: boolean
    inputType: string
    inputValue: string
    inputPlaceholder: string

    closeOnClickModal: boolean

    beforeClose?: BeforeClose | null
    beforeConfirm?: BeforeConfirm | null
    beforeCancel?: BeforeCancel | null
}

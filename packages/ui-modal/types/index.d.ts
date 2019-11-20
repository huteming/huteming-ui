import Vue from 'vue'

export interface CreateModal {
    (brotherElement?: Element): ComponentModal
}

export interface OpenModal {
    (options?: ModalOptions | clickModal, brotherElement?: Element): ComponentModal
}

export interface CloseModal {
    (options?: ModalOptions): void
}

export interface clickModal {
    (): void
}

export interface MinxinModal extends Vue {
    $_openModal: OpenModal
    $_closeModal: CloseModal
}

export interface ComponentModal extends Vue {
    show (options?: ModalOptions): void
    hide (options?: ModalOptions): void
}

export interface ModalOptions {
    callbackClick?: clickModal
    callbackBeforeEnter?: () => void
    callbackAfterEnter?: () => void
    callbackBeforeLeave?: () => void
    callbackAfterLeave?: () => void
}

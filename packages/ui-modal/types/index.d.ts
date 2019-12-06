import Vue from 'vue'

export interface clickModal {
    (): void
}

export interface CreateModal {
    (brotherElement?: Element): ModalComponent
}

export interface OpenModal {
    (options: ModalOptions | clickModal): ModalComponent
}

export interface CloseModal {
    (options: ModalOptions): void
}

export interface ModalComponent extends Vue {
    show (options: ModalOptions): void
    hide (options: ModalOptions): void
}

export interface ModalMixin extends Vue {
    createModal: CreateModal
    openModal: OpenModal
    closeModal: CloseModal
}

export interface ModalOptions {
    leaveToDestroy?: boolean
    click?: clickModal
    beforeEnter?: () => void
    afterEnter?: () => void
    beforeLeave?: () => void
    afterLeave?: () => void
}

import Vue from 'vue'

export interface OpenModal {
    (options?: object, brotherElement?: Element): ModalComp
}

export interface CloseModal {
    (options?: object): void
}

export interface ModalMixin extends Vue {
    $_openModal: OpenModal
    $_closeModal: CloseModal
}

export interface ModalComp extends Vue {
    setData (options?: object): void
    show (options?: object): void
}

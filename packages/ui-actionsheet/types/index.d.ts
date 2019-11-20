import Vue from 'vue'

export interface ActionsheetMenu {
    label: string
    value: any
}

export interface ActionsheetOptions {
    menus: ActionsheetMenu[]
    title?: string
    cancelText?: string
    closeOnClickModal?: boolean
}

export interface Actionsheet {
    (options: ActionsheetOptions | ActionsheetMenu[]): Promise<any>
    install: (vue: typeof Vue) => void
}

export interface ComponentActionsheet extends Vue {
    closeOnClickModal: boolean
    open: () => void
    close: (actionValue?: any) => void
}

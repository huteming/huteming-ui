import Vue from 'vue'

export interface IMenu {
    label: string
    value: any
}

export interface IOptions {
    menus: IMenu[]
    title?: string
    cancelText?: string
    closeOnClickModal?: boolean
}

export interface IActionsheet {
    (options: IOptions | IMenu[]): Promise<any>
    install: (vue: typeof Vue) => void
}

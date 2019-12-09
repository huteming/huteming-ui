import Vue, { PluginObject, PluginFunction, VNode, ComponentOptions } from 'vue'

export interface Toast extends PluginObject<object> {
    (message: string | ToastOptions | VNode | ComponentOptions<Vue>, duration: number | ToastOptions, options: ToastOptions): ToastComponent
    install: PluginFunction<object>
}

export interface ToastOptions {
    message?: string | VNode | ComponentOptions<Vue>
    icon?: string
    position?: string
    duration?: number
    onClose?: Function
}

export interface CloseToast {
    (): void
}

export interface OpenToast {
    (): void
}

export interface ToastComponent extends Vue {
    close: CloseToast
    open: OpenToast
}

export declare enum ExpandHandler {
    success = 'success',
    error = 'error',
    warning = 'warning',
    loading = 'loading',
}

// export type ExpandHandler = 'success' | 'error' | 'warning' | 'loading'

export type ExpandMap = {
    [name in ExpandHandler]: ToastOptions
}

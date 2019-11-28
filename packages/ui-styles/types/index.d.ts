import { VueClass } from 'vue-class-component/lib/declarations'
import Vue, { ComponentOptions } from 'vue'

export interface Theme {
    dpr: number
    modal: ThemeModal
}

export interface ThemeModal {
    background: string
}

export interface State {
    zIndex: number
}

export interface PropsState {
    type: Object
    default: () => State
}

export interface StyleProps {
    theme: Theme
    state: State
    [key: string]: any
}

export interface StyleCreater {
    (styled: any, css: any, helper: StyleHelper): object
}

export interface WithStyles {
    <V extends Vue>(styleCreater: StyleCreater): (CompConstructor: VueClass<V>, options: ComponentOptions<V>) => VueClass<V>
}

export interface StyleHelper {
    autofit (px: number): number
}

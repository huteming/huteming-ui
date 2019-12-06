import Vue, { VueConstructor } from 'vue'
import { TsxComponent } from 'vue-tsx-support'

export interface GuideProcess {
    name: string
    component: TsxComponent<Vue, GuideComponentProps>
    width?: number
    height?: number
    target: string | HTMLElement
    extra: any
    before: (done: Function) => void
    after: () => void
}

export interface GuideComponentProps {
    top: number
    left: number
    width: number
    height: number
    extra: any
}
